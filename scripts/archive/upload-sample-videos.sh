#!/bin/bash

# Cloudflare Stream API configuration
ACCOUNT_ID="de8f377bc5bf1f2a41887f15db62c02e"
AUTH_EMAIL="brett@gobzhoff.com"
AUTH_KEY="b7c31bb029c5c6b3ab017c93e826e019dd1e6"

# Sample video URLs (using public domain or creative commons videos)
declare -A VIDEOS=(
  ["AI Ethics Overview"]="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
  ["Machine Learning Basics"]="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
  ["Neural Networks Explained"]="https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4"
  ["Deep Learning Fundamentals"]="https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4"
  ["Computer Vision Introduction"]="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
)

echo "Uploading sample videos to Cloudflare Stream..."
echo "==========================================="

# Create results file
RESULTS_FILE="cloudflare-videos.json"
echo "[" > $RESULTS_FILE

FIRST=true
for TITLE in "${!VIDEOS[@]}"; do
  URL="${VIDEOS[$TITLE]}"
  echo ""
  echo "Uploading: $TITLE"
  echo "From URL: $URL"
  
  # Upload via URL
  RESPONSE=$(curl -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/copy" \
    -H "X-Auth-Email: $AUTH_EMAIL" \
    -H "X-Auth-Key: $AUTH_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"url\": \"$URL\",
      \"meta\": {
        \"name\": \"$TITLE\"
      },
      \"requireSignedURLs\": false,
      \"allowedOrigins\": [\"*\"]
    }" 2>/dev/null)
  
  # Extract video ID
  VIDEO_ID=$(echo $RESPONSE | grep -o '"uid":"[^"]*' | cut -d'"' -f4)
  
  if [ ! -z "$VIDEO_ID" ]; then
    echo "✓ Success! Video ID: $VIDEO_ID"
    
    # Add to results file
    if [ "$FIRST" = false ]; then
      echo "," >> $RESULTS_FILE
    fi
    FIRST=false
    
    echo "  {" >> $RESULTS_FILE
    echo "    \"title\": \"$TITLE\"," >> $RESULTS_FILE
    echo "    \"id\": \"$VIDEO_ID\"," >> $RESULTS_FILE
    echo "    \"url\": \"$URL\"" >> $RESULTS_FILE
    echo -n "  }" >> $RESULTS_FILE
  else
    echo "✗ Failed to upload"
    echo "Response: $RESPONSE"
  fi
done

echo "" >> $RESULTS_FILE
echo "]" >> $RESULTS_FILE

echo ""
echo "==========================================="
echo "Upload complete! Results saved to $RESULTS_FILE"
echo ""
echo "Video IDs for use in playground:"
cat $RESULTS_FILE | grep '"id"' | cut -d'"' -f4