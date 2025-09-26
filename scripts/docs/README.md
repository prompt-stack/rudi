# Scripts Directory

## 📁 Organization

```
scripts/
├── cloudflare/         # Video upload scripts
│   ├── upload-module-01.sh
│   └── update-cloudflare-ids.js
│
├── supabase/          # Database & storage scripts
│   ├── upload-course-assets.js
│   └── run-migration.js
│
└── archive/           # Old/unused scripts
```

## 🎬 Cloudflare Scripts

### `upload-module-01.sh`
Uploads Module 01 videos to Cloudflare Stream
```bash
./scripts/upload-module-01.sh
```

### `update-cloudflare-ids.js`
Updates seed files with actual Cloudflare video IDs
```bash
node scripts/update-cloudflare-ids.js
```

## 💾 Supabase Scripts

### `upload-course-assets.js`
Uploads transcripts, slides, and materials to Supabase Storage
```bash
node scripts/upload-course-assets.js
```

### `run-migration.js`
Helper to run SQL migrations via SDK
```bash
node scripts/run-migration.js migrations/001_phase1_core_foundation.sql
```

## 🚀 NPM Scripts

These scripts are available via npm:

```bash
npm run upload:module-01      # Upload videos to Cloudflare
npm run update:cloudflare-ids # Update IDs in seed files
npm run seed:module-01        # Seed database
npm run module-01:setup       # Run all steps
```

## ⚠️ Important Notes

1. **Large Videos**: Files >100MB must be uploaded manually via Cloudflare dashboard
2. **API Keys**: Ensure `.env.local` has correct Cloudflare and Supabase credentials
3. **Order**: Always upload videos first, then update IDs, then seed database

## 🔐 Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# For Cloudflare uploads (in scripts)
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_AUTH_EMAIL=
CLOUDFLARE_AUTH_KEY=
```