export type WorkspaceTier = "pwa" | "workbench" | "fleet";

export interface TierFeature {
  id: WorkspaceTier;
  name: string;
  description: string;
  badge: string;
  specs: string[];
}

export interface BetaReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  verified: boolean;
}

export interface Stage6DeploymentHubProps {
  onTryItNow: () => void;
}

export const WORKSPACE_TIERS: Record<WorkspaceTier, TierFeature> = {
  pwa: {
    id: "pwa",
    name: "CRASHLENS PWA",
    badge: "MOBILE RADAR COMPANION",
    description:
      "Monitor the 12-node microservice failure radar from any device with native mobile PWA installation.",
    specs: [
      "Responsive 12-node topology radar HUD",
      "Native PWA push alerts on 45s failure horizon",
      "Direct access to real-time incident sandbox",
    ],
  },
  workbench: {
    id: "workbench",
    name: "SRE WORKBENCH",
    badge: "SYSTEM 1 REFLEX SUITE",
    description:
      "Explore the 3D topology workbench, deterministic chaos injector, and counterfactual validation tools in the CrashLens workspace.",
    specs: [
      "Interactive 3D microservice DAG canvas",
      "System 1 fast-reflex root cause diagnosis (<350ms)",
      "Deterministic chaos injection scenarios (Pool Leaks, GC)",
    ],
  },
  fleet: {
    id: "fleet",
    name: "ENTERPRISE FLEET",
    badge: "PREDICTIVE CASCADE FLEET",
    description:
      "Deploy autonomous failure radar across multi-cluster Kubernetes fleets with active 3-key pool failover.",
    specs: [
      "1Hz Ring Buffer edge telemetry stream",
      "Automatic connection pool shed & circuit breaker triggers",
      "Cryptographic audit trail for averted SLA breaches",
    ],
  },
};