#!/bin/bash

# Cloudflare Stream Upload Script
# Uploads course videos to Cloudflare Stream and outputs the video IDs

ACCOUNT_ID="de8f377bc5bf1f2a41887f15db62c02e"
AUTH_TOKEN="qTB9UBnp4LNO2yF4gs09t4RYnutXCBfeV5CdMvMm"
CURRICULUM_PATH="/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🎬 Cloudflare Stream Video Uploader"
echo "===================================="
echo ""

# Create output file for video IDs
OUTPUT_FILE="cloudflare_video_ids.txt"
echo "# Cloudflare Stream Video IDs - $(date)" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Function to upload video
upload_video() {
    local video_path="$1"
    local video_name="$2"
    
    echo -e "${YELLOW}Uploading: $video_name${NC}"
    echo "Path: $video_path"
    
    # Check if file exists
    if [ ! -f "$video_path" ]; then
        echo -e "${RED}❌ File not found: $video_path${NC}"
        echo "MISSING: $video_name = FILE_NOT_FOUND" >> $OUTPUT_FILE
        return 1
    fi
    
    # Upload to Cloudflare Stream
    response=$(curl -X POST \
        "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream" \
        -H "Authorization: Bearer $AUTH_TOKEN" \
        -F "file=@$video_path" \
        -F "meta={\"name\":\"$video_name\"}" \
        --silent)
    
    # Extract video ID from response
    video_id=$(echo "$response" | python3 -c "import sys, json; print(json.load(sys.stdin).get('result', {}).get('uid', 'ERROR'))" 2>/dev/null)
    
    if [ "$video_id" != "ERROR" ] && [ ! -z "$video_id" ]; then
        echo -e "${GREEN}✅ Success! Video ID: $video_id${NC}"
        echo "$video_name = $video_id" >> $OUTPUT_FILE
    else
        echo -e "${RED}❌ Upload failed${NC}"
        echo "Response: $response"
        echo "FAILED: $video_name" >> $OUTPUT_FILE
    fi
    
    echo "---"
    return 0
}

# ============================================
# UPLOAD AI FOUNDATIONS VIDEOS
# ============================================
echo -e "${GREEN}📚 Module 1: AI Foundations${NC}"
echo "# Module 1: AI Foundations" >> $OUTPUT_FILE

upload_video "$CURRICULUM_PATH/Module_01_AI_Foundations/01_Introduction_to_AI/video.mp4" "AI_Introduction"
upload_video "$CURRICULUM_PATH/Module_01_AI_Foundations/02_Foundations_of_AI/video.mp4" "AI_Foundations"
upload_video "$CURRICULUM_PATH/Module_01_AI_Foundations/04_Large_Language_Models/video.mp4" "Large_Language_Models"
upload_video "$CURRICULUM_PATH/Module_01_AI_Foundations/05_LLM_Limitations/video.mp4" "LLM_Limitations"
upload_video "$CURRICULUM_PATH/Module_01_AI_Foundations/06_Responsible_AI/video.mp4" "Responsible_AI"

echo "" >> $OUTPUT_FILE

# ============================================
# UPLOAD PROMPTING MASTERY VIDEOS
# ============================================
echo -e "${GREEN}📝 Module 2: Prompting Mastery${NC}"
echo "# Module 2: Prompting Mastery" >> $OUTPUT_FILE

upload_video "$CURRICULUM_PATH/Module_02_Prompting_Mastery/02_Prompt_Engineering/An Intro to Prompting.mp4" "Intro_to_Prompting"
upload_video "$CURRICULUM_PATH/Module_02_Prompting_Mastery/03_Advanced_Techniques/video.mp4" "Advanced_Prompting"

echo "" >> $OUTPUT_FILE

# ============================================
# UPLOAD BUSINESS TRACK VIDEOS
# ============================================
echo -e "${GREEN}💼 Business Track${NC}"
echo "# Business Track" >> $OUTPUT_FILE

upload_video "$CURRICULUM_PATH/Business_Track/01_AI_Research/video.mp4" "AI_Research"
upload_video "$CURRICULUM_PATH/Business_Track/02_Marketing_Automation/video.mp4" "AI_Marketing"
upload_video "$CURRICULUM_PATH/Business_Track/03_Financial_Analysis/video.mp4" "AI_Finance"
upload_video "$CURRICULUM_PATH/Business_Track/04_Sales_Workflows/video.mp4" "AI_Sales"
upload_video "$CURRICULUM_PATH/Business_Track/05_Rapid_Prototyping/video.mp4" "Rapid_Prototyping"

echo "" >> $OUTPUT_FILE

# ============================================
# UPLOAD CS FUNDAMENTALS VIDEOS
# ============================================
echo -e "${GREEN}💻 Module 3: CS Fundamentals${NC}"
echo "# Module 3: CS Fundamentals" >> $OUTPUT_FILE

upload_video "$CURRICULUM_PATH/Module_03_CS_Fundamentals/01_Abstraction/video.mp4" "CS_Abstraction"
upload_video "$CURRICULUM_PATH/Module_03_CS_Fundamentals/02_Data_Structures/video.mp4" "CS_Data_Structures"
upload_video "$CURRICULUM_PATH/Module_03_CS_Fundamentals/03_Algorithms/video.mp4" "CS_Algorithms"
upload_video "$CURRICULUM_PATH/Module_03_CS_Fundamentals/04_APIs/video.mp4" "CS_APIs"
upload_video "$CURRICULUM_PATH/Module_03_CS_Fundamentals/05_Client_Server/video.mp4" "CS_Client_Server"

echo "" >> $OUTPUT_FILE

# ============================================
# UPLOAD DEV ENVIRONMENT VIDEOS
# ============================================
echo -e "${GREEN}🛠️ Module 4: Development Environment${NC}"
echo "# Module 4: Development Environment" >> $OUTPUT_FILE

upload_video "$CURRICULUM_PATH/Module_04_Development_Environment/01_Terminal_Basics/video.mp4" "Terminal_Basics"
upload_video "$CURRICULUM_PATH/Module_04_Development_Environment/02_Git_and_GitHub/Git and GitHub Time Machine.mp4" "Git_GitHub"
upload_video "$CURRICULUM_PATH/Module_04_Development_Environment/03_Package_Management/Building Your AI Toolbox.mp4" "Package_Management"
upload_video "$CURRICULUM_PATH/Module_04_Development_Environment/04_AI_Dev_Environments/AI Coding Copilot.mp4" "AI_Dev_Environments"
upload_video "$CURRICULUM_PATH/Module_04_Development_Environment/05_Web_Basics/The Web's Simple Secret.mp4" "Web_Basics"

echo "" >> $OUTPUT_FILE

# ============================================
# SUMMARY
# ============================================
echo ""
echo "===================================="
echo -e "${GREEN}✅ Upload Complete!${NC}"
echo "Video IDs saved to: $OUTPUT_FILE"
echo ""
echo "Next steps:"
echo "1. Check $OUTPUT_FILE for all video IDs"
echo "2. Update seed_actual_courses.sql with the IDs"
echo "3. Run the SQL migration in Supabase"
echo ""
cat $OUTPUT_FILE