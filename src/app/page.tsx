import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { StackStatus } from "@/components/stack-status";
import { StackAudit } from "@/components/stack-audit";
import { ProblemAdapter } from "@/components/problem-adapter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f8fafc] flex flex-col relative overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Cinematic Atmospheric Hero Section */}
        <Hero />

        {/* Live Diagnostics & System Health Verification */}
        <StackStatus />

        {/* Critical Stack Audit & Friction Analysis */}
        <StackAudit />

        {/* Problem Statement Track Customizer */}
        <ProblemAdapter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
