"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";    
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HeadphonePage() {
   const router = useRouter();
   const black = () => {
    router.push("/product/black-headphone");
  };

    const gold = () => {
    router.push("/product/gold-headphone");
  };

      const white = () => {
    router.push("/product/white-headphone");
  };
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="font-sans bg-[#101010] text-white">
        <Navbar />
        <div className="h-[200px] md:h-[336px] flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center pt-16 md:pt-24 uppercase">HEADPHONES</h1>
        </div>
      </div>

      {/* First Headphone Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white mb-8 md:mb-12 lg:mb-[50px] px-4 sm:px-6 md:px-8 lg:px-12 xl:pl-20">
        {/* Left: Headphone Image */}
        <div className="w-full md:flex-1 flex justify-center bg-[#F1F1F1] p-6 md:p-8 lg:p-12 xl:p-20 rounded-lg mb-6 md:mb-0">
          <Image
            src="/images/headset.png"
            alt="XX99 Mark II Headphones"
            width={400}
            height={400}
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:w-[540px] h-auto object-contain"
            priority
          />
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 text-center md:text-left">
          <p className="text-xs tracking-[0.3em] text-orange-500 font-semibold mb-2">
            NEW PRODUCT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-4 md:mb-6">
            XX99 MARK II <br /> HEADPHONES
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6 md:mb-8 text-sm sm:text-base">
            The new XX99 Mark II headphones is the pinnacle of pristine audio. 
            It redefines your premium headphone experience by reproducing the 
            balanced depth and precision of studio-quality sound.
          </p>
          <button onClick={black} className="bg-orange-500 hover:bg-orange-600 text-white text-sm tracking-wider px-6 py-3 rounded-sm transition w-full sm:w-auto">
        
            SEE PRODUCT
          </button>
        </div>
      </section>

      {/* Second Headphone Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white mb-8 md:mb-12 lg:mb-[50px] px-4 sm:px-6 md:px-8 lg:px-12 xl:pl-20">
        {/* Left: Product Info */}
        <div className="w-full md:flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 text-center md:text-left order-2 md:order-1">
          <p className="text-xs tracking-[0.3em] text-orange-500 font-semibold mb-2">
            NEW PRODUCT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-4 md:mb-6">
            XX99 MARK I <br /> HEADPHONES
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6 md:mb-8 text-sm sm:text-base">
            As the gold standard for headphones, the classic XX99 Mark I 
            offers detailed and accurate audio reproduction for audiophiles, 
            mixing engineers, and music aficionados alike in studios and on the go.
          </p>
          <button onClick={gold} className="bg-orange-500 hover:bg-orange-600 text-white text-sm tracking-wider px-6 py-3 rounded-sm transition w-full sm:w-auto">
            SEE PRODUCT
          </button>
        </div>

        {/* Right: Headphone Image */}
        <div className="w-full md:flex-1 flex justify-center bg-[#F1F1F1] p-6 md:p-8 lg:p-10 rounded-lg mb-6 md:mb-0 order-1 md:order-2">
          <Image
            src="/images/gold.png"
            alt="XX99 Mark I Headphones"
            width={400}
            height={400}
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:w-[540px] h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* Third Headphone Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white mb-8 md:mb-12 lg:mb-[50px] px-4 sm:px-6 md:px-8 lg:px-12 xl:pl-20">
        {/* Left: Headphone Image */}
        <div className="w-full md:flex-1 flex justify-center bg-[#F1F1F1] p-6 md:p-8 lg:p-10 rounded-lg mb-6 md:mb-0">
          <Image
            src="/images/white.png"
            alt="XX59 Headphones"
            width={400}
            height={400}
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:w-[540px] h-auto object-contain"
            priority
          />
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 text-center md:text-left">
          <p className="text-xs tracking-[0.3em] text-orange-500 font-semibold mb-2">
            NEW PRODUCT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-4 md:mb-6">
            XX59 <br /> HEADPHONES
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6 md:mb-8 text-sm sm:text-base">
            Enjoy your audio almost anywhere and customize it to your specific 
            tastes with the XX59 headphones. The stylish yet durable versatile 
            wireless headset is a brilliant companion at home or on the move.
          </p>
          <button onClick={white} className="bg-orange-500 hover:bg-orange-600 text-white text-sm tracking-wider px-6 py-3 rounded-sm transition w-full sm:w-auto">
            SEE PRODUCT
          </button>
        </div>
      </section>

      {/* Category Cards */}
      <main className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 md:py-16 text-black bg-white">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-16 md:mb-20 justify-center">
          {/* Headphones */}
          <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-center relative shadow-sm overflow-visible h-[160px] sm:h-[180px] md:h-[200px] w-full max-w-[300px] mx-auto">
            <div className="relative -top-12 sm:-top-14 md:-top-16">
              <Image
                src="/images/gold.png"
                alt="Headphones"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                priority
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-wider mb-2">HEADPHONES</h3>
            <Link
              href="/product/gold-headphone"
              className="text-[#D87D4A] text-xs sm:text-sm font-semibold tracking-wide hover:underline flex items-center gap-1"
            >
              SHOP <span className="text-[#D87D4A] text-sm sm:text-lg">{'>'}</span>
            </Link>
          </div>

          {/* Speakers */}
          <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-center relative shadow-sm overflow-visible h-[160px] sm:h-[180px] md:h-[200px] w-full max-w-[300px] mx-auto">
            <div className="relative -top-12 sm:-top-14 md:-top-16">
              <Image
                src="/images/speaker.png"
                alt="Speakers"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                priority
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-wider mb-2">SPEAKERS</h3>
            <Link
              href="/product/speaker"
              className="text-[#D87D4A] text-xs sm:text-sm font-semibold tracking-wide hover:underline flex items-center gap-1"
            >
              SHOP <span className="text-[#D87D4A] text-sm sm:text-lg">{'>'}</span>
            </Link>
          </div>

          {/* Earphones */}
          <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-center relative shadow-sm overflow-visible h-[160px] sm:h-[180px] md:h-[200px] w-full max-w-[300px] mx-auto">
            <div className="relative -top-10 sm:-top-12 md:-top-14">
              <Image
                src="/case.png"
                alt="Earphones"
                width={120}
                height={120}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                priority
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-wider mb-2">EARPHONES</h3>
            <Link
              href="product/earphone"
              className="text-[#D87D4A] text-xs sm:text-sm font-semibold tracking-wide hover:underline flex items-center gap-1"
            >
              SHOP <span className="text-[#D87D4A] text-sm sm:text-lg">{'>'}</span>
            </Link>
          </div>
        </section>
      </main>

      {/* About Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 md:py-16 lg:py-20 bg-white">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6 mt-8 md:mt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black">
            BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Located at the heart of New York City, Audiophile is the premier store
            for high end headphones, earphones, speakers, and audio accessories.
            We have a large showroom and luxury demonstration rooms available for
            you to browse and experience a wide range of our products. Stop by our
            store to meet some of the fantastic people who make Audiophile the best
            place to buy your portable audio equipment.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <Image
            src="/images/human copy.png"
            alt="Man with headphones"
            width={500}
            height={500}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg object-cover rounded-lg"
            priority
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}