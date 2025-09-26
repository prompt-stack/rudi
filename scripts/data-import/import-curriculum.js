#!/usr/bin/env node

/**
 * Curriculum Import Script
 * Imports curriculum data from file system into Supabase database
 * 
 * Usage: node import-curriculum.js [module-name]
 * Example: node import-curriculum.js Module_01_AI_Foundations
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');
// Use local config if it exists, otherwise use default config
let config;
try {
  config = require('./import-config-local');
  // Merge with default config for missing fields
  const defaultConfig = require('./import-config');
  config = { ...defaultConfig, ...config };
} catch {
  config = require('./import-config');
}

// Initialize Supabase client
const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

/**
 * Parse lesson_info.md file to extract metadata
 */
async function parseLessonInfo(lessonPath) {
  const infoPath = path.join(lessonPath, 'lesson_info.md');
  
  try {
    const content = await fs.readFile(infoPath, 'utf-8');
    const lines = content.split('\n');
    
    // Extract duration (looking for "Duration: XXX seconds")
    const durationLine = lines.find(l => l.includes('Duration:'));
    const duration = durationLine 
      ? parseInt(durationLine.match(/(\d+)\s*seconds/)?.[1] || '0')
      : 0;
    
    // Extract original filename
    const videoLine = lines.find(l => l.includes('**Video:**') && l.includes('.mp4'));
    const originalName = videoLine
      ? videoLine.match(/([^/]+\.mp4)/)?.[1]
      : 'unknown.mp4';
    
    return {
      duration,
      originalName,
      hasTranscript: await fileExists(path.join(lessonPath, 'transcript.txt')),
      hasSlides: await directoryExists(path.join(lessonPath, 'slides')),
      hasLab: await directoryExists(path.join(lessonPath, 'lab'))
    };
  } catch (error) {
    console.warn(`Could not parse lesson info for ${lessonPath}:`, error.message);
    return {
      duration: 0,
      originalName: 'unknown.mp4',
      hasTranscript: false,
      hasSlides: false,
      hasLab: false
    };
  }
}

/**
 * Check if file exists
 */
async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if directory exists
 */
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
async function uploadToStorage(bucket, filePath, file) {
  const fileBuffer = await fs.readFile(file);
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, fileBuffer, {
      contentType: getContentType(file),
      upsert: true
    });
  
  if (error) {
    console.error(`Failed to upload ${filePath} to ${bucket}:`, error);
    return null;
  }
  
  return filePath;
}

/**
 * Get content type from file extension
 */
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.mp4': 'video/mp4'
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Convert slides folder to PDF (placeholder - requires imagemagick or similar)
 */
async function convertSlidesToPdf(slidesPath) {
  // This is a placeholder - you'll need to implement actual conversion
  // Options:
  // 1. Use imagemagick: convert slides/*.jpg slides.pdf
  // 2. Use a Node.js library like pdf-lib or pdfkit
  // 3. Pre-convert manually
  
  console.log(`TODO: Convert slides at ${slidesPath} to PDF`);
  return null;
}

/**
 * Import a single module
 */
