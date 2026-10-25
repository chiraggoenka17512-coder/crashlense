Read AGENTS.md and context.md first. Follow them strictly.

# Fast-Track Task: Implement Recovery Advisor, Physics Mutator & "Saved vs. Crashed" Split Demo (Prompts 13–16)

You are implementing the interactive remediation and hackathon signature demo for CrashLens. Build all required TypeScript/React files in one single pass:

### 1. Recovery Advisor Strategies (`src/types/recovery.ts`, `src/engine/analysis/recoveryStrategies.ts`)
- Strategy types: `CIRCUIT_BREAKER_TRIP`, `CONNECTION_POOL_RECYCLE`, `ADAPTIVE_RATE_SHEDDING`, `STALE_CACHE_FALLBACK`, `THREAD_BULKHEAD_ISOLATION`.
- `generateRecoveryStrategies(prediction)`: Returns 3 ranked options for the failure mode:
  - Example for `DB_POOL_LEAK` (`payments-db`):
    - Option 1 (Recommended): `CONNECTION_POOL_RECYCLE` (88% risk reduction, 3s recovery, 0 dropped users).
    - Option 2: `CIRCUIT_BREAKER_TRIP` (65% reduction, 10% payment retries).
    - Option 3: `ADAPTIVE_RATE_SHEDDING` (45% reduction).
- `RecoveryAdvisorPanel.tsx`: Right sidebar / sliding drawer displaying the 3 cards with risk reduction bars and a prominent amber `[ ⚡ APPLY MITIGATION NOW ]` button.

### 2. Mitigation Mutator Physics (`ClusterSimulator.ts` extension & `RcaAlertBanner.tsx`)
- In `ClusterSimulator`, implement `applyMitigation(strategy)`:
  - In subsequent simulation ticks, apply exponential recovery formula:
    `metric(t) = baseline + (degraded - baseline) * e^(-0.85 * (t - t_applied))`
  - Restores p99 to baseline (< 20ms) and queues drain to 0 in ~3-4 seconds.
- Update `RcaAlertBanner.tsx` on mitigation:
  - Transition amber countdown into celebratory green badge: `✓ SYSTEM SAVED — RECOVERY APPLIED AT T+14s | p99: 18ms`.
  - Culprit brackets transition from amber to emerald `#22c55e`.

### 3. "Saved vs. Crashed" Split-Screen Counterfactual Demo (`src/engine/simulator/counterfactualModel.ts`, `SavedVsCrashedViewer.tsx`, `TimelineScrubber.tsx`)
- `generateCounterfactualPair(incidentId)`: Generates two 45-second timeline arrays:
  - Array A (Saved): Mitigated at T+14s, returns to baseline by T+18s. Dropped txns: 4, Revenue loss: $240.
  - Array B (Crashed): Unmitigated cascade hits orders-svc at T+20s, api-gateway at T+32s, cluster collapse by T+40s. Dropped txns: 1,420, Revenue loss: $184,000.
- `SavedVsCrashedViewer.tsx`: Split-screen modal with interactive time slider (`T+00s` to `T+45s`):
  - Left side (Green glow): `✓ SAVED WITH CRASHLENS (PREDICTIVE)` with live sparkline.
  - Right side (Red warning): `✕ CRASHED WITHOUT CRASHLENS (REACTIVE)` with spike sparkline.
  - Auto-launches or can be opened via `[ ⚖ SAVED VS CRASHED TIMELINE ]` button.

### 4. Exportable Embed Component (`src/components/radar/CrashLensRadar.tsx`)
- Self-contained `<CrashLensRadar standalone={false} initialScenario="SCENARIO_A" />` that wraps the topology SVG, telemetry tick loop, RCA banner, Advisor, and Split Demo so it can mount cleanly into any container or Stage 4 of a parent landing page.

Deliver all files fully implemented with zero placeholders.
