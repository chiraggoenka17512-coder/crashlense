# 🏛️ ORCATHON 2026 // LANDING PAGE ARCHITECTURE SPECIFICATION
## Revised 6-Stage Scroll-Linked Experience & Conversion Engine

> **Document Status**: Authoritative Architecture Specification  
> **Target System**: Orcathon 2026 Landing Page (`src/app/page.tsx`)  
> **Visual Identity**: Oryzo-Inspired CAD Wireframes, Amber Glow (`#ff8539`), Dashed Borders, Vernier Calipers, Geometric Display Type  
> **Narrative Arc**: *"Built by hand, engineered by AI."*  
> **Core Constraint**: Zero scroll-jacking; native browser scrolling only; zero auth wall before playground.

---

## 📑 TABLE OF CONTENTS
1. [Executive Summary & Architectural Pivot](#1-executive-summary--architectural-pivot)
2. [End-to-End System Architecture Diagram](#2-end-to-end-system-architecture-diagram)
3. [Component Hierarchy & State Flow](#3-component-hierarchy--state-flow)
4. [Detailed 6-Stage Scroll Flow Specifications](#4-detailed-6-stage-scroll-flow-specifications)
   - [Stage 1: Hero Peeking Dock](#stage-1-hero-peeking-dock-unchanged)
   - [Stage 2: Exploded Tech Stack & AI Reassembly](#stage-2-exploded-tech-stack--ai-reassembly-plain-language-captions)
   - [Stage 3: Feature & Functionality Carousel](#stage-3-feature--functionality-carousel-deep-linking-engine)
   - [Stage 4: Zero-Auth Playground (The Centerpiece)](#stage-4-zero-auth-playground-centerpiece--interaction-gated-pwa)
   - [Stage 5: Craft, CAD Blueprint & Colossal Name (Merged)](#stage-5-craft-cad-blueprint--colossal-name-merged)
   - [Stage 6: Edge Deployment, Reviews & Final Conversion (Merged)](#stage-6-edge-deployment-reviews--final-conversion-merged)
5. [Conversion Logic & Global Anchors](#5-conversion-logic--global-anchors)
   - [5.1 Sticky "Try It Now" Conversion Anchor](#51-sticky-try-it-now-conversion-anchor)
   - [5.2 Interaction-Gated PWA Installation Architecture](#52-interaction-gated-pwa-installation-architecture)
   - [5.3 Deep-Linking Contract (Stage 3 ➔ Stage 4)](#53-deep-linking-contract-stage-3--stage-4)
6. [Motion & Scroll Engineering (Anti-Scroll-Jacking Contract)](#6-motion--scroll-engineering-anti-scroll-jacking-contract)
   - [6.1 Native Scroll Preservation](#61-native-scroll-preservation)
   - [6.2 Slim 6-Stage Clickable Progress Indicator](#62-slim-6-stage-clickable-progress-indicator)
7. [Technical PBR & 3D WebGL Pipeline Calibration](#7-technical-pbr--3d-webgl-pipeline-calibration)
8. [Data Contracts, Telemetry & Polymorphic Mock Engine](#8-data-contracts-telemetry--polymorphic-mock-engine)
9. [Verification, Performance Targets & Quality Gates](#9-verification-performance-targets--quality-gates)

---

## 1. EXECUTIVE SUMMARY & ARCHITECTURAL PIVOT

### 1.1 The Pivot: 9 Stages Compressed to 6 High-Velocity Stages
The previous 9-stage scroll layout dispersed the product proof across later sections and created excessive scroll fatigue before visitors could experience the actual application. The revised architecture enforces three foundational principles:
1. **Move Product Proof Earlier**: The interactive application playground is promoted to **Stage 4** (the centerpiece), immediately following feature introduction.
2. **Pervasive Conversion Access**: A sticky `"Try It Now"` CTA is visible continuously from Stage 2 through Stage 6, targeting the playground with zero auth friction.
3. **Preserve Story & Aesthetic Integrity**: The duality of physical craftsmanship (*Japanese oak desk, green metric cutting mat, Olfa knife, drafting pencil*) and precision AI engineering (*Three.js iPhone 16 Pro, exploded stack slices, CAD wireframes, amber glow*) is sustained throughout.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                OLD FLOW (9 STAGES) vs NEW FLOW (6 STAGES)              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [OLD 9-STAGE FLOW]                           │ [NEW 6-STAGE COMPACT FLOW]              │
│ 1. Hero Peeking Dock                         │ 1. Hero Peeking Dock                    │
│ 2. Exploded Tech Stack                       │ 2. Exploded Tech Stack (Plain Captions) │
│ 3. Feature Carousel                          │ 3. Feature Carousel (Deep-Links)        │
│ 4. Desktop Screen Morph                      │ 4. Zero-Auth Playground (Centerpiece)   │
│ 5. CAD Blueprint & Precision Details ──┐     │    [+ Contextual Interaction PWA]       │
│ 6. Colossal Name Display ──────────────┴─────┼➔ 5. Craft, Blueprint & Colossal Name    │
│ 7. Edge Deployment & Product Shots ────┐     │ 6. Edge Deployment, Reviews & Final CTA │
│ 8. Reviews & Testimonials ─────────────┼─────┼➔   • Step 1: Offline Product Shots      │
│ 9. Final CTA & PWA Install ────────────┘     │    • Step 2: Beta Feedback (Verified)   │
│                                              │    • Step 3: PWA 3D Conversion Hub      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. END-TO-END SYSTEM ARCHITECTURE DIAGRAM

```
                                  BROWSER CLIENT VIEWPORT
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             [STICKY NAV BAR]                            [STICKY "TRY IT NOW"]
          (Routes, 12ms Ping, Clerk)                   (Appears at Stage 2 ➔ 6)
                       │                                           │
  ┌────────────────────┴───────────────────────────────────────────┴────────────────────┐
  │                           NATIVE SCROLL CONTAINER (window)                          │
  │                           (No Wheel Trapping, Native Inertia)                      │
  │                                                                                     │
  │   [01] HERO PEEKING DOCK (h: 100vh) ───────────────────────────────┐                │
  │        • iPhone 16 Pro sits bottom-edge (top half peeks out)       │                │
  │        • CTAs: [TRY IT NOW] ➔ Stage 4 | [SIGN IN] ➔ Clerk          │  [SLIM 6-STAGE │
  │                                                                    │    PROGRESS    │
  │   [02] EXPLODED TECH STACK (h: 100vh) ─────────────────────────────┤   INDICATOR]   │
  │        • Phone tilts 3D isometric (~30° yaw, -20° pitch)           │   (Clickable   │
  │        • 6 Floating Slices with ≤ 8-word plain captions            │    Ticks 01-06)│
  │        • AI Reassembly with glowing amber filaments                │                │
  │                                                                    │        │       │
  │   [03] FEATURE FILMSTRIP CAROUSEL (h: 100vh) ──────────────────────┤        │       │
  │        • Center CAD dashed border card with prompt bar             │        │       │
  │        • Each card ends with [↳ Try this] deep-link                │        │       │
  │                                                                    │        │       │
  │   [04] ZERO-AUTH PLAYGROUND (h: auto / min-h: 100vh) ◀─────────────┼────────┘       │
  │        • Phone lands on cutting mat (Δh ≈ t caliper elevation)     │   (Primary     │
  │        • Seamless blend into live desktop application pane         │   Destination) │
  │        • Zero login wall: Signals Engine, Drizzle Stream, Fleet    │                │
  │        • Interaction-Gated [INSTALL PWA] card reveals on 1st click │                │
  │                                                                    │                │
  │   [05] CRAFT, CAD BLUEPRINT & COLOSSAL NAME (h: 100vh) ────────────┤                │
  │        • Glowing CAD wireframes & bezier handles                   │                │
  │        • Formula: C = 4πA/P² ("Shape precision for consistency")   │                │
  │        • Flows straight into giant geometric "ORCATHON" display    │                │
  │                                                                    │                │
  │   [06] EDGE DEPLOYMENT, REVIEWS & FINAL CONVERSION (h: auto) ──────┘                │
  │        • Step 1: Product Proof ("Works offline, always available")                  │
  │        • Step 2: Social Proof (BETA FEEDBACK: 36 verified testers, polaroids)       │
  │        • Step 3: PWA Landing Block (Switcher, 3D emblem preview, 3 CTAs)            │
  └─────────────────────────────────────────────────────────────────────────────────────┘
                                             │
                                     [MATTE CAD FOOTER]
                               (Grid, Specs, System Status)
```

---

## 3. COMPONENT HIERARCHY & STATE FLOW

### 3.1 Component Tree Architecture
```
src/app/page.tsx (Page Root Controller)
├── Navbar (Global persistent navigation with Clerk Auth & Live Ping)
├── SlimProgressIndicator (Fixed right-edge 6-stage navigation ticks)
├── StickyTryItNowButton (Fixed top-right desktop / bottom-right mobile floating CTA)
│
├── Section #stage-1: HeroPeekingDock
│   ├── DeskMatBackdrop (Japanese oak + A2 green metric cutting mat overlay)
│   ├── TactilePropsGroup (Olfa knife, cedar pencil, technical eraser, paper clips)
│   ├── DeviceModelCanvas (Three.js WebGL iPhone 16 Pro in peeking posture)
│   └── HeroActionPills ([TRY IT NOW] primary, [SIGN IN] secondary)
│
├── Section #stage-2: ExplodedTechStack
│   ├── FloatingLayerGroup (6 Z-stacked slices with 3D perspective tilt)
│   │   └── PlainLanguageCaptions (6 badges, each strictly ≤ 8 words)
│   └── ReassemblyFilamentMesh (Glowing amber particle lines representing AI reassembly)
│
├── Section #stage-3: FeatureCarousel
│   ├── HorizontalTrack (Overflow-x scroll/motion filmstrip)
│   └── FeatureCards (4 track cards + 1 spotlight prompt card with dashed CAD border)
│       └── DeepLinkPill ([↳ Try this in playground] with pre-selected track parameter)
│
├── Section #stage-4: ZeroAuthPlayground (#playground)
│   ├── DeskLandingSurface (Elevation detail Δh ≈ t with Vernier caliper markers)
│   ├── OryzoScreenBlendMorph (OLED boundary expansion into full 16:9 workspace)
│   │   ├── ProblemSignalsEngine (Track filtering, priority dispatcher, latency dials)
│   │   ├── DrizzleQueryStream (Live SQL query stream, execution timings < 12ms)
│   │   ├── EdgeTelemetryFleet (Probes for /api/health, /api/db-check, /api/redis-check)
│   │   └── SundayTrackAdapter (Polymorphic schema mapper)
│   └── InteractionGatedPWACard (Spring-revealed install prompt after first click)
│
├── Section #stage-5: CraftBlueprintColossal
│   ├── CadWireframeOverlay (Amber glowing vectors, bezier nodes, alignment crosshairs)
│   ├── FormulaPrecisionCard (C = 4πA/P² formula with plain benefit explainer)
│   └── ColossalOrcathonTitle (Giant geometric display typography with caliper arrows)
│
├── Section #stage-6: EdgeReviewsFinalConversion
│   ├── ProductProofGallery (Offline-first edge deployment proof, hardware telemetry)
│   ├── BetaFeedbackSection (36 verified tester quotes, polaroid cards, 3D emblem)
│   └── PWALandingBlock (Segmented track switcher, interactive preview, triple CTAs)
│
└── Footer (Matte CAD footer with system specs, build hash, status monitor)
```

### 3.2 State Machine & Event Flow
```typescript
interface LandingPageState {
  // Navigation & Scroll
  activeStage: 1 | 2 | 3 | 4 | 5 | 6;
  scrollProgress: number; // 0.0 -> 1.0 from window scroll
  showStickyTryItNow: boolean; // true when activeStage >= 2

  // Playground & Interaction Gating
  hasInteractedInPlayground: boolean; // starts false, set to true on 1st user action
  showPWAInstallPrompt: boolean; // hasInteractedInPlayground === true
  activePlaygroundPane: 'signals' | 'drizzle' | 'fleet' | 'adapter';

  // PWA Prompt Lifecycle
  deferredPrompt: BeforeInstallPromptEvent | null;
  pwaInstalled: boolean;
}
```

---

## 4. DETAILED 6-STAGE SCROLL FLOW SPECIFICATIONS

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: HERO PEEKING DOCK (STRICT ORYZO 1:1 REPLICATION)                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Visual Posture: Phone sits upright at bottom edge; only top 48% peeks above fold.      │
│ Three.js Camera: FOV: 32°, Pos: [0, 0.45, 2.85], Target: [0, -0.05, 0].                │
│ Model Posture: Pitch: 0°, Yaw: 0°, Roll: 0°. Device sits in lower cutting mat recess.  │
│ Screen HUD: Dynamic Island, status bar (09:41, 5G, 100%), live pulsing problem radar. │
│ Physical Props: Olfa knife (left), wooden pencil (bottom), eraser & paper clips.       │
│ Primary CTAs:                                                                          │
│   1. [ TRY IT NOW ] ➔ Smooth-scrolls straight into Stage 4 (#playground).              │
│   2. [ SIGN IN ]    ➔ Opens Clerk Edge authentication modal.                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: EXPLODED TECH STACK & AI REASSEMBLY                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Visual Posture: Phone lifts to viewport center and tilts isometrically (Yaw: 32°,       │
│                 Pitch: -22°). Device separates into 6 floating slices along Z-depth.   │
│                                                                                        │
│ Plain-Language Captions (Enforced Constraint: Maximum 8 words per slice):              │
│  • Slice 1 [Front OLED Glass]:                                                         │
│    "Fluid, responsive interfaces running at 60fps."                  (7 words)         │
│  • Slice 2 [Graphics Hardware / GPU]:                                                  │
│    "Real-time 3D spatial hardware graphics acceleration."            (6 words)         │
│  • Slice 3 [Edge Security Perimeter]:                                                 │
│    "Instant biometric edge authentication with zero friction."       (8 words)         │
│  • Slice 4 [Drizzle ORM & Database]:                                                   │
│    "Lightning-fast database queries executing under 12ms."           (6 words)         │
│  • Slice 5 [Distributed Memory Cache]:                                                 │
│    "Worldwide instant memory caching with zero cold-starts."         (7 words)         │
│  • Slice 6 [Grade-5 Titanium Chassis]:                                                 │
│    "Grade-5 titanium chassis engineered for on-device execution."    (7 words)         │
│                                                                                        │
│ AI Reassembly: Amber glowing filaments (`#ff8539`, line-width: 1.5) pull the slices    │
│                back into a solid unified chassis, accompanied by procedural haptics.   │
│ Global Trigger: Sticky "Try It Now" anchor activates upon entering Stage 2.           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: FEATURE & FUNCTIONALITY CAROUSEL                                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Visual Posture: Full-width horizontal cinematic filmstrip with dark vignette.          │
│ Center Spotlight: Prominent card with dashed CAD border (`border-dashed border-amber`) │
│                   featuring an interactive prompt simulator:                           │
│                   "Hey @ORCATHON, solve track 02 latency spikes..."                    │
│ Deep-Linking Engine: Every card terminates with an interactive link:                   │
│   • [ ↳ Try this in playground ]                                                       │
│   Clicking sets active pane to corresponding feature and smoothly scrolls to Stage 4.  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: ZERO-AUTH PLAYGROUND (THE CENTERPIECE)                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Visual Posture: Phone lands squarely on the green cutting mat table surface.           │
│ Elevation Detail: Vernier caliper markings display "ELEVATION: Δh ≈ t (FLUSH)".        │
│ Smooth Blend: The 3D phone screen seamlessly morphs into the full-scale 16:9 desktop   │
│               application workspace container (`OryzoScreenBlendMorph`).               │
│                                                                                        │
│ Strict Zero-Auth Standard:                                                             │
│   • NO login wall. NO modal blocking. Immediate interactive execution.                │
│   • Live Problem Signals Engine: Filter by AI, DeFi, Civic, or Healthcare.            │
│   • Real-Time Drizzle Stream: Inspect SQL payloads and timing logs.                    │
│   • Edge Telemetry Diagnostics: Real live probes to /api/health and /api/db-check.     │
│                                                                                        │
│ Interaction-Gated PWA Installation Card:                                               │
│   • Mounted directly beside the playground controls where user intent peaks.           │
│   • INITIAL STATE: Completely hidden to eliminate cognitive clutter.                   │
│   • TRIGGER: On visitor's FIRST click (filter change, query dispatch, or tab switch), │
│              the card springs into view with an amber glow:                            │
│              "Install Orcathon PWA for offline edge access."                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: CRAFT, CAD BLUEPRINT & COLOSSAL NAME (MERGED)                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Visual Posture: Dark blueprint grid with amber glowing CAD wireframes, vector axes,    │
│                 bezier curve handles, and technical dimension markers.                 │
│                                                                                        │
│ Circularity Metric Formula & User Benefit:                                             │
│        Formula:  C = 4πA / P²                                                          │
│        Plain User Benefit:                                                             │
│        "We measure mathematical shape precision so every output is                     │
│         pixel-consistent across all screen dimensions."                                │
│                                                                                        │
│ Closing Visual: Blueprint lines flow directly into the giant geometric display title:   │
│                 O  R  C  A  T  H  O  N                                                 │
│                 (Tracking: -0.04em, Weight: 900, with vector calipers capping ends)    │
│                 Seamless transition: No separate stage needed for the colossal name.   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 6: EDGE DEPLOYMENT, REVIEWS & FINAL CONVERSION (MERGED)                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Strict Pacing Order: Product Proof First ➔ Social Proof Second ➔ Conversion Last.      │
│                                                                                        │
│ Step 1: Product Proof (Edge Execution)                                                 │
│   • Headline: "Runs on the edge / Refuses the cloud."                                  │
│   • Explicit Non-Contradictory Claim:                                                  │
│     "Works offline, always available (zero cloud dependency)."                         │
│   • Visuals: Edge node latency map, on-device SQLite sync, and hardware telemetry.     │
│                                                                                        │
│ Step 2: Social Proof (Authentic Beta Feedback)                                         │
│   • Section Label: "BETA FEEDBACK [ 36 VERIFIED TESTERS ]"                             │
│   • Integrity Rule: No fake "4.9/5 stars". Display verified quotes and telemetry logs: │
│     "Sub-12ms query execution on real hardware. The polymorphic schema handled         │
│      Sunday's track announcement in seconds." — Systems Architect                      │
│   • Visuals: Polaroid-framed screenshots and interactive 3D floating titanium emblem.  │
│                                                                                        │
│ Step 3: Final PWA Landing Block (Conversion Hub)                                       │
│   • Segmented track selector ([ PWA COMPANION ] / [ WORKBENCH ] / [ FLEET ]).         │
│   • Interactive 3D preview with tactile haptic audio feedback.                         │
│   • High-Visibility Conversion Actions:                                                │
│     1. [ TRY IT NOW ]   ➔ Smooth-scrolls back to Stage 4 Playground.                   │
│     2. [ INSTALL PWA ]  ➔ Triggers browser beforeinstallprompt API.                    │
│     3. [ SIGN UP ]      ➔ Clerk edge authenticated account creation.                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. CONVERSION LOGIC & GLOBAL ANCHORS

### 5.1 Sticky "Try It Now" Conversion Anchor
To ensure visitors can access the core product at any point during their scroll experience, a persistent conversion anchor is embedded globally in `src/app/page.tsx`:

```tsx
// Desktop: Top-right corner below navbar | Mobile: Bottom-right floating action button
<div
  className={`fixed z-50 transition-all duration-300 ${
    showStickyCta 
      ? "opacity-100 translate-y-0 pointer-events-auto" 
      : "opacity-0 translate-y-4 pointer-events-none"
  } top-20 right-6 md:top-24 md:right-8`}
>
  <button
    onClick={() => {
      document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff8539] text-[#07080a] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(255,133,57,0.4)] hover:shadow-[0_0_35px_rgba(255,133,57,0.7)] transition-all active:scale-95"
  >
    <span className="w-2 h-2 rounded-full bg-[#07080a] animate-pulse" />
    <span>Try It Now</span>
    <span className="opacity-60 group-hover:translate-x-0.5 transition-transform">➔</span>
  </button>
</div>
```

- **Activation Trigger**: Enabled via scroll offset (`window.scrollY > window.innerHeight * 0.85`) or when Stage 2 intersects the viewport.
- **Deactivation**: Remains active until the visitor enters Stage 4 (playground itself), then re-emerges in Stages 5 and 6.

### 5.2 Interaction-Gated PWA Installation Architecture
High-friction PWA popups displayed upon initial page load cause immediate user rejection. Our architecture implements an **interaction-gated intent model**:

```
Visitor lands on Stage 4 Playground
               │
               ▼
[Initial State: PWA Prompt Hidden]
Visitor explores without interruptions
               │
               ▼
Visitor performs ANY interaction
(e.g., clicks track filter, runs query, dispatches signal)
               │
               ▼
`hasInteracted` state flips to `true`
               │
               ▼
PWA Install Card mounts beside playground with spring animation:
┌──────────────────────────────────────────────────────────────┐
│  ⚡ RUN ON THE EDGE (PWA)                                     │
│  "Install as a standalone desktop/mobile app.                │
│   Zero network dependency. Sub-12ms response."               │
│                                                              │
│  [ INSTALL PWA COMPANION ]      [ Remind Me Later ]         │
└──────────────────────────────────────────────────────────────┘
```

#### Technical Implementation Contract:
```typescript
// src/components/oryzo/OryzoScreenBlendMorph.tsx
const [hasInteracted, setHasInteracted] = useState(false);

const handleUserInteraction = () => {
  if (!hasInteracted) {
    setHasInteracted(true);
    // Optional telemetry event:
    trackEvent('playground_first_interaction', { timestamp: Date.now() });
  }
};

// Attached to all interactive elements in the playground:
<button onClick={() => { handleUserInteraction(); setActivePane('drizzle'); }} ... />
```

### 5.3 Deep-Linking Contract (Stage 3 ➔ Stage 4)
Each card in the Stage 3 Feature Carousel links directly into a pre-configured state in the Stage 4 Playground:
```typescript
interface FeatureCardLink {
  targetStageId: 'playground';
  targetPane: 'signals' | 'drizzle' | 'fleet' | 'adapter';
  preloadedTrack?: 'ai' | 'defi' | 'civic' | 'health';
}

const handleFeatureDeepLink = (config: FeatureCardLink) => {
  // 1. Dispatch custom event or URL hash to set target pane
  window.dispatchEvent(new CustomEvent('orcathon-select-pane', { 
    detail: { pane: config.targetPane, track: config.preloadedTrack } 
  }));
  // 2. Smoothly scroll into view
  document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
};
```

---

## 6. MOTION & SCROLL ENGINEERING (ANTI-SCROLL-JACKING CONTRACT)

### 6.1 Native Scroll Preservation
- **Negative Constraint**: **NO `wheel` event hijacking. NO `preventDefault()` on native scrolling.**
- **Implementation Mechanism**:
  - Every stage occupies its natural CSS document flow (`min-h-screen` or `h-screen`).
  - Stage-linked animations are driven by CSS `position: sticky` and `motion/react` `useScroll`:
  ```tsx
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  ```
  - Devices with `prefers-reduced-motion: reduce` receive instant CSS opacity switches without 3D translation transforms.

### 6.2 Slim 6-Stage Clickable Progress Indicator
Mounted fixed along the right viewport margin (`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40`):

```
     STAGE TICKS                 HOVER / ACTIVE STATE
        ── [01]                (01 HERO DOCK)
        ── [02]                (02 TECH STACK)
        ── [03]                (03 CAROUSEL)
        ── [04] ● ──────────── (04 PLAYGROUND) ➔ Amber glowing dot
        ── [05]                (05 CAD CRAFT)
        ── [06]                (06 EDGE / FINAL)
```

```tsx
const STAGES = [
  { id: "stage-1", label: "Hero Dock", num: "01" },
  { id: "stage-2", label: "Tech Stack", num: "02" },
  { id: "stage-3", label: "Features", num: "03" },
  { id: "playground", label: "Playground", num: "04" },
  { id: "stage-5", label: "CAD Craft", num: "05" },
  { id: "stage-6", label: "Edge & Final", num: "06" },
];

export function SlimProgressIndicator({ currentStage }: { currentStage: string }) {
  return (
    <nav aria-label="Scroll Progress" className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3">
      {STAGES.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center justify-end gap-2 py-1"
          aria-label={`Jump to stage ${s.num}: ${s.label}`}
        >
          <span className="font-mono text-[10px] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {s.label}
          </span>
          <span className={`font-mono text-[11px] transition-colors ${
            currentStage === s.id ? "text-[#ff8539] font-bold" : "text-neutral-500 group-hover:text-neutral-300"
          }`}>
            {s.num}
          </span>
          <span className={`w-3 h-0.5 transition-all ${
            currentStage === s.id ? "w-6 bg-[#ff8539]" : "bg-neutral-800 group-hover:bg-neutral-500"
          }`} />
        </button>
      ))}
    </nav>
  );
}
```

---

## 7. TECHNICAL PBR & 3D WEBGL PIPELINE CALIBRATION

The Three.js scene (`src/components/canvas/DeviceModelCanvas.tsx`) renders the authentic iPhone 16 Pro model (`public/models/orcathon_device.glb`, 827 KB Draco-compressed) with the following exact material parameters:

```typescript
export const IPHONE_PBR_CALIBRATION = {
  // Grade 5 Brushed Natural Titanium Chassis
  titaniumFrame: {
    color: '#1a1b22',
    roughness: 0.22,
    metalness: 0.95,
    clearcoat: 0.15,
    clearcoatRoughness: 0.20,
  },
  // Frosted Obsidian Backplate
  backplateGlass: {
    color: '#0e0f14',
    roughness: 0.58,
    metalness: 0.10,
    transmission: 0.35,
    ior: 1.52,
  },
  // Sapphire Crystal Camera Plateau
  cameraIsland: {
    color: '#08090d',
    roughness: 0.05,
    metalness: 0.30,
    clearcoat: 1.0,
  },
  // Dynamic Off-Screen OLED Canvas HUD
  screenOLED: {
    roughness: 0.12,
    metalness: 0.02,
    emissive: '#ffffff',
    emissiveIntensity: 0.85, // Self-illuminating 60 FPS texture
  }
};
```

---

## 8. DATA CONTRACTS, TELEMETRY & POLYMORPHIC MOCK ENGINE

To uphold the "Works offline, always available" claim in Stage 6 without breaking during live demonstrations, all data streams are decoupled via `src/lib/problemConfig.ts`:

```typescript
export interface ProblemSignal {
  id: string;
  trackId: 'ai' | 'defi' | 'civic' | 'health';
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  latencyMs: number;
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface EdgeTelemetryReading {
  probe: '/api/health' | '/api/db-check' | '/api/redis-check';
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  latency: number;
  region: string;
  memoryUsageMb: number;
}
```

When offline, a Service Worker interceptor feeds simulated hardware telemetry generated deterministically using seedable PRNG, ensuring **100% test reliability with zero cloud dependency**.

---

## 9. VERIFICATION, PERFORMANCE TARGETS & QUALITY GATES

| Dimension | Target Metric | Verification Method |
| :--- | :--- | :--- |
| **Lighthouse Performance** | $\ge$ 92 / 100 on desktop | `Chrome DevTools Lighthouse Audit` |
| **Largest Contentful Paint (LCP)** | $\le$ 1.8 seconds | DevTools Performance recording on Hero stage |
| **Interaction to Next Paint (INP)** | $\le$ 80 milliseconds | Testing Stage 4 tab transitions |
| **Cumulative Layout Shift (CLS)** | 0.000 | Zero font swap shift / fixed aspect containers |
| **TypeScript / ESLint** | 0 errors, 0 warnings | `npm run lint` & `tsc --noEmit` |
| **Scroll Reliability** | Native window scroll only | Absence of wheel event listeners on root document |
| **Accessibility (WCAG AA)** | 100% keyboard navigable | Tab focus tests across all 6 stages and CTAs |

---

*Architectural specification authored for Orcathon 2026. Maintain in project repository at `docs/ORCATHON_LANDING_PAGE_ARCHITECTURE.md`.*
