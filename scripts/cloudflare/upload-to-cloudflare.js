#!/usr/bin/env node

/**
 * Cloudflare Stream Upload Script
 * Uploads video files to Cloudflare Stream and returns the video ID
 * 
 * Prerequisites:
 * 1. Cloudflare account with Stream enabled
 * 2. API token with Stream:Edit permissions
 * 
 * Usage: node upload-to-cloudflare.js <video-file-path>
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const tus = require('tus-js-client');

/**
 * Upload video to Cloudflare Stream using TUS protocol
 */
async function uploadVideoToCloudflare(videoPath, config) {
  const fileSize = fs.statSync(videoPath).size;
  const fileName = path.basename(videoPath);
  
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(fs.createReadStream(videoPath), {
      endpoint: 'https://api.cloudflare.com/client/v4/accounts/' + config.accountId + '/stream',
      headers: {
        'Authorization': 'Bearer ' + config.apiToken,
      },
      chunkSize: 50 * 1024 * 1024, // 50MB chunks
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        name: fileName,
        requiresignedurls: 'false',
        allowedorigins: '*', // Configure this for production
        thumbnailTimestampPct: '0.5',
      },
      uploadSize: fileSize,
      onError: function(error) {
        console.error('Upload failed:', error);
        reject(error);
      },
      onProgress: function(bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        process.stdout.write(`\rUploading: ${percentage}% (${bytesUploaded}/${bytesTotal} bytes)`);
      },
      onSuccess: function() {
        // Extract video ID from the upload URL
        const videoId = upload.url.split('/').pop();
        console.log('\n✅ Upload complete!');
        console.log('Video ID:', videoId);
        resolve({
          videoId,
          playbackUrl: `https://customer-${config.accountId}.cloudflarestream.com/${videoId}/manifest/video.m3u8`,
          thumbnailUrl: `https://customer-${config.accountId}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`,
          embedUrl: `https://customer-${config.accountId}.cloudflarestream.com/${videoId}/iframe`
        });
      }
    });
    
    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length) {
        console.log('Resuming previous upload...');
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  });
}

/**
 * Alternative: Direct API upload (for smaller files < 200MB)
 */
async function uploadVideoDirectAPI(videoPath, config) {
  const formData = require('form-data');
  const form = new formData();
  
  form.append('file', fs.createReadStream(videoPath));
  form.append('meta', JSON.stringify({
    name: path.basename(videoPath)
  }));
  
  const options = {
    method: 'POST',
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${config.accountId}/stream`,
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      ...form.getHeaders()
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success) {
          resolve({
            videoId: response.result.uid,
            playbackUrl: response.result.playback.hls,
            thumbnailUrl: response.result.thumbnail,
            status: response.result.status
          });
        } else {
          reject(new Error(response.errors?.[0]?.message || 'Upload failed'));
        }
      });
    });
    
    req.on('error', reject);
    form.pipe(req);
  });
}

/**
 * Get upload URL from Cloudflare (for TUS uploads)
 */
async function getUploadUrl(config) {
  const options = {
    method: 'POST',
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${config.accountId}/stream?direct_user=true`,
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json'
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success) {
          resolve(response.result.uploadURL);
        } else {
          reject(new Error(response.errors?.[0]?.message || 'Failed to get upload URL'));
        }
      });
    });
    
    req.on('error', reject);
    req.write(JSON.stringify({
      maxDurationSeconds: 21600, // 6 hours max
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      requireSignedURLs: false,
      allowedOrigins: ['*'],
      thumbnailTimestampPct: 0.5,
      watermark: null
    }));
    req.end();
  });
}

/**
 * Main function
 */
async function main() {
  const videoPath = process.argv[2];
  
  if (!videoPath) {
    console.log('Usage: node upload-to-cloudflare.js <video-file-path>');
    process.exit(1);
  }
  
  if (!fs.existsSync(videoPath)) {
    console.error('Error: Video file not found:', videoPath);
    process.exit(1);
  }
  
  // Load config
  const config = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: process.env.CLOUDFLARE_STREAM_API_TOKEN
  };
  
  if (!config.accountId || !config.apiToken) {
    console.error('Error: Missing Cloudflare credentials');
    console.error('Please set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_STREAM_API_TOKEN environment variables');
    process.exit(1);
  }
  
  const fileSize = fs.statSync(videoPath).size;
  const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
  
  console.log('📹 Uploading video to Cloudflare Stream');
  console.log('File:', videoPath);
  console.log('Size:', fileSizeMB, 'MB');
  console.log('');
  
  try {
    let result;
    
    if (fileSize < 200 * 1024 * 1024) {
      // Use direct API for files < 200MB
      console.log('Using direct API upload...');
      result = await uploadVideoDirectAPI(videoPath, config);
    } else {
      // Use TUS for larger files
      console.log('Using TUS resumable upload...');
      result = await uploadVideoToCloudflare(videoPath, config);
    }
    
    console.log('\n✅ Upload successful!');
    console.log('Video ID:', result.videoId);
    console.log('Playback URL:', result.playbackUrl);
    console.log('Thumbnail URL:', result.thumbnailUrl);
    
    return result;
  } catch (error) {
    console.error('\n❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Export for use in other scripts
module.exports = { uploadVideoToCloudflare, uploadVideoDirectAPI };

// Run if called directly
if (require.main === module) {
  main();
}