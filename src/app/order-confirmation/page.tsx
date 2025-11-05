"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  _id: Id<"orders">;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  status: string;
  orderDate: number;
  eMoneyNumber?: string; // Make it optional
  eMoneyPIN?: string;    // Make it optional
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as Id<"orders">;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch order details from Convex
  const orderData = useQuery(api.orders.getOrder, orderId ? { orderId } : "skip");

  useEffect(() => {
    if (orderData) {
      setOrder(orderData as OrderDetails);
      setLoading(false);
    } else if (orderData === null) {
      // Order not found
      setLoading(false);
    }
  }, [orderData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Navbar />
        <main className="flex justify-center items-center flex-1 px-4 py-12">
          <div className="bg-white rounded-md w-[540px] max-w-full shadow-md p-10 text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded mb-8 w-1/2 mx-auto"></div>
              <div className="h-48 bg-gray-300 rounded mb-6"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Navbar />
        <main className="flex justify-center items-center flex-1 px-4 py-12">
          <div className="bg-white rounded-md w-[540px] max-w-full shadow-md p-10 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold uppercase mb-2 tracking-wide">Order Not Found</h1>
            <p className="text-gray-600 mb-8 text-sm">We couldn't find your order details.</p>
            <Link
              href="/"
              className="block w-full bg-[#D87D4A] text-white text-sm font-semibold py-4 rounded-md hover:bg-[#FBAF85] transition"
            >
              BACK TO HOME
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get first item for display and count remaining items
  const firstItem = order.items[0];
  const remainingItems = order.items.length - 1;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />

      {/* Overlay Section */}
      <main className="flex justify-center items-center flex-1 px-4 py-12">
        <div className="bg-white rounded-md w-[540px] max-w-full shadow-md p-10 text-center relative">
          {/* Checkmark Icon */}
          <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold uppercase mb-2 tracking-wide">
            Thank You<br />For Your Order
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary Card */}
          <div className="flex flex-col md:flex-row bg-[#F1F1F1] rounded-md overflow-hidden mb-6">
            {/* Left side – items */}
            <div className="flex-1 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={firstItem.image} 
                    alt={firstItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold">{firstItem.name}</p>
                  <p className="text-xs text-gray-500">$ {firstItem.price.toLocaleString()}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">x{firstItem.quantity}</span>
              </div>

              {remainingItems > 0 && (
                <>
                  <hr className="my-3 border-gray-300" />
                  <p className="text-xs text-gray-500 text-left">
                    and {remainingItems} other item{remainingItems > 1 ? 's' : ''}
                  </p>
                </>
              )}
            </div>

            {/* Right side – total */}
            <div className="bg-black text-white p-6 flex flex-col justify-center items-start w-full md:w-[200px]">
              <p className="text-xs uppercase text-gray-400 mb-2">Grand Total</p>
              <p className="text-lg font-bold">$ {order.grandTotal.toLocaleString()}</p>
            </div>
          </div>

          {/* Order Details Summary */}
          <div className="bg-[#F9F9F9] rounded-md p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3 text-sm uppercase">Order Details</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 mb-1">Order Number</p>
                <p className="font-medium text-xs">{order._id}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Order Date</p>
                <p className="font-medium">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Customer</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <p className="font-medium capitalize text-green-600">{order.status}</p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-[#F9F9F9] rounded-md p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3 text-sm uppercase">Shipping Address</h3>
            <div className="text-xs">
              <p className="font-medium mb-1">{order.customerName}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">{order.city}, {order.zipCode}</p>
              <p className="text-gray-600">{order.country}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#F9F9F9] rounded-md p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3 text-sm uppercase">Payment Method</h3>
            <div className="text-xs">
              <p className="font-medium capitalize">
                {order.paymentMethod === 'eMoney' ? 'e-Money' : order.paymentMethod}
              </p>
              {order.paymentMethod === 'eMoney' && order.eMoneyNumber && (
                <p className="text-gray-600 mt-1">
                  e-Money Number: •••• {order.eMoneyNumber.slice(-4)}
                </p>
              )}
            </div>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="block w-full bg-[#D87D4A] text-white text-sm font-semibold py-4 rounded-md hover:bg-[#FBAF85] transition uppercase tracking-wide"
          >
            BACK TO HOME
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Navbar />
        <main className="flex justify-center items-center flex-1 px-4 py-12">
          <div className="bg-white rounded-md w-[540px] max-w-full shadow-md p-10 text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded mb-8 w-1/2 mx-auto"></div>
              <div className="h-48 bg-gray-300 rounded mb-6"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}