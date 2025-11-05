// components/CheckoutWrapper.tsx
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import CheckoutPage from "@/app/checkout/checkoutPage";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function CheckoutWrapper() {
  return (
    <ConvexProvider client={convex}>
      <CheckoutPage />
    </ConvexProvider>
  );
}