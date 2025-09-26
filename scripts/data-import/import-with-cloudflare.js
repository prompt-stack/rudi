#!/usr/bin/env node

/**
 * Enhanced Curriculum Import Script with Cloudflare Stream Integration
 * This script uploads videos to Cloudflare Stream and imports curriculum data
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');
const { uploadVideoDirectAPI } = require('./upload-to-cloudflare');

// Load configuration
const config = {
  supabase: {
    url: 'http://127.0.0.1:54321',
    serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
  },
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: process.env.CLOUDFLARE_STREAM_API_TOKEN
  },
  curriculumRoot: '/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized'
};

// Initialize Supabase
const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

/**
 * Upload video to Cloudflare Stream
 */
async function uploadVideo(videoPath, lessonTitle) {
  console.log(`  📤 Uploading video to Cloudflare Stream...`);
  
  try {
    // Check if we have Cloudflare credentials
    if (!config.cloudflare.accountId || !config.cloudflare.apiToken) {
      console.log('  ⚠️  No Cloudflare credentials, using placeholder ID');
      return {
        videoId: `placeholder-${Date.now()}`,
        playbackUrl: null,
        thumbnailUrl: null
      };
    }
    
    // Upload to Cloudflare
    const result = await uploadVideoDirectAPI(videoPath, config.cloudflare);
    console.log(`  ✅ Video uploaded: ${result.videoId}`);
    return result;
    
  } catch (error) {
    console.error(`  ❌ Video upload failed: ${error.message}`);
    // Return placeholder on error
    return {
      videoId: `error-${Date.now()}`,
      playbackUrl: null,
      thumbnailUrl: null
    };
  }
}

/**
 * Parse lesson info
 */
async function parseLessonInfo(lessonPath) {
  const infoPath = path.join(lessonPath, 'lesson_info.md');
  
  try {
    const content = await fs.readFile(infoPath, 'utf-8');
    const durationMatch = content.match(/Duration:\s*(\d+)\s*seconds/);
    const duration = durationMatch ? parseInt(durationMatch[1]) : 0;
    
    return {
      duration,
      hasVideo: await fileExists(path.join(lessonPath, 'video.mp4')),
      hasTranscript: await fileExists(path.join(lessonPath, 'transcript.txt')),
      hasSlides: await directoryExists(path.join(lessonPath, 'slides'))
    };
  } catch {
    return { duration: 0, hasVideo: false, hasTranscript: false, hasSlides: false };
  }
}

async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

async function directoryExists(dirpath) {
  try {
    const stat = await fs.stat(dirpath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Upload file to Supabase storage
 */
async function uploadToStorage(bucket, filePath, localFile) {
  try {
    const fileBuffer = await fs.readFile(localFile);
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileBuffer, { upsert: true });
    
    if (error) throw error;
    return filePath;
  } catch (error) {
    console.error(`Failed to upload to storage: ${error.message}`);
    return null;
  }
}

/**
 * Import Module 01
 */
async function importModule01() {
  console.log('\n🚀 Starting Module 01 Import with Cloudflare Stream\n');
  
  const modulePath = path.join(config.curriculumRoot, 'Module_01_AI_Foundations');
  
  // Define course
  const courseData = {
    title: 'Module 01: AI Foundations',
    slug: 'module-01-ai-foundations',
    description: 'Master the fundamental concepts of artificial intelligence',
    access_scope: 'course:ai-foundations',
    price_cents: 9700,
    is_published: true,
    is_featured: true,
    order_index: 1
  };
  
  // Define lessons
  const lessons = [
    {
      folder: '01_Introduction_to_AI',
      title: 'Evolution of Intelligence',
      description: 'Explore the journey from basic computation to modern AI',
      is_preview: true
    },
    {
      folder: '02_Foundations_of_AI',
      title: 'What is Intelligence?',
      description: 'Understanding the core concepts of intelligence',
      is_preview: false
    },
    {
      folder: '04_Large_Language_Models',
      title: 'Introduction to Large Language Models',
      description: 'Deep dive into LLMs and transformers',
      is_preview: false
    },
    {
      folder: '05_LLM_Limitations',
      title: 'Understanding LLM Limitations',
      description: 'Critical analysis of LLM capabilities',
      is_preview: false
    }
  ];
  
  // Create course
  console.log('📚 Creating course...');
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .upsert(courseData, { onConflict: 'slug' })
    .select()
    .single();
  
  if (courseError) {
    console.error('Failed to create course:', courseError);
    return;
  }
  
  console.log(`✅ Course created: ${course.id}\n`);
  
  // Process each lesson
  let totalDuration = 0;
  
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const lessonPath = path.join(modulePath, lesson.folder);
    
    console.log(`📹 Lesson ${i + 1}/${lessons.length}: ${lesson.title}`);
    
    // Check if lesson exists
    if (!await directoryExists(lessonPath)) {
      console.log(`  ⚠️  Lesson folder not found: ${lesson.folder}`);
      continue;
    }
    
    // Parse lesson info
    const info = await parseLessonInfo(lessonPath);
    totalDuration += info.duration;
    
    // Upload video to Cloudflare if it exists
    let cloudflareData = { videoId: 'no-video', playbackUrl: null };
    if (info.hasVideo) {
      const videoPath = path.join(lessonPath, 'video.mp4');
      cloudflareData = await uploadVideo(videoPath, lesson.title);
    }
    
    // Create video record
    console.log('  Creating database record...');
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert({
        course_id: course.id,
        title: lesson.title,
        description: lesson.description,
        video_provider: 'cloudflare',
        provider_asset_id: cloudflareData.videoId,
        duration_seconds: info.duration || 1, // Minimum 1 second
        is_preview: lesson.is_preview,
        is_required: true,
        order_index: i + 1
      })
      .select()
      .single();
    
    if (videoError) {
      console.error(`  ❌ Failed to create video record: ${videoError.message}`);
      continue;
    }
    
    console.log(`  ✅ Video record created: ${video.id}`);
    
    // Upload assets
    const assets = [];
    
    // Upload transcript
    if (info.hasTranscript) {
      console.log('  Uploading transcript...');
      const transcriptPath = `module-01/lesson-${i + 1}/transcript.txt`;
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
    
    // Create asset records
    if (assets.length > 0) {
      await supabase.from('content_assets').insert(assets);
    }
    
    console.log('');
  }
  
  // Update course duration
  await supabase
    .from('courses')
    .update({ duration_minutes: Math.round(totalDuration / 60) })
    .eq('id', course.id);
  
  console.log('✨ Import complete!');
  console.log(`Total duration: ${Math.round(totalDuration / 60)} minutes`);
  console.log(`\nView in Supabase Studio: http://127.0.0.1:54323`);
  
  // Show Cloudflare configuration status
  if (!config.cloudflare.accountId) {
    console.log('\n⚠️  Note: Videos were not uploaded to Cloudflare Stream.');
    console.log('To enable video uploads, set these environment variables:');
    console.log('  export CLOUDFLARE_ACCOUNT_ID=your-account-id');
    console.log('  export CLOUDFLARE_STREAM_API_TOKEN=your-api-token');
  }
}

// Run the import
importModule01().catch(console.error);