# 🎨 DESIGN.md: Visual Language & Motion Observations (Oryzo.ai Analysis)

*Prepared for ORCATHON 2026 3D Landing Page Architecture.*

---

## 1. Executive Aesthetic Observations

Oryzo.ai (by Lusion) achieves an award-winning aesthetic through **tactile physical realism juxtaposed with high-precision technical CAD discipline**. It is not a standard SaaS landing page; it feels like an industrial design studio workbench with deliberate, museum-grade restraint.

### Core Visual Pillars
1. **Pitch Noir & Warm Cream Palette**: Rather than generic cold blues or stark whites, the background sits in ultra-deep pitch noir (`#07080a`, `#0e1017`) accented with warm cream (`#ffedd6`), parchment white (`#f4efe6`), and industrial amber/earth orange (`#ff8539`).
2. **Generous Negative Space & Scale Contrast**: Massive geometric bold display typography (900 weight, tight tracking) contrasts with tiny, razor-sharp technical mono eyebrows (10px–12px, Geist/Outfit Mono, tabular figures, uppercase).
3. **Slow, Confident Spatial Motion**: The central 3D object never abruptly teleports or spins erratically. Rotations follow smooth spherical quaternions or damped spring physics (stiffness ~120, damping ~14). Camera dollies move along linear or cubic-bezier curves synchronized with native scroll.
4. **CAD Blueprint & Vernier Calipers**: Micro-caliper brackets (`[+142, -84]`), hairline dashed borders (`1px dashed rgba(255,237,214,0.15)`), millimeter tick marks, and JIS technical crosshairs create a sense of mechanical precision.

---

## 2. Telemetry & Color Token Matrix

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `--bg-pitch` | `#07080a` | Deepest viewport ground; zero light bleed |
| `--bg-surface` | `#0d0f16` | Card backgrounds, simulated browser frames |
| `--text-cream` | `#ffedd6` | Primary high-contrast text, title highlights |
| `--text-parchment` | `#f4efe6` | Body text, readable secondary headings |
| `--text-muted` | `#94a3b8` | Technical annotations, subtitles, metadata |
| `--accent-amber` | `#ff8539` | Primary action glow, CAD wireframes, calipers |
| `--mat-green` | `#163024` | Cutting mat dark green tone |
| `--border-hairline` | `rgba(255, 237, 214, 0.08)` | Outer card boundaries, CAD grid rules |

---

## 3. Spatial Behavior & 3D Object Choreography

### Desktop Viewport Dynamics
- **Camera Configuration**: Low FOV (30°–34°) perspective camera to mimic isometric architectural photography without harsh wide-angle perspective distortion.
- **Stage 1 (Hero Peeking Dock)**: The central device is anchored to the bottom viewport edge with only its upper half (~45%) peeking above the fold. This acts as an immediate visual hook.
- **Stage 2 (Exploded Slices)**: As the user scrolls, the camera dollies back slightly, the device lifts to an isometric pitch/yaw (`~30° yaw, -20° pitch`), and 6 distinct layers separate along the local Z-axis. AI particle filaments pull them back together.
- **Stage 3 (Horizontal Filmstrip Carousel)**: The 3D object transitions smoothly as a horizontal track translates cards sideways, spotlighting the center card with a glowing amber dashed CAD border.
- **Stage 4 (Zero-Auth Desktop Blend)**: The device settles squarely onto the cutting mat (Δh ≈ t). Its screen boundaries expand outwards and blend into the interactive desktop browser container.
- **Stage 5 (CAD Blueprint)**: Wireframe rendering takes over with glowing amber edges and bezier calibration handles. The circularity equation C = 4πA / P² frames the craft.
- **Stage 6 (Conversion)**: Real product telemetry, verified beta feedback cards, and the final 3-button conversion tier (`[TRY IT NOW]`, `[INSTALL PWA]`, `[SIGN UP]`).

### Mobile Viewport Adaptations
- Camera distance adjusts dynamically (z: 2.85 -> 3.8) to prevent clipping on narrow viewports (< 768px).
- Stack slices in Stage 2 stack vertically or fan out gently with reduced travel distance to maintain touch performance.
- The sticky "Try It Now" CTA converts from a top-right desktop pill to an ergonomic bottom-right floating action button.

---

## 4. Accessibility & Performance Guardrails

1. **Native Scroll Preservation**: Lenis is configured with zero wheel trapping or scroll locking (`prevent: false`). Touch scrolling on mobile remains 100% native.
2. **Reduced Motion (`prefers-reduced-motion: reduce`)**: All 3D rotations and layer translations fall back to instant crossfade states or static views.
3. **Hardware Tier Detection**: Detect low-end GPUs or mobile devices using WebGL context inspection (`WEBGL_debug_renderer_info`). If memory or GPU is constrained, Stages 2 and 5 automatically fall back to crisp 2D SVG/canvas wireframes.
4. **Lazy Asset Loading**: 3D geometries and large textures are loaded asynchronously behind a unified loader abstraction with smooth skeleton fade-ins.
