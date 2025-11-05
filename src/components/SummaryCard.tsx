"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface SummaryCardProps {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

export default function SummaryCard({ subtotal, shipping, vat, grandTotal }: SummaryCardProps) {
  const { cart } = useCart();

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mb-6 tracking-wide">SUMMARY</h2>

      {/* Products */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 w-12 h-12 rounded-md relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">x{item.qty}</p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Total</span>
          <span className="font-semibold">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Shipping</span>
          <span className="font-semibold">${shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">VAT (Included)</span>
          <span className="font-semibold">${vat.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-gray-500 uppercase">Grand Total</span>
          <span className="text-[#D87D4A] font-bold">${grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}