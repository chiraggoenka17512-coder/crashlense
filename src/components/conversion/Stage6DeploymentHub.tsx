import type { Stage6DeploymentHubProps } from "./types";
import { ConversionTierHub } from "./ConversionTierHub";
import { ProductProofGallery } from "./ProductProofGallery";
import { SocialProofReviews } from "./SocialProofReviews";

export function Stage6DeploymentHub({
  onTryItNow,
}: Stage6DeploymentHubProps) {
  return (
    <div className="relative isolate overflow-hidden bg-[#07080a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,237,214,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,237,214,0.04)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[42rem] w-[78rem] -translate-x-1/2 rounded-full bg-[#ff8539]/[0.07] blur-[140px]"
      />
      <div className="mx-auto max-w-[90rem] space-y-28 px-4 py-20 sm:px-6 sm:py-28 lg:space-y-36 lg:px-10 lg:py-36">
        <ProductProofGallery />
        <SocialProofReviews />
        <ConversionTierHub onTryItNow={onTryItNow} />
      </div>
    </div>
  );
}