import type { ActivePane } from "@/components/oryzo/OryzoScreenBlendMorph";

export type PlaygroundPane = ActivePane;
export type ProblemTrack = "ai" | "defi" | "civic" | "health";

export interface FeatureCardData {
  id: string;
  badge: string;
  title: string;
  description: string;
  accentColor: string;
  targetPane: PlaygroundPane;
  preloadedTrack?: ProblemTrack;
}

export interface FeatureCarouselStageProps {
  onDeepLink: (pane: PlaygroundPane, track?: ProblemTrack) => void;
}
