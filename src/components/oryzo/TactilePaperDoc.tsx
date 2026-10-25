"use client";

import React from "react";
import { PaperDocContent } from "@/config/site-config";
import { Plane, Utensils, CheckCircle2, QrCode } from "lucide-react";

interface TactilePaperDocProps {
  content: PaperDocContent;
  className?: string;
  isHovered?: boolean;
}

export function TactilePaperDoc({
  content,
  className = "",
  isHovered = false,
}: TactilePaperDocProps) {
  const isTravel = content.kind === "travel_pass";
  const isCulinary = content.kind === "recipe_card";

  return (
    <div
      className={`relative w-full rounded-xl select-none overflow-hidden transition-all duration-300 font-mono text-[#1f2024] ${className}`}
      style={{
        background: "linear-gradient(145deg, #fefdfa 0%, #f7f3eb 100%)",
        border: "1px solid rgba(220, 210, 195, 0.8)",
      }}
    >
      {/* Paper Fold Crease Line */}
      <div className="absolute top-0 bottom-0 left-[72%] w-[1px] border-r border-dashed border-[#b8af9e]/60 pointer-events-none z-10" />

      {/* Subtle Perforation Tear Notches */}
      <div className="absolute -top-1.5 left-[72%] -translate-x-1/2 w-3 h-3 rounded-full bg-[#162e21] pointer-events-none z-20" />
      <div className="absolute -bottom-1.5 left-[72%] -translate-x-1/2 w-3 h-3 rounded-full bg-[#162e21] pointer-events-none z-20" />

      {/* Main Body */}
      <div className="p-4 sm:p-5 flex justify-between gap-3">
        {/* Left Section: Details */}
        <div className="flex-1 pr-2">
          {/* Header pill */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff8539]" />
            <span className="text-[9px] font-bold tracking-widest text-[#666053] uppercase">
              {content.headerTag}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-[family-name:var(--font-display)] font-extrabold text-xs sm:text-sm text-[#111317] leading-tight mb-1">
            {content.title}
          </h4>

          {/* Subtitle */}
          <p className="text-[9px] text-[#787164] tracking-wide mb-3">
            {content.subtitle}
          </p>

          {/* Detail Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[9px] border-t border-b border-[#e5decb] py-2">
            {content.details.map((d, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[7.5px] uppercase font-bold text-[#8c8270] tracking-wider">
                  {d.label}
                </span>
                <span className="font-bold text-[#1f2024] truncate">
                  {d.value}
                </span>
              </div>
            ))}
          </div>

          {/* Note or extra detail */}
          {content.note && (
            <p className="text-[8px] text-[#8c8270] italic mt-2 truncate">
              {content.note}
            </p>
          )}
        </div>

        {/* Right Section: Stub / Stamp / Barcode */}
        <div className="w-[28%] flex flex-col justify-between items-center text-center pl-2 pt-1">
          {/* Stamp Seal */}
          {content.stamp && (
            <div
              className={`p-1.5 rounded-lg border-2 border-dashed ${
                isTravel
                  ? "border-[#2563eb]/70 text-[#1d4ed8]"
                  : isCulinary
                  ? "border-[#dc2626]/70 text-[#b91c1c]"
                  : "border-[#d97706]/70 text-[#b45309]"
              } -rotate-6 transition-transform duration-300 ${
                isHovered ? "rotate-0 scale-105" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-0.5">
                {isTravel && <Plane className="w-3 h-3" />}
                {isCulinary && <Utensils className="w-3 h-3" />}
                {!isTravel && !isCulinary && <CheckCircle2 className="w-3 h-3" />}
              </div>
              <span className="text-[7px] font-black uppercase tracking-tighter block leading-none">
                {content.stamp}
              </span>
            </div>
          )}

          {/* Barcode / QR Code simulation */}
          <div className="w-full flex flex-col items-center mt-auto pt-2">
            {content.barcode ? (
              <span className="font-mono text-[10px] tracking-widest text-[#2d2922] select-none scale-y-125">
                {content.barcode}
              </span>
            ) : (
              <QrCode className="w-6 h-6 text-[#4a4438]" />
            )}
            <span className="text-[6.5px] text-[#8c8270] uppercase tracking-widest mt-1">
              CRASHLENS 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TactilePaperDoc;
