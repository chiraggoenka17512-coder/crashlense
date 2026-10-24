# 🏛️ ORCATHON 2026 — MASTER ARCHITECTURAL & AGENT COORDINATION SPECIFICATION
> ⚠️ **CRITICAL AGENT NOTICE — SUBJECT TO CHANGE ACCORDING TO PROBLEM STATEMENT**:
> **All features, data models, UI panes, problem categories, device screens, and API payloads detailed in this specification are modular architectural templates and are SUBJECT TO IMMEDIATE ADAPTATION & CHANGE based on the officially released hackathon problem statement.**
>
> When the official problem statement is announced, every coding agent (Antigravity, Cursor, Claude Code) must preserve this underlying architectural foundation (Next.js 16 + Three.js + Clerk + Supabase + Drizzle + Upstash + PWA + Vercel) while modifying the domain models, screen mockups, copy, and endpoints to directly solve the specific problem statement.

---

## 📐 SECTION 1: MASTER DESIGN SYSTEM & TOKENS *(Subject to Problem Statement Branding)*

### 1.1 Palette & Surfaces (Strict Anti-Slop Standard)
*No radioactive neon glows or generic purple gradients.* All components must use the core tokens defined in `src/app/globals.css`. Note that accent colors may be tuned to match the problem statement domain (e.g., healthcare greens, fintech blues, civic ambers):

```css
/* Core Color System (Adaptable to Problem Statement Domain) */
--background: #08090d;          /* Pitch Noir base */
--foreground: #f1f5f9;          /* High-contrast neutral text */
--cream-accent: #ffedd6;        /* Oryzo warm vanilla gold (adaptable) */
--surface-base: #08090d;        /* Deepest layer */
--surface-elevated: rgba(14, 16, 23, 0.72); /* Glass backdrop */
--surface-card: rgba(18, 20, 29, 0.70);     /* Interactive card */
--border-subtle: rgba(255, 237, 214, 0.08); /* Warm hairline border */
--border-prominent: rgba(255, 237, 214, 0.18);
--accent-primary: #f59e0b;       /* Muted amber for active telemetry (adaptable) */
--accent-green: #10b981;         /* Live latency/status dot */
```

### 1.2 Typography Hierarchy
- **Display Headings**: `var(--font-outfit)`, `font-extrabold`, letter-spacing `-0.03em`.
- **Body & Editorial**: `var(--font-geist-sans)`, `font-normal`, line-height `1.6`.
- **Telemetry & Technical Calipers**: `var(--font-geist-mono)`, `font-medium`, tabular figures.

### 1.3 Tactile Glassmorphism Standard
All floating cards, browser panes, and HUD overlays must use:
```tsx
className="bg-[rgba(18,20,29,0.75)] backdrop-blur-xl border border-[rgba(255,237,214,0.1)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl"
```

---

## 🎨 SECTION 2: EXACT UI DESIGN & WIREFRAME BLUEPRINTS *(Pixel-Perfect Specification)*

