import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKeys = Boolean(
  publishableKey && (publishableKey.startsWith("pk_test_") || publishableKey.startsWith("pk_live_"))
);

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/health",
  "/api/db-check",
  "/api/redis-check",
  "/sign-in(.*)",
  "/sign-up(.*)",
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
