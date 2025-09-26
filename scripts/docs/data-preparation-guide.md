# Data Preparation Guide for Module_01_AI_Foundations

## Required Data Format for Database Import

### 1. File Organization Structure Expected

```
Module_01_AI_Foundations/
├── 01_Introduction_to_AI/
│   ├── video.mp4           → Upload to Cloudflare Stream/Mux
│   ├── transcript.txt       → Upload to Supabase Storage (transcripts bucket)
│   ├── slides/             → Convert to PDF, upload to Storage (slides bucket)
│   ├── lab/                → Convert to PDF, upload to Storage (course-materials)
│   └── lesson_info.md      → Extract metadata (duration, title)
├── 02_Foundations_of_AI/
│   └── (same structure)
└── README.md               → Course description
```

### 2. Data Processing Steps

#### Step 1: Upload Videos
- Upload each `video.mp4` to your video provider (Cloudflare Stream recommended)
- Get the `provider_asset_id` for each video
- Note the exact duration in seconds

#### Step 2: Upload Static Assets
```bash
# Upload transcripts
supabase storage upload transcripts/module-01/01-evolution/transcript.txt \
  /path/to/01_Introduction_to_AI/transcript.txt

# Convert and upload slides (if images, create PDF first)
# You can use ImageMagick or similar:
convert slides/*.jpg slides.pdf
supabase storage upload slides/module-01/01-evolution/slides.pdf slides.pdf

# Upload lab materials
supabase storage upload course-materials/module-01/01-evolution/lab.pdf \
  /path/to/lab/instructions.pdf
```

#### Step 3: Prepare Import Data

Create a JSON file with all the course data:

```json
{
  "course": {
    "title": "Module 01: AI Foundations",
    "slug": "module-01-ai-foundations",
    "description": "Master the fundamental concepts...",
    "thumbnail_url": "https://...",
    "duration_minutes": 180,
    "access_scope": "course:ai-foundations",
    "price_cents": 9700,
    "is_published": true,
    "is_featured": true
  },
  "videos": [
    {
      "title": "Evolution of Intelligence",
      "description": "Explore the journey from basic computation to modern AI",
      "video_provider": "cloudflare",
      "provider_asset_id": "your-stream-id-here",
      "duration_seconds": 343,
      "is_preview": true,
      "is_required": true,
      "order_index": 1,
      "assets": [
        {
          "asset_type": "transcript",
          "title": "Lesson Transcript",
          "file_path": "module-01/01-evolution/transcript.txt",
          "storage_bucket": "transcripts",
          "access_level": "enrolled"
        },
        {
          "asset_type": "slides",
          "title": "Presentation Slides",
          "file_path": "module-01/01-evolution/slides.pdf",
          "storage_bucket": "slides",
          "access_level": "enrolled"
        }
      ]
    }
  ]
}
```

### 3. Database Schema Mapping

| Your File | Database Table | Database Column | Notes |
|-----------|---------------|-----------------|-------|
| Module folder | `courses` | - | One course per module |
| Module name | `courses` | `title` | e.g., "Module 01: AI Foundations" |
| Module slug | `courses` | `slug` | e.g., "module-01-ai-foundations" |
| Lesson folder | `videos` | - | One video per lesson |
| video.mp4 | `videos` | `provider_asset_id` | After uploading to CDN |
| Duration (seconds) | `videos` | `duration_seconds` | From lesson_info.md |
| transcript.txt | `content_assets` | `file_path` | Upload to storage first |
| slides/ | `content_assets` | `file_path` | Convert to PDF first |
| lab/ | `content_assets` | `file_path` | As PDF |

### 4. Import Script Template

```javascript
// Node.js import script example
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function importModule(modulePath) {
  // 1. Create course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert({
      title: 'Module 01: AI Foundations',
      slug: 'module-01-ai-foundations',
      // ... other fields
    })
    .select()
    .single();

  // 2. Process each lesson folder
  const lessons = fs.readdirSync(modulePath);
  
  for (const lesson of lessons) {
    // Read lesson_info.md for metadata
    const lessonInfo = parseL essonInfo(path.join(modulePath, lesson, 'lesson_info.md'));
    
    // Insert video
    const { data: video } = await supabase
      .from('videos')
      .insert({
        course_id: course.id,
        title: lessonInfo.title,
        duration_seconds: lessonInfo.duration,
        // ... other fields
      })
      .select()
      .single();
    
    // Upload and link assets
    await uploadAssets(video.id, path.join(modulePath, lesson));
  }
}
```

### 5. Manual Import via Supabase Studio

1. Go to http://127.0.0.1:54323
2. Navigate to Table Editor
3. Insert records in this order:
   - `courses` (get the UUID)
   - `videos` (reference course UUID)
   - `content_assets` (reference video UUIDs)

### 6. Access Scope Pattern

The `access_scope` field uses this pattern:
- `library:all` - Full library access
- `course:ai-foundations` - Single course access
- `bundle:starter` - Bundle access

### 7. Video Provider Options

- `cloudflare` - Cloudflare Stream (recommended)
- `mux` - Mux Video
- `youtube` - YouTube (use video ID)
- `vimeo` - Vimeo (use video ID)

### 8. File Size Limits

- Transcripts: 10MB max
- Slides: 50MB max
- Course materials: 50MB max

### 9. Important Notes

- All IDs in the database are UUIDs (auto-generated)
- Use slugs for URL-friendly identifiers
- Maintain order_index for proper lesson sequencing
- Set is_preview=true for free preview lessons
- Use proper access_level for content protection