> ⚠️ *Note to Agents: The exact layouts, wireframe schematics, dimensions, and CSS classes defined below are the non-negotiable visual contract. Modify text and mockups to fit the problem statement, but preserve the exact visual geometry, padding, and layout structure.*

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     GLOBAL STICKY NAVBAR                                         │
│ [ORCATHON 2026]              [Overview]  [Solution]  [Telemetry]  [Specs]    (● 14ms) [LAUNCH APP]│
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 1: HERO VIEWPORT]                                                                          │
│  "ENGINEERED FOR HIGH-STAKES PROBLEM RESOLUTION"                           [ TIME REMAINING ]    │
│                                                                                                  │
│   RESOLVING THE UNRESOLVED.                                                                      │
│   [Dynamic Problem Statement Solution Hook]                       ┌───────────────────────────┐  │
│                                                                   │   CAD VECTOR CROSSHAIRS   │  │
│   Subtitle description explaining the problem-solving             │      [+142.00, -84.12]    │  │
│   architecture with crisp clarity and zero fluff.                 │   ┌───────────────────┐   │  │
│                                                                   │   │ 3D FLOATING PHONE │   │  │
│   [ LAUNCH APPLICATION ]   [ EXPLORE ARCHITECTURE ↓ ]             │   │  (LIVE APP HUD)   │   │  │
│                                                                   │   └───────────────────┘   │  │
│                                                                   │   DIM: 6.1" SUPER RETINA  │  │
│                                                                   └───────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 2: EXPANDING DESKTOP BROWSER PANE]                                                         │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ (● ● ●)  https://orcathon.app/dashboard                                [SECURE TLS 1.3]    │  │
│  ├─────────────┬──────────────────────────────────────────────────────────────────────────────┤  │
│  │ [Sidebar]   │  [Metric 1: Impact]       [Metric 2: Processed]       [Metric 3: Latency]    │  │
│  │ • Overview  ├──────────────────────────────────────────────────────────────────────────────┤  │
│  │ • Signals   │                                                                              │  │
│  │ • Engine    │  [LIVE INTERACTIVE PROBLEM-SOLVER WORKSPACE / DATA CANVAS]                   │  │
│  │ • Settings  │  (Interactive UI addressing the specific released problem statement)         │  │
│  └─────────────┴──────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 3: CROSS-PLATFORM SYNCHRONIZED ECOSYSTEM]                                                  │
│  ┌──────────────────────────────────────────────┐        ┌─────────────────────────────┐         │
│  │ DESKTOP WEB APPLICATION VIEWPORT             │        │ MOBILE PWA COMPANION        │         │
│  │ Admin / High-density data grid & analysis    │ =====> │ Real-time field capture &   │         │
│  │ [Dispatch Task]  [Live Telemetry Feed]       │ (Sync) │ notification HUD            │         │
│  └──────────────────────────────────────────────┘        └─────────────────────────────┘         │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 4: THE "SMART FLIP" ARCHITECTURE WORKBENCH]                                                │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ ▦ ▦ ▦ ▦ ▦ ▦  PHYSICAL CUTTING MAT WORKBENCH (GRID LINES & CRAFT CALIPERS) ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦│  │
│  │                                                                                            │  │
│  │                         [ FLIP DEVICE TO INSPECT ARCHITECTURE ]                            │  │
│  │                                                                                            │  │
│  │    [FRONT: 3D DEVICE]  =====(180° Flip)=====>   [BACK: LIVE TELEMETRY ENGINE]              │  │
│  │    Live solution interface                      • Drizzle ORM Query Stream (glowing)       │  │
│  │                                                 • Supabase Postgres Ping: 12ms             │  │
│  │                                                 • Upstash Redis Cache Hit: 99.4%           │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 5: TECHNICAL BLUEPRINTS & ALGORITHMIC PROOF]                                               │
│  ┌──────────────────────────────────────────────┐  ┌──────────────────────────────────────────┐  │
│  │ MATHEMATICAL FORMULATION & ROPE SCHEMATICS   │  │ INTERACTIVE REPOSITORY INSPECTOR         │  │
│  │  ┌────────────────────────────────────────┐  │  │ [schema.ts]  [route.ts]  [worker.ts]     │  │
│  │  │ C = 4πA / P²                           │  │  │ 1: export const problemSignals = pgTable(│  │
│  │  │ Latency reduction: ΔT = T_0 * e^(-k*N) │  │  │ 2:   id: serial("id").primaryKey(),      │  │
│  │  └────────────────────────────────────────┘  │  │ 3:   impactScore: integer().notNull()    │  │
│  └──────────────────────────────────────────────┘  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 6: EDITORIAL CAROUSEL (ORYZO "WEARABLE" BENTO)]                                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────────┐   │
│  │ [ISSUE NO. 001]  │  │ ⚠️ WARNING       │  │ "QUOTE PROOF"    │  │ [TECHNICAL SPEC]        │   │
│  │ Problem Use-Case │  │ Built under 48h  │  │ Verified impact  │  │ Barcode SVG             │   │
│  │ High-res imagery │  │ of high caffeine │  │ by domain users  │  │ Metric Readout          │   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └─────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                                  │
│  [ACT 7: MINIMALIST LUXURY FOOTER]                                                               │
│   IF WE CAN SOLVE THIS PROBLEM, IMAGINE WHAT WE CAN BUILD NEXT.                                  │
│   [ Your email address...                          ]  [ -> ]                                     │
│   • Product        • Architecture        • Hackathon Track        • Live Uptime (● 99.98%)       │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.1 Detailed Component Specifications

