# RUDI LMS - Production Package

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name initial_setup

# Apply SQL helpers (for aggregate maintenance)
psql $DATABASE_URL -f scripts/sql_helpers.sql
```

### 4. Import Curriculum Content
```bash
# Point to your curriculum folder
npx ts-node importer.ts /path/to/RUDI_Applied_GenAI_Program
```

## Package Contents

```
rudi-lms-package/
├── prisma/
│   └── schema.prisma      # Complete database schema
├── scripts/
│   └── sql_helpers.sql    # PostgreSQL triggers
├── docs/
│   └── filesystem_to_db_mapping_v1.1.md  # Import guide
├── importer.ts           # Curriculum importer
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── .env.example          # Environment template
└── README.md            # This file
```

## Schema Overview

### Multi-Tenant Hierarchy
```
Organization (your company/school)
  └── Program (RUDI Applied GenAI)
      └── Course (01: AI Foundations, etc.)
          └── Lesson (03.1: Large Language Models)
              └── Component (VIDEO, SLIDES, LAB, QUIZ)
                  └── Asset (individual files)
```

### Key Models
- **Auth**: User, Account, Session (Better Auth compatible)
- **Organization**: Multi-tenant support with Memberships
- **Content**: Program, Course, Lesson, Component, Asset
- **Progress**: Enrollment, UserProgress, VideoProgress
- **Certificates**: Course and Program completion

### Component Types
- `VIDEO` - Video lessons with provider support (Cloudflare/Mux)
- `SLIDES` - Slide decks (multiple PNGs)
- `LAB` - Lab exercises with code/data
- `QUIZ` - Assessments
- `RESOURCE` - Additional materials

## Database Requirements

- PostgreSQL 14+ (Neon, Supabase, or local)
- Extensions: uuid-ossp (auto-installed by Prisma)

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"
DIRECT_URL="postgresql://user:password@host:5432/dbname"

# Optional: Video Provider
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_API_TOKEN=""
MUX_TOKEN_ID=""
MUX_TOKEN_SECRET=""

# Optional: Storage
AWS_S3_BUCKET=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
```

## Import Process

The importer (`importer.ts`) will:
1. Scan your curriculum folder structure
2. Create Program and Courses
3. Import Lessons with proper numbering (03.1 format)
4. Create Components for each content type
5. Import Assets with SHA1 checksums
6. All operations are idempotent (safe to re-run)

### Expected Folder Structure
```
RUDI_Applied_GenAI_Program/
├── Course_01_AI_Foundations/
│   └── Lesson_03_1_Large_Language_Models/
│       ├── learning/
│       │   ├── video.mp4
│       │   ├── transcript.txt
│       │   └── slides/*.png
│       ├── lab/
│       ├── assessments/
│       └── resources/
```

## Next Steps for Development

### 1. Authentication
- Integrate Better Auth or NextAuth
- Set up OAuth providers
- Configure session management

### 2. Frontend
- Next.js 14+ with App Router
- Shadcn/ui components
- Video player integration

### 3. Video Delivery
- Cloudflare Stream (recommended) or
- Mux for analytics
- Implement DRM if needed

### 4. Storage & CDN
- Cloudflare R2 or AWS S3
- CDN for static assets
- Signed URLs for protected content

### 5. Admin Panel
- Content management UI
- Import status dashboard
- User management
- Analytics dashboard

## Support & Documentation

- Full schema documentation: See `docs/filesystem_to_db_mapping_v1.1.md`
- Database triggers: See `scripts/sql_helpers.sql`
- Prisma docs: https://www.prisma.io/docs

## License

Proprietary - RUDI Applied GenAI Program

---

*This package contains everything needed to build the RUDI LMS platform.*