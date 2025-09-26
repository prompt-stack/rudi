# Cloudflare Scripts

## 🎬 Video Upload & Management

### Scripts in this directory:
- `upload-module-01.sh` - Upload Module 01 videos to Cloudflare Stream
- `update-cloudflare-ids.js` - Update seed files with actual video IDs
- `upload-to-cloudflare.js` - Generic video uploader

## 🚀 Usage

### Upload Module 01 Videos
```bash
./scripts/cloudflare/upload-module-01.sh
```

### Update Seed Files with Video IDs
```bash
node scripts/cloudflare/update-cloudflare-ids.js
```

## ⚙️ Configuration

Set these environment variables:
```bash
CLOUDFLARE_ACCOUNT_ID=de8f377bc5bf1f2a41887f15db62c02e
CLOUDFLARE_AUTH_EMAIL=brett@gobzhoff.com  
CLOUDFLARE_AUTH_KEY=your-auth-key
```

## 📝 Notes

- Large files (>100MB) should be uploaded via Cloudflare Dashboard
- Always run `update-cloudflare-ids.js` after uploading new videos
- Video IDs are automatically extracted and saved to JSON files