import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKeys = Boolean(
  publishableKey && (publishableKey.startsWith("pk_test_") || publishableKey.startsWith("pk_live_"))
);

const isPublicRoute = createRouteMatcher([
  "/",
  "/radar(.*)",
  "/dashboard(.*)",
  "/specs(.*)",
  "/workbench(.*)",
  "/telemetry(.*)",
  "/api/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/models/(.*)",
  "/(.*)\\.glb",
]);

const middleware = hasClerkKeys
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|glb|gltf|bin)).*)",
    "/(api|trpc)(.*)",
  ],
};
