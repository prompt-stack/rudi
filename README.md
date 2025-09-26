## RUDI Web

Modern Next.js frontend for RUDI with secure defaults and a content pipeline (Cloudflare Stream + Supabase).

### Quick Start
- Install: `npm ci`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`

### Environment Setup
Create `.env.local` at project root for frontend runtime variables. Only expose `NEXT_PUBLIC_*` to the browser.

Required (frontend):
- `NEXT_PUBLIC_SITE_URL` — public site URL (optional, used in links/meta)
- `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` — Cloudflare Stream account (optional; used for customer domain embeds)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key

Notes:
- Secrets (service keys, tokens) must NOT use `NEXT_PUBLIC_` and must not be required by the browser. Keep them in server envs or `.secure/`.
- `config/.env*` is ignored; use it for local variations and keep only `config/.env.local.example` in git.

### Security Defaults
- Strict headers (HSTS, XFO DENY, no sniffing, referrer policy, permissions policy)
- CSP allowing only necessary origins: self, Supabase, and Cloudflare Stream
- Admin/debug database API is disabled in production

### CI
GitHub Actions runs lint, typecheck, and build on PRs and pushes to main.

### Content Pipeline (Optional)
Scripts under `scripts/` and `rudi-lms-package/` handle video and asset upload. Configure via environment variables (no plaintext credentials in repo).

