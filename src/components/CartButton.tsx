"use client";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import CartPopup from "./CartPopup";

export default function CartButton() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  // Don't render badge during SSR to avoid hydration mismatch
  const showBadge = isMounted && totalItems > 0;

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-white hover:text-orange-400 transition-colors"
        aria-label={`Shopping cart with ${totalItems} items`}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        
        {showBadge && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            {totalItems}
          </span>
        )}
      </button>

      {isMounted && (
        <CartPopup 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      )}
    </>
  );
}