"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPanel() {
  const { cart, removeItem, clearCart } = useCart();

  return (
    <div className="absolute right-4 top-20 bg-white shadow-lg p-6 rounded-lg w-[350px] z-50">
      <h3 className="font-bold text-lg mb-4">Cart ({cart.length})</h3>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4">
          <Image src={item.image} width={50} height={50} alt={item.name} />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-500">${item.price}</p>
          </div>
          <p className="font-bold">x{item.qty}</p>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mt-4 w-full">
            Remove All
          </button>
        </>
      )}
    </div>
  );
}
