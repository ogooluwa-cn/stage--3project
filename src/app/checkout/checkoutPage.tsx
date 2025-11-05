"use client";

// This ensures the page is dynamically rendered and not statically generated
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/CheckoutForm";
import SummaryCard from "@/components/SummaryCard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "eMoney" | "cash";
  eMoneyNumber?: string;
  eMoneyPIN?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: Id<"orders">;
    grandTotal: number;
    items: OrderItem[];
  } | null>(null);
  
  const createOrder = useMutation(api.orders.createOrder);

  // Calculate totals
  const subtotal = getTotalPrice();
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (formData: CheckoutFormData) => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🔄 Starting order creation...");
      
      // 1. Create order in Convex
      const orderId = await createOrder({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        eMoneyNumber: formData.eMoneyNumber,
        eMoneyPIN: formData.eMoneyPIN,
        items: cart.map(item => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image,
        })),
        subtotal,
        shipping,
        vat,
        grandTotal,
      });

      console.log("✅ Order created in Convex:", orderId);

      // 2. Send confirmation email
      console.log("📧 Sending confirmation email...");
      
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            orderId,
            items: cart,
            subtotal,
            shipping,
            vat,
            grandTotal,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
            country: formData.country,
          }),
        });

        const emailResult = await emailResponse.json();
        
        if (emailResponse.ok) {
          console.log("✅ Email sent successfully:", emailResult);
        } else {
          console.warn("⚠️ Email sending failed:", emailResult);
        }
      } catch (emailError) {
        console.warn("⚠️ Email API error:", emailError);
      }

      // 3. Store order details and show confirmation popup
      setOrderDetails({
        orderId,
        grandTotal,
        items: cart.map(item => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image,
        }))
      });

      // 4. Clear cart and show confirmation
      clearCart();
      setShowConfirmation(true);
      
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    setShowConfirmation(false);
    router.push("/");
  };

  // Get first item for display and count remaining items
  const firstItem = orderDetails?.items[0];
  const remainingItems = orderDetails ? orderDetails.items.length - 1 : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <main className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D87D4A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Empty cart state (only show if not showing confirmation)
  if (cart.length === 0 && !showConfirmation) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <main className="flex justify-center items-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#D87D4A] text-white px-6 py-3 rounded-md hover:bg-[#FBAF85] transition"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* Main Checkout Content - Always visible */}
      <main className="flex justify-center py-8 lg:py-16 relative">
        {/* Confirmation Popup Overlay */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md w-full max-w-[540px] shadow-lg border border-gray-200 p-10 text-center relative">
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
                  {firstItem && (
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
                  )}

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
                  <p className="text-lg font-bold">$ {orderDetails?.grandTotal.toLocaleString()}</p>
                </div>
              </div>

              {/* Back to Home Button */}
              <button
                onClick={handleBackToHome}
                className="block w-full bg-[#D87D4A] text-white text-sm font-semibold py-4 rounded-md hover:bg-[#FBAF85] transition uppercase tracking-wide"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        )}

        {/* Checkout Form and Summary - Visible in background when popup is open */}
        <div className={`flex flex-col lg:flex-row bg-white shadow-md rounded-md w-full max-w-[1110px] min-h-min mx-4 ${showConfirmation ? 'opacity-30' : ''}`}>
          {/* Left Section - Checkout Form */}
          <div className="flex-1 px-6 lg:px-12 py-8 lg:py-10">
            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-[#D87D4A] mb-6 transition flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>
            <h1 className="text-2xl font-bold tracking-wide mb-8">CHECKOUT</h1>
            <CheckoutForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </div>

          {/* Right Section - Order Summary */}
          <div className="w-full lg:w-[350px] bg-[#F9F9F9] px-6 lg:px-8 py-8 lg:border-l border-gray-200">
            <h2 className="text-lg font-bold mb-6">SUMMARY</h2>
            <SummaryCard
              subtotal={subtotal}
              shipping={shipping}
              vat={vat}
              grandTotal={grandTotal}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}