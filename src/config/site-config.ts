/**
 * CRASHLENS 2026 — CENTRALIZED SYSTEM & PROBLEM STATEMENT CONFIGURATION
 * 
 * NOTE: When the official hackathon problem statement is released, update this file!
 * All components across Stage 1 through Stage 6 (Hero, HUD, 3D OLED, Playground, 
 * Carousel, CAD Specs, and Proof Tiers) read directly from this single source of truth.
 */

export interface ProblemTrack {
  id: string;
  number: string;
  name: string;
  category: string;
  shortDesc: string;
  samplePrompt: string;
  status: "ACTIVE" | "PENDING" | "RESOLVED";
  latencyTarget: string;
}

export type DeskPresetType = "engineering" | "travel" | "culinary" | "custom";

export interface PaperDocContent {
  kind: "travel_pass" | "recipe_card" | "blueprint_doc" | "custom_note";
  headerTag: string;
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
  barcode?: string;
  stamp?: string;
  note?: string;
}

export interface DeskPropItem {
  id: string;
  name: string;
  type: "image" | "paper_doc";
  image?: string;
  paperDoc?: PaperDocContent;
  title: string;
  width: number;
  height: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    rotation: number;
  };
  filterShadow: string;
  hoverSoundFreq: number;
  visibleOnMobile?: boolean;
}

export interface SiteConfiguration {
  brand: {
    name: string;
    edition: string;
    eyebrow: string;
    subtitle: string;
    systemTag: string;
    heroCaliper: string;
  };
  deskTheme: {
    activePreset: DeskPresetType;
    presets: Record<DeskPresetType, {
      name: string;
      description: string;
      surfaceMat: "cutting_mat" | "paper_chart" | "wood_only";
      items: DeskPropItem[];
    }>;
  };
  problemStatement: {
    isReleased: boolean;
    releaseDate: string;
    activeTrackId: string;
    title: string;
    category: string;
    brief: string;
    evaluationCriteria: string[];
    tracks: ProblemTrack[];
  };
  telemetry: {
    p99Target: string;
    samplePing: string;
    cacheHitRate: string;
    verifiedTestersCount: number;
    testFleetNodes: number;
  };
  cadBlueprint: {
    circularityFormula: string;
    circularityName: string;
    userBenefit: string;
    caliperTolerance: string;
    polygonRetention: string;
    radiusFOV: string;
  };
}

