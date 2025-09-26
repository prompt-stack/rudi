# Course File Organization Structure

## Recommended Directory Structure

```
/rudi-web/
├── .secure/                    # Sensitive files (gitignored)
│   └── .env                   # Your production credentials
│
├── course-content/            # Organized course files (NEW)
│   ├── module-01-ai-foundations/
│   │   ├── metadata.json      # Course metadata
│   │   ├── 01-evolution-of-intelligence/
│   │   │   ├── video.mp4     # Will upload to Cloudflare
│   │   │   ├── transcript.txt
│   │   │   ├── slides.pdf    # Converted from images
│   │   │   ├── lab-instructions.pdf
│   │   │   └── metadata.json # Lesson metadata
│   │   ├── 02-what-is-intelligence/
│   │   │   └── (same structure)
│   │   └── 03-llm-introduction/
│   │       └── (same structure)
│   │
│   ├── module-02-prompt-engineering/
│   │   └── (same structure)
│   │
│   └── processed/            # Track what's been uploaded
│       └── upload-log.json
│
├── scripts/                  # Import and management scripts
│   ├── import-production.js  # Production import script
│   ├── prepare-content.js    # Convert slides, organize files
│   └── upload-status.js      # Check upload status
│
└── public/                   # Public assets
    └── course-thumbnails/    # Course preview images
```

## Step-by-Step Organization Process

### 1. Create Course Content Directory
```bash
mkdir -p course-content/module-01-ai-foundations
mkdir -p course-content/processed
```

### 2. Prepare Content Files
```bash
# Copy and organize from source
cp -r "/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized/Module_01_AI_Foundations" \
      "course-content/module-01-ai-foundations/raw"

# Run preparation script (creates below)
node scripts/prepare-content.js module-01-ai-foundations
```

### 3. Content Preparation Script
This script will:
- Convert slide images to PDFs
- Generate metadata files
- Organize files in correct structure
- Validate all required files exist

### 4. Upload Process

#### Local Development:
```bash
# Use local Supabase
export USE_LOCAL=true
node scripts/import-production.js module-01-ai-foundations
```

#### Production Upload:
```bash
# Use production credentials from .env.production
export USE_LOCAL=false
node scripts/import-production.js module-01-ai-foundations
```

## Metadata Files

### Course Metadata (metadata.json)
```json
{
  "id": "module-01-ai-foundations",
  "title": "Module 01: AI Foundations",
  "description": "Master the fundamental concepts...",
  "price": 97.00,
  "currency": "USD",
  "access_type": "course",
  "thumbnail": "ai-foundations-thumb.jpg",
  "instructor": "Your Name",
  "level": "beginner",
  "duration_hours": 3.5,
  "lessons_count": 12,
  "tags": ["AI", "Machine Learning", "LLMs"],
  "prerequisites": [],
  "learning_outcomes": [
    "Understand AI fundamentals",
    "Know LLM capabilities and limitations",
    "Apply responsible AI practices"
  ]
}
```

### Lesson Metadata (lesson metadata.json)
```json
{
  "id": "01-evolution-of-intelligence",
  "title": "Evolution of Intelligence",
  "description": "Explore the journey from basic computation...",
  "duration_seconds": 343,
  "is_preview": true,
  "order": 1,
  "assets": {
    "video": {
      "filename": "video.mp4",
      "size_mb": 16.7,
      "format": "mp4"
    },
    "transcript": {
      "filename": "transcript.txt",
      "language": "en"
    },
    "slides": {
      "filename": "slides.pdf",
      "pages": 19
    },
    "lab": {
      "filename": "lab-instructions.pdf",
      "estimated_minutes": 30
    }
  },
  "quiz": null,
  "resources": []
}
```

## File Processing Checklist

### For Each Lesson:
- [ ] Video file exists and is valid MP4
- [ ] Transcript is plain text or markdown
- [ ] Slides converted to PDF (if from images)
- [ ] Lab instructions in PDF format
- [ ] Metadata file created with duration
- [ ] File sizes are reasonable (<500MB video)

### Before Upload:
- [ ] All lessons have required files
- [ ] Total course duration calculated
- [ ] Course thumbnail created
- [ ] Metadata files validated
- [ ] Test with one lesson first

## Upload Tracking

### processed/upload-log.json
```json
{
  "module-01-ai-foundations": {
    "status": "completed",
    "uploaded_at": "2024-08-30T10:30:00Z",
    "course_id": "uuid-here",
    "lessons": {
      "01-evolution-of-intelligence": {
        "video_id": "uuid-here",
        "cloudflare_id": "stream-id-here",
        "assets_uploaded": ["transcript", "slides"]
      }
    },
    "errors": []
  }
}
```

## Security Best Practices

1. **Never commit .env files**
   - Add to .gitignore: `.env*`, `.secure/`
   
2. **Use environment-specific configs**
   - `.env.local` for development
   - `.env.production` for production
   - Load correct one based on NODE_ENV

3. **Validate uploads**
   - Check file types before upload
   - Scan for malicious content
   - Limit file sizes

4. **Access control**
   - Use service role key only for imports
   - Frontend uses anon key only
   - Implement RLS policies

## Quick Commands

```bash
# Prepare all content
npm run prepare-content

# Import to local Supabase
npm run import:local module-01

# Import to production
npm run import:prod module-01

# Check upload status
npm run status module-01

# Generate course thumbnails
npm run generate-thumbnails
```

## Next Steps

1. **Organize your files** into the structure above
2. **Create metadata files** for course and lessons
3. **Convert slides to PDFs** (if needed)
4. **Test with local Supabase** first
5. **Upload to production** when ready