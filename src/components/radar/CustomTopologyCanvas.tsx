"use client";

import React, { useMemo } from "react";
import type { TopologyNode, TopologyEdge, ServiceId, ServiceStatus } from "@/types/topology";
import { AnimatedEdge } from "./AnimatedEdge";
import { TopologyNodeItem } from "./TopologyNodeItem";
import { CulpritCrosshair } from "./CulpritCrosshair";
import { BlastRadiusRipple } from "./BlastRadiusRipple";
import type { ClusterTelemetrySnapshot } from "@/types/telemetry";

export interface CustomTopologyCanvasProps {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  selectedServiceId?: string | null;
  onSelectNode?: (serviceId: string) => void;
  telemetrySnapshot?: ClusterTelemetrySnapshot | null;
  rootCauseServiceId?: string | null;
  isChaosActive?: boolean;
}

export function CustomTopologyCanvas({
  nodes,
  edges,
  selectedServiceId = null,
  onSelectNode,
  telemetrySnapshot,
  rootCauseServiceId,
  isChaosActive = false,
}: CustomTopologyCanvasProps) {
  const nodeMap = useMemo(() => {
    const map: Record<string, TopologyNode> = {};
    for (const node of nodes) {
      map[node.id] = node;
    }
    return map;
  }, [nodes]);

  const rootCauseNode = rootCauseServiceId ? nodeMap[rootCauseServiceId] : null;

  return (
    <svg
      viewBox="0 0 1000 650"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full select-none"
    >
      <defs>
        <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill="#ff8539" />
        </marker>
        <marker id="arrowhead-amber" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill="#ff8539" />
        </marker>
        <marker id="arrowhead-red" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill="#ef4444" />
        </marker>
      </defs>

      {/* Layer 0: Background Crosshairs */}
      <g opacity="0.3" stroke="rgba(0, 0, 0, 0.12)" strokeWidth="0.75">
        <line x1="500" y1="20" x2="500" y2="630" strokeDasharray="4 4" />
        <line x1="40" y1="325" x2="960" y2="325" strokeDasharray="4 4" />
        <circle cx="500" cy="325" r="160" fill="none" strokeDasharray="6 6" />
        <circle cx="500" cy="325" r="280" fill="none" strokeDasharray="8 8" />
      </g>

      {/* Layer 1: Blast Radius Ripple Effect when Chaos is active */}
      {isChaosActive && rootCauseNode && (
        <BlastRadiusRipple cx={rootCauseNode.x} cy={rootCauseNode.y} active={true} />
      )}

      {/* Layer 2: Animated Connection Edges */}
      <g id="layer-custom-edges">
        {edges.map((edge) => {
          const edgeTelemetry = telemetrySnapshot?.edges[edge.id];
          const isEdgeActive =
            selectedServiceId === edge.source || selectedServiceId === edge.target;
          const isEdgeCascade =
            isChaosActive &&
            (edge.source === rootCauseServiceId || edge.target === rootCauseServiceId);

          return (
            <AnimatedEdge
              key={edge.id}
              edge={edge as any}
              telemetry={edgeTelemetry}
              isActive={isEdgeActive}
              isCascade={isEdgeCascade}
              isMitigated={!isChaosActive}
              nodeMap={nodeMap}
            />
          );
        })}
      </g>

      {/* Layer 3: Interactive Topology Nodes */}
      <g id="layer-custom-nodes">
        {nodes.map((node) => {
          const isSelected = selectedServiceId === node.id;
          const isRootCause = rootCauseServiceId === node.id;

          const snapshotStatus = telemetrySnapshot?.nodes[node.id as ServiceId]?.status;
          const status: ServiceStatus = snapshotStatus
            ? snapshotStatus
            : isChaosActive && isRootCause
            ? "CRITICAL"
            : isChaosActive && node.dependencies.includes(rootCauseServiceId as any)
            ? "DEGRADED"
            : "HEALTHY";

          const currentP99 =
            telemetrySnapshot?.nodes[node.id as ServiceId]?.metrics.p99Ms ??
            (isChaosActive && isRootCause ? 780 : node.baselines.p99Ms);

          const currentCpu =
            telemetrySnapshot?.nodes[node.id as ServiceId]?.metrics.cpuPct ??
            (isChaosActive && isRootCause ? 94 : node.baselines.cpuPct);

          return (
            <TopologyNodeItem
              key={node.id}
              node={node}
              status={status}
              p99Ms={currentP99}
              cpuPct={currentCpu}
              isSelected={isSelected}
              onSelect={(id) => onSelectNode?.(id)}
            />
          );
        })}
      </g>

      {/* Layer 4: Culprit Crosshair Reticle Locking onto Root Cause */}
      {isChaosActive && rootCauseServiceId && (
        <CulpritCrosshair serviceId={rootCauseServiceId as any} resolved={!isChaosActive} />
      )}
    </svg>
  );
}
