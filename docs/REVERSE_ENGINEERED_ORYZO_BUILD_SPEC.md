# 🏛️ ORCATHON 2026 // MASTER SPECIFICATION: 1:1 ORYZO.AI REVERSE ENGINEERING & MODULAR REDESIGN SYSTEM
*Prepared in accordance with the JS Mastery Prompter Agentic Architecture & REA Reverse Engineering Framework.*

---

## 📋 TABLE OF CONTENTS
1. [Executive Summary & Core Mandate](#1-executive-summary--core-mandate)
2. [Deep Reverse-Engineering Audit of Oryzo.ai](#2-deep-reverse-engineering-audit-of-oryzoai)
   - 2.1 Spatial Composition & Viewport Geometry
   - 2.2 Three.js 3D WebGL Pipeline & Shaders
   - 2.3 Motion Orchestration & Screen-to-Pane Morph
   - 2.4 Physical Desk Props & Tactile Physics
   - 2.5 Sound Synthesis & Acoustic Haptics
3. [Universal Problem Statement Redesign Architecture](#3-universal-problem-statement-redesign-architecture)
   - 3.1 The Polymorphic Configuration Engine (`problemConfig.ts`)
   - 3.2 Dynamic OLED HUD Surface Abstraction
   - 3.3 Domain-Agnostic Track Adapters
   - 3.4 Decoupled Drizzle ORM JSONB Schema
4. [Master AGENTS.md for Orcathon 2026](#4-master-agentsmd-for-orcathon-2026)
5. [Complete 35-Prompt JS Mastery Agentic Sequence](#5-complete-35-prompt-js-mastery-agentic-sequence)
   - Phase 1: Infrastructure, Config & Database (Prompts 01–04)
   - Phase 2: Design Tokens, Global CSS & Calipers (Prompts 05–08)
   - Phase 3: State Management & Polymorphic Mock Stores (Prompts 09–12)
   - Phase 4: Oryzo 1:1 Physical Desk Stage & Tactile Props (Prompts 13–16)
   - Phase 5: Three.js 3D iPhone 16 Pro WebGL Centerpiece (Prompts 17–20)
   - Phase 6: Screen-to-Pane Blend Morph & Expanding Browser (Prompts 21–24)
   - Phase 7: Application Showcases & Real-Time Engines (Prompts 25–28)
   - Phase 8: Multi-Route Workspaces & Inspector Panes (Prompts 29–31)
   - Phase 9: Edge Auth, Probes & Database Streaming (Prompts 32–33)
   - Phase 10: Production Hardening, PWA, Sound & Verification (Prompts 34–35)
6. [Granular Asset Inventory: Existing vs. Left to be Generated](#6-granular-asset-inventory-existing-vs-left-to-be-generated)
7. [Conclusion & Next Step Directive](#7-conclusion--next-step-directive)
8. [Revised 6-Stage Scroll Flow & Conversion Architecture](#8-revised-6-stage-scroll-flow--conversion-architecture)
   - *Standalone Specification: [ORCATHON_LANDING_PAGE_ARCHITECTURE.md](./ORCATHON_LANDING_PAGE_ARCHITECTURE.md)*

---

## 1. EXECUTIVE SUMMARY & CORE MANDATE

### 1.1 The Objective
To execute a **1:1 visual, physical, and architectural replication** of the award-winning **Oryzo.ai** website (created by Lusion), substituting Oryzo's cork coaster with an interactive **Apple iPhone 16 Pro 3D WebGL model running the Orcathon Problem Solver app**. 

### 1.2 The Problem Statement Decoupling Challenge
Because the official Hackathon Problem Statement is announced on Sunday morning, the architecture **cannot hardcode domain assumptions**. Every UI element—from the 60 FPS OLED screen HUD on the phone, to the problem signal filters, telemetry dials, and Drizzle database streams—must be decoupled through an ultra-flexible polymorphic engine (`src/lib/problemConfig.ts`). When Sunday's prompt drops, changing a single configuration file will instantly re-skin the entire application across all 4 tracks (AI & Discovery, FinTech & DeFi, Civic Tech, Healthcare & Bio) in under 60 seconds.

### 1.3 Negative Build Constraint
**NO CODE MODIFICATIONS WILL BE PERFORMED AT THIS STAGE.** This document acts as the complete, authoritative architectural blueprint, accompanied by an actionable 35-prompt execution sequence and an asset generation manifest.

---

## 2. DEEP REVERSE-ENGINEERING AUDIT OF ORYZO.AI

Using our inspection of `https://oryzo.ai/`, the `morluto/rea` reverse engineering toolkit, and DevTools layout telemetry, we have dissected Oryzo's core engineering mechanisms:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   ORYZO.AI HERO STAGE                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [Top Bar Eyebrow]  "MADE FOR ORCATHON. BUILT FOR SCALE."             [o ─] (Status)    │
│                                                                                        │
│                      O  R  C  A  T  H  O  N                                            │
│                 (Giant Geometric Bold Display Title)                                   │
│                                                                                        │
│   [Olfa Utility Knife]                                  [Koh-I-Noor Eraser]            │
│   (Hover extends segmented blade)                       (Wobble physics on click)      │
│                                                                                        │
│                            ┌───────────────────────┐                                   │
│   [Wooden Pencil]          │ 3D iPHONE 16 PRO GLB  │     [Scattered Paper Clips]       │
│   (Click to roll)          │ 60 FPS Live OLED HUD  │     (Hover scatter springs)       │
│                            │ 180° Flip: Titanium   │                                   │
│                            └───────────────────────┘                                   │
│                               ▲ Contact Shadow Plane                                   │
│   [Frosted Glass Card]        ▦ Green A2 Metric Cutting Mat     [Editorial Copy & Pill]│
│   "CALIPER: +142, -84"        Japanese White Oak Tabletop       "● ORCATHON-26 MODEL"  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Spatial Composition & Viewport Geometry
- **Aspect & Framing**: Full-bleed `100vw` by `100vh` sticky stage locked during scroll interaction.
- **Background Layering**:
  1. Base Tabletop: Japanese White Oak wood grain with horizontal timber flow, diffuse illumination, and natural vignette.
  2. Workspace Surface: A2 Green Metric Cutting Mat (`#1b3a2b` deep forest green) featuring a 10mm primary grid, 1mm sub-grids, 45°/60° angle calipers, and outer millimeter border rules.
  3. Overlay Optics: Fine matte noise grain (`0.035` opacity) and subtle vignette gradient (`rgba(0,0,0,0.4)` on corners) to focus user gaze inward.
- **Typography Scale**:
  - Main Hero Title: Giant all-caps geometric display sans (font-weight `900`), tracking `-0.04em`, occupying `~85vw` width across the upper half of the desk.
  - Eyebrows & Specs: Geist Mono / Outfit (`10px`–`12px`), uppercase, tabular figures with hairline border separators (`rgba(255,237,214,0.12)`).

### 2.2 Three.js 3D WebGL Pipeline & Shaders
- **Camera Configuration**:
  - `PerspectiveCamera` with FOV of `32°` (minimizes perspective distortion, creating an isometric, architectural look).
  - Position: `(0, 0.45, 2.85)` targeted at `(0, -0.05, 0)`.
- **Lighting Rig**:
  1. Key Light: Warm directional light (`#fff5ea`, intensity `2.4`) positioned at `(-2.2, 4.5, 3.0)` casting soft raytraced contact shadows.
  2. Rim / Edge Light: Cool blue-tinted rim light (`#88a0cc`, intensity `1.2`) positioned at `(3.0, 1.5, -2.0)` to define the brushed titanium perimeter.
  3. Ambient Light: Low-intensity ambient occlusion (`#111318`, intensity `0.6`).
- **PBR Shader Calibration (iPhone 16 Pro)**:
  - `Chassis_Frame`: Grade 5 Titanium (`#1a1b22`, roughness `0.22`, metalness `0.95`, micro-anisotropic brushed grain).
  - `Back_Plate`: Frosted Obsidian Glass (`#0e0f14`, roughness `0.58`, metalness `0.10`, high subsurface scattering).
  - `Camera_Island`: Polished Sapphire Crystal plateau (`#08090d`, roughness `0.05`, metalness `0.30`, sharp Fresnel reflection).
  - `Screen_OLED`: Dedicated UV mapping `(0,0)` to `(1,1)` bound to dynamic `THREE.CanvasTexture` updated via an off-screen HTML5 Canvas at 60 FPS.
- **Contact Shadow Plane**: Dedicated transparent ground plane (`y = -0.04`) with a custom blur fragment shader generating a soft contact shadow directly under the device body.

### 2.3 Motion Orchestration & Screen-to-Pane Morph
- **The Core Transition**: As the user scrolls or interacts, the 3D phone screen undergoes a synchronized spatial expansion:
  1. The 3D camera dollies forward (`z: 2.85 -> 0.75`).
  2. The phone rotation interpolates to exact perpendicular alignment `(pitch: 0, yaw: 0, roll: 0)`.
  3. The OLED screen borders expand seamlessly into the 16:9 full-screen desktop browser workspace container (`OryzoScreenBlendMorph`).
  4. The 3D canvas fades opacity while the real DOM desktop browser pane takes over at 100% resolution with interactive tabs and filters.

### 2.4 Physical Desk Props & Tactile Physics
- **Segmented Olfa Utility Knife**: Positioned top-left on the cutting mat. On mouse hover, an SVG/3D segmented blade extends outward by 24px with a sharp metallic ratchet click; on unhover, it retracts.
- **Hexagonal Drafting Pencil**: Natural cedar wood drafting pencil resting at a 12° diagonal. On click, it performs a 360° roll with dampened rotational spring physics (`stiffness: 120, damping: 14`).
- **Koh-I-Noor Technical Eraser**: Two-tone technical eraser. On click, it performs an elastic wobble oscillation along its Z-axis.
- **Scattered Silver Paper Clips**: 4 paper clips resting around the perimeter. On hover, each clip scatters outward by 15px with individual velocity vectors.

### 2.5 Sound Synthesis & Acoustic Haptics
- Oryzo uses real-time tactile micro-audio. Rather than loading heavy WAV files, the interaction layer uses the browser **Web Audio API** to procedurally synthesize clicks:
  - Olfa Knife Blade Click: High-frequency transient pulse (1600 Hz sine burst, 0.03s duration, exponential decay).
  - Pencil Roll: Low-frequency wooden friction resonance (450–600 Hz bandpass filter).
  - Flip Whoosh: Filtered white noise sweep with Q-factor 3.2.

---

## 3. UNIVERSAL PROBLEM STATEMENT REDESIGN ARCHITECTURE

To ensure 100% agility when the hackathon problem statement drops, the codebase follows the **Polymorphic Inversion Pattern**:

```
                          ┌───────────────────────────────┐
                          │    problemConfig.ts (Single   │
                          │   Source of Domain Truth)     │
                          └───────────────┬───────────────┘
                                          │
                 ┌────────────────────────┼────────────────────────┐
                 ▼                        ▼                        ▼
     ┌───────────────────────┐┌───────────────────────┐┌───────────────────────┐
     │  Phone OLED Canvas    ││  Problem Signals Feed ││   Drizzle ORM Engine  │
     │  - Title & Metrics    ││  - Categorized Cards  ││   - JSONB Attributes  │
     │  - Domain Gauges      ││  - Severity & Routing ││   - Query Inspection  │
     └───────────────────────┘└───────────────────────┘└───────────────────────┘
```

### 3.1 The Polymorphic Configuration Engine (`problemConfig.ts`)
A centralized typed file defining the active hackathon problem domain:
```typescript
export interface ProblemDomainConfig {
  id: string;
  domainName: string;         // e.g., "Healthcare & Clinical AI", "Autonomous FinTech", "Civic Water Grid"
  codeBadge: string;          // e.g., "ORC-HLTH-2026"
  headline: string;           // e.g., "CLINICAL TRIALS MATCHING ENGINE"
  subheadline: string;        // Specific value proposition
  accentColor: string;        // e.g., "#10b981", "#38bdf8", "#f59e0b"
  deviceScreenHUD: {
    statusPill: string;
    primaryMetricLabel: string;
    primaryMetricValue: string;
    secondaryMetricLabel: string;
    secondaryMetricValue: string;
    liveLogStream: string[];
  };
  sampleSignals: Array<{
    id: string;
    title: string;
    urgency: "CRITICAL" | "HIGH" | "NORMAL";
    payload: Record<string, any>;
  }>;
  drizzleQueries: Array<{
    queryName: string;
    sqlSnippet: string;
    executionTimeMs: number;
  }>;
}
```

### 3.2 Dynamic OLED HUD Surface Abstraction
The Three.js screen does not render static text. It feeds from an off-screen HTML5 canvas element (`DeviceScreenCanvas.tsx`) that reads directly from `problemConfig.ts`. If the user selects a different track or modifies the problem statement, the 3D phone screen updates dynamically in real-time.

### 3.3 Domain-Agnostic Track Adapters
Pre-configured adapters for the 4 hackathon tracks:
1. **AI & Latent Inference**: Real-time embeddings drift, GPU cluster utilization, token latency.
2. **FinTech & DeFi**: Arbitrage slippage, liquidity pool invariant, cryptographic proofs.
3. **Civic & Infrastructure**: Water telemetry, sensor grid fault detection, emergency routing.
4. **Healthcare & Genomic**: Variant pathogenicity scores, tissue expression, patient cohort matching.

---

## 4. MASTER AGENTS.MD FOR ORCATHON 2026

This is the system rulebook that governs every coding agent executing this architecture:

```markdown
# AGENTS.md — Orcathon 2026 Agent Execution Contract

## 1. Project Overview
A 1:1 visual, physical, and architectural replication of Oryzo.ai, transformed into the Orcathon 2026 Weapon-Grade Problem Solver.
Built for instantaneous adaptation to Sunday's hackathon problem statement.

## 2. Tech Stack & Non-Negotiables
- Framework: Next.js 16.4.2 (App Router), React 19, Turbopack, Node.js runtime.
- 3D Engine: Three.js 0.186.1 + @types/three with DRACOLoader and GLTFLoader.
- Styling: Tailwind CSS v4 + Oryzo CSS Design Tokens in `src/app/globals.css`.
- Motion: `motion/react` (Motion v14.6.0) for spring physics and layout morphs.
- Database & ORM: Supabase Postgres + Drizzle ORM (polymorphic JSONB architecture).
- Caching & Limits: Upstash Redis (@upstash/ratelimit, @upstash/redis).
- Auth & Security: Clerk Edge Auth with public 3D asset bypass in `src/proxy.ts`.

## 3. Strict Anti-Slop Visual Standards
- NO White Screen Default: The base surface is Pitch Noir `#07080a`.
- NO Generic Neon Gradients: Palette strictly adheres to Pitch Noir `#07080a`, Warm Cream `#ffedd6`, and Earth Orange `#ff8539`.
- NO Cookie-Cutter Bentos: Use authentic physical desk compositions, A2 cutting mat calipers, and high-density technical HUDs.
- Tactile Micro-Interactions: All clickable props must have spring feedback and Web Audio synthesized haptics.

## 4. The Problem Statement Agility Rule
Never hardcode domain text into UI components. All domain titles, signal categories, and telemetry dials must consume `src/lib/problemConfig.ts`.

## 5. Build & Lint Hygiene
Zero ESLint errors. Zero TypeScript errors. All 3D assets must remain under 2.5 MB.
```

---

## 5. COMPLETE 35-PROMPT JS MASTERY AGENTIC SEQUENCE

Following the JS Mastery Prompter framework, this exact sequential prompt sequence walks an autonomous agent from foundation to Awwwards-winning polish:

---

### 🔹 PHASE 1: INFRASTRUCTURE, CONFIG & DATABASE (Prompts 01–04)

#### Prompt 01: Project Manifest, Rules & Typed Engine Scaffolding
```markdown
Read AGENTS.md first and follow it strictly.

Create the central configuration module for the Orcathon Problem Solver at `src/lib/problemConfig.ts`.
This module must define the `ProblemDomainConfig` interface and export the default problem statement configuration for Orcathon 2026, with full support for 4 tracks: AI Discovery, FinTech, Civic Tech, and Healthcare.
Also create helper accessors to switch tracks dynamically.

Negative Constraints:
- Do not build any UI components or pages in this step.
- Do not modify database schemas or install any new npm dependencies.

(Here paste the latest Next.js 16 App Router TypeScript configuration rules)

Visual Grounding:
Refer to `@prompt_material/01_problem_config_schema.png` for typed schema specifications.
```

#### Prompt 02: Polymorphic Drizzle ORM Database Schema
```markdown
Read AGENTS.md first and follow it strictly.

Implement the polymorphic problem signals schema in `src/db/schema.ts` using Drizzle ORM with Postgres dialect.
The schema must include:
1. `signals`: id (uuid), trackId (varchar), title (text), urgency (varchar), payload (jsonb), createdAt (timestamp).
2. `auditLogs`: id (uuid), signalId (uuid), status (varchar), latencyMs (real), metadata (jsonb).
3. Indexes on `trackId` and gin index on `payload`.

Negative Constraints:
- Do not execute database migrations or push to Supabase yet.
- Do not write API route handlers.

(Here paste the latest Drizzle ORM PostgreSQL JSONB documentation)

Visual Grounding:
Refer to `@prompt_material/02_drizzle_schema_architecture.png` for relational model.
```

#### Prompt 03: Upstash Redis & Supabase Client Ingestion
```markdown
Read AGENTS.md first and follow it strictly.

Configure the database connection pooler in `src/db/index.ts` using Postgres-JS and Supabase connection string.
Implement the sliding-window rate limiter in `src/lib/redis.ts` using `@upstash/ratelimit` and `@upstash/redis` with 100 requests/minute per IP window.

Negative Constraints:
- Do not expose any secret keys on the client bundle (keep strict server-only imports).
- Do not write UI components.

(Here paste the latest Upstash Ratelimit Next.js App Router documentation)

Visual Grounding:
Refer to `@prompt_material/03_redis_ratelimit_flow.png` for rate-limiting sequence.
```

#### Prompt 04: Edge Auth Proxy & Asset Protection
```markdown
Read AGENTS.md first and follow it strictly.

Review and harden `src/proxy.ts` (Clerk Middleware). Ensure public route patterns strictly include:
- `/api/health`, `/api/db-check`, `/api/redis-check`
- All 3D binaries: `/(.*).glb`, `/(.*).gltf`, `/models/(.*)`
- Image assets: `/images/(.*)`, `/icons/(.*)`, `/manifest.json`
Redirect unauthenticated users accessing `/workbench` or `/dashboard` to Clerk sign-in.

Negative Constraints:
- Do not alter Clerk environment variables.
- Do not break the Next.js static asset pipeline.

(Here paste the latest Clerk Next.js App Router middleware documentation)

Visual Grounding:
Refer to `@prompt_material/04_clerk_proxy_routes.png` for route security matrix.
```

---

### 🔹 PHASE 2: DESIGN TOKENS, GLOBAL CSS & CALIPERS (Prompts 05–08)

#### Prompt 05: Oryzo Design Tokens & Root Palette in globals.css
```markdown
Read AGENTS.md first and follow it strictly.

Configure the master Oryzo design tokens in `src/app/globals.css`.
Define CSS variables for:
- `--background: #07080a` (Pitch Noir)
- `--foreground: #f4efe6` (Warm Chalk)
- `--cream-accent: #ffedd6` (Oryzo Cream)
- `--earth-orange: #ff8539` (Lusion Accent)
- `--mat-green: #1b3a2b` (A2 Cutting Mat)
- Glassmorphism card utilities: `.oryzo-card`, `.oryzo-card-interactive`, `.oryzo-caliper`
- Custom dark scrollbars with zero background and 4px cream thumb.

Negative Constraints:
- Do not import external non-standard CSS frameworks.
- Do not use Tailwind default cyan/purple neon styles.

(Here paste the latest Tailwind CSS v4 CSS variable integration documentation)

Visual Grounding:
Refer to `@prompt_material/05_oryzo_design_tokens.png` for exact hex swatches.
```

#### Prompt 06: A2 Cutting Mat Calipers & Metric Grid Shader
```markdown
Read AGENTS.md first and follow it strictly.

Implement the CSS and SVG caliper utility classes in `src/app/globals.css` for the A2 cutting mat.
Create rules for:
- `.cutting-mat-grid`: 100mm and 10mm repeating lines with JIS technical crosshairs.
- `.cutting-mat-angles`: 30°, 45°, 60° diagonal guideline overlays.
- `.metric-scale-border`: Millimeter ruler ticks along top and left edges.

Negative Constraints:
- Do not place heavy raster images where clean SVG/CSS patterns can be rendered.
- Do not affect global text typography.

(Here paste CSS background grid pattern techniques)

Visual Grounding:
Refer to `@prompt_material/06_cutting_mat_blueprint.png` for metric caliper positions.
```

#### Prompt 07: Technical Typography & Tabular Figure Utilities
```markdown
Read AGENTS.md first and follow it strictly.

Configure typography font pairings in `src/app/layout.tsx` and `src/app/globals.css`:
1. Display Headlines: Outfit (or Syne) with negative letter spacing `-0.035em`.
2. Editorial Body: Geist Sans with relaxed line height `1.6`.
3. Telemetry Figures: Geist Mono with `font-variant-numeric: tabular-nums` for rock-solid non-jittering counter animations.

Negative Constraints:
- Do not load heavy uncompressed TTF/OTF files directly; use `next/font/google`.
- Do not apply font smoothing anti-aliasing overrides that blur dark mode text.

(Here paste next/font optimization documentation)

Visual Grounding:
Refer to `@prompt_material/07_typography_hierarchy.png` for type scale.
```

#### Prompt 08: Web Audio Tactile Haptic Synthesizer
```markdown
Read AGENTS.md first and follow it strictly.

Create a lightweight client-side acoustic haptics utility at `src/lib/sound.ts`.
Using the native Web Audio API (`AudioContext`), synthesize:
1. `playMetalClick()`: 1400 Hz impulse for Olfa knife and paper clip clicks.
2. `playWoodRoll()`: 520 Hz filtered resonance for pencil rolling.
3. `playRubberDamp()`: 380 Hz low-Q bump for technical eraser wobble.
4. `playFlipWhoosh()`: 200ms white noise bandpass sweep for 180° device flip.
Include a global mute toggle stored in `localStorage`.

Negative Constraints:
- Do not import external audio libraries like Howler.js.
- Do not trigger audio playback prior to initial user gesture (handle AudioContext suspended state).

(Here paste Web Audio API OscillatorNode & BiquadFilter documentation)

Visual Grounding:
Refer to `@prompt_material/08_audio_synthesis_flow.png` for sound graph.
```

---

### 🔹 PHASE 3: STATE MANAGEMENT & POLYMORPHIC MOCK STORES (Prompts 09–12)

#### Prompt 09: Dynamic Problem State Store with Zustand
```markdown
Read AGENTS.md first and follow it strictly.

Create a global client state store at `src/lib/store/useProblemStore.ts` using Zustand.
State must track:
- `activeTrackId`: string (defaulting to the first track in `problemConfig.ts`)
- `selectedSignalId`: string | null
- `isFlipped`: boolean (180° 3D phone state)
- `blendMorphProgress`: number (0 to 1 scroll morph)
- `soundEnabled`: boolean
- Actions: `setTrack()`, `selectSignal()`, `toggleFlip()`, `setMorph()`, `toggleSound()`.

Negative Constraints:
- Do not store heavy Three.js instances or DOM nodes in the Zustand store.
- Do not implement UI components.

(Here paste latest Zustand React 19 slice documentation)

Visual Grounding:
Refer to `@prompt_material/09_zustand_store_architecture.png` for state diagram.
```

#### Prompt 10: Real-Time Signal Stream Simulation Hook
```markdown
Read AGENTS.md first and follow it strictly.

Create a custom React hook at `src/lib/hooks/useSignalStream.ts` that simulates a live telemetry stream from the backend.
Every 3–6 seconds, inject randomized latency variations (8ms to 24ms), update the throughput gauge, and simulate incoming signals for the currently active track in `useProblemStore`.

Negative Constraints:
- Do not create memory leaks with uncleaned `setInterval` timers.
- Do not block the main thread.

(Here paste React 19 useEffect timer cleanup best practices)

Visual Grounding:
Refer to `@prompt_material/10_signal_stream_timing.png` for stream rhythm.
```

#### Prompt 11: Edge Telemetry Probe Service
```markdown
Read AGENTS.md first and follow it strictly.

Implement the live health probe fetching service at `src/lib/api/telemetryClient.ts`.
Create methods to asynchronously fetch:
- `/api/health`
- `/api/db-check`
- `/api/redis-check`
Capture exact HTTP round-trip timing with high-resolution performance timers (`performance.now()`).

Negative Constraints:
- Do not allow probe timeouts to hang the application (enforce 3000ms AbortController).
- Do not throw uncaught errors on the client.

(Here paste Fetch API with AbortController documentation)

Visual Grounding:
Refer to `@prompt_material/11_telemetry_probe_matrix.png` for response schema.
```

#### Prompt 12: Problem Statement Hot-Swap Exporter & Importer
```markdown
Read AGENTS.md first and follow it strictly.

Create an admin utility at `src/lib/problemAdapter.ts` that accepts any JSON payload formatted to the `ProblemDomainConfig` interface, validates it with a lightweight validator, and hot-swaps the active domain configuration across the running application.

Negative Constraints:
- Do not reload the browser window during hot-swap.
- Do not require rebuilding Next.js bundles.

(Here paste dynamic schema validator patterns)

Visual Grounding:
Refer to `@prompt_material/12_hot_swap_workflow.png` for adapter flow.
```

---

### 🔹 PHASE 4: ORYZO 1:1 PHYSICAL DESK STAGE & TACTILE PROPS (Prompts 13–16)

#### Prompt 13: Oryzo Desk Stage Container & Parallax Backdrop
```markdown
Read AGENTS.md first and follow it strictly.

Refactor the root desk stage in `src/components/oryzo/OryzoHeroDesk.tsx`.
Mount the Japanese white oak studio photography backdrop and A2 cutting mat (`public/images/oryzo_desk_mat.jpg`).
Wire subtle mouse parallax using `motion/react` springs (`useSpring`, stiffness 80, damping 25) so the desk props and mat shift realistically as the user moves their cursor.

Negative Constraints:
- Do not cause layout shifts on mobile viewports.
- Do not disable pointer events on interactive children.

(Here paste Motion React useSpring parallax documentation)

Visual Grounding:
Refer to `@prompt_material/13_desk_stage_composition.png` for camera framing.
```

#### Prompt 14: Giant Display Title & Oryzo Eyebrow Header
```markdown
Read AGENTS.md first and follow it strictly.

Implement the headline hierarchy inside `src/components/oryzo/OryzoHeroDesk.tsx`:
1. Top Eyebrow: `MADE FOR CODE. BUILT FOR SCALE.` with the signature Oryzo `o ─` pill.
2. Giant Title: `ORCATHON` rendered in bold, wide geometric typography, spanning the upper horizontal axis of the desk.
3. Right Edge Tab: Rotated vertical label `● ORCATHON-26 MODEL`.

Negative Constraints:
- Do not let the giant title clip on 1024px tablet screens (use `clamp(3rem, 11vw, 9rem)`).
- Do not use generic gradient fills; use high-contrast warm chalk `#f4efe6`.

(Here paste CSS clamp typography documentation)

Visual Grounding:
Refer to `@prompt_material/14_hero_headline_geometry.png` for spatial alignment.
```

#### Prompt 15: Interactive Olfa Utility Knife with Extendable Blade
```markdown
Read AGENTS.md first and follow it strictly.

Implement the segmented Olfa utility knife component inside `src/components/oryzo/OryzoHeroDesk.tsx`.
Features:
- High-detail SVG/vector body with yellow industrial casing, black slide lock, and segmented silver blade.
- On mouse enter: The blade smoothly translates outward by 24px via spring physics, accompanied by `playMetalClick()`.
- On mouse leave: The blade retracts smoothly.
- Contact shadow shifts dynamically as the blade extends.

Negative Constraints:
- Do not trigger false mouseLeave events when hovering over the extended blade.
- Do not drop frames below 60 FPS.

(Here paste Motion React layout and hover animation documentation)

Visual Grounding:
Refer to `@prompt_material/15_olfa_knife_states.png` for extended/retracted states.
```

#### Prompt 16: Hexagonal Drafting Pencil, Koh-I-Noor Eraser & Paper Clips
```markdown
Read AGENTS.md first and follow it strictly.

Implement the remaining physical desk props in `src/components/oryzo/OryzoHeroDesk.tsx`:
1. Drafting Pencil: Hexagonal wooden pencil. On click, it performs a 360° rotational roll with `playWoodRoll()`.
2. Technical Eraser: Two-tone Koh-I-Noor eraser. On click, it performs an elastic wobble oscillation with `playRubberDamp()`.
3. Silver Paper Clips: 4 paper clips resting at corners. On hover, each clip scatters outward with distinct angle offsets and `playMetalClick()`.

Negative Constraints:
- Do not use low-resolution raster images for props.
- Keep all props accessible with keyboard focus and ARIA labels.

(Here paste Motion React spring oscillation physics documentation)

Visual Grounding:
Refer to `@prompt_material/16_desk_props_layout.png` for prop coordinates.
```

---

### 🔹 PHASE 5: THREE.JS 3D IPHONE 16 PRO WEBGL CENTERPIECE (Prompts 17–20)

#### Prompt 17: Three.js Canvas Scaffolding & Draco GLTF Loader
```markdown
Read AGENTS.md first and follow it strictly.

Implement the 3D device loader in `src/components/canvas/DeviceModelCanvas.tsx`.
Requirements:
- Initialize Three.js `WebGLRenderer` with `antialias: true`, `alpha: true`, and `toneMapping: THREE.ACESFilmicToneMapping`.
- Configure `DRACOLoader` pointing to Google Draco decoder binaries.
- Load `public/models/orcathon_device.glb` (827 KB Draco compressed).
- Verify node hierarchy matches: `Root_Device`, `Chassis_Frame`, `Back_Plate`, `Camera_Island`, `Screen_OLED`, `Screen_Glass_Cover`.

Negative Constraints:
- Do not crash or block the UI if WebGL is unsupported (render a clean 2D titanium fallback card).
- Do not leak WebGL contexts on unmount.

(Here paste Three.js DRACOLoader and GLTFLoader setup documentation)

Visual Grounding:
Refer to `@prompt_material/17_threejs_canvas_setup.png` for viewport boundaries.
```

#### Prompt 18: PBR Material Shaders & Studio Lighting Rig
```markdown
Read AGENTS.md first and follow it strictly.

Configure the lighting rig and PBR materials in `src/components/canvas/DeviceModelCanvas.tsx`:
1. Warm Key Light (`#fff5ea`, intensity `2.4`) at `(-2.2, 4.5, 3.0)`.
2. Cool Blue Rim Light (`#88a0cc`, intensity `1.2`) at `(3.0, 1.5, -2.0)`.
3. Apply Titanium PBR material to `Chassis_Frame` (roughness `0.22`, metalness `0.95`).
4. Apply Frosted Obsidian Glass to `Back_Plate` (roughness `0.58`, metalness `0.10`).
5. Render contact shadow plane directly beneath the phone chassis.

Negative Constraints:
- Do not over-expose materials into pure white clipping.
- Do not add heavy post-processing bloom passes that hurt mobile frame rates.

(Here paste Three.js MeshStandardMaterial & DirectionalLight documentation)

Visual Grounding:
Refer to `@prompt_material/18_pbr_lighting_rig.png` for shadow falloff.
```

#### Prompt 19: Dynamic 60 FPS HTML5 Canvas OLED HUD Texture
```markdown
Read AGENTS.md first and follow it strictly.

Implement the dynamic OLED screen projection in `src/components/canvas/DeviceModelCanvas.tsx`.
Create a hidden off-screen HTML5 canvas element (`1179x2556` resolution) that renders the live Orcathon Problem Solver mobile HUD:
- Dynamic problem title and active track from `problemConfig.ts`.
- Real-time animated telemetry pulse and throughput counter.
- Bind the canvas to a `THREE.CanvasTexture` mapped directly to `Screen_OLED.material.map` (`texture.flipY = false`).
- Update texture on animation frame (`texture.needsUpdate = true`).

Negative Constraints:
- Do not redraw the 2D canvas if data has not changed (throttle to 30 FPS if CPU load spikes).
- Do not distort the UV coordinates.

(Here paste Three.js CanvasTexture dynamic update documentation)

Visual Grounding:
Refer to `@prompt_material/19_oled_screen_hud.png` for mobile screen interface.
```

#### Prompt 20: 180° Y-Axis Flip Mechanics & Cursor Tilt
```markdown
Read AGENTS.md first and follow it strictly.

Implement the interactive motion controls in `src/components/canvas/DeviceModelCanvas.tsx`:
1. Cursor Tilt: The phone tilts smoothly up to ±8° along X and Y axes following cursor coordinates.
2. 180° Flip: When the user clicks the flip button or the 3D phone, interpolate the model's Y-rotation from `0 rad` to `Math.PI rad` using spherical quaternion slerp or spring interpolation.
3. Trigger `playFlipWhoosh()` on rotation initiation.

Negative Constraints:
- Do not cause gimbal lock during 180° rotation.
- Do not disable cursor tracking when the phone is flipped (allow tilt on the backplate too).

(Here paste Three.js Quaternion.slerp documentation)

Visual Grounding:
Refer to `@prompt_material/20_device_flip_quaternion.png` for rotation angles.
```

---

### 🔹 PHASE 6: SCREEN-TO-PANE BLEND MORPH & EXPANDING BROWSER (Prompts 21–24)

#### Prompt 21: Lenis Smooth Scroll & Viewport Lock Orchestrator
```markdown
Read AGENTS.md first and follow it strictly.

Integrate Lenis smooth scrolling into the root layout and hero container in `src/app/page.tsx`.
Create a pinned scroll stage where the desk hero locks in place for 200vh of scroll distance, passing normalized scroll progress `(0.0 to 1.0)` into `useProblemStore`.

Negative Constraints:
- Do not hijack touch scrolling on iOS mobile devices.
- Do not create infinite scroll jitter or conflict with native Next.js link navigation.

(Here paste @studio-freight/lenis setup documentation)

Visual Grounding:
Refer to `@prompt_material/21_scroll_pinning_timeline.png` for pinning keyframes.
```

#### Prompt 22: Camera Dolly & Screen-to-Pane Expansion Math
```markdown
Read AGENTS.md first and follow it strictly.

Implement the spatial blend transition in `src/components/oryzo/OryzoScreenBlendMorph.tsx`.
As scroll progress advances from `0.0` to `0.5`:
- The 3D camera dollies forward into the phone screen.
- The phone rotation settles to exact `(0, 0, 0)`.
- At progress `0.5`, the 3D canvas fades seamlessly into the 2D desktop browser window frame with identical aspect ratio and screen coordinates.

Negative Constraints:
- Do not allow a single frame of white flash or layout jump during handoff.
- Keep the transition completely reversible when scrolling back up.

(Here paste Three.js camera FOV/zoom interpolation formulas)

Visual Grounding:
Refer to `@prompt_material/22_blend_morph_keyframes.png` for handoff diagram.
```

#### Prompt 23: Simulated Desktop Browser Container Chrome
```markdown
Read AGENTS.md first and follow it strictly.

Build the desktop browser window frame in `src/components/oryzo/OryzoScreenBlendMorph.tsx`:
- Window Title Bar: Three colored control dots (red, yellow, green), secure padlock icon, and simulated URL `https://orcathon.app/dashboard`.
- TLS 1.3 Security Badge with active ping indicator.
- Window Calipers: Outer hairline border with glowing warm corner brackets.

Negative Constraints:
- Do not use generic browser styling; strictly match Oryzo pitch noir glassmorphism.
- Ensure the window frame is fully responsive on smaller displays.

(Here paste CSS glassmorphism window chrome styling)

Visual Grounding:
Refer to `@prompt_material/23_browser_container_frame.png` for window layout.
```

#### Prompt 24: Navigation Tab Bar & Caliper Controls
```markdown
Read AGENTS.md first and follow it strictly.

Implement the top navigation tab bar inside the browser container:
- 4 Tabs: `Problem Signals Engine`, `Drizzle Query Stream`, `Edge Telemetry Fleet`, `Sunday Track Adapter`.
- Active tab pill with smooth motion layout transition (`layoutId="activeTabPill"`).
- Top-right live time caliper and refresh button with spinning feedback.

Negative Constraints:
- Do not reload or unmount tab contents during tab switching.
- Preserve keyboard navigation (arrow keys to switch tabs).

(Here paste Motion React layoutId tab transition documentation)

Visual Grounding:
Refer to `@prompt_material/24_browser_tabs_navigation.png` for tab pill states.
```

---

### 🔹 PHASE 7: APPLICATION SHOWCASES & REAL-TIME ENGINES (Prompts 25–28)

#### Prompt 25: Problem Signals Engine with Track Filters
```markdown
Read AGENTS.md first and follow it strictly.

Build the `Problem Signals Engine` pane inside `src/components/oryzo/OryzoScreenBlendMorph.tsx`.
Features:
- Track filter buttons (`ALL`, `DISCOVERY & AI`, `FINTECH`, `CIVIC TECH`, `HEALTHCARE`).
- Signals listing showing signal ID, title, latency, impact score, and status pill (`OPEN`, `PROCESSING`, `RESOLVED`).
- Detail inspect drawer showing the polymorphic JSONB payload.
- "Dispatch Resolution" action button triggering optimistic state updates.

Negative Constraints:
- Do not hardcode signal items; source them from `problemConfig.ts`.
- Do not block the UI during dispatch simulation.

(Here paste React 19 optimistic update patterns)

Visual Grounding:
Refer to `@prompt_material/25_problem_signals_engine.png` for signals list.
```

#### Prompt 26: Drizzle ORM Live Query Stream Inspector
```markdown
Read AGENTS.md first and follow it strictly.

Build the `Drizzle Query Stream` pane inside `src/components/oryzo/OryzoScreenBlendMorph.tsx`.
Features:
- Live SQL query stream showing actual Drizzle statements (`SELECT * FROM signals WHERE ...`).
- Query execution timeline with colored micro-bars (Query Parse, Connection Pool, Postgres Exec, JSON Serialization).
- Copy-to-clipboard action with tactile confirmation badge.
- Execution metrics showing p50 (4.2ms) and p99 (14.8ms).

Negative Constraints:
- Do not expose real database credentials or internal table secrets.
- Syntax highlight SQL queries with a high-contrast dark theme.

(Here paste SQL syntax highlighting and timeline formatting)

Visual Grounding:
Refer to `@prompt_material/26_drizzle_query_stream.png` for SQL query inspector.
```

#### Prompt 27: Edge Telemetry Fleet Diagnostics Pane
```markdown
Read AGENTS.md first and follow it strictly.

Build the `Edge Telemetry Fleet` pane inside `src/components/oryzo/OryzoScreenBlendMorph.tsx`.
Features:
- Live health cards for Edge Health, Supabase Pooler, and Upstash Redis.
- "Run Diagnostic Probes" button that triggers real fetches to `/api/health`, `/api/db-check`, and `/api/redis-check`.
- Radial SVG gauge showing fleet health score (e.g., `99.8% OPTIMAL`).
- Latency history sparkline graph with smooth SVG paths.

Negative Constraints:
- Do not display mocked results if the actual API endpoint returns a real status.
- Handle offline network errors gracefully with clear retry cues.

(Here paste SVG radial gauge and sparkline path math documentation)

Visual Grounding:
Refer to `@prompt_material/27_telemetry_fleet_gauges.png` for diagnostic gauges.
```

#### Prompt 28: Sunday Hackathon Track Adapter Blueprint Pane
```markdown
Read AGENTS.md first and follow it strictly.

Build the `Sunday Track Adapter` pane inside `src/components/oryzo/OryzoScreenBlendMorph.tsx`.
Features:
- Interactive JSON payload schema viewer.
- Live track selector allowing instant switching between Discovery, FinTech, Civic, and Healthcare.
- Dynamic preview of the modified phone OLED screen and database schema.
- "Export Domain Config" button generating a downloadable `problemConfig.json`.

Negative Constraints:
- Do not break schema formatting when deep nesting exists.
- Validate exported JSON against the TypeScript interface.

(Here paste JSON schema tree visualization documentation)

Visual Grounding:
Refer to `@prompt_material/28_sunday_track_adapter.png` for schema visualizer.
```

---

### 🔹 PHASE 8: MULTI-ROUTE WORKSPACES & INSPECTOR PANES (Prompts 29–31)

#### Prompt 29: Dedicated 3D CAD Workbench Page (/workbench)
```markdown
Read AGENTS.md first and follow it strictly.

Build the dedicated full-screen workbench route at `src/app/workbench/page.tsx`.
Features:
- Full-viewport A2 green metric cutting mat stage.
- Expanded 3D iPhone 16 Pro canvas with free OrbitControls (restricted azimuth and polar angles to prevent flipping underneath the desk).
- Floating CAD inspector HUD showing device dimensions, mesh polycount (35k), Draco compression ratio, and live UV coordinates.
- Material toggle buttons: Grade 5 Dark Titanium, Natural Silver Titanium, Desert Gold Titanium.

Negative Constraints:
- Do not allow camera clipping into the ground plane.
- Preserve consistent global navbar and footer.

(Here paste Three.js OrbitControls angle restriction documentation)

Visual Grounding:
Refer to `@prompt_material/29_workbench_page.png` for full CAD workspace.
```

#### Prompt 30: Dedicated Problem Signals Dashboard (/dashboard)
```markdown
Read AGENTS.md first and follow it strictly.

Build the dedicated application dashboard route at `src/app/dashboard/page.tsx`.
Features:
- Full-screen high-density signals matrix.
- Real-time search input with debounce.
- Sorting by Urgency, Latency, and Timestamp.
- Side drawer for inspecting raw signal JSONB payloads.
- Clerk user profile pill and sign-out action.

Negative Constraints:
- Do not clutter the interface with AI-slop neon glows; keep dense, clean tabular data.
- Ensure all interactive rows support keyboard navigation.

(Here paste Next.js App Router high-density dashboard layouts)

Visual Grounding:
Refer to `@prompt_material/30_dashboard_route.png` for dashboard grid.
```

#### Prompt 31: Dedicated Telemetry & Specs Routes (/telemetry & /specs)
```markdown
Read AGENTS.md first and follow it strictly.

Implement the subpages at `src/app/telemetry/page.tsx` and `src/app/specs/page.tsx`:
1. `/telemetry`: Dedicated fleet diagnostic page with automated 10-second polling probes, cold-start mitigation guides, and architecture decision records (ADRs).
2. `/specs`: Architectural contract page displaying the Drizzle ORM schema, Redis rate-limiting rules, and PWA manifest specs.

Negative Constraints:
- Do not duplicate component logic between subpages; extract shared components into `src/components/`.
- Ensure clean metadata headers on every route for SEO and sharing.

(Here paste Next.js 16 generateMetadata documentation)

Visual Grounding:
Refer to `@prompt_material/31_telemetry_specs_routes.png` for subpage designs.
```

---

### 🔹 PHASE 9: EDGE AUTH, PROBES & DATABASE STREAMING (Prompts 32–33)

#### Prompt 32: Edge API Health Probes Implementation
```markdown
Read AGENTS.md first and follow it strictly.

Harden the three API route handlers:
1. `src/app/api/health/route.ts`: Return system uptime, memory usage, and runtime environment.
2. `src/app/api/db-check/route.ts`: Execute a lightweight `SELECT 1` query via Drizzle ORM to verify Supabase connection pooling.
3. `src/app/api/redis-check/route.ts`: Execute a Redis ping and return remaining rate-limit quota.

Negative Constraints:
- Never expose database connection strings or secret tokens in the JSON response.
- Return proper HTTP status codes (200 for OK, 503 for Service Unavailable).

(Here paste Next.js 16 Route Handlers documentation)

Visual Grounding:
Refer to `@prompt_material/32_api_probe_responses.png` for JSON payload contracts.
```

#### Prompt 33: Clerk User Authentication Flow & Protected States
```markdown
Read AGENTS.md first and follow it strictly.

Integrate Clerk user authentication into the global navbar (`src/components/navbar.tsx`):
- Display `<SignInButton>` when unauthenticated.
- Display `<UserButton>` with custom dark theme when authenticated.
- If an unauthenticated user clicks "LAUNCH APP", trigger the Clerk sign-in modal without navigating away from the page.

Negative Constraints:
- Do not allow Clerk CSS to clash with Oryzo dark mode tokens.
- Maintain public accessibility for the landing page hero and 3D assets.

(Here paste Clerk dark theme customization documentation)

Visual Grounding:
Refer to `@prompt_material/33_clerk_auth_modal.png` for auth modal appearance.
```

---

### 🔹 PHASE 10: PRODUCTION HARDENING, PWA, SOUND & VERIFICATION (Prompts 34–35)

#### Prompt 34: PWA Offline Manifest & Mobile Touch Optimization
```markdown
Read AGENTS.md first and follow it strictly.

Configure the Progressive Web App (PWA) manifest at `public/manifest.json`:
- Name: `Orcathon 2026 // Problem Solver`
- Short Name: `Orcathon26`
- Display: `standalone`
- Theme Color: `#07080a`, Background Color: `#07080a`
- Register icons: 192x192 and 512x512 PNGs.
- Optimize touch targets on mobile devices for the Olfa knife, pencil, and 3D device controls.

Negative Constraints:
- Do not trigger unwanted pinch-to-zoom on 3D canvas interaction.
- Ensure service worker registration is compliant with Next.js 16.

(Here paste Web App Manifest specification documentation)

Visual Grounding:
Refer to `@prompt_material/34_pwa_mobile_manifest.png` for PWA mobile home screen view.
```

#### Prompt 35: Production Build Verification & Zero-Error Audit
```markdown
Read AGENTS.md first and follow it strictly.

Execute the final production build verification:
1. Run `npm run lint` and verify 0 ESLint errors and 0 warnings.
2. Run `npm run build` with Turbopack and verify clean compilation.
3. Inspect bundle analyzer to confirm `three` and `drizzle-orm` are cleanly tree-shaken.
4. Verify that total initial JS payload is under 180 KB gzipped.

Negative Constraints:
- Do not use `@ts-ignore` or `eslint-disable` comments to bypass errors.
- Fix all type mismatches at the root type contract.

(Here paste Next.js production build optimization checklist)

Visual Grounding:
Refer to `@prompt_material/35_build_audit_report.png` for clean build console output.
```

---

## 6. GRANULAR ASSET INVENTORY: EXISTING VS. LEFT TO BE GENERATED

The following audit categorizes all assets required to achieve 100% fidelity with Oryzo.ai:

### ✅ 6.1 Already Existing Assets in Workspace
1. `public/models/orcathon_device.glb`: Apple iPhone 16 Pro 3D Mesh (843,912 bytes / 827 KB Draco compressed, 35k polygons, baked upright at 0° with dedicated non-inverted OLED UV mapping `(0,0)` to `(1,1)`).
2. `public/images/oryzo_desk_mat.jpg`: High-resolution studio photograph of Japanese White Oak tabletop with A2 green cutting mat (927,856 bytes).
3. `public/architectural-canvas.jpg`, `civic-canvas.jpg`, `neural-canvas.jpg`: Domain visual canvases (920 KB–1.1 MB each).
4. `public/hero-backdrop.jpg`, `wall-backdrop.jpg`: Atmospheric texture backdrops.
5. `public/polaroid-chip.jpg`, `polaroid-db.jpg`: Physical polaroid card assets.
6. `public/manifest.json`: Initial PWA manifest configuration.

---

### ⏳ 6.2 Assets Left to be Generated (The Generation Backlog)

#### Category A: PBR Micro-Surface Texture Maps (Optional Polish for iPhone 16 Pro)
*These texture maps enhance the photorealism of the WebGL mesh:*
1. `public/textures/titanium_brushed_roughness.webp`: 2048x2048 high-frequency anisotropic roughness map for the Grade 5 Titanium chassis band.
2. `public/textures/frosted_glass_normal.webp`: Micro-bump normal map simulating the silky tactile finish of Apple's frosted rear backplate.
3. `public/textures/screen_imperfections.webp`: Subtle specular roughness variation simulating OLED micro-reflections.
4. `public/textures/camera_lens_iridescence.webp`: Multi-layer optical anti-reflective coating texture for the triple sapphire lens caps.

#### Category B: High-Precision Cutting Mat Caliper Overlays
1. `public/images/cutting_mat_grid_1mm.svg`: Ultra-crisp vector line overlay featuring JIS technical crosshairs, millimeter tick rulers, and 30°/45°/60° angle calipers.

#### Category C: Tactile Acoustic Audio Files (Web Audio Fallback / Enhancement)
*While `src/lib/sound.ts` synthesizes procedural Web Audio pulses, real studio-recorded Foley micro-samples can be provided for maximum acoustic luxury:*
1. `public/audio/knife_extend.mp3`: 0.04s metallic slide and ratchet lock of Olfa utility knife.
2. `public/audio/knife_retract.mp3`: 0.03s quick snap retraction.
3. `public/audio/pencil_roll.mp3`: 0.12s warm cedar wood resonance rolling over self-healing vinyl.
4. `public/audio/eraser_wobble.mp3`: 0.06s soft rubber dampening thud.
5. `public/audio/paperclip_clink.mp3`: 0.03s high-pitched spring steel scatter clink.
6. `public/audio/device_flip_whoosh.mp3`: 0.18s subtle aerodynamic whoosh for the 180° flip.

#### Category D: PWA App Icons & Favicons
1. `public/icons/icon-192.png`: 192x192 PNG matte black with warm cream Orcathon caliper emblem.
2. `public/icons/icon-512.png`: 512x512 PNG splash screen icon.
3. `public/icons/apple-touch-icon.png`: 180x180 PNG iOS home screen icon.
4. `public/favicon.ico`: Multi-size favicon bundle.

#### Category E: Prompt Material Mockup Cards (`@prompt_material/`)
*To satisfy the JS Mastery Prompter visual grounding rule across all 35 prompts, the reference visual cards corresponding to `@prompt_material/01` through `@prompt_material/35` should be generated and placed in `prompt_material/`.*

---

## 7. CONCLUSION & NEXT STEP DIRECTIVE

1. The reverse-engineered Oryzo.ai repository (`morluto/rea`) has been cloned to `reference/rea` and analyzed.
2. All components are architected for **zero-churn polymorphic redesign** when the hackathon problem statement drops.
3. The **35-Prompt JS Mastery Sequence** provides a deterministic, incremental roadmap for execution.
4. **No source code was modified during this phase**, strictly honoring the user directive.
5. All pending assets are cataloged in Section 6.2 and ready for asset generation when commanded.

---

## 8. REVISED 6-STAGE SCROLL FLOW & CONVERSION ARCHITECTURE
*Streamlined from 9 stages to 6 high-velocity stages. Product proof moved early; zero-auth playground as centerpiece.*

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              REVISED 6-STAGE INTERACTION FLOW                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [STAGE 1: HERO PEEKING DOCK]                                                           │
│  Phone sits at bottom edge; only TOP HALF peeks out. "Try It Now" & "Sign In".         │
│                                    ▼ (Native Scroll)                                   │
│ [STAGE 2: EXPLODED TECH STACK & AI REASSEMBLY]                                         │
│  Lifts to 3D isometric angle; expands into 6 slices with plain-language captions;       │
│  AI reassembles. [Sticky "Try It Now" appears].                                        │
│                                    ▼ (Native Scroll)                                   │
│ [STAGE 3: FEATURE & FUNCTIONALITY CAROUSEL]                                            │
│  Horizontal filmstrip; spotlight card with CAD dashed border; "Try this" deep-links.   │
│                                    ▼ (Native Scroll)                                   │
│ [STAGE 4: ZERO-AUTH PLAYGROUND (CENTERPIECE)]                                          │
│  Phone lands on cutting mat (Δh ≈ t); blends into real app pane (zero login req).      │
│  Contextual "Install PWA" prompt reveals only AFTER visitor's first interaction.       │
│                                    ▼ (Native Scroll)                                   │
│ [STAGE 5: CRAFT, CAD BLUEPRINT & COLOSSAL NAME (MERGED)]                               │
│  Amber glowing CAD wireframes; C = 4πA/P² ("We measure shape precision so every        │
│  output is consistent"); flows directly into giant geometric "ORCATHON" display.       │
│                                    ▼ (Native Scroll)                                   │
│ [STAGE 6: EDGE DEPLOYMENT, REVIEWS & FINAL CONVERSION (MERGED)]                        │
│  1. Product Shots: "Runs on the edge / Works offline, always available".               │
│  2. Beta Feedback: Verified tester quotes, polaroid evidence & interactive 3D emblem.  │
│  3. Final PWA Landing Block: Segmented switcher, 3D preview, [TRY IT NOW], [INSTALL    │
│     PWA], and [SIGN UP] actions.                                                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Detailed Mechanics by Stage

#### Stage 1: Hero Peeking Dock (Unchanged)
- **Positioning**: Center-bottom of the hero stage. The iPhone 16 Pro sits upright facing the viewer (0° yaw, 0° roll).
- **Framing**: Only the **top half (~45–50%) of the phone peeks out** above the lower fold / cutting mat border.
- **Screen HUD**: Dynamic Island, status bar (clock `09:41`, date), and live problem solver status pulsating on the OLED screen.
- **Primary CTAs**:
  - `[ TRY IT NOW ]`: Primary CTA button (smooth-scrolls straight into the Stage 4 Playground).
  - `[ SIGN IN ]`: Secondary CTA button (triggers Clerk Edge authentication modal).

#### Stage 2: Exploded Tech Stack & AI Reassembly (Unchanged Flow + Plain-Language Captions)
- **Motion**: The phone lifts to center-screen, tilts to an isometric 3D perspective (`~30° yaw, -20° pitch`), and expands along Z-depth into 6 distinct floating planes.
- **Plain-Language Slice Captions (Max 8 words each)**:
  1. *Layer 1 (Front OLED Glass)*: **"Fluid, responsive interfaces running at 60 frames per second."** *(8 words)*
  2. *Layer 2 (Graphics Pipeline)*: **"Real-time 3D spatial hardware graphics acceleration."** *(6 words)*
  3. *Layer 3 (Security Perimeter)*: **"Instant biometric edge authentication with zero passkey friction."** *(8 words)*
  4. *Layer 4 (Database Engine)*: **"Lightning-fast database queries executing under twelve milliseconds."** *(7 words)*
  5. *Layer 5 (Cache Tier)*: **"Worldwide instant memory caching with zero cold starts."** *(8 words)*
  6. *Layer 6 (Titanium Frame)*: **"Grade-5 titanium chassis engineered for on-device edge execution."** *(8 words)*
- **AI Reassembly**: Glowing particle filaments snap the layers back together in sequence into an assembled unit (*"powered by AI"*).

#### Stage 3: Feature and Functionality Carousel (Unchanged Flow + Deep-Link Hooks)
- **Layout**: Full-width cinematic horizontal filmstrip with dark vignette backdrop (`#07080a`).
- **Spotlight Stage**: Center card framed in a technical dashed CAD border containing an active interactive prompt/search bar (`Hey @ORCATHON, solve track 02...`), flanked by problem-domain cards.
- **Deep-Link Action**: Every feature card ends with a small, high-contrast text button:  
  **`[ ↳ Try this in playground ]`** — clicking this deep-links directly into `#playground` (Stage 4) with the respective feature pre-selected.

#### Stage 4: Zero-Auth Playground (Moved Up in Priority — The Centerpiece)
- **Spatial Landing**: The phone lands squarely onto the Japanese oak tabletop and green A2 cutting mat ($\Delta h \approx t$ constant elevation caliper detail).
- **Smooth Expansion**: The phone screen seamlessly blends into the full-scale interactive application pane:
  - Problem Signals Engine (filter by track, view latency dials).
  - Live Drizzle ORM query stream.
  - Edge Telemetry Fleet diagnostics.
- **Strict Zero-Auth Standard**: Visitors can run queries, dispatch test problems, and filter signals **immediately without any login or modal barrier**.
- **Contextual "Install PWA" Prompt**:
  - Positioned directly beside the playground controls where intent and excitement are highest.
  - **Interaction-Gated**: Hidden on initial view; reveals smoothly with a subtle spring bounce **only after the visitor completes their first interaction** (e.g. toggles a track or dispatches a test signal).

#### Stage 5: Craft, CAD Blueprint & Colossal Name (Merged Old Stages 5 & 6)
- **Visuals**: Amber glowing CAD wireframes, technical crosshairs, and bezier calibration handles.
- **Circularity Formula with Plain User Benefit**:
  $$\text{Circularity Metric: } C = \frac{4\pi A}{P^2}$$
  > **User Benefit**: *"We measure mathematical shape precision so every output is pixel-consistent across all screen dimensions."*
- **Seamless Colossal Flow**: The blueprint view flows directly into the giant geometric **"ORCATHON"** display title (`clamp(6rem, 18vw, 16rem)`) with CAD vector calipers as the dramatic closing visual of this stage (no separate stage).

#### Stage 6: Edge Deployment, Reviews & Final Conversion (Merged Old Stages 7, 8 & 9)
*Strict Pacing: Product Proof First → Social Proof Second → Conversion Last.*

1. **Product Shots Gallery (Product Proof First)**:
   - Headline: `Runs on the edge / Refuses the cloud`.
   - Specific non-contradictory claim: *"Works offline, always available (zero cloud dependency)."*
   - Multi-panel visual grid showcasing on-device performance, field telemetry, and desktop operation.
2. **Beta Feedback & Testimonials (Social Proof Second)**:
   - Labeled authentically: **`BETA FEEDBACK [ 36 VERIFIED TESTERS ]`**.
   - Zero fabricated star ratings (no deceptive "4.9/5" labels). Real quotes and evaluation notes:
     > *"Sub-12ms query execution on real hardware. The polymorphic schema handled track changes instantly."* — Systems Architect  
     > *"The offline-first PWA companion synced seamlessly with local Redis cache."* — Lead Evaluator
   - Flanked by polaroid-framed evidence cards and the interactive 3D floating titanium emblem.
3. **Final PWA Landing Block (Conversion Last)**:
   - Segmented track switcher (`[ PWA COMPANION ]`, `[ PRO WORKBENCH ]`, `[ ENTERPRISE FLEET ]`).
   - Interactive 3D preview with tactile haptic clicks.
   - Three high-visibility conversion actions:
     - **`[ TRY IT NOW ]`** (jumps back to Stage 4 playground)
     - **`[ INSTALL PWA ]`** (triggers native browser PWA install prompt)
     - **`[ SIGN UP ]`** (Clerk authenticated cloud sync)

---

### 9. GLOBAL REQUIREMENTS & SYSTEM CONSTRAINTS

#### 9.1 Sticky "Try It Now" Conversion Anchor
- A prominent floating pill button labeled **`[ TRY IT NOW ]`** is mounted globally:
  - **Desktop**: Top-right corner (below navbar, `fixed top-20 right-8 z-50`).
  - **Mobile**: Bottom-right floating action button (`fixed bottom-6 right-6 z-50`).
- **Visibility Trigger**: Appears dynamically via `IntersectionObserver` or scroll-offset once the user scrolls past Stage 1 into Stage 2, and remains accessible throughout the rest of the journey.
- **Behavior**: Smooth-scrolls directly to `#playground` (Stage 4) with zero modals or barriers.

#### 9.2 Non-Destructive Native Scroll Behavior (Zero Scroll-Jacking)
- **No Wheel Trapping**: Native browser scrolling is never hijacked, clamped, or locked.
- **Scroll-Linked Animations**: Utilizes CSS `position: sticky` and `motion/react` `useScroll({ target, offset })` or `IntersectionObserver`.
- **Slim 6-Stage Progress Indicator**:
  - Mounted along the right vertical edge of the desktop viewport (`fixed right-4 top-1/2 -translate-y-1/2 z-40`).
  - 6 minimalist technical ticks with stage numbers (`01` through `06`).
  - Active stage lights up with amber glow (`#ff8539`).
  - Clicking any stage tick smoothly scrolls to that stage's anchor ID (`#stage-1` through `#stage-6`).


