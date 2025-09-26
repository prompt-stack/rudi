#!/bin/bash

# For now, let's use the test video ID we already have uploaded
# and focus on setting up the Supabase content assets system

echo "Using existing test video for all Module 01 content"
echo "Video ID: 68a81cf087f84826931f12e58b94027d"
echo ""
echo "To upload large videos to Cloudflare Stream:"
echo "1. Go to https://dash.cloudflare.com/de8f377bc5bf1f2a41887f15db62c02e/stream/videos"
echo "2. Click 'Upload video'"
echo "3. Drag and drop your video files"
echo "4. Copy the video IDs after upload completes"
echo ""
echo "Large files (>100MB) must be uploaded via:"
echo "- Cloudflare Dashboard (recommended)"
echo "- TUS resumable upload protocol"
echo "- Stream URL import (if videos are hosted elsewhere)"