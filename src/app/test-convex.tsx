"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";



export default function TestConvex() {
  // This will fail at compile time if the API import is wrong
  const testMutation = useMutation(api.orders.createOrder);
  return <div>Convex import works!</div>;
}