#!/usr/bin/env node

/**
 * Uploads course assets (transcripts, slides, PDFs) to Supabase Storage
 * and creates corresponding records in content_assets table
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Module 01 path
const MODULE_PATH = '/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized/Module_01_AI_Foundations';

// Video ID mappings (same as in seed file)
const videoMappings = {
  '01_Introduction_to_AI': 'ai-intro-001',
  '01_Introduction_to_AI/lab/Lesson_02_Foundations': 'ai-intro-002-lab',
  '02_Foundations_of_AI': 'ai-foundations-001',
  '02_Foundations_of_AI/Lab_Lesson_03_Traditional_AI': 'ai-foundations-002-lab',
  '04_Large_Language_Models': 'llm-001',
  '04_Large_Language_Models/Lab_Lesson_04_Recap': 'llm-002-lab',
  '04_Large_Language_Models/Lab_Lesson_05_LLM': 'llm-003-lab',
  '05_LLM_Limitations': 'llm-limits-001',
  '05_LLM_Limitations/Lab_Lesson_06_LLM_Limitations': 'llm-limits-002-lab',
  '06_Responsible_AI': 'responsible-ai-001'
};

async function uploadAsset(bucket, filePath, storagePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileContent, {
        contentType: getContentType(filePath),
        upsert: true
      });

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  return contentTypes[ext] || 'application/octet-stream';
}

async function createAssetRecord(videoId, assetType, title, description, filePath, bucket, fileSize) {
  try {
    const { data, error } = await supabase
      .from('content_assets')
      .insert({
        video_id: videoId,
        asset_type: assetType,
        title,
        description,
        file_path: filePath,
        storage_bucket: bucket,
        file_size_bytes: fileSize,
        mime_type: getContentType(filePath),
        access_level: assetType === 'transcript' ? 'preview' : 'enrolled'
      })
      .select()
      .single();

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Failed to create asset record:`, error.message);
    return null;
  }
}

async function processLesson(lessonPath, videoId) {
  console.log(`\n📁 Processing: ${path.basename(lessonPath)}`);
  
  const assets = [];
  
  // Check for transcript
  const transcriptPath = path.join(lessonPath, 'transcript.txt');
  if (fs.existsSync(transcriptPath)) {
    console.log('  📝 Uploading transcript...');
    const storagePath = `videos/${videoId}/transcript.txt`;
    const upload = await uploadAsset('transcripts', transcriptPath, storagePath);
    
    if (upload) {
      const fileSize = fs.statSync(transcriptPath).size;
      const record = await createAssetRecord(
        videoId,
        'transcript',
        'Video Transcript',
        'Full transcript with timestamps',
        storagePath,
        'transcripts',
        fileSize
      );
      if (record) {
        console.log('    ✅ Transcript uploaded');
        assets.push(record);
      }
    }
  }
  
  // Check for slides
  const slidesDir = path.join(lessonPath, 'slides');
  if (fs.existsSync(slidesDir)) {
    const slideFiles = fs.readdirSync(slidesDir).filter(f => f.endsWith('.png'));
    
    if (slideFiles.length > 0) {
      console.log(`  🖼️  Uploading ${slideFiles.length} slides...`);
      
      for (let i = 0; i < Math.min(slideFiles.length, 5); i++) { // Upload first 5 slides as samples
        const slideFile = slideFiles[i];
        const slidePath = path.join(slidesDir, slideFile);
        const storagePath = `videos/${videoId}/slides/${slideFile}`;
        
        const upload = await uploadAsset('slides', slidePath, storagePath);
        
        if (upload && i === 0) { // Only create record for first slide as representative
          const fileSize = fs.statSync(slidePath).size;
          const record = await createAssetRecord(
            videoId,
            'slides',
            'Lecture Slides',
            `Slide deck with ${slideFiles.length} slides`,
            `videos/${videoId}/slides/`,
            'slides',
            fileSize * slideFiles.length // Approximate total size
          );
          if (record) {
            console.log(`    ✅ ${slideFiles.length} slides uploaded`);
            assets.push(record);
          }
        }
      }
    }
  }
  
  // Check for lab instructions
  const labInstructionsPath = path.join(lessonPath, 'LAB_INSTRUCTIONS.md');
  if (fs.existsSync(labInstructionsPath)) {
    console.log('  🔬 Uploading lab instructions...');
    const storagePath = `videos/${videoId}/lab-instructions.md`;
    const upload = await uploadAsset('course-materials', labInstructionsPath, storagePath);
    
    if (upload) {
      const fileSize = fs.statSync(labInstructionsPath).size;
      const record = await createAssetRecord(
        videoId,
        'lab_instructions',
        'Lab Instructions',
        'Step-by-step guide for hands-on exercises',
        storagePath,
        'course-materials',
        fileSize
      );
      if (record) {
        console.log('    ✅ Lab instructions uploaded');
        assets.push(record);
      }
    }
  }
  
  // Check for lesson info
  const lessonInfoPath = path.join(lessonPath, 'lesson_info.md');
  if (fs.existsSync(lessonInfoPath)) {
    console.log('  📋 Uploading lesson info...');
    const storagePath = `videos/${videoId}/lesson-info.md`;
    const upload = await uploadAsset('course-materials', lessonInfoPath, storagePath);
    
    if (upload) {
      const fileSize = fs.statSync(lessonInfoPath).size;
      const record = await createAssetRecord(
        videoId,
        'reading',
        'Lesson Overview',
        'Lesson objectives and key concepts',
        storagePath,
        'course-materials',
        fileSize
      );
      if (record) {
        console.log('    ✅ Lesson info uploaded');
        assets.push(record);
      }
    }
  }
  
  return assets;
}

async function main() {
  console.log('🚀 Starting asset upload for Module 01: AI Foundations\n');
  
  let totalAssets = 0;
  
  // Process each lesson
  for (const [lessonPath, videoId] of Object.entries(videoMappings)) {
    const fullPath = path.join(MODULE_PATH, lessonPath);
    
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      const assets = await processLesson(fullPath, videoId);
      totalAssets += assets.length;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Upload complete! ${totalAssets} assets uploaded`);
  console.log('='.repeat(50));
  
  // Get public URLs for testing
  console.log('\n📌 Sample asset URLs:');
  
  const { data: sampleAssets } = await supabase
    .from('content_assets')
    .select('*')
    .limit(3);
  
  if (sampleAssets) {
    sampleAssets.forEach(asset => {
      const url = `${supabaseUrl}/storage/v1/object/public/${asset.storage_bucket}/${asset.file_path}`;
      console.log(`  - ${asset.title}: ${url}`);
    });
  }
}

// Run the script
main().catch(console.error);