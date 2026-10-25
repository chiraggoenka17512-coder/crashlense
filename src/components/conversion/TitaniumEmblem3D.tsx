"use client";

import { useEffect, useState, type PointerEvent } from "react";
import { Cpu, Crosshair, ScanLine } from "lucide-react";

export function TitaniumEmblem3D() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updatePreference = () => setReduceMotion(motionPreference.matches);

    updatePreference();
    motionPreference.addEventListener("change", updatePreference);
    return () => motionPreference.removeEventListener("change", updatePreference);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 18}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 20}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="relative flex min-h-[27rem] flex-col items-center justify-center overflow-hidden rounded-[1.8rem] border border-[#ffedd6]/[0.12] bg-[radial-gradient(ellipse_at_50%_46%,rgba(255,133,57,0.14),transparent_48%),linear-gradient(150deg,#171a21_0%,#0a0b0f_72%)] px-6 py-9 text-center shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:min-h-[31rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,237,214,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,237,214,0.12)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute h-[19rem] w-[19rem] rounded-full border border-dashed border-[#ffedd6]/15 sm:h-[22rem] sm:w-[22rem]"
      />
      <div
        aria-hidden="true"
        className="absolute h-[15rem] w-[15rem] rounded-full border border-[#ff8539]/25 sm:h-[17rem] sm:w-[17rem]"
      />
      <Crosshair
        aria-hidden="true"
        className="absolute left-7 top-7 h-4 w-4 text-[#ff8539]/80"
        strokeWidth={1.25}
      />
      <Crosshair
        aria-hidden="true"
        className="absolute bottom-7 right-7 h-4 w-4 rotate-180 text-[#ff8539]/80"
        strokeWidth={1.25}
      />

      <div
        aria-hidden="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="relative mb-8 flex h-44 w-44 items-center justify-center rounded-[2.8rem] border border-white/55 bg-[linear-gradient(140deg,#f2f5f8_0%,#aeb6c0_21%,#454e59_48%,#c2c9d0_68%,#353c45_100%)] shadow-[inset_0_2px_2px_rgba(255,255,255,0.8),inset_0_-18px_30px_rgba(0,0,0,0.55),0_30px_55px_rgba(0,0,0,0.65),0_0_70px_rgba(255,133,57,0.2)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:h-52 sm:w-52 sm:rounded-[3.2rem]"
        style={{
          transform:
            "perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        }}
      >
        <div className="absolute inset-[7px] rounded-[2.35rem] border border-white/55 sm:rounded-[2.7rem]" />
        <div className="absolute inset-[15px] rounded-[2rem] border border-black/20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_42%),linear-gradient(145deg,#abb4bf_0%,#69737e_50%,#252b33_100%)] sm:rounded-[2.4rem]" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-white/35 bg-[#111720]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_rgba(0,0,0,0.42)] sm:h-28 sm:w-28 sm:rounded-[1.9rem]">
          <Cpu
            aria-hidden="true"
            className="h-12 w-12 text-[#ffedd6] drop-shadow-[0_0_14px_rgba(255,133,57,0.42)] sm:h-14 sm:w-14"
            strokeWidth={1}
          />
          <span className="absolute inset-2 rounded-[1.2rem] border border-[#ffedd6]/10 sm:rounded-[1.5rem]" />
        </div>
        <ScanLine
          aria-hidden="true"
          className="absolute -right-3 -top-3 h-9 w-9 rounded-xl border border-[#ff8539]/60 bg-[#11141e] p-2 text-[#ff8539] shadow-[0_0_24px_rgba(255,133,57,0.28)]"
        />
      </div>

      <div className="oryzo-caliper relative mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff8539]" />
        <span>GRADE-5 TITANIUM // DEVICE EMBLEM</span>
      </div>
      <h3 className="relative mb-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#ffedd6]">
        Built with intention.
      </h3>
      <p className="relative max-w-sm text-sm leading-6 text-[#aeb9c8]">
        A tactile hardware mark for the device, data, and systems behind the
        CrashLens workspace.
      </p>
      <div className="relative mt-6 font-mono text-[9px] tracking-[0.2em] text-[#788392]">
        TILT TO INSPECT <span className="mx-2 text-[#ff8539]">/</span> 3D
        HARDWARE STUDY
      </div>
    </div>
  );
}
