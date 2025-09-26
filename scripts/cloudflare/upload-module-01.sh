#!/bin/bash

# Cloudflare Stream API configuration (read from env)
# Required: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_AUTH_EMAIL, CLOUDFLARE_AUTH_KEY
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:?CLOUDFLARE_ACCOUNT_ID not set}"
AUTH_EMAIL="${CLOUDFLARE_AUTH_EMAIL:?CLOUDFLARE_AUTH_EMAIL not set}"
AUTH_KEY="${CLOUDFLARE_AUTH_KEY:?CLOUDFLARE_AUTH_KEY not set}"

# Base path for Module 01 (override via MODULE_01_BASE_PATH)
BASE_PATH="${MODULE_01_BASE_PATH:-/path/to/Module_01_AI_Foundations}"

# Array of videos with metadata
declare -a VIDEOS=(
  "01_Introduction_to_AI|video.mp4|Introduction to AI|Learn the fundamentals of artificial intelligence|343"
  "01_Introduction_to_AI/lab/Lesson_02_Foundations|video.mp4|Lab: AI Foundations|Hands-on exploration of AI foundations|240"
  "02_Foundations_of_AI|video.mp4|Demystifying AI|Understanding how AI really works|304"
  "02_Foundations_of_AI/Lab_Lesson_03_Traditional_AI|video.mp4|Lab: Traditional AI|Exploring rule-based and expert systems|180"
  "04_Large_Language_Models|video.mp4|Large Language Models|Deep dive into LLMs and transformers|420"
  "04_Large_Language_Models/Lab_Lesson_04_Recap|video.mp4|Lab: LLM Recap|Review and practice with LLMs|150"
  "04_Large_Language_Models/Lab_Lesson_05_LLM|video.mp4|Lab: Working with LLMs|Hands-on LLM implementation|300"
  "05_LLM_Limitations|video.mp4|LLM Limitations|Understanding constraints and challenges|360"
  "05_LLM_Limitations/Lab_Lesson_06_LLM_Limitations|video.mp4|Lab: Testing LLM Limits|Exploring edge cases and failures|240"
  "06_Responsible_AI|video.mp4|Responsible AI|Ethics, safety, and best practices|480"
)

echo "=========================================="
echo "Uploading Module 01: AI Foundations"
echo "=========================================="

# Create results file
RESULTS_FILE="module-01-videos.json"
echo "{" > $RESULTS_FILE
echo "  \"module\": \"AI Foundations\"," >> $RESULTS_FILE
echo "  \"module_id\": \"module_01_ai_foundations\"," >> $RESULTS_FILE
echo "  \"videos\": [" >> $RESULTS_FILE

FIRST=true
for VIDEO_INFO in "${VIDEOS[@]}"; do
  IFS='|' read -r FOLDER FILE TITLE DESCRIPTION DURATION <<< "$VIDEO_INFO"
  VIDEO_PATH="$BASE_PATH/$FOLDER/$FILE"
  
  # Check if file exists
  if [ ! -f "$VIDEO_PATH" ]; then
    echo "✗ File not found: $VIDEO_PATH"
    continue
  fi
  
  # Get file size
  FILE_SIZE=$(wc -c < "$VIDEO_PATH" | tr -d ' ')
  
  echo ""
  echo "Uploading: $TITLE"
  echo "File: $VIDEO_PATH"
  echo "Size: $(( FILE_SIZE / 1024 / 1024 )) MB"
  
  # Step 1: Initialize upload with TUS
  INIT_RESPONSE=$(curl -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream?direct_user=true" \
    -H "X-Auth-Email: $AUTH_EMAIL" \
    -H "X-Auth-Key: $AUTH_KEY" \
    -H "Tus-Resumable: 1.0.0" \
    -H "Upload-Length: $FILE_SIZE" \
    -H "Upload-Metadata: name $(echo -n "$TITLE" | base64),requiresignedurls $(echo -n "false" | base64)" \
    2>/dev/null)
  
  # Extract Location header from response
  LOCATION=$(echo "$INIT_RESPONSE" | grep -o '"location":"[^"]*' | cut -d'"' -f4)
  
  if [ -z "$LOCATION" ]; then
    # Try alternate approach with direct upload
    echo "TUS init failed, trying direct upload..."
    
    UPLOAD_RESPONSE=$(curl -X POST \
      "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream" \
      -H "X-Auth-Email: $AUTH_EMAIL" \
      -H "X-Auth-Key: $AUTH_KEY" \
      -F "file=@$VIDEO_PATH" \
      -F "meta={\"name\":\"$TITLE\"}" \
      -F "requireSignedURLs=false" \
      2>/dev/null)
    
    VIDEO_ID=$(echo "$UPLOAD_RESPONSE" | grep -o '"uid":"[^"]*' | cut -d'"' -f4)
  else
    # Step 2: Upload the file content
    echo "Uploading content to: $LOCATION"
    
    UPLOAD_RESPONSE=$(curl -X PATCH "$LOCATION" \
      -H "Tus-Resumable: 1.0.0" \
      -H "Upload-Offset: 0" \
      -H "Content-Type: application/offset+octet-stream" \
      -H "X-Auth-Email: $AUTH_EMAIL" \
      -H "X-Auth-Key: $AUTH_KEY" \
      --data-binary "@$VIDEO_PATH" \
      2>/dev/null)
    
    # Extract video ID from location
    VIDEO_ID=$(echo "$LOCATION" | grep -o '[a-f0-9]\{32\}')
  fi
  
  if [ ! -z "$VIDEO_ID" ]; then
    echo "✓ Success! Video ID: $VIDEO_ID"
    
    # Add to results file
    if [ "$FIRST" = false ]; then
      echo "," >> $RESULTS_FILE
    fi
    FIRST=false
    
    # Clean folder path for ID
    LESSON_ID=$(echo "$FOLDER" | tr '/' '_' | tr ' ' '_' | tr '-' '_' | tr '[:upper:]' '[:lower:]')
    
    echo "    {" >> $RESULTS_FILE
    echo "      \"lesson_id\": \"$LESSON_ID\"," >> $RESULTS_FILE
    echo "      \"title\": \"$TITLE\"," >> $RESULTS_FILE
    echo "      \"description\": \"$DESCRIPTION\"," >> $RESULTS_FILE
    echo "      \"duration_seconds\": $DURATION," >> $RESULTS_FILE
    echo "      \"cloudflare_id\": \"$VIDEO_ID\"," >> $RESULTS_FILE
    echo "      \"file_path\": \"$FOLDER/$FILE\"" >> $RESULTS_FILE
    echo -n "    }" >> $RESULTS_FILE
  else
    echo "✗ Failed to upload"
    echo "Response: $UPLOAD_RESPONSE"
  fi
done

echo "" >> $RESULTS_FILE
echo "  ]" >> $RESULTS_FILE
echo "}" >> $RESULTS_FILE

echo ""
echo "=========================================="
echo "Upload complete! Results saved to $RESULTS_FILE"
echo ""
echo "Next steps:"
echo "1. Review $RESULTS_FILE"
echo "2. Run: npm run supabase:seed-module-01"
echo "=========================================="
