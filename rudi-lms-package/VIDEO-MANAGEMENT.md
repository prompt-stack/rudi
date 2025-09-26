# Video Management - RUDI LMS

## Overview
The RUDI Applied GenAI Program uses Cloudflare Stream for video hosting and delivery. Videos are organized into two categories:
- **Learning Videos**: Educational content in `/learning/` folders
- **Lab Videos**: Practical exercises in `/lab/` folders

## Architecture
```
Filesystem (MP4 files) → Database (metadata) → Cloudflare Stream (hosting)
```

## Commands

### Check Status
```bash
npm run video:status
```
Shows current video statistics including uploads by course.

### Import Videos
```bash
npm run import <curriculum-path>  # Import curriculum structure
npm run video:import               # Import any missing videos
```

### Upload to Cloudflare
```bash
npm run video:upload
```
- Automatically compresses videos >200MB (90%+ size reduction)
- Adds rich metadata including course/lesson information
- Tracks as "Grammar Ops" managed content

### Sync Metadata
```bash
npm run video:sync
```
Updates metadata for all videos in Cloudflare.

### Cleanup
```bash
npm run video:cleanup
```
Removes orphaned videos from Cloudflare that aren't in the database.

## Video Metadata Structure
Each video in Cloudflare contains:
- `name`: Standardized format (e.g., `course_01_L05_learning`)
- `courseId`, `courseSlug`, `courseTitle`: Course information
- `lessonId`, `lessonNumber`, `lessonTitle`: Lesson details
- `componentType`: Either "learning" or "lab"
- `managedBy`: "Grammar Ops"
- `program`: "RUDI Applied GenAI"
- `compressed`: Boolean if video was compressed
- `uploadedAt`: Timestamp

## Current Status (as of 2025-01-30)
- **Total Videos**: 57 (23 learning, 34 lab)
- **Uploaded**: 22/57
- **Compression Success**: 90-93% size reduction achieved

## File Size Limits
- Direct upload: <200MB
- With compression: Any size (compressed to <200MB)
- Cloudflare limit: 5GB (with TUS protocol)

## Scripts
- `importer.ts`: Main curriculum importer
- `video-manager.ts`: Consolidated video management tool

## Environment Variables
Located in `/Users/hoff/My Drive/dev/rudi-web/.secure/.env`:
- `cloudflare_stream`: API token
- `cloudflare_account_id`: Account ID

## Troubleshooting

### Large Videos
Videos >200MB are automatically compressed using ffmpeg:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast output.mp4
```

### Missing Metadata
Run sync to update all video metadata:
```bash
npm run video:sync
```

### Orphaned Videos
Check and remove orphaned videos:
```bash
npm run video:cleanup
```

## Next Steps
- [ ] Upload remaining 35 videos (mostly lab videos)
- [ ] Implement TUS protocol for very large files
- [ ] Add progress tracking for uploads
- [ ] Create video preview generation