#!/usr/bin/env node

/**
 * Updates the Supabase seed file with actual Cloudflare video IDs
 * Run this after uploading videos to Cloudflare
 */

const fs = require('fs');
const path = require('path');

// Read the upload results
const resultsPath = path.join(__dirname, 'module-01-videos.json');
const seedPath = path.join(__dirname, '..', 'supabase', 'seeds', 'module-01-ai-foundations.sql');

if (!fs.existsSync(resultsPath)) {
  console.error('❌ No upload results found. Run upload-module-01.sh first.');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
let seedContent = fs.readFileSync(seedPath, 'utf8');

console.log('📝 Updating Cloudflare IDs in seed file...\n');

// Map lesson IDs to video IDs in the seed file
const idMappings = {
  '01_introduction_to_ai': 'ai-intro-001',
  '01_introduction_to_ai_lab_lesson_02_foundations': 'ai-intro-002-lab',
  '02_foundations_of_ai': 'ai-foundations-001',
  '02_foundations_of_ai_lab_lesson_03_traditional_ai': 'ai-foundations-002-lab',
  '04_large_language_models': 'llm-001',
  '04_large_language_models_lab_lesson_04_recap': 'llm-002-lab',
  '04_large_language_models_lab_lesson_05_llm': 'llm-003-lab',
  '05_llm_limitations': 'llm-limits-001',
  '05_llm_limitations_lab_lesson_06_llm_limitations': 'llm-limits-002-lab',
  '06_responsible_ai': 'responsible-ai-001'
};

let updatedCount = 0;

results.videos.forEach(video => {
  const seedVideoId = idMappings[video.lesson_id];
  
  if (seedVideoId) {
    // Find the line with this video ID and update the provider_asset_id
    const pattern = new RegExp(
      `(id[\\s\\S]*?'${seedVideoId}'[\\s\\S]*?provider_asset_id,[\\s\\S]*?)'68a81cf087f84826931f12e58b94027d'`,
      'g'
    );
    
    const beforeLength = seedContent.length;
    seedContent = seedContent.replace(pattern, `$1'${video.cloudflare_id}'`);
    
    if (seedContent.length !== beforeLength) {
      console.log(`✅ Updated ${seedVideoId} -> ${video.cloudflare_id}`);
      updatedCount++;
    }
    
    // Also update thumbnail URLs
    const thumbnailPattern = new RegExp(
      `(id[\\s\\S]*?'${seedVideoId}'[\\s\\S]*?thumbnail_url,[\\s\\S]*?)68a81cf087f84826931f12e58b94027d`,
      'g'
    );
    seedContent = seedContent.replace(thumbnailPattern, `$1${video.cloudflare_id}`);
  }
});

// Write the updated content back
fs.writeFileSync(seedPath, seedContent);

console.log(`\n✨ Updated ${updatedCount} video IDs in seed file`);
console.log('📦 Next step: Run the seed file in Supabase');
console.log('   npx supabase db reset');
console.log('   OR');
console.log('   psql $DATABASE_URL < supabase/seeds/module-01-ai-foundations.sql');