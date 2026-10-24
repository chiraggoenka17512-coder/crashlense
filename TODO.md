# 📋 Orcathon 2026 — Priority TODOs for Tomorrow

## 🚀 Status as of Tonight
- [x] **Full-Stack Architecture Initialized**: Next.js 16 + React 19 + Supabase Client + Clerk Auth + Drizzle ORM + Upstash Redis.
- [x] **Database & Caching Layer**: `src/db/schema.ts` (with flexible JSONB metadata), Drizzle client with Postgres pooling, Upstash Redis client with sliding-window rate limiting.
- [x] **GitHub Repository Created & Pushed via GitHub MCP**:
  - Repo URL: [https://github.com/chiraggoenka17512-coder/orcathon-2026](https://github.com/chiraggoenka17512-coder/orcathon-2026)
  - Branch `main` up to date with initial commits.
- [x] **Live Health Endpoints**: `/api/health`, `/api/db-check`, `/api/redis-check`.

---

## 🎯 Priority 1: Eliminate AI Design Slop & Redesign with Impeccable Craft
*Objective: Transform the interface from generic AI tropes (neon gradient text, cookie-cutter purple glow cards) into an editorial, human-crafted design with taste and tactile delight.*

- [ ] **Audit via `impeccable` & `no-ai-slop` Skills**:
  - Run the design through the anti-slop checklist (strip gratuitous background glows, generic "built for developers" copy, and uniform 3-card bentos).
  - Adopt an authentic visual identity: high typographic contrast, tight metric rhythm, bespoke surface depth, and deliberate density.
- [ ] **Refactor Hero & Visual Hierarchy**:
  - Replace generic neon text gradients with confident editorial typography (Syne/Outfit + Geist Mono).
  - Refine atmospheric layers into a subtle, textured backdrop rather than over-saturated glow effects.
  - Implement tactile micro-interactions (magnetic dock feel, subtle spring physics, active state indentations).
- [ ] **Track Adapter & Data Presentation**:
  - Redesign the track selector into a clean interactive inspector with realistic code previews and functional state toggles.

---

## ☁️ Priority 2: Vercel Deployment via Vercel MCP / CLI
- [ ] Authenticate Vercel MCP / CLI session.
- [ ] Link the existing GitHub repo (`chiraggoenka17512-coder/orcathon-2026`) directly to a new Vercel project.
- [ ] Configure environment variables in Vercel Project Settings:
  - `DATABASE_URL` (Supabase Connection Pooler)
  - `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
  - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`
- [ ] Trigger the first production deployment and verify live SSL domain.

---

## 🏁 Priority 3: Sunday Hackathon Readiness Check
- [ ] Verify Supabase database tables via `npm run db:push`.
- [ ] Test Clerk sign-in modal in staging.
- [ ] Verify Upstash Redis rate-limiter response.
