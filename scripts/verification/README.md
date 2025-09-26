# Verification Scripts

## ✅ Testing & Validation Tools

### Scripts in this directory:
- `verify-upload.js` - Verify uploads completed successfully and data integrity

## 🚀 Usage

### Verify Uploads
```bash
node scripts/verification/verify-upload.js
```

This script will:
- Check all video uploads to Cloudflare
- Verify asset uploads to Supabase storage
- Test database records and relationships
- Validate video playback URLs
- Report any missing or broken assets

## 📊 Output

The verification script provides:
- ✅ Success confirmations
- ❌ Error reports with details
- 📊 Summary statistics
- 🔧 Suggested fixes for issues

## 📝 Notes

- Run after completing major uploads or imports
- Helps identify broken links or missing files
- Can be run safely without making changes
- Useful for troubleshooting deployment issues