# 🤖 GEMINI.md — Orcathon 2026 Agent Operating Guidelines & Standards

This document establishes the binding architectural, visual, and workflow rules for Gemini and Antigravity coding agents working on this codebase.

---

## 🎯 1. Mission & Core Directives

Recreate the visual prestige, tactile craftsmanship, and spatial interaction feel of **Oryzo.ai** (by Lusion) for **ORCATHON 2026**, substituting Oryzo's cork coaster with an interactive **Apple iPhone 16 Pro 3D WebGL model running the Orcathon Problem Solver app**.

### 🚫 Non-Negotiable Negative Constraints
1. **Zero Asset Theft**: Do NOT copy Oryzo's code, 3D models, proprietary textures, or marketing copy. Recreate the feel with original engineering and assets.
2. **Zero Scroll-Jacking**: Native browser scrolling must never be trapped, clamped, or locked. Use Lenis for smooth momentum while keeping touch and wheel controls native.
3. **Zero Fabricated Metrics**: No fake "4.9/5 stars", bogus 99.999% uptime badges, or fabricated user counts. Use honest `BETA FEEDBACK [ 36 VERIFIED TESTERS ]` and real telemetry probes.
4. **No White Screen Default**: Always use deep noir grounds (`#07080a`, `#0a0b10`) with warm cream text (`#ffedd6`, `#f4efe6`).
5. **No Blind Full-Codebase Rewrites**: Deliver changes in thin, verifiable slices stage by stage.

---

## 🎨 2. Visual Identity & Design System Tokens

```
Palette:
  --bg-pitch:      #07080a  (Deepest stage ground; zero ambient bleed)
  --bg-card:       #0d0f16  (Translucent glass cards, simulated browser container)
  --text-cream:    #ffedd6  (Primary high-contrast display text, eyebrows)
  --text-body:     #f4efe6  (Readable body copy and descriptions)
  --text-muted:    #94a3b8  (Technical telemetry, calipers, secondary labels)
  --accent-amber:  #ff8539  (Active glows, CAD wireframes, spotlight card borders)
  --mat-green:     #163024  (Self-healing cutting mat deep tone)
  --border-cad:    rgba(255, 237, 214, 0.08) (Hairline rules, CAD grid lines)
```

- **Typography Scale**:
  - Hero Display: Bold geometric display sans (weight `900`, tracking `-0.04em`, `clamp(3.5rem, 9vw, 8rem)`).
  - Eyebrows & Calipers: Monospace (Geist/Outfit Mono, `10px`–`12px`, uppercase, tabular figures).
- **Tactile Styling**:
  - Calipers: Corner brackets (`[+142, -84]`), dimension ticks, dashed borders (`1px dashed rgba(255,237,214,0.15)`).
  - Glassmorphism: `backdrop-blur-md` layered with `bg-neutral-900/60` and `1px` subtle translucent border.
  - Interactive Feedback: Every clickable button must feature `:hover` and `:active` scale/glow states.

---

## 🏗️ 3. The 6-Stage Landing Page Contract

All landing page work must adhere strictly to the settled 6-stage scroll sequence:

1. **Stage 1: Hero Peeking Dock (`#stage-1`)**:
   - Phone sits upright at the center-bottom edge; **only the top half (~45–50%) peeks out** above the fold.
   - Dual CTAs: `[TRY IT NOW]` (smooth-scrolls to Stage 4) and `[SIGN IN]` (Clerk auth).
2. **Stage 2: Exploded Tech Stack (`#stage-2`)**:
   - Phone lifts and tilts to an isometric 3D angle (`~30° yaw, -20° pitch`).
   - Separates into 6 floating slices (UI, WebGL, Auth, Drizzle Database, Redis Cache, Titanium Chassis).
   - Each slice has one short plain-language caption of **≤ 8 words**.
   - AI particle filaments reassemble the layers into a unified unit.
   - **Sticky CTA Trigger**: Floating `[TRY IT NOW]` button becomes visible from Stage 2 onward.
3. **Stage 3: Feature Carousel (`#stage-3`)**:
   - Full-width horizontal filmstrip pinned during scroll.
   - Centered spotlight card framed in an **amber dashed CAD border** with prompt bar (`Hey @ORCATHON, solve track 02...`).
   - Each card ends with a `[↳ Try this in playground]` deep-link to Stage 4.
4. **Stage 4: Zero-Auth Playground (`#playground`)**:
   - Phone lands on the cutting mat ($\Delta h \approx t$).
   - Screen bezels seamlessly blend into the live 16:9 desktop application pane.
   - **Zero Auth Barrier**: Instant access to Problem Signals Engine, Live Drizzle Query Stream, and Edge Telemetry Fleet.
   - **Contextual PWA Card**: Revealed with a spring bounce **only after the user's first interaction**.
5. **Stage 5: Craft, CAD Blueprint & Colossal Name (`#stage-5`)**:
   - Glowing amber wireframes, bezier handles, and crosshairs.
   - Circularity formula: $C = \frac{4\pi A}{P^2}$ accompanied by a one-line user benefit (*"We measure shape precision so every output is pixel-consistent across all screen dimensions"*).
   - Flows directly into the giant geometric display title: **`ORCATHON`** with CAD calipers.
6. **Stage 6: Edge Deployment, Reviews & Final Conversion (`#stage-6`)**:
   - *Step 1 (Product Proof)*: Offline edge execution product shots.
   - *Step 2 (Social Proof)*: `BETA FEEDBACK [ 36 VERIFIED TESTERS ]` real quotes, polaroid cards, and 3D titanium emblem.
   - *Step 3 (Conversion Hub)*: Tier switcher (`[PWA COMPANION]`, `[PRO WORKBENCH]`, `[ENTERPRISE FLEET]`) + 3 CTAs (`[TRY IT NOW]`, `[INSTALL PWA]`, `[SIGN UP]`).

---

## ⚙️ 4. 3D WebGL & Performance Standards

1. **Unified Model Loader Abstraction**:
   - Keep 3D loading behind `src/components/canvas/UnifiedDeviceModel.tsx`.
   - Provide a procedural placeholder geometry (rounded-box phone + 6 slice planes) that immediately renders without network delay, while supporting hot-swapping with `public/models/orcathon_device.glb`.
2. **Accessibility & Device Tier Fallbacks**:
   - `prefers-reduced-motion`: When active, bypass 3D rotation dollies and layer separations; display high-contrast static/crossfade cards.
   - Low-End Device Detection: Detect low memory or sluggish WebGL contexts and fall back to crisp 2D SVG/CSS wireframes for Stages 2 and 5.
3. **Lighthouse Mobile 80+ Target**:
   - Dynamically import 3D canvases with `next/dynamic` and `ssr: false`.
   - Use CSS `content-visibility: auto` on off-screen sections.
   - Zero layout shifts (CLS < 0.05) by enforcing explicit aspect-ratio containers.

---

## 🔁 5. Iterative Development & Screenshot Verification Protocol

When building, follow the strict **one-stage-at-a-time** protocol:
1. Implement Stage $N$.
2. Launch dev server and capture dual-width screenshots via browser agent:
   - **Desktop**: 1536 × 864 px
   - **Mobile**: 375 × 812 px
3. Compare visual results with reference images in [`prompt_material/`](file:///c:/Users/Chirag/Desktop/Orcathon/prompt_material).
4. Correct layout discrepancies, margins, font sizes, or colors.
5. Verify `npm run lint` and `npx tsc --noEmit` pass with **0 errors**.
6. Stop and provide a summary before advancing to Stage $N+1$.
