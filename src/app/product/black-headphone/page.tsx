"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function BlackHeadphonePage() {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const product = {
    id: 2,
    name: "XX99 Mark II Headphones",
    price: 2999,
    image: "/images/headset.png",
  };

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      qty: quantity 
    });
    
    // Show success feedback
    setAddedToCart(true);
    setQuantity(1); // Reset quantity after adding
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  // Check if this product is already in cart
  const cartItem = cart.find(item => item.id === product.id);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* SUCCESS MESSAGE */}
      {addedToCart && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Added to cart successfully!
          </div>
        </div>
      )}

      {/* PRODUCT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Left: Image */}
          <div className="relative w-full md:w-[540px] h-[560px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs tracking-[0.3em] text-orange-500 font-semibold mb-3">
              NEW PRODUCT
            </p>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              XX99 MARK II <br /> HEADPHONES
            </h1>

            <p className="text-gray-500 mb-6 leading-relaxed">
              The new XX99 Mark II headphones is the pinnacle of pristine audio.
              It redefines your premium headphone experience by reproducing the
              balanced depth and precision of studio-quality sound.
            </p>

            <p className="text-lg font-semibold mb-6 tracking-wider">
              $ {product.price.toLocaleString()}
            </p>

            {/* Cart Quantity & Status */}
            {cartItem && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm font-medium">
                  {cartItem.qty} {cartItem.qty === 1 ? 'item' : 'items'} in cart • ${(cartItem.price * cartItem.qty).toLocaleString()} total
                </p>
              </div>
            )}

            <div className="flex justify-center md:justify-start items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded">
                <button
                  onClick={decreaseQty}
                  className="text-gray-500 text-lg px-2 hover:text-black transition-colors"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="px-4 font-semibold min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="text-gray-500 text-lg px-2 hover:text-black transition-colors"
                >
                  +
                </button>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-sm font-semibold tracking-wider rounded-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                ADD TO CART
              </button>
            </div>

            {/* Quick View Cart Link */}
            {cart.length > 0 && (
              <div className="mt-6">
                <Link 
                  href="/cart" 
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  View Cart ({cart.reduce((total, item) => total + item.qty, 0)} items)
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-20">

          {/* Features */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">FEATURES</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
         Featuring a genuine leather head strap and premium earcups, 
         these headphones deliver superior comfort for those who like to enjoy endless listening. 
         It includes intuitive controls designed for any situation. Whether you’re taking a business call or just
          in your own personal space, the auto on/off and pause
          features ensure that you’ll never miss a beat.

            </p>
            <p className="text-gray-500 leading-relaxed">
          The advanced Active Noise Cancellation with built-in equalizer
           allow you to experience your audio world on
            your terms. It lets you enjoy your 
            audio in peace, but quickly interact with your 
            surroundings when you need to. Combined with Bluetooth 5. 0 
            compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives
             you superior sound, cutting-edge technology, and a modern design aesthetic.

            </p>
          </div>

          {/* In The Box */}
          <div className="flex-1 md:max-w-xs">
            <h2 className="text-2xl font-bold mb-6">IN THE BOX</h2>
            <ul className="space-y-3 text-gray-600">
              {[
                ["1x", "Headphone Unit"],
                ["2x", "Replacement Earcups"],
                ["1x", "User Manual"],
                ["1x", "3.5mm 5m Audio Cable"],
                ["1x", "Travel Bag"],
              ].map(([qty, item], index) => (
                <li key={index}>
                  <span className="text-orange-500 font-semibold mr-3">
                    {qty}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image src="/images/human copy.png" alt="Gallery" fill className="object-cover" />
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image src="/images/pair.png" alt="Gallery" fill className="object-cover" />
            </div>
          </div>

          <div className="relative w-full h-[592px] rounded-lg overflow-hidden">
            <Image src="/images/half.png" alt="Gallery" fill className="object-cover" />
          </div>
        </div>

        {/* YOU MAY ALSO LIKE */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-widest mb-12">
            YOU MAY ALSO LIKE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { title: "XX99 MARK I", img: "/images/gold.png" },
              { title: "XX59", img: "/images/white.png" },
              { title: "ZX9 SPEAKER", img: "/images/speaker.png" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-60 h-60 bg-gray-100 rounded-lg overflow-hidden mb-6">
                  <Image src={item.img} alt={item.title} fill className="object-contain p-6" />
                </div>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold tracking-wider rounded-sm transition">
                  SEE PRODUCT
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SHOP SECTION */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "HEADPHONES", link: "/product/headphone", img: "/images/gold.png" },
            { title: "SPEAKERS", link: "/product/speaker", img: "/images/speaker.png" },
            { title: "EARPHONES", link: "/product/earphone", img: "/images/case.png" },
          ].map((item, i) => (
            <div key={i} className="bg-[#F1F1F1] rounded-lg h-[200px] relative flex flex-col items-center justify-end pb-6">
              <div className="absolute -top-14 w-[120px] h-[120px]">
                <Image src={item.img} alt={item.title} width={120} height={120} className="object-contain" />
              </div>

              <h3 className="font-bold tracking-wider mb-3">{item.title}</h3>
              <Link href={item.link} className="text-[#D87D4A] text-sm font-semibold tracking-wide hover:underline flex items-center gap-2">
                SHOP <span className="text-lg">{">"}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-24 py-20">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
          </h2>
          <p className="text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
            Located at the heart of New York City, Audiophile is the premier
            store for high-end audio equipment.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/human copy.png"
            alt="Man with headphones"
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