#### A. Global Navigation Bar (`src/components/navbar.tsx`)
- **Container**: `fixed top-0 left-0 right-0 z-50 h-16 bg-[#08090d]/80 backdrop-blur-md border-b border-[rgba(255,237,214,0.08)]`
- **Inner Width**: `max-w-7xl mx-auto px-6 h-full flex items-center justify-between`
- **Left**:
  - Logo: `flex items-center gap-2.5 group cursor-pointer`
  - Glyph: 24x24px rounded-md square with subtle amber gradient border and white glyph.
  - Title: `<span className="font-display font-extrabold text-sm tracking-tight text-[#ffedd6]">ORCATHON <span className="text-neutral-500 font-mono text-xs font-normal">2026</span></span>`
- **Center (Desktop)**:
  - Nav Items: `hidden md:flex items-center gap-1 bg-[#12141d]/60 border border-white/5 rounded-full px-3 py-1`
  - Links: `[Overview]`, `[Solution]`, `[Telemetry]`, `[Specs]`. `font-mono text-xs text-neutral-400 hover:text-[#ffedd6] px-3 py-1 transition-colors rounded-full`
- **Right**:
  - Latency Pill: `<div className="hidden lg:flex items-center gap-1.5 font-mono text-[11px] text-emerald-400/90 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 14ms edge</div>`
  - Auth / Launch Button:
    - If Guest: `<button className="bg-[#ffedd6] text-[#08090d] hover:bg-white font-sans font-semibold text-xs tracking-wide uppercase px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">Launch App →</button>`
    - If Authenticated: Shows Clerk `<UserButton />` with custom dark theme.

#### B. Act 1: Hero Section (`src/components/hero/index.tsx`)
- **Container**: `relative min-h-[90dvh] pt-28 pb-16 flex flex-col justify-center overflow-hidden`
- **Top Sub-bar**: `flex items-center justify-between max-w-7xl mx-auto w-full px-6 mb-6 font-mono text-xs text-neutral-500`
  - Left: `"MADE FOR REAL-WORLD STAKES. BUILT FOR SCALE."`
  - Right: `[ 48:00:00 LIVE COUNTDOWN ]`
- **Main Heading Block**: `max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`
  - **Left Column (7 cols)**:
    - Eyebrow: `<div className="inline-flex items-center gap-2 font-mono text-xs text-amber-300/80 bg-amber-950/30 border border-amber-500/20 px-3 py-1 rounded-full mb-4">● TRACK SOLUTION PROTOCOL</div>`
    - Main Title: `<h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white leading-[1.02]">RESOLVING THE<br /><span className="text-[#ffedd6]">UNRESOLVED.</span></h1>`
    - Description: `<p className="mt-6 text-neutral-400 text-base sm:text-lg max-w-xl font-sans leading-relaxed">Production-grade architecture engineered for the hackathon problem statement. Real-time telemetry, verifiable impact scores, and sub-50ms query cycles.</p>`
    - Actions: `flex flex-wrap items-center gap-4 mt-8`
      - Primary: `bg-[#ffedd6] text-[#08090d] font-semibold text-sm px-6 py-3 rounded-full hover:bg-white transition-all`
      - Secondary: `border border-white/10 text-white font-mono text-xs px-5 py-3 rounded-full hover:border-white/30 bg-white/5 backdrop-blur-sm transition-all`
  - **Right Column (5 cols) — The 3D Device Stage**:
    - Bounding Box Container: `relative w-full aspect-[4/5] max-w-[420px] mx-auto flex items-center justify-center`
    - CAD Overlay: Absolute positioned dashed borders (`border border-dashed border-white/20`), 4 corner crosshairs (`+`), and coordinate markers (`[X: +142.10, Y: -89.44]`).
    - 3D Canvas: Embedded Three.js canvas displaying the responsive device tilting to cursor movement with dynamic screen UI.

