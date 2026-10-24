# 🧭 CONTEXT.md — Orcathon 2026 Project State & Execution Context

*Last Updated: 2026-10-24T14:20:00+05:30*

---

## 1. Project Overview & State

- **Application Name**: Orcathon 2026 Problem Solver
- **Mission**: 1:1 visual, physical, and architectural recreation of the award-winning **Oryzo.ai** landing page, substituting Oryzo's coaster with an interactive **Apple iPhone 16 Pro 3D centerpiece** running the Orcathon Problem Solver app.
- **Current Phase**: Planning and Stage 1 preparation. The codebase has been completely cleaned of legacy/unused code, passing all quality gates.
- **Verification Gates**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**

---

## 2. Directory Structure & Key Files

```
c:/Users/Chirag/Desktop/Orcathon/
├── prompt_material/                 # 9 High-res user reference images (01–09)
│   ├── 01_hero_peeking_dock.png
│   ├── 02_exploded_tech_stack.png
│   ├── 03_feature_functionality_carousel.png
│   ├── 04_desk_blend_zero_auth_playground.png
│   ├── 05_engineering_craft_cad_blueprint.png
│   ├── 06_colossal_app_name.png
│   ├── 07_ratings_reviews_3d_icon.png
│   ├── 08_product_shots_offline.png
│   └── 09_pwa_landing_page_ctas.png
│
├── public/
│   ├── images/
│   │   └── oryzo_desk_mat.jpg       # Studio photography desk mat (Japanese oak + A2 green mat)
│   ├── models/
│   │   └── orcathon_device.glb      # Apple iPhone 16 Pro 3D Mesh (827 KB Draco compressed)
│   ├── polaroid-chip.jpg            # Stage 6 evidence card asset
│   ├── polaroid-db.jpg              # Stage 6 evidence card asset
│   └── manifest.json                # PWA mobile web app manifest
│
├── docs/
│   ├── ORCATHON_LANDING_PAGE_ARCHITECTURE.md  # Complete 6-stage specification
│   ├── REVERSE_ENGINEERED_ORYZO_BUILD_SPEC.md # 35-prompt execution sequence & PBR calibration
│   └── 3D_DEVICE_ASSET_BRIEF.md               # 3D mesh & UV coordinates contract
│
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Root 6-stage landing page
│   │   ├── layout.tsx               # Root layout with Clerk auth provider
│   │   ├── globals.css              # Oryzo CSS tokens, cutting mat grids, custom scrollbars
│   │   ├── workbench/page.tsx       # Dedicated CAD 3D Workbench (/workbench)
│   │   ├── dashboard/page.tsx       # Dedicated Desktop Signals HUD (/dashboard)
│   │   ├── telemetry/page.tsx       # Fleet diagnostics & probe monitor (/telemetry)
│   │   ├── specs/page.tsx           # Sunday Problem Track Adapter (/specs)
│   │   └── api/
│   │       ├── health/route.ts      # Edge health probe
│   │       ├── db-check/route.ts    # Supabase Postgres connection check
│   │       └── redis-check/route.ts # Upstash Redis rate-limit check
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   └── DeviceModelCanvas.tsx # 3D WebGL iPhone 16 Pro with 60 FPS HTML5 OLED HUD
│   │   ├── oryzo/
│   │   │   ├── OryzoHeroDesk.tsx     # 1:1 Desk stage with Olfa knife, pencil, clips, eraser
│   │   │   └── OryzoScreenBlendMorph.tsx # Screen blend morph & zero-auth playground
│   │   ├── smart-flip/
│   │   │   └── SmartFlipWorkbench.tsx # Dual-sided CAD workbench
│   │   ├── navbar.tsx                # Sticky top navbar with Clerk auth & 12ms ping badge
│   │   ├── footer.tsx                # Matte CAD footer with system status
│   │   ├── auth-provider.tsx         # Clerk edge auth wrapper
│   │   ├── problem-adapter.tsx       # Track adapter UI component
│   │   ├── stack-audit.tsx           # Tech stack audit component
│   │   └── stack-status.tsx          # Real-time probe telemetry component
│   │
│   ├── db/
│   │   ├── schema.ts                 # Drizzle ORM polymorphic JSONB problem signals schema
│   │   └── index.ts                  # Supabase Postgres connection pooling
│   └── lib/
│       ├── redis.ts                  # Upstash Redis client & sliding-window rate-limiter
│       ├── supabase.ts               # Supabase JS client
│       └── utils.ts                  # Tailwind clsx / twMerge helper
│
├── DESIGN.md                        # Aesthetic study & visual observations from Oryzo.ai
├── GEMINI.md                        # Agent rules, visual standards, and 6-stage contracts
└── CONTEXT.md                       # This file (active system state & reference mapping)
```

