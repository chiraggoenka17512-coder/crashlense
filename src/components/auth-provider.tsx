"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

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
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#0f172a",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function isClerkConfigured() {
  return isClerkKeyValid;
}
