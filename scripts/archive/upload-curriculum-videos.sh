#!/bin/bash

# Cloudflare Stream API configuration
ACCOUNT_ID="de8f377bc5bf1f2a41887f15db62c02e"
AUTH_EMAIL="brett@gobzhoff.com"
AUTH_KEY="b7c31bb029c5c6b3ab017c93e826e019dd1e6"

# Base path for curriculum
BASE_PATH="/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized"

# Select key videos to upload (one from each major module)
declare -A VIDEOS=(
  ["Module 1: Introduction to AI"]="$BASE_PATH/Module_01_AI_Foundations/01_Introduction_to_AI/video.mp4"
  ["Module 1: Foundations of AI"]="$BASE_PATH/Module_01_AI_Foundations/02_Foundations_of_AI/video.mp4"
  ["Module 1: Large Language Models"]="$BASE_PATH/Module_01_AI_Foundations/04_Large_Language_Models/video.mp4"
  ["Module 1: LLM Limitations"]="$BASE_PATH/Module_01_AI_Foundations/05_LLM_Limitations/video.mp4"
  ["Module 1: Responsible AI"]="$BASE_PATH/Module_01_AI_Foundations/06_Responsible_AI/video.mp4"
  ["Module 2: Intro to Prompting"]="$BASE_PATH/Module_02_Prompting_Mastery/02_Prompt_Engineering/An Intro to Prompting.mp4"
  ["Module 2: Advanced Techniques"]="$BASE_PATH/Module_02_Prompting_Mastery/03_Advanced_Techniques/video.mp4"
  ["Module 3: Abstraction"]="$BASE_PATH/Module_03_CS_Fundamentals/01_Abstraction/video.mp4"
  ["Module 3: Data Structures"]="$BASE_PATH/Module_03_CS_Fundamentals/02_Data_Structures/video.mp4"
  ["Module 3: Algorithms"]="$BASE_PATH/Module_03_CS_Fundamentals/03_Algorithms/video.mp4"
  ["Module 4: Terminal Basics"]="$BASE_PATH/Module_04_Development_Environment/01_Terminal_Basics/video.mp4"
  ["Module 4: Git and GitHub"]="$BASE_PATH/Module_04_Development_Environment/02_Git_and_GitHub/Git and GitHub Time Machine.mp4"
  ["Business: AI Research"]="$BASE_PATH/Business_Track/01_AI_Research/video.mp4"
  ["Business: Marketing Automation"]="$BASE_PATH/Business_Track/02_Marketing_Automation/video.mp4"
  ["Business: Financial Analysis"]="$BASE_PATH/Business_Track/03_Financial_Analysis/video.mp4"
)

echo "Uploading curriculum videos to Cloudflare Stream..."
echo "=================================================="

# Create results file
RESULTS_FILE="curriculum-videos.json"
echo "[" > $RESULTS_FILE

FIRST=true
for TITLE in "${!VIDEOS[@]}"; do
  VIDEO_PATH="${VIDEOS[$TITLE]}"
  
  # Check if file exists
  if [ ! -f "$VIDEO_PATH" ]; then
    echo "✗ File not found: $VIDEO_PATH"
    continue
  fi
  
  echo ""
  echo "Uploading: $TITLE"
  echo "File: $(basename "$VIDEO_PATH")"
  
  # Upload file using TUS protocol
  RESPONSE=$(curl -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream?direct_user=true" \
    -H "X-Auth-Email: $AUTH_EMAIL" \
    -H "X-Auth-Key: $AUTH_KEY" \
    -H "Tus-Resumable: 1.0.0" \
    -H "Upload-Length: $(wc -c < "$VIDEO_PATH" | tr -d ' ')" \
    -H "Upload-Metadata: name $(echo -n "$TITLE" | base64)" \
    2>/dev/null)
  
  # Extract upload URL
  UPLOAD_URL=$(echo $RESPONSE | grep -o '"Location":"[^"]*' | cut -d'"' -f4)
  
  if [ ! -z "$UPLOAD_URL" ]; then
    # Upload the file
    curl -X PATCH "$UPLOAD_URL" \
      -H "Tus-Resumable: 1.0.0" \
      -H "Upload-Offset: 0" \
      -H "X-Auth-Email: $AUTH_EMAIL" \
      -H "X-Auth-Key: $AUTH_KEY" \
      --data-binary @"$VIDEO_PATH" \
      2>/dev/null
    
    # Extract video ID from upload URL
    VIDEO_ID=$(echo $UPLOAD_URL | grep -o '[a-f0-9]\{32\}')
    
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
      echo "    \"path\": \"$VIDEO_PATH\"" >> $RESULTS_FILE
      echo -n "  }" >> $RESULTS_FILE
    fi
  else
    echo "✗ Failed to get upload URL"
  fi
done

echo "" >> $RESULTS_FILE
echo "]" >> $RESULTS_FILE

echo ""
echo "=================================================="
echo "Upload complete! Results saved to $RESULTS_FILE"
echo ""
echo "Video IDs for use in playground:"
cat $RESULTS_FILE | grep '"id"' | cut -d'"' -f4