#### C. Act 2: Expanding Desktop Browser Pane (`src/components/panes/DesktopAppPane.tsx`)
- **Container**: `max-w-6xl mx-auto px-6 py-20 w-full`
- **Browser Window Shell**:
  - `rounded-2xl border border-[rgba(255,237,214,0.12)] bg-[#0d0f17] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden`
  - **Titlebar**: `h-10 bg-[#08090d] border-b border-white/5 px-4 flex items-center justify-between`
    - Window Dots: `flex items-center gap-2` (Red `#ff5f56`, Yellow `#ffbd2e`, Green `#27c93f`, 10px circles).
    - URL Bar: `bg-[#12141d] border border-white/5 rounded-md px-4 py-1 text-[11px] font-mono text-neutral-400 flex items-center gap-2 max-w-md w-full justify-center` (with lock icon).
    - Status: `font-mono text-[10px] text-neutral-500 uppercase tracking-wider` (`TLS 1.3 | HTTP/3`).
  - **Window Body**:
    - Layout: Left sidebar rail (48px collapsed on mobile, 200px on desktop) + Main Data Grid.
    - Top Metrics: 3-column stats (`[Impact Rating]`, `[Response Latency: 12ms]`, `[Verification Hash: #8F3A]`).
    - Main Workspace: Clean data visualization or functional form tailored to the released problem statement.

#### D. Act 4: Interactive Telemetry & Smart Flip (`src/components/telemetry/FlipWorkbench.tsx`)
- **Background**: Industrial green cutting mat (`background: #0d1a12`, grid overlay `1px linear-gradient to right/bottom #183324 20px 20px`).
- **Tools**: Styled SVG calipers, craft utility knife, and paperclips flanking the center stage.
- **Flip Trigger**:
  - `<button className="mx-auto block font-mono text-xs uppercase tracking-widest text-[#ffedd6] bg-[#08090d] border border-white/20 px-6 py-3 rounded-full hover:border-[#ffedd6] transition-all shadow-xl">Flip to Telemetry Engine ⟲</button>`
- **Backface Engine Display**:
  - Live Drizzle ORM query log terminal (monochrome Geist Mono, line numbers, emerald green syntax highlights).
  - Supabase pooler connection ping gauge.
  - Upstash Redis token consumption progress bar (`[████████░░] 8.2 / 10 req/s`).

#### E. Act 5: Technical Blueprints & Formulas (`src/components/schematics/BlueprintSpecs.tsx`)
- **Container**: `max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`
- **Left Column (5 cols)**:
  - Technical SVG mathematical formulas:
    - Area to Perimeter ratio ($C = \frac{4\pi A}{P^2}$).
    - Algorithmic latency curve graph ($L(n) = O(\log n)$).
  - Monospace footnotes: `"THERMAL DIFFUSION MODEL (TDM) — A technical visualization, not a warranty."`
- **Right Column (7 cols)**:
  - Code Inspector Card: Multi-tab editor (`schema.ts`, `route.ts`, `worker.ts`).
  - Dark syntax-highlighted code with line numbers, copy button, and Drizzle/Supabase code snippets.

