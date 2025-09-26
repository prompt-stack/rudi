const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env.production' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const curriculumRoot = '/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized';

async function uploadTranscripts() {
  console.log('Uploading transcripts...\n');
  
  // Get the videos we just created
  const { data: videos, error } = await supabase
    .from('videos')
    .select('id, title, order_index, course_id')
    .eq('course_id', 'f5cede64-2d18-4bdc-90e3-5c9215272c78')
    .order('order_index');
  
  if (error) {
    console.error('Failed to fetch videos:', error);
    return;
  }
  
  const lessons = [
    '01_Introduction_to_AI',
    '02_Foundations_of_AI', 
    '04_Large_Language_Models',
    '05_LLM_Limitations'
  ];
  
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const lessonFolder = lessons[i];
    
    if (!lessonFolder) continue;
    
    const transcriptPath = path.join(
      curriculumRoot,
      'Module_01_AI_Foundations',
      lessonFolder,
      'transcript.txt'
    );
    
    try {
      // Check if transcript exists
      await fs.access(transcriptPath);
      
      // Read transcript
      const transcriptContent = await fs.readFile(transcriptPath);
      
      // Upload to storage
      const storagePath = `courses/${video.course_id}/lessons/${video.id}/transcript.txt`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('transcripts')
        .upload(storagePath, transcriptContent, {
          contentType: 'text/plain',
          upsert: true
        });
      
      if (uploadError) {
        console.error(`Failed to upload transcript for ${video.title}:`, uploadError.message);
        continue;
      }
      
      // Create content_asset record
      const { error: assetError } = await supabase
        .from('content_assets')
        .upsert({
          video_id: video.id,
          asset_type: 'transcript',
          title: 'Lesson Transcript',
          description: `Transcript for ${video.title}`,
          file_path: storagePath,
          storage_bucket: 'transcripts',
          is_downloadable: true,
          access_level: 'enrolled',
          position: 0
        }, {
          onConflict: 'video_id,asset_type'
        });
      
      if (assetError) {
        console.error(`Failed to create asset record:`, assetError.message);
      } else {
        console.log(`✅ Uploaded transcript for: ${video.title}`);
      }
      
    } catch (err) {
      console.log(`⚠️  No transcript found for: ${video.title}`);
    }
  }
  
  console.log('\nDone!');
}

uploadTranscripts();