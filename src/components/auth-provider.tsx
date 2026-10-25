"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkKeyValid =
  Boolean(publishableKey && (publishableKey.startsWith("pk_test_") || publishableKey.startsWith("pk_live_")));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!isClerkKeyValid) {
    // If Clerk key is not yet set in .env.local, render children without crashing
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#ff8539",
          colorBackground: "#0d0f16",
          colorInput: "#151822",
          colorForeground: "#ffedd6",
          colorMutedForeground: "#94a3b8",
          colorPrimaryForeground: "#07080a",
        },
        elements: {
          modalContent: "bg-[#0d0f16] border border-white/10 shadow-2xl text-[#f4efe6]",
          card: "bg-[#0d0f16] border border-white/10 shadow-2xl text-[#f4efe6]",
          headerTitle: "text-[#ffedd6] font-bold font-sans",
          headerSubtitle: "text-[#94a3b8]",
          socialButtonsBlockButton: "border border-white/10 hover:bg-white/5 text-[#ffedd6]",
          socialButtonsBlockButtonText: "text-[#ffedd6] font-medium",
          formButtonPrimary: "bg-[#ff8539] hover:bg-[#ff9554] text-[#07080a] font-bold shadow-md",
          footerActionLink: "text-[#ff8539] hover:text-[#ffedd6]",
          formFieldLabel: "text-[#ffedd6]",
          formFieldInput: "bg-[#151822] border border-white/15 text-[#f4efe6] focus:border-[#ff8539]",
          identityPreviewText: "text-[#f4efe6]",
          identityPreviewEditButton: "text-[#ff8539]",
          dividerLine: "bg-white/10",
          dividerText: "text-[#94a3b8]",
        },
      } as any}
    >
      {children}
    </ClerkProvider>
  );
}

export function isClerkConfigured() {
  return isClerkKeyValid;
}
