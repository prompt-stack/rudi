#!/usr/bin/env ts-node

/**
 * Video Compression Tool - Grammar Ops
 * 
 * Standalone video compression using ffmpeg
 * Optimized for educational content
 * 
 * Usage:
 *   npm run compress <input.mp4> [output.mp4]
 *   npm run compress:all <directory>
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

interface CompressionOptions {
  crf?: number;        // Quality (18-28, lower = better)
  maxWidth?: number;   // Max width in pixels
  maxHeight?: number;  // Max height in pixels
  audioBitrate?: string; // Audio bitrate (e.g., '128k')
  preset?: string;     // Speed preset (ultrafast, fast, medium, slow)
}

const DEFAULT_OPTIONS: CompressionOptions = {
  crf: 28,            // Good balance
  maxWidth: 1920,     // 1080p max
  maxHeight: 1080,
  audioBitrate: '128k',
  preset: 'fast'
};

/**
 * Compress a single video file
 */
async function compressVideo(
  inputPath: string, 
  outputPath?: string,
  options: CompressionOptions = {}
): Promise<void> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Default output path
  if (!outputPath) {
    const dir = path.dirname(inputPath);
    const name = path.basename(inputPath, '.mp4');
    outputPath = path.join(dir, `${name}_compressed.mp4`);
  }
  
  // Check input exists
  const inputStats = await fs.stat(inputPath);
  const inputMB = (inputStats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`\n📹 Compressing: ${path.basename(inputPath)}`);
  console.log(`   Input size: ${inputMB}MB`);
  console.log(`   Settings: CRF=${opts.crf}, Max=${opts.maxWidth}x${opts.maxHeight}, Preset=${opts.preset}`);
  
  // Build ffmpeg command
  const scaleFilter = `scale='min(${opts.maxWidth},iw)':'min(${opts.maxHeight},ih)':force_original_aspect_ratio=decrease`;
  
  const command = [
    `ffmpeg -i "${inputPath}"`,
    `-c:v libx264`,                    // Video codec
    `-crf ${opts.crf}`,                // Quality
    `-preset ${opts.preset}`,          // Speed
    `-vf "${scaleFilter}"`,            // Scale filter
    `-c:a aac`,                        // Audio codec
    `-b:a ${opts.audioBitrate}`,      // Audio bitrate
    `-movflags +faststart`,            // Web optimization
    `"${outputPath}"`,
    `-y`                               // Overwrite
  ].join(' ');
  
  // Run compression
  console.log('   Compressing...');
  const startTime = Date.now();
  
  try {
    await execAsync(command);
    
    // Check output
    const outputStats = await fs.stat(outputPath);
    const outputMB = (outputStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log(`   ✅ Output size: ${outputMB}MB (${reduction}% reduction)`);
    console.log(`   ✅ Completed in ${duration}s`);
    console.log(`   ✅ Saved to: ${outputPath}`);
    
  } catch (error: any) {
    console.error(`   ❌ Compression failed: ${error.message}`);
    throw error;
  }
}

/**
 * Compress all videos in a directory
 */
async function compressDirectory(dirPath: string, options: CompressionOptions = {}): Promise<void> {
  console.log(`\n🎬 Compressing all videos in: ${dirPath}\n`);
  
  // Find all MP4 files
  const files = await fs.readdir(dirPath);
  const videos = files.filter(f => f.endsWith('.mp4') && !f.includes('_compressed'));
  
  if (videos.length === 0) {
    console.log('No videos found to compress.');
    return;
  }
  
  console.log(`Found ${videos.length} videos to compress`);
  
  let successful = 0;
  let failed = 0;
  let totalOriginal = 0;
  let totalCompressed = 0;
  
  for (const video of videos) {
    const inputPath = path.join(dirPath, video);
    
    try {
      const inputStats = await fs.stat(inputPath);
      totalOriginal += inputStats.size;
      
      await compressVideo(inputPath, undefined, options);
      
      const outputPath = inputPath.replace('.mp4', '_compressed.mp4');
      const outputStats = await fs.stat(outputPath);
      totalCompressed += outputStats.size;
      
      successful++;
    } catch (error) {
      failed++;
    }
  }
  
  // Summary
  console.log('\n=== Compression Summary ===');
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (successful > 0) {
    const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
    const originalGB = (totalOriginal / (1024 * 1024 * 1024)).toFixed(2);
    const compressedGB = (totalCompressed / (1024 * 1024 * 1024)).toFixed(2);
    
    console.log(`\n📊 Total size:`);
    console.log(`   Original: ${originalGB}GB`);
    console.log(`   Compressed: ${compressedGB}GB`);
    console.log(`   Reduction: ${totalReduction}%`);
  }
}

/**
 * Check if ffmpeg is installed
 */
async function checkFFmpeg(): Promise<boolean> {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch {
    return false;
  }
}

/**
 * Main CLI
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Video Compression Tool - Grammar Ops');
    console.log('\nUsage:');
    console.log('  Compress single video:');
    console.log('    npx ts-node compress-video.ts <input.mp4> [output.mp4]');
    console.log('');
    console.log('  Compress all videos in directory:');
    console.log('    npx ts-node compress-video.ts --dir <directory>');
    console.log('');
    console.log('Options:');
    console.log('  --crf <18-28>    Quality (lower = better, default: 28)');
    console.log('  --preset <speed> Speed (ultrafast/fast/medium/slow, default: fast)');
    console.log('  --max <width>    Max resolution (default: 1920)');
    console.log('');
    console.log('Examples:');
    console.log('  npx ts-node compress-video.ts video.mp4');
    console.log('  npx ts-node compress-video.ts video.mp4 small.mp4 --crf 24');
    console.log('  npx ts-node compress-video.ts --dir ./videos --crf 26');
    return;
  }
  
  // Check ffmpeg
  if (!await checkFFmpeg()) {
    console.error('❌ ffmpeg not found. Install with: brew install ffmpeg');
    process.exit(1);
  }
  
  // Parse options
  const options: CompressionOptions = {};
  
  const crfIndex = args.indexOf('--crf');
  if (crfIndex !== -1 && args[crfIndex + 1]) {
    options.crf = parseInt(args[crfIndex + 1]);
  }
  
  const presetIndex = args.indexOf('--preset');
  if (presetIndex !== -1 && args[presetIndex + 1]) {
    options.preset = args[presetIndex + 1];
  }
  
  const maxIndex = args.indexOf('--max');
  if (maxIndex !== -1 && args[maxIndex + 1]) {
    options.maxWidth = parseInt(args[maxIndex + 1]);
    options.maxHeight = parseInt(args[maxIndex + 1]);
  }
  
  // Directory mode
  if (args[0] === '--dir' && args[1]) {
    await compressDirectory(args[1], options);
  } 
  // Single file mode
  else if (args[0] && !args[0].startsWith('--')) {
    const input = args[0];
    const output = args[1] && !args[1].startsWith('--') ? args[1] : undefined;
    await compressVideo(input, output, options);
  }
  else {
    console.error('❌ Invalid arguments. Run without arguments for help.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}