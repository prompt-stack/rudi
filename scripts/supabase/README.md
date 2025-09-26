# Supabase Scripts

## 💾 Database & Storage Management

### Scripts in this directory:
- `run-migration.js` - Execute SQL migrations via Supabase SDK
- `upload-course-assets.js` - Upload transcripts, slides, and materials
- `upload-transcripts.js` - Upload transcript files specifically

## 🚀 Usage

### Run Database Migrations
```bash
node scripts/supabase/run-migration.js
# or
node scripts/supabase/run-migration.js path/to/migration.sql
```

### Upload Course Assets
```bash
node scripts/supabase/upload-course-assets.js
```

### Upload Transcripts Only
```bash
node scripts/supabase/upload-transcripts.js
```

## ⚙️ Configuration

Required environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

## 📂 Storage Buckets

The scripts will use these buckets:
- `transcripts` - Video transcript files (.txt)
- `slides` - Presentation slides (.png, .jpg, .pdf)
- `course-materials` - PDFs, docs, lab instructions

## 📝 Notes

- Service role key required for storage operations
- Files are organized by video ID in storage
- Public access is enabled for enrolled users only