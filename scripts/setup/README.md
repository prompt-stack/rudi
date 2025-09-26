# Setup Scripts

## ⚙️ Initial Configuration & Setup

### Scripts in this directory:
- `create-storage-buckets.js` - Create required Supabase storage buckets

## 🚀 Usage

### Create Storage Buckets
```bash
node scripts/setup/create-storage-buckets.js
```

This creates the required storage buckets:
- `transcripts` - For video transcript files
- `slides` - For presentation slides and images  
- `course-materials` - For PDFs, docs, and other materials

## 📝 Notes

- Run these scripts once during initial project setup
- Requires Supabase service role key
- Creates buckets with appropriate permissions and file size limits
- Safe to run multiple times (won't duplicate buckets)