---

## 3. Reference Images to Stage Mapping

All 9 prompt images uploaded by the user are cataloged in [`prompt_material/`](file:///c:/Users/Chirag/Desktop/Orcathon/prompt_material):

| Reference Image | Target Stage | Key Interaction / Visual Requirements |
| :--- | :--- | :--- |
| `01_hero_peeking_dock.png` | **Stage 1 (Hero)** | Phone upright at bottom edge; only top half (~45–50%) peeking out. Primary `[TRY IT NOW]` and secondary `[SIGN IN]` CTAs. |
| `02_exploded_tech_stack.png` | **Stage 2 (Exploded Stack)** | Isometric tilt (`30° yaw, -20° pitch`), 6 Z-floating slices, short captions (≤ 8 words), AI reassembly filaments. Sticky `[TRY IT NOW]` activates. |
| `03_feature_functionality_carousel.png` | **Stage 3 (Feature Carousel)** | Horizontal filmstrip with centered spotlight card, dashed CAD border, prompt bar, and `[↳ Try this]` deep-links to Stage 4. |
| `04_desk_blend_zero_auth_playground.png` | **Stage 4 (Playground)** | Phone lands on cutting mat ($\Delta h \approx t$). Screen blends into full desktop app pane. Zero login requirement. PWA install card reveals after first interaction. |
| `05_engineering_craft_cad_blueprint.png` | **Stage 5 (Craft & CAD)** | Amber glowing wireframes, bezier handles, circularity formula $C = \frac{4\pi A}{P^2}$ with plain user benefit. |
| `06_colossal_app_name.png` | **Stage 5 (Colossal Display)** | Blueprint flows directly into giant geometric `ORCATHON` display title with CAD dimension calipers. |
| `07_ratings_reviews_3d_icon.png` | **Stage 6 (Social Proof)** | `BETA FEEDBACK [ 36 VERIFIED TESTERS ]` real quotes, polaroid cards, and interactive floating 3D titanium emblem. |
| `08_product_shots_offline.png` | **Stage 6 (Product Proof)** | Multi-panel product shots demonstrating on-device execution: *"Runs on the edge / Works offline, always available"*. |
| `09_pwa_landing_page_ctas.png` | **Stage 6 (Final CTA Hub)** | Segmented tier selector (`[PWA COMPANION]`, `[PRO WORKBENCH]`, `[ENTERPRISE FLEET]`) + 3 conversion actions (`[TRY IT NOW]`, `[INSTALL PWA]`, `[SIGN UP]`). |

---

## 4. Subpage Routes & Functionality

1. **`/` (Root Landing Page)**: The primary 6-stage scroll-driven 3D landing page.
2. **`/workbench`**: Dedicated CAD cutting mat workbench with interactive 3D model and engine inspector.
3. **`/dashboard`**: Desktop application interface with real-time problem signals feed.
4. **`/telemetry`**: Full-system edge telemetry fleet diagnostics and active server health probes.
5. **`/specs`**: Sunday Problem Statement Track Adapter and polymorphic schema preview.

---

## 5. Next Immediate Action

When building begins:
- Execute **Stage 1 (Hero Peeking Dock)**.
- Verify via dual-resolution browser agent screenshots (Desktop 1536px, Mobile 375px) against `prompt_material/01_hero_peeking_dock.png`.
- Confirm 0 ESLint errors and 0 TypeScript compilation errors.
