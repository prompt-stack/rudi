# Database Migrations

## Migration History

| Timestamp | Description | Status |
|-----------|-------------|--------|
| 20250829000001 | Phase 1 Core Foundation | ✅ Ready |
| 20250829000002 | Content Assets System | ✅ Ready |
| 20250830000001 | User Progress Tracking | 📋 TODO |
| 20250830000002 | Payment Integration | 📋 TODO |
| 20250830000003 | Organizations | 📋 TODO |

## Running Migrations

### Option 1: Supabase CLI (Recommended)
```bash
npx supabase migration up
```

### Option 2: Direct SQL
```bash
psql $DATABASE_URL < migrations/20250829000001_phase1_core_foundation.sql
psql $DATABASE_URL < migrations/20250829000002_content_assets.sql
```

### Option 3: Supabase Dashboard
1. Go to SQL Editor
2. Copy migration content
3. Run

## Migration Guidelines

1. **Naming**: Use format `YYYYMMDDHHmmss_description.sql` (timestamp_description)
2. **Idempotency**: All migrations should be safe to run multiple times
3. **Rollback**: Include rollback instructions in comments
4. **Testing**: Test on local Supabase first
5. **Documentation**: Update this README after adding new migrations

## Current Schema

### Phase 1 (20250829000001)
- ✅ profiles
- ✅ courses  
- ✅ videos
- ✅ Basic RLS policies

### Phase 2 (20250829000002)
- ✅ content_assets
- ✅ Storage buckets
- ✅ Asset management functions

### Future Phases
- ⏳ user_progress
- ⏳ payments
- ⏳ organizations
- ⏳ certifications