# Supabase Project Structure

## 📁 Folder Organization

```
supabase/
├── migrations/          # Database schema changes (versioned)
│   ├── 001_phase1_core_foundation.sql
│   └── 002_content_assets.sql
│
├── seeds/              # Sample/test data (not for production)
│   └── module-01-ai-foundations.sql
│
├── functions/          # Edge functions (future)
│
├── config.toml         # Supabase configuration
├── schema.json         # Complete schema documentation
└── README.md           # This file
```

## 🚀 Migration Order

Migrations must be run in numerical order:

1. `001_phase1_core_foundation.sql` - Core tables (profiles, courses, videos)
2. `002_content_assets.sql` - Asset management system

## 🌱 Seed Data

Seeds are for development/testing only:

- `module-01-ai-foundations.sql` - Sample course with videos

## 📝 Schema Documentation

- `schema.json` - Complete database schema v2.0.0
- `schema.mmd` - Mermaid diagram of relationships

## 🗑️ Files to Remove

The following files are duplicates or outdated:
- `phase1_complete.sql` (duplicate of migration 001)
- `seed_actual_courses.sql` (moved to seeds folder)

## 🔧 Usage

### Local Development
```bash
# Start Supabase locally
npx supabase start

# Run migrations
npx supabase migration up

# Seed database
npx supabase db seed
```

### Production
```bash
# Push to remote
npx supabase db push

# Run specific migration
psql $DATABASE_URL < migrations/001_phase1_core_foundation.sql
```

## 📚 Key Tables

- `profiles` - User profiles
- `courses` - Course catalog
- `videos` - Video lessons
- `content_assets` - Transcripts, slides, materials
- `user_entitlements` - Access control
- `org_seats` - Organization licenses

## 🔐 Security

All tables have RLS (Row Level Security) enabled with appropriate policies for:
- Public preview content
- Enrolled user access
- Organization access
- Admin operations