async function importModule(moduleName) {
  console.log(`\n📚 Importing ${moduleName}...`);
  
  const moduleConfig = config.moduleMapping[moduleName];
  if (!moduleConfig) {
    throw new Error(`No configuration found for module: ${moduleName}`);
  }
  
  const modulePath = path.join(config.paths.curriculumRoot, moduleName);
  
  // Step 1: Create or get the course
  console.log('Creating course...');
  let course;
  
  const { data: existingCourse } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', moduleConfig.course.slug)
    .single();
  
  if (existingCourse && !config.importOptions.overwriteExisting) {
    console.log('Course already exists, using existing course');
    course = existingCourse;
  } else {
    const { data: newCourse, error: courseError } = await supabase
      .from('courses')
      .upsert(moduleConfig.course, { 
        onConflict: 'slug',
        ignoreDuplicates: false 
      })
      .select()
      .single();
    
    if (courseError) {
      throw new Error(`Failed to create course: ${courseError.message}`);
    }
    
    course = newCourse;
    console.log(`✅ Course created: ${course.id}`);
  }
  
  // Step 2: Process each lesson
  const lessonFolders = Object.keys(moduleConfig.lessons);
  let totalDuration = 0;
  
  for (let i = 0; i < lessonFolders.length; i++) {
    const folderName = lessonFolders[i];
    const lessonConfig = moduleConfig.lessons[folderName];
    const lessonPath = path.join(modulePath, folderName);
    
    console.log(`\n📹 Processing lesson ${i + 1}/${lessonFolders.length}: ${folderName}`);
    
    // Check if lesson directory exists
    if (!await directoryExists(lessonPath)) {
      console.warn(`  ⚠️  Lesson directory not found: ${lessonPath}`);
      continue;
    }
    
    // Parse lesson metadata
    const lessonInfo = await parseLessonInfo(lessonPath);
    totalDuration += lessonInfo.duration;
    
    // Create video record
    console.log('  Creating video record...');
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert({
        course_id: course.id,
        title: lessonConfig.title,
        description: lessonConfig.description,
        video_provider: config.videoProvider.provider,
        provider_asset_id: `pending-upload-${course.id}-${i + 1}`, // Placeholder
        duration_seconds: lessonInfo.duration,
        is_preview: lessonConfig.is_preview || false,
        is_required: lessonConfig.is_required || true,
        order_index: i + 1
      })
      .select()
      .single();
    
    if (videoError) {
      console.error(`  ❌ Failed to create video: ${videoError.message}`);
      continue;
    }
    
    console.log(`  ✅ Video created: ${video.id}`);
    
    // Step 3: Upload and create asset records
    const assets = [];
    
    // Upload transcript
    if (lessonInfo.hasTranscript) {
      console.log('  Uploading transcript...');
      const transcriptPath = `module-${moduleName}/lesson-${i + 1}/transcript.txt`;
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
          description: `Transcript for ${lessonConfig.title}`,
          file_path: uploaded,
          storage_bucket: 'transcripts',
          is_downloadable: true,
          access_level: 'enrolled',
          position: 0
        });
        console.log('  ✅ Transcript uploaded');
      }
    }
    
    // Convert and upload slides
    if (lessonInfo.hasSlides) {
      console.log('  Processing slides...');
      const slidesPath = path.join(lessonPath, 'slides');
      const pdfPath = await convertSlidesToPdf(slidesPath);
      
      if (pdfPath) {
        const slidesStoragePath = `module-${moduleName}/lesson-${i + 1}/slides.pdf`;
        const uploaded = await uploadToStorage('slides', slidesStoragePath, pdfPath);
        
        if (uploaded) {
          assets.push({
            video_id: video.id,
            asset_type: 'slides',
            title: 'Presentation Slides',
            description: `Slides for ${lessonConfig.title}`,
            file_path: uploaded,
            storage_bucket: 'slides',
            is_downloadable: true,
            access_level: 'enrolled',
            position: 1
          });
          console.log('  ✅ Slides uploaded');
        }
      }
    }
    
    // Upload lab materials
    if (lessonInfo.hasLab) {
      console.log('  Processing lab materials...');
      // Look for lab files (PDF, markdown, etc.)
      // This is simplified - you may need more complex logic
      const labPath = path.join(lessonPath, 'lab');
      // Implementation depends on your lab structure
    }
    
    // Insert all assets
    if (assets.length > 0) {
      const { error: assetsError } = await supabase
        .from('content_assets')
        .insert(assets);
      
      if (assetsError) {
        console.error(`  ❌ Failed to create assets: ${assetsError.message}`);
      } else {
        console.log(`  ✅ Created ${assets.length} asset(s)`);
      }
    }
  }
  
  // Update course with total duration
  console.log(`\nUpdating course duration: ${Math.round(totalDuration / 60)} minutes`);
  await supabase
    .from('courses')
    .update({ duration_minutes: Math.round(totalDuration / 60) })
    .eq('id', course.id);
  
  console.log(`\n✅ Module import complete!`);
  console.log(`   Course ID: ${course.id}`);
  console.log(`   Lessons: ${lessonFolders.length}`);
  console.log(`   Total Duration: ${Math.round(totalDuration / 60)} minutes`);
}

/**
 * Main execution
 */
async function main() {
  try {
    const moduleName = process.argv[2];
    
    if (!moduleName) {
      console.log('Usage: node import-curriculum.js [module-name]');
      console.log('\nAvailable modules:');
      Object.keys(config.moduleMapping).forEach(m => {
        console.log(`  - ${m}`);
      });
      process.exit(1);
    }
    
    console.log('🚀 Starting Curriculum Import');
    console.log('================================');
    console.log(`Supabase URL: ${config.supabase.url}`);
    console.log(`Video Provider: ${config.videoProvider.provider}`);
    console.log(`Dry Run: ${config.importOptions.dryRun}`);
    
    await importModule(moduleName);
    
    console.log('\n✨ Import completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { importModule, parseLessonInfo };