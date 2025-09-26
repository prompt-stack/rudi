# Scripts Directory

## 📁 Organized Structure

```
scripts/
├── cloudflare/             # Video upload & management
│   ├── upload-module-01.sh         # Upload Module 01 videos
│   ├── update-cloudflare-ids.js    # Update seed files with video IDs
│   └── upload-to-cloudflare.js     # Generic video uploader
│
├── supabase/               # Database & storage
│   ├── run-migration.js            # Run SQL migrations
│   ├── upload-course-assets.js     # Upload transcripts/slides
│   └── upload-transcripts.js       # Upload transcript files
│
├── data-import/            # Curriculum data import
│   ├── import-curriculum.js        # Full curriculum importer
│   ├── import-production.js        # Production data import
│   ├── import-with-cloudflare.js   # Import with video IDs
│   ├── import-config.js            # Import configuration
│   ├── import-config-local.js      # Local import config
│   └── import-module-01.sql        # Module 01 SQL data
│
├── setup/                  # Initial setup & configuration
│   └── create-storage-buckets.js   # Create Supabase buckets
│
├── verification/           # Testing & validation
│   └── verify-upload.js            # Verify uploads completed
│
├── docs/                   # Documentation
│   ├── README.md                   # This file
│   ├── course-file-structure.md    # Course organization guide
│   └── data-preparation-guide.md   # Data prep instructions
│
└── archive/                # Legacy/unused scripts
    ├── upload-curriculum-videos.sh
    ├── upload-sample-videos.sh
    ├── upload-via-url.sh
    └── upload-videos-to-cloudflare.sh
```

## 🚀 Quick Start Scripts

### Module 01 Complete Setup
```bash
# Full workflow for Module 01
npm run module-01:setup
```

### Individual Operations
```bash
# Upload videos to Cloudflare
npm run upload:module-01

# Update seed files with video IDs  
npm run update:cloudflare-ids

# Upload course assets to Supabase
npm run upload:assets

# Run database migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## 📂 Script Categories

### 🎬 Cloudflare (Video Management)
- **Upload videos** to Cloudflare Stream
- **Update references** with video IDs
- **Manage video assets** and metadata

### 💾 Supabase (Database & Storage)
- **Run migrations** and schema changes
- **Upload assets** (transcripts, slides, PDFs)
- **Manage storage buckets** and permissions

### 📊 Data Import (Curriculum Processing)
- **Import course data** from file structure
- **Process transcripts** and metadata
- **Handle production deployments**

### ⚙️ Setup (Initial Configuration)
- **Create storage buckets** in Supabase
- **Configure API permissions**
- **Set up initial data structures**

### ✅ Verification (Quality Assurance)
- **Verify uploads** completed successfully
- **Test video playback** and access
- **Validate data integrity**

## 🔧 Environment Requirements

### Required Environment Variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudflare (for upload scripts)
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_AUTH_EMAIL=
CLOUDFLARE_AUTH_KEY=
```

### Required Dependencies
```bash
npm install @supabase/supabase-js dotenv form-data tus-js-client
```

## 🎯 Common Workflows

### 1. New Module Setup
```bash
# 1. Upload videos
./scripts/cloudflare/upload-module-01.sh

# 2. Update seed data
node scripts/cloudflare/update-cloudflare-ids.js

# 3. Import course structure
node scripts/data-import/import-curriculum.js

# 4. Upload assets
node scripts/supabase/upload-course-assets.js
```

### 2. Production Deployment
```bash
# 1. Run migrations
node scripts/supabase/run-migration.js

# 2. Import production data
node scripts/data-import/import-production.js

# 3. Verify everything works
node scripts/verification/verify-upload.js
```

### 3. Development Setup
```bash
# 1. Create storage buckets
node scripts/setup/create-storage-buckets.js

# 2. Import local data
node scripts/data-import/import-config-local.js

# 3. Upload sample assets
node scripts/supabase/upload-transcripts.js
```

## 📝 Script Descriptions

| Script | Purpose | Usage |
|--------|---------|-------|
| `upload-module-01.sh` | Upload Module 01 videos to Cloudflare | `./scripts/cloudflare/upload-module-01.sh` |
| `import-curriculum.js` | Import full curriculum structure | `node scripts/data-import/import-curriculum.js` |
| `upload-course-assets.js` | Upload transcripts, slides, materials | `node scripts/supabase/upload-course-assets.js` |
| `create-storage-buckets.js` | Set up Supabase storage buckets | `node scripts/setup/create-storage-buckets.js` |
| `verify-upload.js` | Validate uploads and data integrity | `node scripts/verification/verify-upload.js` |

## ⚠️ Important Notes

1. **Large Files**: Videos >100MB must be uploaded via Cloudflare Dashboard
2. **Order Matters**: Always upload videos before updating IDs
3. **Permissions**: Some scripts require service role keys
4. **Backups**: Test scripts on development environment first

## 🐛 Troubleshooting

### Common Issues
- **Authentication errors**: Check API keys in `.env.local`
- **File not found**: Verify curriculum file paths
- **Upload failures**: Check network and file sizes
- **Database errors**: Verify Supabase connection

### Debug Mode
Most scripts support verbose logging:
```bash
DEBUG=true node scripts/data-import/import-curriculum.js
```

## 📚 Additional Resources

- [Course File Structure Guide](docs/course-file-structure.md)
- [Data Preparation Guide](docs/data-preparation-guide.md)
- [Main Project Documentation](../docs/)