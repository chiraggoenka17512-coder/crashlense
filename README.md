# ⚡ CrashLens // Predictive Failure Radar & Distributed Chaos Sandbox

> **ORCATHON 2026 OFFICIAL SUBMISSION**  
> **Track**: Track 01 — Software & AI (Autonomous self-healing systems, reliability intelligence)  
> **Live Production App**: [https://orcathon-2026.vercel.app](https://orcathon-2026.vercel.app)  
> **GitHub Repository**: [https://github.com/chiraggoenka17512-coder/crashlense](https://github.com/chiraggoenka17512-coder/crashlense)  

---

## 🌟 Executive Summary

Traditional observability platforms (DataDog, Grafana, CloudWatch) operate on **reactive alerting**—firing alarms only after error rates breach 5% or after user requests begin failing. In microservice environments, a single database connection leak or thread pool saturation cascades through upstream services in seconds before engineers can even open a runbook.

**CrashLens** shifts the paradigm to **predictive pre-failure interception**:
1. **12-Node Live Topology DAG**: Real-time percolation tracking mapping anomaly velocity along dependency edges 45 seconds before pool exhaustion.
2. **Dual-Model Reflex System-1 Engine**: Sub-350ms root cause analysis executing fast-reflex models (`inception/mercury-decide`) backed by deep reasoning (`liquid/lfm-2.5-2.6b`) via OpenRouter, with full BYOK (Bring-Your-Own-Key) privacy.
3. **Custom Codebase AST Cartography**: Ingests real codebases (e.g. `chiraggoenka17512-coder/Cartograph`) via Babel/TypeScript AST analysis to generate instant architectural graphs.
4. **Deterministic Chaos Sandbox**: 1-click incident detonation lab injecting real-world failure patterns (pool starvation, network partitions, memory pressure) to test systemic resilience.
5. **Counterfactual Incident Ledger**: Side-by-side saved vs. crashed telemetry stored in a type-safe Drizzle ORM + Supabase PostgreSQL ring buffer.

---

## 🏛️ System Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │       Next.js 16 + React 19 Client           │
                    │   Turbopack · Motion · Tailwind CSS · PWA    │
                    └──────────────────────┬───────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
 ┌───────────────┐                 ┌───────────────┐                 ┌───────────────┐
 │ 3D WebGL HUD  │                 │ Clerk Auth    │                 │ AST Engine    │
 │ Three.js/DAG  │                 │ Session Rail  │                 │ Babel Parser  │
 └───────┬───────┘                 └───────┬───────┘                 └───────┬───────┘
         │                                 │                                 │
         └─────────────────────────────────┼─────────────────────────────────┘
                                           │
                     ┌─────────────────────┴─────────────────────┐
                     ▼                                           ▼
         ┌───────────────────────┐                   ┌───────────────────────┐
         │ Drizzle + Supabase    │                   │ Upstash Redis Cache   │
         │ PostgreSQL (AWS 6543) │                   │ Serverless Telemetry  │
         └───────────┬───────────┘                   └───────────┬───────────┘
                     │                                           │
                     └─────────────────────┬─────────────────────┘
                                           │
                                           ▼
                             ┌───────────────────────────┐
                             │ OpenRouter Reflex AI      │
                             │ Mercury + LFM-2.5 (BYOK)  │
                             └───────────────────────────┘
```

### The 6 Deconstructed Runtime Layers
- **Layer 01 // Failure Radar OLED HUD**: Compiled via Turbopack with React 19 concurrent transitions and zero-hydration lag.
- **Layer 02 // 3D Spatial Graph Canvas**: Hardware-accelerated Three.js canvas executing spatial directed acyclic graph layouts with Draco decompression.
- **Layer 03 // Clerk Edge Auth Perimeter**: Instant edge biometric and social authentication with JWT claims exchange and zero-friction session hydration.
- **Layer 04 // 1Hz Ring Buffer Store**: Type-safe relational schema mapped directly to Supabase PostgreSQL over low-overhead AWS pooling on port 6543.
- **Layer 05 // Active Mitigation Bus**: Upstash Serverless Redis delivering 10,000 req/sec telemetry caching and automated circuit breaker state.
- **Layer 06 // OpenRouter Dual-Model Reflex AI**: Sub-350ms fast-reflex intelligence fusing Mercury (`<350ms`) with LFM-2.5 deep reasoning and custom BYOK key injection.

---

## 🕸️ 12-Node Cluster Topology

The default cluster models a high-throughput financial and commerce ecosystem with 12 interconnected microservices:

```
                      [ api-gateway ]
                       /     |      \
                      v      v       v
               [ auth-svc ] [ cart ] [ recommendations ]
                             |   \
                             v    v
               [ orders-svc ]    [ redis-cache ]
                /           \            \
               v             v            v
        [ payments-svc ]  [ inventory ]   [ analytics-svc ]
           /         \           |
          v           v          v
   [ payments-db ] [ fraud-svc ] [ warehouse-db ]
          \
           v
   [ notification-svc ] -> [ kafka-broker ]
```

---

## 🛠️ Tech Stack & Dependencies

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + Turbopack | Edge-rendered hybrid client & server architecture |
| **Frontend Core** | React 19 + TypeScript | Concurrent state updates & zero-jank transitions |
| **Motion & 3D** | Motion (Framer) + Three.js | Spatial camera crane dollies & interactive GLTF/Draco models |
| **Authentication** | Clerk Auth | Multi-tenant session verification & edge protection |
| **Database** | Drizzle ORM + Supabase PostgreSQL | Type-safe counterfactual incident ledger & AWS pooling |
| **Cache & State** | Upstash Redis | Serverless REST distributed rate-limiting & telemetry store |
| **AI Intelligence** | OpenRouter Reflex API | Dual-model ensemble (`inception/mercury-decide` + `liquid/lfm-2.5-2.6b`) |
| **Styling** | Vanilla CSS + Tailwind CSS | Oryzo-inspired tactile noir design tokens & CAD calipers |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/chiraggoenka17512-coder/crashlense.git
cd crashlense
npm install
```

### 2. Environment Configuration
Create a `.env.local` file (or copy `.env.example`):
```env
# Clerk Authentication (Optional for demo mode)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Upstash Redis (Optional for local memory fallback)
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# Supabase PostgreSQL Database (Optional for counterfactual logs)
DATABASE_URL=postgresql://postgres:...@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# OpenRouter Reflex AI (Optional: Built-in 3-key rotator handles demo mode, or use BYOK in UI)
OPENROUTER_API_KEY=sk-or-v1-...
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the 6-stage landing experience, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to launch directly into the active workspace.

### 4. Build & Type Check
```bash
npx tsc --noEmit
npm run build
```

---

## 📄 License & Credits
Built with precision for **Orcathon 2026**. Designed with original procedural 3D engineering, inspired by modern spatial ergonomics and zero-latency SRE craftsmanship.
