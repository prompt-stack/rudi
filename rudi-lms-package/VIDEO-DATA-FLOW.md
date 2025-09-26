# Video Data Flow & Storage

## Storage Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FILESYSTEM                            │
│  /curriculum/Course_01/Lesson_01/learning/video.mp4      │
└─────────────────────────────────────────────────────────┘
                            ↓
                     [Import Script]
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                 │
├───────────────────────────────────────────────────────────
│ 1. COMPONENT Table                                       │
│    - id: unique identifier                               │
│    - type: 'VIDEO' or 'LAB'                             │
│    - name: 'video'                                       │
│    - lessonId: links to lesson                          │
│    - groupKey: 'learning/video.mp4'                     │
├───────────────────────────────────────────────────────────
│ 2. ASSET Table                                          │
│    - componentId: links to component                     │
│    - relativePath: 'learning/video.mp4'                 │
│    - sizeBytes: 16678191                                │
│    - checksumSha1: '4ae719be...'                        │
│    - mimeType: 'video/mp4'                              │
├───────────────────────────────────────────────────────────
│ 3. COMPONENT_VIDEO Table (after upload)                 │
│    - componentId: links to component                     │
│    - providerId: 'd4cbdab307704fa581d567ccaa6c0f5d'    │
│    - provider: 'CLOUDFLARE'                             │
└─────────────────────────────────────────────────────────┘
                            ↓
                     [Upload Script]
                            ↓
┌─────────────────────────────────────────────────────────┐
│                 CLOUDFLARE STREAM                        │
│  Video File + Metadata:                                  │
│    - name: 'course_01_L01_learning'                     │
│    - courseId: database ID                              │
│    - courseSlug: 'course_01'                            │
│    - courseTitle: 'AI Foundations'                      │
│    - lessonId: database ID                              │
│    - lessonNumber: '01'                                 │
│    - lessonTitle: 'Evolution of Intelligence'           │
│    - componentId: database ID                           │
│    - componentType: 'learning'                          │
│    - managedBy: 'Grammar Ops'                           │
│    - program: 'RUDI Applied GenAI'                      │
└─────────────────────────────────────────────────────────┘
```

## Key Points

### 1. **Metadata is ALWAYS sent with upload**
```typescript
// From video-manager.ts line 102
form.append('meta', JSON.stringify(metadata));
```

### 2. **Database Storage**
- **COMPONENT**: Defines the video as a learning component
- **ASSET**: Stores file reference (NOT the video itself)
- **COMPONENT_VIDEO**: Links component to Cloudflare Stream ID

### 3. **What's Stored Where**

| Data | Database | Cloudflare |
|------|----------|------------|
| Video file | ❌ | ✅ |
| File path | ✅ (Asset.relativePath) | ❌ |
| File size | ✅ (Asset.sizeBytes) | ✅ |
| Checksum | ✅ (Asset.checksumSha1) | ❌ |
| Stream ID | ✅ (ComponentVideo.providerId) | ✅ |
| Course info | ✅ (via relations) | ✅ (in metadata) |
| Lesson info | ✅ (via relations) | ✅ (in metadata) |

### 4. **Why This Architecture**

1. **Separation of Concerns**:
   - Database: Structure and relationships
   - Cloudflare: Video hosting and delivery
   - Filesystem: Source of truth for curriculum

2. **Performance**:
   - Videos stream from Cloudflare's CDN
   - Database only stores lightweight references
   - No video data in our database

3. **Metadata Redundancy**:
   - Stored in Cloudflare for standalone access
   - Allows Cloudflare dashboard to show context
   - Enables search/filter in Cloudflare

## Upload Process (Fixed)

```typescript
// When uploading, ALWAYS include metadata:
const metadata = {
  name: `${course.slug}_L${lesson.lessonNumber}_${videoType}`,
  courseId: course.id,
  courseSlug: course.slug,
  courseTitle: course.title,
  lessonId: lesson.id,
  lessonNumber: lesson.lessonNumber,
  lessonTitle: lesson.title,
  componentId: component.id,
  componentType: videoType,
  managedBy: 'Grammar Ops',
  program: 'RUDI Applied GenAI',
  compressed: wasCompressed,
  uploadedAt: new Date().toISOString()
};

// Upload with metadata
const streamId = await uploadToCloudflare(videoPath, metadata);

// Save reference in database
await prisma.componentVideo.create({
  data: {
    componentId: component.id,
    provider: 'CLOUDFLARE',
    providerId: streamId
  }
});
```

## The Fix Applied

The issue with "video_compressed.mp4" names was that the compressed video upload didn't include proper metadata. Now:

1. ✅ Metadata is ALWAYS sent during upload (line 102)
2. ✅ Includes full context (course, lesson, component)
3. ✅ Uses standardized naming: `course_XX_LXX_type`
4. ✅ Can be updated post-upload if needed