#### F. Act 6: Editorial Bento Carousel (`src/components/carousel/EditorialCards.tsx`)
- **Container**: `w-full py-16 overflow-hidden`
- **Header**: Left: `"SO PORTABLE, IT'S WEARABLE"`, Right: `"ISSUE NO. 00124"`.
- **Carousel Track**: Horizontal scrolling flex container (`flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar px-6 max-w-7xl mx-auto`).
- **Cards**:
  - **Card 1 (Magazine Cover)**: `w-[320px] shrink-0 aspect-[3/4] bg-[#12141d] border border-white/10 rounded-2xl p-6 flex flex-col justify-between`. Barcode SVG on bottom right.
  - **Card 2 (Warning Card)**: Yellow hazard warning badge (`WARNING: Stunt performed by professional engineers under 48 hours of caffeine.`).
  - **Card 3 (User Testimonial)**: 5-star rating SVG (`[ 4.9/5 ]`), quoted review, author avatar and title.
  - **Card 4 (Technical Caliper)**: Precision hardware / software specs.

#### G. Act 7: Minimalist Luxury Footer (`src/components/footer.tsx`)
- **Container**: `border-t border-[rgba(255,237,214,0.08)] bg-[#050608] py-20 px-6`
- **Main Statement**: `<h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-4xl tracking-tight leading-tight">IF WE CAN SOLVE THIS PROBLEM, IMAGINE WHAT WE CAN BUILD NEXT.</h2>`
- **Newsletter / Contact Input**: `mt-8 flex max-w-md items-center border-b border-white/20 pb-2 focus-within:border-[#ffedd6]`
  - Input: `bg-transparent text-white font-mono text-xs placeholder:text-neutral-600 focus:outline-none w-full`
  - Submit: `text-white hover:text-[#ffedd6] font-mono text-sm px-2`
- **Bottom Bar**: `mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-neutral-500 font-mono text-xs gap-4`
  - Copyright: `© 2026 Orcathon Submission Team. All rights reserved.`
  - System Uptime: `● All Systems Operational | Edge Region: iad1`

---

## 📱 SECTION 3: RESPONSIVE SYSTEM & MOBILE PHONE OPTIMIZATIONS *(Subject to App Requirements)*

### 3.1 Viewport Breakpoints
- **Mobile (`< 640px`)**: Single column stack. Dynamic viewport height (`min-h-dvh`). 3D Canvas switches to lightweight touch-tilt mode.
- **Tablet (`640px – 1024px`)**: Scaled 3D viewport, horizontal swipe cards.
- **Desktop (`> 1024px`)**: Full dual-pane view (3D Device + Floating Desktop Browser Pane). GSAP ScrollTrigger active.

### 3.2 Mobile Safari & Chrome Safe Areas
All full-bleed views must observe iOS/Android notches:
```css
padding-top: max(1rem, env(safe-area-inset-top));
padding-bottom: max(1rem, env(safe-area-inset-bottom));
```

### 3.3 3D Canvas Responsive Strategy (`src/components/canvas/`)
- **Desktop**: Three.js WebGL canvas runs at `devicePixelRatio: min(window.devicePixelRatio, 2)` with full PBR environment reflection and mouse parallax.
- **Mobile**: Automatically clamps `devicePixelRatio: 1`, disables heavy post-processing passes (SMAA / bloom), and uses device orientation/touch gestures to ensure **60fps locked performance**.

---

## 🗄️ SECTION 4: BACKEND SPECIFICATIONS & API CONTRACTS *(Subject to Problem Statement Data Needs)*

> ⚠️ *Note to Agents: The schema below is the base template. You must extend or replace table columns and schemas according to the entity requirements of the released problem statement.*

### 4.1 Database Layer (PostgreSQL on Supabase via Drizzle ORM)
Located in `src/db/schema.ts` *(Template schema — update according to problem statement)*:

