"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartPopup from "./CartPopup";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { cart } = useCart();

  // Ensure client-side only for animations and state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMounted]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/headphone", label: "Headphones" },
    { href: "/speaker", label: "Speakers" },
    { href: "/earphone", label: "Earphones" },
  ];

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  // Don't render animations on server
  if (!isMounted) {
    return (
      <header className="w-full top-0 z-40 bg-[#101010] text-white sticky">
        <nav className="max-w-[1110px] mx-auto flex items-center justify-between h-20 px-6">
          <div className="flex items-center lg:hidden">
            <button className="p-2">
              <HiOutlineMenu className="text-2xl" />
            </button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:mr-8">
            <Link href="/" className="font-bold text-2xl tracking-widest uppercase">
              audiophile
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-12 text-sm font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="py-2 px-1 text-white/90">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative">
            <button className="p-2 relative">
              <FiShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
        <div className="border-b border-white/10" />
      </header>
    );
  }

  return (
    <>
      <header
        className={`w-full top-0 z-40 bg-[#101010] text-white sticky transition-shadow duration-200 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <nav className="max-w-[1110px] mx-auto flex items-center justify-between h-20 px-6">
          {/* Left: Menu icon (mobile/tablet) */}
          <div className="flex items-center lg:hidden">
            <button
              aria-label="Open menu"
              className="p-2"
              onClick={() => setOpenDrawer(true)}
            >
              <HiOutlineMenu className="text-2xl" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:mr-8">
            <Link href="/" className="font-bold text-2xl tracking-widest uppercase select-none hover:text-orange-400 transition-colors">
              audiophile
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-12 text-sm font-semibold uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative py-2 px-1 transition-colors ${
                      isActive ? "text-orange-400" : "text-white/90 hover:text-orange-400"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-400 rounded" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: Cart Button */}
          <div className="relative">
            <button
              aria-label={`Shopping cart with ${totalItems} items`}
              aria-haspopup="true"
              aria-expanded={openCart}
              onClick={() => setOpenCart(true)}
              className="p-2 relative hover:text-orange-400 transition-colors"
            >
              <FiShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Bottom Border */}
        <div className="border-b border-white/10" />
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {openDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenDrawer(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white text-black lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="font-bold text-lg uppercase">Menu</h2>
                  <button 
                    onClick={() => setOpenDrawer(false)} 
                    aria-label="Close menu"
                    className="p-2 hover:text-orange-400 transition-colors"
                  >
                    <IoMdClose className="text-2xl" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6">
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpenDrawer(false)}
                          className={`block py-4 px-4 rounded-lg text-lg font-semibold uppercase transition-colors ${
                            pathname === link.href 
                              ? "bg-orange-400 text-white" 
                              : "hover:bg-gray-100 hover:text-orange-400"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Cart items:</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>
                  <button
                    onClick={() => {
                      setOpenDrawer(false);
                      setOpenCart(true);
                    }}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Cart Popup - This will show when openCart is true */}
      <CartPopup isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}