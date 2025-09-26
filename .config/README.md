# Environment Configuration

This folder contains all environment configurations for different environments.
**DO NOT COMMIT ANY .env FILES TO GIT**

## File Structure

```
.config/
├── .env.local          # Local development (Docker Postgres)
├── .env.production     # Production (Supabase)
├── .env.example        # Template for new developers
└── README.md          # This file
```

## Usage

### For Local Development:
```bash
# Copy the local config to root (Prisma needs it there)
cp .config/.env.local .env

# Or use dotenv-cli
npx dotenv -e .config/.env.local -- npm run dev
```

### For Production Build:
```bash
# Copy production config
cp .config/.env.production .env

# Or use dotenv-cli
npx dotenv -e .config/.env.production -- npm run build
```

## Environment Files

### `.env.local` - Local Development
- Uses Docker Postgres on port 5433
- Local auth setup
- No external dependencies

### `.env.production` - Production
- Supabase connection
- Cloudflare Stream
- Production secrets

### `.env.example` - Template
- Shows required variables
- No real secrets
- Safe to commit

## Security Notes

1. **Never commit real .env files**
2. **Add `.config/*.env*` to .gitignore** (except .env.example)
3. **Use different secrets for each environment**
4. **Rotate secrets regularly**

## Loading Order

Next.js loads env files in this order:
1. `.env.local` (highest priority)
2. `.env.[NODE_ENV]`
3. `.env`

Prisma only reads from `.env` in the root, so we copy when needed.