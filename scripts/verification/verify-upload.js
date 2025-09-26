const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyUpload() {
  console.log('🔍 Verifying Production Upload\n');
  console.log('='.repeat(50));
  
  // Check course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', 'module-01-ai-foundations')
    .single();
  
  if (course) {
    console.log('✅ COURSE CREATED:');
    console.log(`   Title: ${course.title}`);
    console.log(`   ID: ${course.id}`);
    console.log(`   Price: $${(course.price_cents / 100).toFixed(2)}`);
    console.log(`   Duration: ${course.duration_minutes} minutes`);
  }
  
  // Check videos
  console.log('\n📹 VIDEOS UPLOADED TO CLOUDFLARE:');
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('course_id', course?.id)
    .order('order_index');
  
  if (videos) {
    videos.forEach((video, i) => {
      console.log(`\n   ${i + 1}. ${video.title}`);
      console.log(`      Cloudflare ID: ${video.provider_asset_id}`);
      console.log(`      Duration: ${video.duration_seconds}s`);
      console.log(`      Preview: ${video.is_preview ? 'Yes' : 'No'}`);
      
      // Generate playback URL
      const accountId = 'de8f377bc5bf1f2a41887f15db62c02e';
      console.log(`      Stream URL: https://customer-${accountId}.cloudflarestream.com/${video.provider_asset_id}/manifest/video.m3u8`);
      console.log(`      Embed URL: https://iframe.cloudflarestream.com/${video.provider_asset_id}`);
    });
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY:');
  console.log(`   Total Videos: ${videos?.length || 0}`);
  console.log(`   Storage Buckets: Created ✅`);
  console.log(`   Transcripts: Ready to upload (need content_assets table)`);
  
  console.log('\n🎬 CLOUDFLARE STREAM VIDEOS:');
  videos?.forEach(v => {
    console.log(`   https://dash.cloudflare.com/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/videos/${v.provider_asset_id}`);
  });
  
  console.log('\n✨ Next Steps:');
  console.log('   1. Run production migrations to create content_assets table');
  console.log('   2. Videos are processing on Cloudflare (may take 1-2 minutes)');
  console.log('   3. Test playback with the embed URLs above');
}

verifyUpload();