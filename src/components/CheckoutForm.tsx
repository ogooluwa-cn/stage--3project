"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      paymentMethod: "eMoney",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const onFormSubmit = (data: CheckoutFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Billing Details */}
      <section>
        <h2 className="text-xs font-bold text-[#D87D4A] tracking-widest mb-4">
          BILLING DETAILS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-2">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Alexei Ward"
              className={`w-full border rounded-md px-4 py-3 text-sm ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="alexei@gmail.com"
              className={`w-full border rounded-md px-4 py-3 text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-2">Phone Number</label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[\d\s-()]+$/,
                  message: "Invalid phone number",
                },
              })}
              type="tel"
              placeholder="+1 202-555-0136"
              className={`w-full border rounded-md px-4 py-3 text-sm ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section>
        <h2 className="text-xs font-bold text-[#D87D4A] tracking-widest mb-4">
          SHIPPING INFO
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              placeholder="1137 Williams Avenue"
              className={`w-full border rounded-md px-4 py-3 text-sm ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-2">ZIP Code</label>
              <input
                {...register("zipCode", { required: "ZIP code is required" })}
                type="text"
                placeholder="10001"
                className={`w-full border rounded-md px-4 py-3 text-sm ${
                  errors.zipCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">City</label>
              <input
                {...register("city", { required: "City is required" })}
                type="text"
                placeholder="New York"
                className={`w-full border rounded-md px-4 py-3 text-sm ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2">Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              placeholder="United States"
              className={`w-full border rounded-md px-4 py-3 text-sm ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Payment Details */}
      <section>
        <h2 className="text-xs font-bold text-[#D87D4A] tracking-widest mb-4">
          PAYMENT DETAILS
        </h2>

        <label className="block text-xs font-semibold mb-2">Payment Method</label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center border border-gray-300 rounded-md px-4 py-3 cursor-pointer">
            <input
              {...register("paymentMethod")}
              type="radio"
              value="eMoney"
              className="mr-3 accent-[#D87D4A]"
            />
            e-Money
          </label>
          <label className="flex items-center border border-gray-300 rounded-md px-4 py-3 cursor-pointer">
            <input
              {...register("paymentMethod")}
              type="radio"
              value="cash"
              className="mr-3 accent-[#D87D4A]"
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "eMoney" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold mb-2">e-Money Number</label>
              <input
                {...register("eMoneyNumber", {
                  required: paymentMethod === "eMoney" ? "e-Money number is required" : false,
                })}
                type="text"
                placeholder="238521993"
                className={`w-full border rounded-md px-4 py-3 text-sm ${
                  errors.eMoneyNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.eMoneyNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.eMoneyNumber.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">e-Money PIN</label>
              <input
                {...register("eMoneyPIN", {
                  required: paymentMethod === "eMoney" ? "e-Money PIN is required" : false,
                })}
                type="text"
                placeholder="6891"
                className={`w-full border rounded-md px-4 py-3 text-sm ${
                  errors.eMoneyPIN ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.eMoneyPIN && (
                <p className="text-red-500 text-xs mt-1">{errors.eMoneyPIN.message}</p>
              )}
            </div>
          </div>
        )}
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#D87D4A] text-white text-sm py-3 rounded-md hover:bg-[#FBAF85] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "PROCESSING..." : "CONTINUE & PAY"}
      </button>
    </form>
  );
}