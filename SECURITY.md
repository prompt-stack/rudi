## Security Guidelines

### Principles
- No plaintext secrets in the repository. Use environment variables and secret stores.
- Minimize data exposure. Only return fields required by the UI.
- Defense-in-depth: secure headers, CSP, middleware, and authenticated APIs.

### Secrets & Environments
- Keep secrets out of `NEXT_PUBLIC_*` vars (browser-exposed).
- `config/.env*` files are ignored by git; keep only sanitized examples committed.
- Prefer `.secure/` (ignored) or CI/CD secret stores for production keys.

### HTTP Security
- Strict headers enabled in `next.config.ts`:
  - HSTS, X-Frame-Options=DENY, X-Content-Type-Options=nosniff,
    Referrer-Policy, Permissions-Policy
- Content Security Policy restricts sources to self, Supabase, and Cloudflare Stream.

### APIs
- Admin/debug endpoints must be protected or disabled in production.
- Validate and authorize all requests; log and rate-limit as appropriate.

### Frontend
- Use `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` for customer domain embeds; fallback to generic iframe domain.
- Avoid dynamic code execution; prefer static imports. Limit inline scripts where possible.

### Dependencies
- Keep dependencies updated; run CI for lint/typecheck/build.
- Review and remediate advisories promptly.

