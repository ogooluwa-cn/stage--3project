"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const { cart, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close cart when pressing Escape key
  useEffect(() => {
    if (!isMounted || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isMounted]);

  // Don't render anything on server side
  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60"
          />
{/* Cart Panel */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.25 }}
  className="
    fixed top-[339px] right-[-150px] z-50
    -translate-x-1/2 -translate-y-1/2
    bg-white rounded-lg
    shadow-xl
    w-[377px] h-[488px]
    flex flex-col p-6
  "
>
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-[18px] font-bold tracking-wide">
      CART ({cart.reduce((total, item) => total + item.qty, 0)})
    </h2>

    <button
      onClick={clearCart}
      className="text-[13px] text-gray-500 hover:text-orange-400 transition"
    >
      Remove all
    </button>
  </div>

  {/* Cart Items */}
  <div className="flex-1 space-y-4 overflow-y-auto">
    {cart.map((item) => (
      <div key={item.id} className="flex items-center justify-between">
        {/* Product Image */}
        <Image
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="rounded-lg bg-gray-200 object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col flex-1 ml-4">
          <h4 className="text-[15px] font-semibold">{item.name}</h4>
          <p className="text-[14px] text-gray-500">
            ${item.price.toLocaleString()}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex bg-[#F1F1F1] w-[96px] h-[32px] items-center justify-between px-3 text-[13px]">
          <button
            disabled={item.qty <= 1}
            onClick={() => updateQuantity(item.id, item.qty - 1)}
            className="text-gray-500 hover:text-black transition disabled:opacity-40"
          >
            -
          </button>
          <span className="text-[13px] font-bold">{item.qty}</span>
          <button
            onClick={() => updateQuantity(item.id, item.qty + 1)}
            className="text-gray-500 hover:text-black transition"
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Total & Checkout */}
  <div className="mt-6">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[15px] uppercase text-gray-500">Total</span>
      <span className="font-bold text-[18px] tracking-wide">
        ${getTotalPrice().toLocaleString()}
      </span>
    </div>

    <Link
      onClick={onClose}
      href="/checkout"
      className="
        w-full block bg-[#D87D4A]
        text-white text-center font-semibold
        py-3 rounded-lg text-[14px]
        hover:bg-[#FBAF85] transition
      "
    >
      CHECKOUT
    </Link>
  </div>
</motion.div>

        </>
      )}
    </AnimatePresence>
  );
}