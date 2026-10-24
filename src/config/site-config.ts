/**
 * ORCATHON 2026 — CENTRALIZED SYSTEM & PROBLEM STATEMENT CONFIGURATION
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
    name: "ORCATHON",
    edition: "2026",
    eyebrow: "MADE FOR CODE. BUILT FOR SCALE.",
    subtitle: "WEAPON-GRADE PROBLEM SOLVER // BUILT BY HAND. ENGINEERED BY AI.",
    systemTag: "WEAPON-GRADE OS",
    heroCaliper: "STAGE 01 // PEEKING DOCK [09:41 AM UTC]",
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
              note: "Generated dynamically by Orcathon Travel Engine",
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
    isReleased: false,
    releaseDate: "OCTOBER 2026",
    activeTrackId: "track-01",
    title: "POLYMORPHIC SIGNALS & EDGE SOLVER",
    category: "DISCOVERY & AI",
    brief:
      "Ingest multi-modal hackathon problem vectors with sub-12ms database query execution, dynamic schema transformation, and local edge resilience.",
    evaluationCriteria: [
      "Zero-latency polymorphic JSONB schema switching",
      "Sub-15ms client P99 response on edge hardware",
      "Deterministic local verification without cloud network bleed",
      "Strict zero-auth playground access for instant judging",
    ],
    tracks: [
      {
        id: "track-01",
        number: "01",
        name: "Polymorphic Ingest",
        category: "SIGNALS ENGINE",
        shortDesc: "Multi-track problem triage with automatic latency telemetry and urgency scoring.",
        samplePrompt: "Hey @ORCATHON, ingest Track 01 problem signal and stream telemetry...",
        status: "ACTIVE",
        latencyTarget: "< 12ms",
      },
      {
        id: "track-02",
        number: "02",
        name: "Sunday Track Ready",
        category: "HACKATHON ADAPTER",
        shortDesc: "Zero-migration schema designed for instant adaptation to Sunday's problem statement.",
        samplePrompt: "Hey @ORCATHON, solve Track 02 in real-time with polymorphic schema...",
        status: "ACTIVE",
        latencyTarget: "< 8ms",
      },
      {
        id: "track-03",
        number: "03",
        name: "Drizzle Query Stream",
        category: "QUERY STREAM",
        shortDesc: "Sub-12ms queries executed against Supabase connection pooler with execution breakdowns.",
        samplePrompt: "Hey @ORCATHON, benchmark query stream under 1,000 parallel test probes...",
        status: "ACTIVE",
        latencyTarget: "< 15ms",
      },
      {
        id: "track-04",
        number: "04",
        name: "Edge Fleet Probes",
        category: "FLEET HEALTH",
        shortDesc: "Automated latency and Redis quota verification probes directly against live endpoints.",
        samplePrompt: "Hey @ORCATHON, run full edge fleet diagnostic across 36 nodes...",
        status: "ACTIVE",
        latencyTarget: "< 5ms",
      },
    ],
  },

  telemetry: {
    p99Target: "12ms",
    samplePing: "12MS PING",
    cacheHitRate: "99.4%",
    verifiedTestersCount: 36,
    testFleetNodes: 36,
  },

  cadBlueprint: {
    circularityFormula: "C = 4πA / P²",
    circularityName: "RoPE: Roundness Optimization & Perimeter Engineering (Circle = 1.0)",
    userBenefit: "We measure shape precision so every output is pixel-consistent across all screen dimensions.",
    caliperTolerance: "± 0.002 mm",
    polygonRetention: "35,000 Triangles",
    radiusFOV: "RADIUS: 0.72m // FOV: 32.0°",
  },
};
