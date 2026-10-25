Read AGENTS.md and context.md first. Follow them strictly.

# Fast-Track Task: Implement Complete AI & Root Cause Analysis Engine (Prompts 09–12)

You are implementing the core intelligence engine for CrashLens. Build all required TypeScript files in one single pass:

### 1. OpenRouter 3-Key Rotator (`src/engine/ai/OpenRouterKeyRotator.ts` & `rotatorTypes.ts`)
- Interface `KeySlot`: `id: number (1-3)`, `key: string`, `status: 'READY' | 'COOLDOWN' | 'EXHAUSTED'`, `cooldownUntil: number`, `failureCount: number`.
- `class OpenRouterKeyRotator`:
  - Reads keys `OPENROUTER_API_KEY_1`, `OPENROUTER_API_KEY_2`, `OPENROUTER_API_KEY_3` from process.env.
  - `getActiveKey()`: Returns next ready key; rotates automatically on 429/5xx and sets a 60-second cooldown timer.
  - `executeWithRetry<T>(requestFn)`: Tries up to 3 keys before signaling fallback without throwing unhandled exceptions.

### 2. Tier 0 Local Deterministic Fast-Path (`src/engine/analysis/rollingStats.ts`, `AnomalyDetector.ts`, `DagPercolation.ts`)
- `computeRollingZScore(current, history)`: Computes Z-score bounded between [-3.0, 15.0].
- `AnomalyDetector`:
  - Composite score: `S_anomaly = 0.50 * Z_p99 + 0.30 * Z_errorRate + 0.20 * Z_cpu`. Mark anomaly if S > 2.5.
  - Anomaly velocity: `V_anomaly = (S(t) - S(t-3)) / 3`. `TimeToCritical = max(5, (10 - S) / (V + 0.001))`.
- `DagPercolation`:
  - Finds candidate root cause node (earliest anomaly onset and highest downstream impact).
  - Breadth-first search along directed CLUSTER_EDGES to calculate `blastRadiusServices`.

### 3. Prediction Result Type (`src/types/prediction.ts`)
```typescript
export interface PredictionResult {
  source: 'SYSTEM_1_AI' | 'TIER_0_LOCAL_DETERMINISTIC';
  anomalyDetected: boolean;
  confidence: number;
  rootCauseService: string | null;
  failureMode: string;
  timeToCriticalSec: number;
  blastRadiusServices: string[];
  recommendedAction: {
    actionId: string;
    title: string;
    targetService: string;
    parameters: Record<string, any>;
    estimatedRiskReductionPct: number;
  };
}
```

### 4. System 1 AI Client (`src/engine/ai/compactSerializer.ts`, `system1Prompts.ts`, `System1Client.ts`)
- `serializeTelemetryDiff()`: Distills 12 nodes into a compact 10-line ASCII table (< 300 tokens) with nodes where |Z| > 1.5.
- `System1Client`:
  - Primary model: `inception/mercury-decide:free`, secondary: `liquid/lfm-2.5-2.6b:free`.
  - Runs Tier 0 detector first; if Z < 2.0, returns healthy without spending API tokens.
  - If anomaly detected, calls OpenRouter chat completions with `{ type: "json_object" }` in < 350ms.
  - If keys exhausted or JSON fails, falls back instantly to Tier 0 local prediction with `source: 'TIER_0_LOCAL_DETERMINISTIC'`.

### 5. RCA Alert & Visual Canvas HUD (`src/stores/usePredictionStore.ts`, `RcaAlertBanner.tsx`, `CulpritCrosshair.tsx`)
- `usePredictionStore`: Zustand store managing `activePrediction`, `timeToCriticalRemaining`, and `isAnalyzing`. Decrement countdown every 1s when anomaly is active.
- `RcaAlertBanner.tsx`: Top HUD banner with warning tag, culprit name, failure mode, and prominent countdown: `⚡ SLA COLLAPSE IN: 00:XXs`.
- `CulpritCrosshair.tsx`: Glowing amber corner brackets (`┌ ┐ └ ┘`) around the culprit node and animated dashed cascade paths on downstream edges.

Deliver all files fully implemented with zero placeholders.
