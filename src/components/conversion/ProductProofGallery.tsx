import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowUpRight, Database, Smartphone } from "lucide-react";

const PRODUCT_VIEWS = [
  {
    id: "signals",
    index: "01",
    title: "See the signal.",
    description:
      "Bring incoming problem tracks into one focused, readable workspace.",
    image: "/neural-canvas.jpg",
    alt: "Colorful neural network visualization representing problem signals",
    icon: Activity,
    label: "PROBLEM SIGNALS",
    tone: "text-sky-300",
    glow: "from-sky-500/20",
    href: "/dashboard",
  },
  {
    id: "device",
    index: "02",
    title: "Work the system.",
    description:
      "Move from the device view into hands-on diagnostics and track tools.",
    image: "/polaroid-chip.jpg",
    alt: "Illustrated compute hardware with glowing circuit traces",
    icon: Smartphone,
    label: "DEVICE WORKBENCH",
    tone: "text-[#ffad70]",
    glow: "from-[#ff8539]/25",
    href: "/workbench",
  },
  {
    id: "data",
    index: "03",
    title: "Read the engine.",
    description:
      "Inspect database activity with runtime and service-health views.",
    image: "/polaroid-db.jpg",
    alt: "Illustrated server rack with network connections",
    icon: Database,
    label: "DATA + TELEMETRY",
    tone: "text-emerald-300",
    glow: "from-emerald-500/20",
    href: "/telemetry",
  },
];

export function ProductProofGallery() {
  return (
    <section aria-labelledby="stage-6-product-heading" className="relative">
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[rgba(255,237,214,0.12)] pb-7 lg:mb-12 lg:flex-row lg:items-end">
        <div>
          <div className="oryzo-caliper mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>01 // PRODUCT PROOF</span>
          </div>
          <h2
            id="stage-6-product-heading"
            className="max-w-4xl font-[family-name:var(--font-display)] text-5xl font-black leading-[0.94] tracking-[-0.055em] text-[#ffedd6] sm:text-6xl lg:text-7xl"
          >
            Built for the edge.
            <br className="hidden sm:block" /> Ready for the real work.
          </h2>
        </div>
        <div className="flex max-w-md items-end gap-4 lg:pb-1">
          <span
            aria-hidden="true"
            className="mb-1 hidden h-12 w-px shrink-0 bg-gradient-to-b from-[#ff8539] to-transparent sm:block"
          />
          <p className="text-sm leading-7 text-[#aeb9c8] sm:text-base">
            One connected workspace, from the first problem signal to the
            systems behind the solution.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {PRODUCT_VIEWS.map((view) => {
          const Icon = view.icon;

          return (
            <Link
              key={view.id}
              href={view.href}
              className="group relative isolate overflow-hidden rounded-[1.6rem] border border-white/[0.12] bg-[#0d0f16] shadow-[0_26px_80px_rgba(0,0,0,0.42)] transition duration-500 hover:-translate-y-1.5 hover:border-[#ff8539]/40 hover:shadow-[0_32px_90px_rgba(0,0,0,0.55)] cursor-pointer block"
            >
              <div className="relative h-60 overflow-hidden sm:h-72 lg:h-[25rem]">
                <Image
                  src={view.image}
                  alt={view.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${view.glow} via-transparent to-[#07080a]/30`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/15 to-[#08090d]/10" />
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,237,214,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,237,214,0.16)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-[#07080a]/65 px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[0.16em] text-[#f4efe6] backdrop-blur-md">
                    {view.label}
                  </span>
                  <span className={`font-mono text-xs ${view.tone}`}>
                    {view.index}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#07080a]/55 text-[#ffedd6] backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:border-[#ff8539]/60 group-hover:text-[#ff8539]"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <div className="relative flex min-h-36 items-start justify-between gap-5 border-t border-white/[0.08] px-5 py-5 sm:px-6 sm:py-6">
                <div>
                  <div className="mb-2 font-mono text-[9px] font-semibold tracking-[0.18em] text-[#ff8539]">
                    FIELD VIEW // {view.index}
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#ffedd6]">
                    {view.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-6 text-[#aeb9c8]">
                    {view.description}
                  </p>
                </div>
                <Icon
                  aria-hidden="true"
                  className={`mt-1 h-5 w-5 shrink-0 ${view.tone}`}
                  strokeWidth={1.5}
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-[#ff8539] to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