```typescript
import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

// TEMPLATE TABLE: Update fields to match the entities of the released problem statement
export const problemSignals = pgTable("problem_signals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("general"), // Dynamic: health, civic, ai, fintech, etc.
  status: text("status").notNull().default("open"),        // Dynamic: open, processing, resolved
  impactScore: integer("impact_score").notNull().default(3), // 1-5 scale
  notes: text("notes"),
  evidenceMetadata: jsonb("evidence_metadata").$type<{
    reportedBy?: string;
    metrics?: Record<string, any>;
    customPayload?: Record<string, any>; // Adaptable to problem statement specifics
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### 4.2 Database Connection Pooler (Serverless Safe)
In `src/db/index.ts`:
- Connection uses Supabase **Transaction Pooler (`port 6543`)** with `?pgbouncer=true`.
- Prevents connection exhaustion during Vercel serverless scale-outs.

### 4.3 Redis Rate Limiting & Caching (`src/lib/redis.ts`)
- Provider: Upstash Redis REST.
- Algorithm: Sliding window limiter (`10 requests per 10 seconds per IP`).

### 4.4 API Endpoints Specification *(Subject to Problem Statement Operations)*

| Route | Method | Auth Required | Description | Status |
| :--- | :---: | :---: | :--- | :--- :--- |
| `/api/health` | `GET` | No | System health and Node runtime version | Fixed Foundation |
| `/api/db-check` | `GET` | No | Real SELECT query against Supabase Postgres | Fixed Foundation |
| `/api/redis-check` | `GET` | No | Upstash Redis ping and rate limit counter | Fixed Foundation |
| `/api/signals` | `GET` | No | Fetches problem-solution records | **Subject to Problem Statement** |
| `/api/signals` | `POST` | Yes / Rate Guard | Inserts verified solution record | **Subject to Problem Statement** |

---

## 🔐 SECTION 5: AUTHENTICATION SPECIFICATIONS (Clerk) *(Roles Subject to Problem Statement)*

1. **Provider**: `@clerk/nextjs` (v7) wrapped in `RootLayout`.
2. **Access Modes**:
   - **Guest Sandbox Mode**: Judges can access `/app?demo=true` immediately without creating an account.
   - **Authenticated Mode**: Sign In / Sign Up modal powered by Clerk (`Google`, `GitHub`, or `Email`).
3. **Role Customization**: Roles (e.g. Student/Teacher, Doctor/Patient, Buyer/Seller) will be assigned based on the problem statement.

---

## 📲 SECTION 6: PROGRESSIVE WEB APP (PWA) SPECIFICATION *(Icons & Name Subject to Problem Statement)*

1. **Manifest File**: Located at `public/manifest.json`.
> *Note: `name`, `short_name`, and icons are placeholders and will be customized to match the final app branding once the problem statement is selected.*

```json
{
  "name": "Orcathon 2026 Solution App",
  "short_name": "OrcathonApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#08090d",
  "theme_color": "#08090d",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## ☁️ SECTION 7: VERCEL DEPLOYMENT PROTOCOL (ZERO-FAIL)

### 7.1 Required Environment Variables in Vercel
```env
DATABASE_URL="postgres://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsIn..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
UPSTASH_REDIS_REST_URL="https://[ENDPOINT].upstash.io"
UPSTASH_REDIS_REST_TOKEN="AZ..."
```

### 7.2 Vercel Build Verification
- Build Command: `npm run build` (Pre-tested and confirmed passing).
- Output: Standard `.next` App Router with Turbopack.
- Edge Compatibility: Dynamic routes marked with `export const dynamic = "force-dynamic"`.

---

## 🎬 SECTION 8: PITCH VIDEO & SLIDE RECORDING SPECIFICATION *(Narrative Subject to Problem Statement)*

1. **Screen Recording Flow**:
   - 0:00 - 0:30: Core Problem Statement Hook & Hero Viewport.
   - 0:30 - 1:15: Expanding Desktop Web App solving the core pain point.
   - 1:15 - 1:45: Mobile PWA companion and cross-platform live sync.
   - 1:45 - 2:15: "Smart Flip" telemetry showing database & Redis latency.
   - 2:15 - 2:45: Algorithmic validation and impact metrics.
   - 2:45 - 3:00: Live app launch CTA & closing pitch.
2. **Built-in Presentation Mode**:
   - `ArrowRight` (Next Act/Slide), `ArrowLeft` (Previous Act/Slide).
