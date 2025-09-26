# Clean Project Structure

## 📁 Organized Directory Structure

```
rudi-web/
├── src/                    # Source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components  
│   └── lib/               # Utilities and configs
│
├── docs/                  # All documentation
│   ├── README.md          # Main project readme
│   ├── PROJECT_STRUCTURE.md
│   ├── SETUP_INSTRUCTIONS.md
│   ├── PRD.md             # Product requirements
│   ├── TECH-STACK-RATIONALE.md
│   ├── GRAMMAR-OPS-ALIGNMENT.md
│   ├── LAUNCH-STRATEGY.md
│   ├── CLOUDFLARE-SETUP.md
│   └── COURSE_INTEGRATION_PLAN.md
│
├── config/                # Environment & settings
│   ├── .env               # Base environment
│   ├── .env.development   # Dev environment
│   ├── .env.production    # Production environment
│   ├── .env.local.example # Example env file
│   ├── components.json    # shadcn/ui config
│   └── .grammarops.config.json
│
├── archive/               # Historical/unused files
│   ├── bzhoff-main/      # Old project files
│   ├── content/          # Old content
│   ├── tests/            # Old test setup
│   ├── transcripts/      # Old transcript files
│   ├── idea.txt          # Brainstorming notes
│   ├── notes.md          # Development notes
│   ├── about-me.md       # Personal docs
│   └── courses .md       # Old course notes
│
├── temp/                  # Temporary build artifacts
│   └── module-01-videos.json
│
├── supabase/              # Database & backend
├── scripts/               # Automation scripts
├── grammar-ops/           # Design patterns
├── prisma/                # Database ORM (alternative)
├── public/                # Static assets
│
# Root files (must stay in root for tooling)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind config
├── postcss.config.js      # PostCSS config
├── next.config.ts         # Next.js config
├── eslint.config.mjs      # ESLint config
├── next-env.d.ts          # Next.js types
├── docker-compose.yml     # Local dev setup
├── .env.local             # Local environment (active)
├── .gitignore             # Git ignore rules
└── .DS_Store              # macOS folder view settings
```

## 🧹 Cleanup Summary

### Files Moved to `docs/`
- All `.md` documentation files
- Product requirements and technical specs
- Setup and configuration guides

### Files Moved to `config/`
- Environment configuration files
- Tool-specific config files (where possible)
- Component library configurations

### Files Moved to `archive/`
- Historical project files (`bzhoff-main/`)
- Old development notes and ideas
- Unused directories (`content/`, `tests/`)
- Personal documentation files

### Files Moved to `temp/`
- Build artifacts
- Upload results and temporary files

## 🔒 Files That Must Stay in Root

These files **cannot** be moved as they are required by Next.js and other tools:

- `package.json` - npm/yarn dependency management
- `tsconfig.json` - TypeScript compiler
- `tailwind.config.js` - Tailwind CSS
- `postcss.config.js` - PostCSS processing
- `next.config.ts` - Next.js configuration
- `eslint.config.mjs` - ESLint linting
- `next-env.d.ts` - Next.js type definitions
- `.env.local` - Active local environment

## 📂 Directory Purposes

- **`docs/`** - All project documentation in one place
- **`config/`** - Configuration files that can be moved
- **`archive/`** - Keep old files but organized
- **`temp/`** - Temporary files that can be deleted
- **Core folders** - Remain untouched (`src/`, `supabase/`, `scripts/`, etc.)

## 🎯 Benefits

1. **Cleaner root** - Only essential files in root directory
2. **Organized docs** - All documentation in one place
3. **Preserved history** - Old files archived, not deleted
4. **Tool compatibility** - Required files stay in correct locations
5. **Clear structure** - Easy to find what you need

## 🔧 Next Steps

1. Update any scripts that reference moved files
2. Consider creating symbolic links for frequently accessed docs
3. Add `temp/` and `archive/` to `.gitignore` if desired
4. Review archived files periodically for cleanup