"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function EarphonePage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/product/earpad");
  };

  const categories = [
    { name: "HEADPHONES", href: "/product/gold-headphone", img: "/images/gold.png" },
    { name: "SPEAKERS", href: "/product/white-speaker", img: "/images/speaker.png" },
    { name: "EARPHONES", href: "/product/earphone", img: "/images/case.png" },
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header */}
      <header className="bg-[#101010] text-white">
        <Navbar />
        <div className="h-[200px] md:h-[336px] flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-wide">
            Earphones
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-24 mt-20 mb-16">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <p className="text-sm tracking-[0.3em] text-orange-500 font-semibold">
            NEW PRODUCT
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            YX1 WIRELESS <br /> EARPHONES
          </h2>
          <p className="text-gray-600 max-w-md mx-auto md:mx-0">
            Tailor your listening experience with bespoke dynamic drivers from the new
            YX1 Wireless Earphones. Enjoy high-fidelity sound even in noisy environments
            with active noise cancellation.
          </p>

          <button
            onClick={handleNavigate}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-8 py-3 rounded-sm uppercase tracking-wider transition"
          >
            See Product
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center bg-[#F1F1F1] rounded-lg py-10">
          <Image
            src="/images/case.png"
            alt="YX1 Wireless Earphones"
            width={350}
            height={350}
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Category Navigation */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-[#F1F1F1] rounded-lg shadow-sm h-[200px] relative flex flex-col items-center justify-end pb-6"
            >
              <div className="absolute -top-14 w-[120px] h-[120px] flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="font-bold tracking-wider mb-3">{item.name}</h3>
              <Link
                href={item.href}
                className="text-[#D87D4A] text-sm font-semibold tracking-wide hover:underline flex items-center gap-2"
              >
                SHOP <span className="text-lg">{">"}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-24 py-20">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
          </h2>
          <p className="text-gray-600 max-w-md mx-auto md:mx-0">
            We’re the premier store for high-end audio devices including headphones,
            earphones, and speakers. Visit our showroom to experience our products in
            a luxury environment with professional assistance.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/human copy.png"
            alt="Man wearing headphones"
            width={500}
            height={500}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
