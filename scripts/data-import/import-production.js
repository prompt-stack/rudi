#!/usr/bin/env node

/**
 * Production Import Script for Course Content
 * Uses credentials from .env.production or .secure/.env
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: process.env.ENV_FILE || '.env.production' });

// Configuration
const config = {
  // Use production Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  // Cloudflare Stream
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: process.env.CLOUDFLARE_STREAM_API_TOKEN,
  },
  
  // Paths
  curriculumRoot: process.env.CURRICULUM_ROOT || '/path/to/curriculum',
  useProduction: process.env.USE_LOCAL !== 'true'
};

// Initialize Supabase client
if (!config.supabase?.url || !config.supabase?.serviceRoleKey) {
  console.error('❌ Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  process.exit(1)
}
const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

/**
 * Upload video to Cloudflare Stream
 */
async function uploadToCloudflareStream(videoPath, metadata = {}) {
  const FormData = require('form-data');
  const form = new FormData();
  
  // Read video file
  const videoBuffer = await fs.readFile(videoPath);
  form.append('file', videoBuffer, path.basename(videoPath));
  
  // Add metadata
  const meta = {
    name: metadata.title || path.basename(videoPath),
    requireSignedURLs: false,
    allowedOrigins: ['*'], // Update for production
    thumbnailTimestampPct: 0.5
  };
  
  const https = require('https');
  
  return new Promise((resolve, reject) => {
    const req = https.request({
      method: 'POST',
      hostname: 'api.cloudflare.com',
      path: `/client/v4/accounts/${config.cloudflare.accountId}/stream`,
      headers: {
        'Authorization': `Bearer ${config.cloudflare.apiToken}`,
        ...form.getHeaders()
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.success) {
            console.log(`  ✅ Video uploaded to Cloudflare: ${response.result.uid}`);
            resolve({
              id: response.result.uid,
              playbackUrl: response.result.playback?.hls,
              thumbnailUrl: response.result.thumbnail,
              duration: response.result.duration
            });
          } else {
            reject(new Error(response.errors?.[0]?.message || 'Upload failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    form.pipe(req);
  });
}

/**
 * Parse lesson info
 */
async function parseLessonInfo(lessonPath) {
  try {
    const infoPath = path.join(lessonPath, 'lesson_info.md');
    const content = await fs.readFile(infoPath, 'utf-8');
    
    const durationMatch = content.match(/Duration:\s*(\d+)\s*seconds/);
    const duration = durationMatch ? parseInt(durationMatch[1]) : 300; // Default 5 min
    
    return {
      duration,
      hasVideo: await fileExists(path.join(lessonPath, 'video.mp4')),
      hasTranscript: await fileExists(path.join(lessonPath, 'transcript.txt')),
      hasSlides: await directoryExists(path.join(lessonPath, 'slides'))
    };
  } catch {
    return { duration: 300, hasVideo: false, hasTranscript: false, hasSlides: false };
  }
}

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function directoryExists(path) {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Upload to Supabase Storage
 */
async function uploadToStorage(bucket, remotePath, localFile) {
  const fileBuffer = await fs.readFile(localFile);
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(remotePath, fileBuffer, {
      upsert: true,
      contentType: getContentType(localFile)
    });
  
  if (error) {
    console.error(`  ❌ Storage upload failed: ${error.message}`);
    return null;
  }
  
  return remotePath;
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  return {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4'
  }[ext] || 'application/octet-stream';
}

/**
 * Main import function
 */
async function importModule(moduleName) {
  console.log(`\n🚀 Starting Production Import for ${moduleName}`);
  console.log(`📍 Environment: ${config.useProduction ? 'PRODUCTION' : 'LOCAL'}`);
  console.log(`🔗 Supabase: ${config.supabase.url}`);
  console.log(`☁️  Cloudflare Account: ${config.cloudflare.accountId}\n`);
  
  const modulePath = path.join(config.curriculumRoot, moduleName);
  
  // Module configuration
  const moduleConfigs = {
    'Module_01_AI_Foundations': {
      title: 'Module 01: AI Foundations',
      slug: 'module-01-ai-foundations',
      description: 'Master the fundamental concepts of artificial intelligence, from basic principles to modern LLMs.',
      price_cents: 9700,
      lessons: [
        { folder: '01_Introduction_to_AI', title: 'Evolution of Intelligence', is_preview: true },
        { folder: '02_Foundations_of_AI', title: 'What is Intelligence?', is_preview: false },
        { folder: '04_Large_Language_Models', title: 'Introduction to LLMs', is_preview: false },
        { folder: '05_LLM_Limitations', title: 'Understanding LLM Limitations', is_preview: false }
      ]
    }
  };
  
  const moduleConfig = moduleConfigs[moduleName];
  if (!moduleConfig) {
    console.error(`❌ No configuration for module: ${moduleName}`);
    return;
  }
  
  // Create or update course
  console.log('📚 Creating course...');
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .upsert({
      title: moduleConfig.title,
      slug: moduleConfig.slug,
      description: moduleConfig.description,
      price_cents: moduleConfig.price_cents,
      access_scope: `course:${moduleConfig.slug}`,
      is_published: true,
      is_featured: true,
      order_index: 1
    }, { onConflict: 'slug' })
    .select()
    .single();
  
  if (courseError) {
    console.error('❌ Failed to create course:', courseError.message);
    return;
  }
  
  console.log(`✅ Course ready: ${course.id}\n`);
  
  // Process lessons
  let totalDuration = 0;
  
  for (let i = 0; i < moduleConfig.lessons.length; i++) {
    const lesson = moduleConfig.lessons[i];
    const lessonPath = path.join(modulePath, lesson.folder);
    
    console.log(`\n📹 Lesson ${i + 1}/${moduleConfig.lessons.length}: ${lesson.title}`);
    
    if (!await directoryExists(lessonPath)) {
      console.log(`  ⚠️  Lesson folder not found: ${lesson.folder}`);
      continue;
    }
    
    // Parse lesson info
    const info = await parseLessonInfo(lessonPath);
    totalDuration += info.duration;
    
    // Upload video to Cloudflare (if exists)
    let cloudflareId = `pending-${Date.now()}`;
    if (info.hasVideo) {
      console.log('  📤 Uploading video to Cloudflare Stream...');
      try {
        const videoPath = path.join(lessonPath, 'video.mp4');
        const cloudflareResult = await uploadToCloudflareStream(videoPath, {
          title: lesson.title
        });
        cloudflareId = cloudflareResult.id;
      } catch (error) {
        console.error(`  ⚠️  Video upload failed: ${error.message}`);
        console.log('  Using placeholder ID for now');
      }
    }
    
    // Create video record
    console.log('  💾 Creating database record...');
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .upsert({
        course_id: course.id,
        title: lesson.title,
        description: `Lesson ${i + 1} of ${moduleConfig.title}`,
        video_provider: 'cloudflare',
        provider_asset_id: cloudflareId,
        duration_seconds: info.duration,
        is_preview: lesson.is_preview,
        is_required: true,
        order_index: i + 1
      }, { 
        onConflict: 'course_id,order_index',
        ignoreDuplicates: false 
      })
      .select()
      .single();
    
    if (videoError) {
      console.error(`  ❌ Database error: ${videoError.message}`);
      continue;
    }
    
    console.log(`  ✅ Video record created: ${video.id}`);
    
    // Upload assets
    const assets = [];
    
    // Upload transcript
    if (info.hasTranscript) {
      console.log('  📝 Uploading transcript...');
      const transcriptPath = `courses/${course.id}/lessons/${video.id}/transcript.txt`;
      const uploaded = await uploadToStorage(
        'transcripts',
        transcriptPath,
        path.join(lessonPath, 'transcript.txt')
      );
      
      if (uploaded) {
        assets.push({
          video_id: video.id,
          asset_type: 'transcript',
          title: 'Lesson Transcript',
          file_path: uploaded,
          storage_bucket: 'transcripts',
          is_downloadable: true,
          access_level: 'enrolled',
          position: 0
        });
        console.log('  ✅ Transcript uploaded');
      }
    }
    
    // Insert assets
    if (assets.length > 0) {
      const { error } = await supabase
        .from('content_assets')
        .upsert(assets, { onConflict: 'video_id,asset_type' });
      
      if (error) {
        console.error(`  ⚠️  Asset creation error: ${error.message}`);
      }
    }
  }
  
  // Update course duration
  await supabase
    .from('courses')
    .update({ duration_minutes: Math.round(totalDuration / 60) })
    .eq('id', course.id);
  
  console.log('\n' + '='.repeat(50));
  console.log('✨ Import Complete!');
  console.log('='.repeat(50));
  console.log(`📚 Course: ${moduleConfig.title}`);
  console.log(`🆔 Course ID: ${course.id}`);
  console.log(`📹 Lessons: ${moduleConfig.lessons.length}`);
  console.log(`⏱️  Duration: ${Math.round(totalDuration / 60)} minutes`);
  console.log(`🔗 Database: ${config.supabase.url}`);
  console.log('\n👉 Next steps:');
  console.log('   1. Check Cloudflare Stream dashboard for video processing');
  console.log('   2. Verify in Supabase Studio');
  console.log('   3. Test video playback in your app');
}

// Main execution
async function main() {
  const moduleName = process.argv[2] || 'Module_01_AI_Foundations';
  
  try {
    await importModule(moduleName);
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
