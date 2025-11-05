"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function WhiteHeadphonePage() {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = {
    id: 6, // Make sure this ID is unique for this product
    name: "XX59 Headphones",
    price: 899, // Adjust price as needed
    image: "/images/white.png",
  };

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    addToCart({ ...product, qty: quantity });
    setAddedToCart(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  // Navigation functions
  const black = () => {
    router.push("/product/black-headphone");
  };

  const gold = () => {
    router.push("/product/gold-headphone");
  };
  
  const speaker = () => {
    router.push("/product/white-speaker");
  };

  // Check if this product is in cart
  const cartItem = cart.find(item => item.id === product.id);

  return (
    <div className="bg-white">
      <Navbar/>

      {/* Success Message */}
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

      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Left: Product Image */}
          <div>
            <img
              src="/images/white.png"
              alt="XX59 Headphones"
              className="w-[540px] h-[560px] object-contain"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 text-center md:text-left font-monrope font-weight-[400]">
            <p className="text-xs tracking-[0.3em] text-orange-500 font-semibold mb-3">
              NEW PRODUCT
            </p>
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              XX59 <br /> HEADPHONES
            </h1>
            <p className="text-gray-500 mb-6 leading-relaxed">
Enjoy your audio almost anywhere and customize 
it to your specific tastes with the XX59 headphones. 
The stylish yet durable versatile wireless headset is a 
brilliant companion at home or on the move.
            </p>

            <p className="text-lg font-semibold mb-6">$ {product.price.toLocaleString()}</p>

            {/* Cart Status */}
            {cartItem && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm font-medium">
                  {cartItem.qty} {cartItem.qty === 1 ? 'item' : 'items'} in cart • ${(cartItem.price * cartItem.qty).toLocaleString()} total
                </p>
              </div>
            )}

            {/* Quantity + Button */}
            <div className="flex justify-center md:justify-start items-center gap-4">
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded">
                <button
                  onClick={decreaseQty}
                  className="text-gray-500 text-lg px-2 hover:text-black transition-colors duration-200"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="px-4 font-semibold min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="text-gray-500 text-lg px-2 hover:text-black transition-colors duration-200"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-sm font-semibold tracking-wider rounded-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                ADD TO CART
              </button>
            </div>

            {/* Quick Cart Link */}
            {cart.length > 0 && (
              <div className="mt-6 flex justify-center md:justify-start">
                <Link 
                  href="/chart" 
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

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row gap-20 mt-24">
          {/* Features */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">FEATURES</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
         These headphones have been created from durable, 
         high-quality materials tough enough to take anywhere. 
         Its compact folding design fuses comfort and minimalist
          style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.

            </p>
            <p className="text-gray-500 leading-relaxed">
More than a simple pair of headphones, this headset features 
a pair of built-in microphones for clear, hands-free calling
 when paired with a compatible smartphone. Controlling 
 music and calls is also intuitive thanks to easy-access
  touch buttons on the earcups. Regardless of how you use the XX59
   headphones, you can do so all day thanks to an impressive 30-hour battery 
   life that can be rapidly recharged via USB-C.

            </p>
          </div>

          {/* In The Box */}
          <div className="flex-1 md:max-w-xs">
            <h2 className="text-2xl font-bold mb-6">IN THE BOX</h2>
            <ul className="space-y-3 text-gray-600">
              <li>
                <span className="text-orange-500 font-semibold mr-3">1x</span> Headphone Unit
              </li>
              <li>
                <span className="text-orange-500 font-semibold mr-3">2x</span> Replacement Earcups
              </li>
              <li>
                <span className="text-orange-500 font-semibold mr-3">1x</span> User Manual
              </li>
              <li>
                <span className="text-orange-500 font-semibold mr-3">1x</span> 3.5mm 5m Audio Cable
              </li>
              <li>
                <span className="text-orange-500 font-semibold mr-3">1x</span> Travel Bag
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* ==== GALLERY SECTION ==== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden">
              <Image
                src="/images/woman.png"
                alt="Gallery 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden">
              <Image
                src="/images/pad.png"
                alt="Gallery 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative w-full h-[592px] rounded-lg overflow-hidden">
            <Image
              src="/images/deep.png"
              alt="Gallery 3"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ==== "YOU MAY ALSO LIKE" SECTION ==== */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-widest mb-12">
            YOU MAY ALSO LIKE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Product 1 */}
            <div className="flex flex-col items-center">
              <div className="relative w-60 h-60 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/headset.png"
                  alt="XX99 Mark I"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <h3 className="text-lg font-semibold mb-4">XX99 MARK I</h3>
              <button onClick={black} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold tracking-wider rounded-sm transition">
                SEE PRODUCT
              </button>
            </div>

            {/* Product 2 */}
            <div className="flex flex-col items-center">
              <div className="relative w-60 h-60 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/gold.png"
                  alt="XX59 Headphones"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <h3 className="text-lg font-semibold mb-4">XX59</h3>
              <button onClick={gold} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold tracking-wider rounded-sm transition">
                SEE PRODUCT
              </button>
            </div>

            {/* Product 3 */}
            <div className="flex flex-col items-center">
              <div className="relative w-60 h-60 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/speaker.png"
                  alt="ZX9 Speaker"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <h3 className="text-lg font-semibold mb-4">ZX9 SPEAKER</h3>
              <button onClick={speaker} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold tracking-wider rounded-sm transition">
                SEE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-20 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-black">
          {[
            { title: "HEADPHONES", link: "/product/gold-headphone", img: "/images/gold.png" },
            { title: "SPEAKERS", link: "/product/white-speaker", img: "/images/speaker.png" },
            { title: "EARPHONES", link: "/product/earphone", img: "/case.png" },
          ].map((item, i) => (
            <div key={i} className="bg-[#F1F1F1] rounded-lg shadow-sm h-[200px] relative flex flex-col items-center justify-end pb-6">
              <div className="absolute -top-14 w-[120px] h-[120px] flex items-center justify-center">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  width={120} 
                  height={120} 
                  className="object-contain" 
                  priority
                />
              </div>
              <h3 className="font-bold tracking-wider mb-3">{item.title}</h3>
              <Link
                href={item.link}
                className="text-[#D87D4A] text-sm font-semibold tracking-wide hover:underline flex items-center gap-2"
              >
                SHOP <span className="text-lg">{'>'}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-24 py-20 bg-white">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
          </h2>
          <p className="text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
            As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining 
            the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize 
            durability at a relatively light weight of 11 oz. From the handcrafted microfiber ear cushions to the robust metal headband with inner damping element,
            the components work together to deliver comfort and uncompromising sound.
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