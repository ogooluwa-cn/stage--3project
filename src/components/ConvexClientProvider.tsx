"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Only create the client if we have a valid absolute URL
const _convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
let convex: ConvexReactClient | null = null;
if (_convexUrl) {
  try {
    // Validate it's an absolute URL (this will throw for invalid strings)
    const parsed = new URL(_convexUrl);
    convex = new ConvexReactClient(parsed.toString());
  } catch (e) {
    // If it's not a valid absolute URL, log a warning and do not create the client.
    // This prevents build-time failures like "Provided address was not an absolute URL.".
    // The correct value must start with http:// or https:// (prefer https:// for production).
    // Example: https://my-project.convex.site
    // During local development you can use `convex dev` and a .env.local that points to your local dev server.
    // Note: we intentionally avoid throwing here so builds don't fail; instead, the app runs without Convex.
    // If you'd prefer failing fast in CI, change this to throw an Error instead.
    // eslint-disable-next-line no-console
    console.warn("Invalid NEXT_PUBLIC_CONVEX_URL, Convex client will not be initialized:", _convexUrl);
    convex = null;
  }
}

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  // During SSR/build or if URL is not configured, just render children without Convex
  if (!convex || typeof window === 'undefined') {
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}