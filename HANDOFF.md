# 🚀 CONTEXT TRANSFER BRIEFING: ORCATHON 2026 // SCROLL-DRIVEN LANDING PAGE
*Generated at 2026-10-24T16:11:00Z for clean-session handoff.*

### 1. 🎯 Mission & Core Objective
- **Target Goal**: Build the flagship scroll-driven landing page for **ORCATHON 2026**, capturing the tactile craftsmanship, spatial interaction feel, and visual prestige of **Oryzo.ai** (by Lusion). The cork coaster is substituted with an interactive **Apple iPhone running the Orcathon Problem Solver app**.
- **Core Directive**: The hackathon submission is **strictly a software app** (Web / PWA / Mobile). There is zero physical hardware being built.
- **Aesthetic**: Deep stage noir (`#07080a`), warm cream typography (`#ffedd6`, `#f4efe6`), amber accents (`#ff8539`), self-healing cutting mat (`#163024`), clean CAD wireframes, hairline calipers, and cozy tactile stationery (cedar wood pencil, Olfa knife, drafting pen, silver paper clips). **No shiny plastic/specular 3D look**—everything adheres to a warm, matte, tactile craftsmanship feel.
- **Definition of Done**:
  1. Stage 1 Hero Peeking Desk fits completely within `100vh` on laptop viewports (`1510x678` / `1523x771`) without requiring scrolling.
  2. Stage 2 Scroll Transition: As user scrolls down, phone dollies closer, background fades to pitch black (`#07080a`), phone lays down flat horizontally (side profile matching user reference photo), and explodes upward into 6 technical layers.
  3. Top screen layer in Stage 2 must be a **live, fully editable 2D React component** with matte styling (no glossy 3D glare).
  4. Stages 3–6 adhere to the settled specification (Carousel, Zero-Auth Playground, CAD Blueprint, Deployment & Proof).
  5. TypeScript (`npx tsc --noEmit`) and ESLint (`npm run lint`) pass with **0 errors and 0 warnings**.

---

### 2. 🏗️ Settled Architecture & Non-Negotiables
- **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion / Motion for React), Lucide React.
- **Zero Asset Theft**: No copied 3D assets or proprietary textures from Oryzo. Original code, rembg-isolated clean cutouts, and pure code vectors.
- **Zero Scroll-Jacking**: Lenis smooth scroll momentum with native wheel and touch support.
- **Global Sticky/Fixed Navbar**: Clean `fixed top-0 left-0 right-0 z-50` with `backdrop-blur-xl bg-[#07080a]/80`. Only one unified top bar exists across the site (duplicate second headers on hero eliminated).
- **Thematic Swappability (`site-config.ts`)**: Modular desk items and paper documents supporting `engineering`, `travel` (boarding pass), and `culinary` (recipe card) domain presets.
- **Matte Aesthetic Priority**: Ban harsh glossy 3D reflections. All phone renders and exploded layers must feature soft-touch, matte anodized titanium and cardstock textures matching the cutting mat.

---

### 3. 📊 Current State of Implementation
- **Completed & Verified (Stage 1 Hero Desk)**:
  - [OryzoHeroDesk.tsx](file:///c:/Users/Chirag/Desktop/Orcathon/src/components/oryzo/OryzoHeroDesk.tsx):
    - Background: Japanese oak tabletop with natural sunlight beam and dark vignette.
    - Cutting Mat: Tilted self-healing green mat with CAD grid and centimeter calibrations.
    - Stationery: Separate rembg-isolated props (silver clips, cedar pencil, Japanese pen, Olfa utility knife) with tactile hover animations.
    - Typography: Generous breathing room (`pt-24 sm:pt-28`), bold geometric `ORCATHON` title and `MADE FOR CODE. BUILT FOR SCALE.` dot pill.
    - Phone Peeking Dock: Height tuned to `~320px–335px` (~60% visible), creating a spacious ~75px open gap of green mat between title and phone.
    - Device Frame: [DeviceFrame.tsx](file:///c:/Users/Chirag/Desktop/Orcathon/src/components/device/DeviceFrame.tsx) micro-compacted so Dynamic Island, App OS badge, Polymorphic Signals headline, Telemetry HUD (Ping 12ms, Cache 99.4%, Drizzle POOL, live waveform, ingestion log), and `[RESOLVE STATEMENT →]` button are 100% visible on screen.
    - Zero-Scroll Fit: Verified on live browser at `1510x678` viewport. All corner cards and bottom caliper bar (`STAGE 01 // LIVE APP DOCK ... SCROLL TO CONTINUE`) fit inside 100vh without vertical scrollbar.
- **Code Quality**:
  - `npx tsc --noEmit`: **0 errors**
  - `npm run lint`: **0 errors, 0 warnings**
  - Dev server running at `http://localhost:3000`.

---

### 4. 🧠 Decisions & Rejected Paths (Anti-Rot Shield)
- **Rejected: Shiny 3D WebGL GLB on Hero**: The user explicitly flagged that WebGL 3D models with glossy specular reflections look fake, plastic-like, and clash with the cozy matte texture of the website.
- **Rejected: Single Flat 2D Rotation**: A flat 2D rectangle rotated in CSS (`rotateX(80deg)`) looks like paper during mid-tilt. Instead, the transition will use a **cinematic scale-up + morph/crossfade into the horizontal low-angle chassis** (matching the user's reference photo), followed by upward layer explosion.
- **Settled: Live React App Layer**: In Stage 2's exploded stack, the top OLED display layer is a **live React component** rather than a baked texture. This allows the user to change the app title, tracks, telemetry, and graphs anytime in code with 100% vector sharpness.
- **Settled: Unified Top Navbar**: Removed the duplicate second header from Stage 1. [Navbar.tsx](file:///c:/Users/Chirag/Desktop/Orcathon/src/components/navbar.tsx) is fixed at `top-0` with subtle blur, and sound toggle (`HAPTIC ON/OFF`) lives in the bottom caliper bar.

---

### 5. ⚠️ Active Blockers & Open Items
- **Current Blockers**: None. Build is green and dev server is running.
- **Pending Implementation**:
  - **Stage 2 Scroll Choreography**: Connecting the scroll from Stage 1 into Stage 2:
    1. Scale phone up towards viewer.
    2. Background fades from oak/mat into pitch noir (`#07080a`).
    3. Phone transitions into laying-down horizontal profile (side-angle chassis with camera bump).
    4. Layers separate vertically into 6 matte technical slices (OLED App UI, WebGL Engine, Auth Shield, Drizzle DB, Upstash Cache, Titanium Chassis) with plain-language captions ($\le 8$ words) and connecting AI filaments.

---

### 6. ▶️ Next Immediate Action (The Launchpad)
- **First Step**: Build the **Stage 2 Matte Exploded Stack Component** (`src/components/oryzo/OryzoExplodedStack.tsx`) and wire it to the scroll transition from Stage 1 in `src/app/page.tsx`:
  - Implement scroll-driven scale and background fade to `#07080a`.
  - Display the horizontal laying-down chassis resting on the surface.
  - Animate the upward separation of the 6 matte layers with the live editable React app UI on the top layer.
  - Add technical CAD calipers, connector filaments, and plain-language captions ($\le 8$ words).
- **Verification Plan**:
  - Open `http://localhost:3000` via browser subagent.
  - Verify smooth transition as user scrolls down from Stage 1 to Stage 2.
  - Confirm the top layer shows the live React app UI and can be edited via config.
  - Run `npx tsc --noEmit` and `npm run lint` to guarantee 0 errors.
