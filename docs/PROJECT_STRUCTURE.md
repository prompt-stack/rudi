# RUDI Web Project Structure

## 📁 Directory Organization

```
rudi-web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── rudi/               # RUDI training program pages
│   │   ├── courses/            # Course catalog and details
│   │   ├── playground/         # Video player testing
│   │   └── page.tsx            # Homepage
│   │
│   ├── components/             # React components
│   │   ├── CloudflarePlayer.tsx    # Primitive video player
│   │   ├── VideoPlayer.tsx         # Composite player with controls
│   │   └── ui/                     # shadcn/ui components
│   │
│   └── lib/                    # Utilities and helpers
│       ├── supabase/          # Supabase client setup
│       └── utils.ts           # Helper functions
│
├── supabase/                   # Database & backend
│   ├── migrations/            # Schema changes (versioned)
│   │   ├── 001_phase1_core_foundation.sql
│   │   └── 002_content_assets.sql
│   │
│   ├── seeds/                 # Sample data
│   │   └── module-01-ai-foundations.sql
│   │
│   ├── config.toml           # Supabase configuration
│   ├── schema.json           # Complete schema docs
│   └── seed.sql              # Seed runner
│
├── scripts/                    # Automation scripts
│   ├── cloudflare/           # Video upload scripts
│   ├── supabase/             # Database & storage scripts
│   └── archive/              # Old/unused scripts
│
├── public/                     # Static assets
│   └── images/               # Logo, icons, etc.
│
├── grammar-ops/               # Grammar Ops patterns
│   └── patterns/             # Component patterns
│
└── docs/                      # Documentation
    ├── SETUP_INSTRUCTIONS.md
    ├── PROJECT_STRUCTURE.md  # This file
    └── API_REFERENCE.md
```

## 🏗️ Architecture Layers

### Frontend (Next.js 15)
- **Pages**: App Router with RSC support
- **Components**: Grammar Ops compliant components
- **Styling**: Tailwind CSS + minimal BEM

### Backend (Supabase)
- **Database**: PostgreSQL with RLS
- **Storage**: Buckets for assets
- **Auth**: Supabase Auth (coming soon)
- **Functions**: Edge Functions (planned)

### Video (Cloudflare Stream)
- **Hosting**: Cloudflare Stream
- **Player**: Embedded iframe player
- **Analytics**: View tracking (planned)

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables |
| `supabase/schema.json` | Database schema documentation |
| `src/app/layout.tsx` | Root layout with providers |
| `src/lib/supabase/client.ts` | Supabase client setup |
| `tailwind.config.js` | Tailwind configuration |

## 🚀 Development Workflow

1. **Start dev server**: `npm run dev`
2. **Run migrations**: `npm run db:migrate`
3. **Seed database**: `npm run db:seed`
4. **Upload assets**: `npm run upload:assets`

## 📦 Module Structure

Each course module contains:
```
Module_XX_Name/
├── video.mp4              # Main lesson video
├── transcript.txt         # Video transcript
├── lesson_info.md        # Lesson metadata
├── slides/               # Presentation slides
│   └── slide_XXXXX.png
├── lab/                  # Lab exercises
│   └── LAB_INSTRUCTIONS.md
└── assets/              # Additional resources
```

## 🔐 Security Model

- **Public**: Preview videos, course catalog
- **Enrolled**: Full videos, transcripts, materials
- **Premium**: Advanced features, certificates
- **Admin**: Full access to all content

## 📝 Naming Conventions

- **Components**: PascalCase (`VideoPlayer.tsx`)
- **Pages**: kebab-case folders (`video-library/`)
- **Database**: snake_case (`content_assets`)
- **Scripts**: kebab-case (`upload-module-01.sh`)
- **CSS**: BEM when needed (`video-player__controls`)

## 🎯 Current Status

### ✅ Completed
- Basic video player
- Three-panel video library
- Database schema
- Content assets system

### 🚧 In Progress
- Video uploads to Cloudflare
- User authentication
- Progress tracking

### 📋 Planned
- Payment integration (Stripe)
- Completion certificates
- Discussion forums
- Search functionality
- Mobile app