export const SITE_CONFIG: SiteConfiguration = {
  brand: {
    name: "CRASHLENS",
    edition: "2026",
    eyebrow: "PREDICTIVE FAILURE RADAR // SYSTEM 1 RELIABILITY",
    subtitle: "PREDICTING CATASTROPHIC DISTRIBUTED FAILURES 45 SECONDS BEFORE SLAs BREACH",
    systemTag: "PREDICTIVE RADAR OS",
    heroCaliper: "STAGE 01 // 12-NODE TOPOLOGY RADAR [1Hz VECTOR CLOCK]",
  },

  deskTheme: {
    // SWITCH PRESET HERE: "engineering" | "travel" | "culinary" | "custom"
    activePreset: "engineering",
    presets: {
      engineering: {
        name: "Engineering Studio (Default)",
        description: "Tactile Japanese drafting stationery for developer & AI apps.",
        surfaceMat: "cutting_mat",
        items: [
          {
            id: "clips",
            name: "Silver Paper Clips",
            type: "image",
            image: "/images/paper_clips_cozy.png",
            title: "Silver Steel Paper Clips",
            width: 619,
            height: 527,
            position: { left: "6%", top: "34%", rotation: -4 },
            filterShadow: "drop-shadow(-6px 12px 18px rgba(0,0,0,0.65)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.4))",
            hoverSoundFreq: 1500,
          },
          {
            id: "pencil",
            name: "Cedar Wood Drafting Pencil",
            type: "image",
            image: "/images/wood_pencil_cozy.png",
            title: "Japanese Cedar Wood Pencil",
            width: 917,
            height: 132,
            position: { left: "4%", top: "50%", rotation: 22 },
            filterShadow: "drop-shadow(-8px 16px 22px rgba(0,0,0,0.7)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.45))",
            hoverSoundFreq: 550,
          },
          {
            id: "eraser",
            name: "White Drafting Eraser",
            type: "image",
            image: "/images/eraser_block_cozy.png",
            title: "Technical Drafting Eraser",
            width: 638,
            height: 341,
            position: { left: "6%", bottom: "10%", rotation: -8 },
            filterShadow: "drop-shadow(-10px 18px 24px rgba(0,0,0,0.75)) drop-shadow(-2px 5px 8px rgba(0,0,0,0.45))",
            hoverSoundFreq: 420,
          },
          {
            id: "pen",
            name: "Ivory Drafting Stylus",
            type: "image",
            image: "/images/drafting_pen_cozy.png",
            title: "Minimalist Ivory Drafting Pen",
            width: 873,
            height: 144,
            position: { right: "8%", top: "18%", rotation: -38 },
            filterShadow: "drop-shadow(-10px 18px 26px rgba(0,0,0,0.72)) drop-shadow(-3px 5px 7px rgba(0,0,0,0.45))",
            hoverSoundFreq: 750,
          },
          {
            id: "knife",
            name: "Olfa Utility Cutter",
            type: "image",
            image: "/images/olfa_knife_cozy.png",
            title: "Olfa A-1 Utility Knife",
            width: 844,
            height: 245,
            position: { right: "4%", bottom: "8%", rotation: 34 },
            filterShadow: "drop-shadow(-12px 22px 32px rgba(0,0,0,0.8)) drop-shadow(-3px 6px 9px rgba(0,0,0,0.5))",
            hoverSoundFreq: 1200,
            visibleOnMobile: true,
          },
        ],
      },
      travel: {
        name: "Travel Explorer",
        description: "Tactile paper flight plan, boarding pass & adventure gear for travel apps.",
        surfaceMat: "cutting_mat",
        items: [
          {
            id: "travel_pass",
            name: "Flight Itinerary Boarding Pass",
            type: "paper_doc",
            title: "Paper Travel Plan & Flight Ticket",
            width: 380,
            height: 240,
            position: { right: "6%", bottom: "10%", rotation: -12 },
            filterShadow: "drop-shadow(-12px 24px 34px rgba(0,0,0,0.75)) drop-shadow(-4px 8px 12px rgba(0,0,0,0.45))",
            hoverSoundFreq: 380,
            paperDoc: {
              kind: "travel_pass",
              headerTag: "ORCA AIRWAYS // BOARDING PASS",
              title: "EXPEDITION: TOKYO → SAN FRANCISCO",
              subtitle: "AUTOMATED TRAVEL PLAN // SECTOR 04",
              details: [
                { label: "FLIGHT", value: "OA-2026" },
                { label: "GATE", value: "B-42" },
                { label: "SEAT", value: "01A [FIRST]" },
                { label: "BOARDING", value: "09:41 UTC" },
              ],
              barcode: "||| | || |||| | ||| || |||||| | |||||",
              stamp: "TRAVEL VERIFIED",
              note: "Generated dynamically by CrashLens Reliability Engine",
            },
            visibleOnMobile: true,
          },
          {
            id: "pen",
            name: "Travel Field Pen",
            type: "image",
            image: "/images/drafting_pen_cozy.png",
            title: "Field Exploration Pen",
            width: 873,
            height: 144,
            position: { right: "8%", top: "18%", rotation: -38 },
            filterShadow: "drop-shadow(-10px 18px 26px rgba(0,0,0,0.72)) drop-shadow(-3px 5px 7px rgba(0,0,0,0.45))",
            hoverSoundFreq: 750,
          },
          {
            id: "clips",
            name: "Itinerary Steel Clips",
            type: "image",
            image: "/images/paper_clips_cozy.png",
            title: "Ticket Document Clips",
            width: 619,
            height: 527,
            position: { left: "6%", top: "34%", rotation: -4 },
            filterShadow: "drop-shadow(-6px 12px 18px rgba(0,0,0,0.65)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.4))",
            hoverSoundFreq: 1500,
          },
          {
            id: "pencil",
            name: "Logbook Pencil",
            type: "image",
            image: "/images/wood_pencil_cozy.png",
            title: "Expedition Note Pencil",
            width: 917,
            height: 132,
            position: { left: "4%", top: "50%", rotation: 22 },
            filterShadow: "drop-shadow(-8px 16px 22px rgba(0,0,0,0.7)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.45))",
            hoverSoundFreq: 550,
          },
          {
            id: "eraser",
            name: "Field Eraser",
            type: "image",
            image: "/images/eraser_block_cozy.png",
            title: "Drafting Block",
            width: 638,
            height: 341,
            position: { left: "6%", bottom: "10%", rotation: -8 },
            filterShadow: "drop-shadow(-10px 18px 24px rgba(0,0,0,0.75)) drop-shadow(-2px 5px 8px rgba(0,0,0,0.45))",
            hoverSoundFreq: 420,
          },
        ],
      },
      culinary: {
        name: "Culinary Kitchen",
        description: "Tactile handwritten recipe card & culinary instruments for food apps.",
        surfaceMat: "cutting_mat",
        items: [
          {
            id: "recipe_card",
            name: "Artisan Recipe Card",
            type: "paper_doc",
            title: "Chef's Handwritten Recipe Document",
            width: 360,
            height: 250,
            position: { right: "6%", bottom: "10%", rotation: -10 },
            filterShadow: "drop-shadow(-12px 24px 34px rgba(0,0,0,0.75)) drop-shadow(-4px 8px 12px rgba(0,0,0,0.45))",
            hoverSoundFreq: 360,
            paperDoc: {
              kind: "recipe_card",
              headerTag: "KITCHEN STUDIO // RECIPE 01",
              title: "TRUFFLE TAGLIATELLE AL TARTUFO",
              subtitle: "HAND-CRAFTED PASTA // PREP: 18 MIN",
              details: [
                { label: "YIELD", value: "4 PORTIONS" },
                { label: "HEAT", value: "210°C FLAME" },
                { label: "TIME", value: "18 MINS" },
                { label: "CALORIES", value: "540 KCAL" },
              ],
              stamp: "CHEF VERIFIED",
              note: "Fresh semolina, egg yolks, black winter truffle shaving",
            },
            visibleOnMobile: true,
          },
          {
            id: "pen",
            name: "Culinary Stylus",
            type: "image",
            image: "/images/drafting_pen_cozy.png",
            title: "Kitchen Recipe Pen",
            width: 873,
            height: 144,
            position: { right: "8%", top: "18%", rotation: -38 },
            filterShadow: "drop-shadow(-10px 18px 26px rgba(0,0,0,0.72)) drop-shadow(-3px 5px 7px rgba(0,0,0,0.45))",
            hoverSoundFreq: 750,
          },
          {
            id: "clips",
            name: "Recipe Ring Clips",
            type: "image",
            image: "/images/paper_clips_cozy.png",
            title: "Recipe Binder Clips",
            width: 619,
            height: 527,
            position: { left: "6%", top: "34%", rotation: -4 },
            filterShadow: "drop-shadow(-6px 12px 18px rgba(0,0,0,0.65)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.4))",
            hoverSoundFreq: 1500,
          },
          {
            id: "pencil",
            name: "Ingredient Check Pencil",
            type: "image",
            image: "/images/wood_pencil_cozy.png",
            title: "Chef Note Pencil",
            width: 917,
            height: 132,
            position: { left: "4%", top: "50%", rotation: 22 },
            filterShadow: "drop-shadow(-8px 16px 22px rgba(0,0,0,0.7)) drop-shadow(-2px 4px 6px rgba(0,0,0,0.45))",
            hoverSoundFreq: 550,
          },
          {
            id: "knife",
            name: "Craft Trimming Knife",
            type: "image",
            image: "/images/olfa_knife_cozy.png",
            title: "Packaging Trimmer",
            width: 844,
            height: 245,
            position: { left: "8%", bottom: "8%", rotation: -24 },
            filterShadow: "drop-shadow(-12px 22px 32px rgba(0,0,0,0.8)) drop-shadow(-3px 6px 9px rgba(0,0,0,0.5))",
            hoverSoundFreq: 1200,
          },
        ],
      },
      custom: {
        name: "Custom Hackathon Track",
        description: "Fully customizable props for your hackathon app domain.",
        surfaceMat: "cutting_mat",
        items: [],
      },
    },
  },

  problemStatement: {
    isReleased: true,
    releaseDate: "OCTOBER 2026",
    activeTrackId: "track-01",
    title: "CRASHLENS: PREDICTIVE FAILURE RADAR & CHAOS SANDBOX",
    category: "DISTRIBUTED RELIABILITY & SYSTEM 1 AI",
    brief:
      "Intercept cascading microservice failures 15–45 seconds before SLAs breach using Tier 0 topological percolation and sub-350ms System 1 reflexive decision models.",
    evaluationCriteria: [
      "Sub-350ms root cause isolation via System 1 Inception Mercury / Liquid AI",
      "Tier 0 deterministic topological percolation across 12-node DAG",
      "Zero-downtime 3-key autonomous OpenRouter failover with local heuristics",
      "Interactive 1-click mitigation mutator with Saved vs. Crashed counterfactual timeline",
    ],
    tracks: [
      {
        id: "track-01",
        number: "01",
        name: "12-Node Topology Bus",
        category: "TELEMETRY RADAR",
        shortDesc: "High-frequency 1Hz vector streams tracking p99, RPS, CPU, memory, and thread pool depth across 12 services.",
        samplePrompt: "Hey @CRASHLENS, stream 12-node topology telemetry diff vectors in real-time...",
        status: "ACTIVE",
        latencyTarget: "1.0s Tick",
      },
      {
        id: "track-02",
        number: "02",
        name: "Tier 0 Graph Percolation",
        category: "ANOMALY VELOCITY",
        shortDesc: "Deterministic anomaly tracking along DAG dependency edges before latency cascades upstream.",
        samplePrompt: "Hey @CRASHLENS, trace percolation velocity from payments-db to api-gateway...",
        status: "ACTIVE",
        latencyTarget: "< 25ms",
      },
      {
        id: "track-03",
        number: "03",
        name: "System 1 Reflex Model",
        category: "DECISION ENGINE",
        shortDesc: "Sub-350ms Inception Mercury & Liquid LFM classifying root causes and recommending mitigations.",
        samplePrompt: "Hey @CRASHLENS, isolate root cause and generate structured JSON recovery action...",
        status: "ACTIVE",
        latencyTarget: "< 350ms",
      },
      {
        id: "track-04",
        number: "04",
        name: "Saved vs. Crashed Validation",
        category: "COUNTERFACTUAL PROOF",
        shortDesc: "Interactive split-screen timeline proving catastrophe was averted and $250k downtime saved.",
        samplePrompt: "Hey @CRASHLENS, detonate Scenario A and simulate counterfactual recovery timeline...",
        status: "ACTIVE",
        latencyTarget: "Real-time",
      },
    ],
  },

  telemetry: {
    p99Target: "14ms",
    samplePing: "1Hz TICK",
    cacheHitRate: "99.4%",
    verifiedTestersCount: 36,
    testFleetNodes: 12,
  },

  cadBlueprint: {
    circularityFormula: "ConnPool(t) = min(1.0, 0.20 + 0.035 × (t - t0)^1.4)",
    circularityName: "Deterministic Failure Velocity Curve (PostgreSQL Connection Pool Leak Equation)",
    userBenefit: "We mathematically model anomaly velocity along DAG dependency edges so SREs can intercept cascading failures before upstream timeouts occur.",
    caliperTolerance: "1Hz Tick Clock",
    polygonRetention: "12-Node DAG Matrix",
    radiusFOV: "HORIZON: 45s PRE-FAILURE // Z-SCORE: 3.2σ",
  },
};
