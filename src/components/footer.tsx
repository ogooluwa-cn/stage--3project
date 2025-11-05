import { FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#101010] text-white py-14 px-6 md:px-24 lg:px-32">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-10">
        {/* Brand */}
        <h2 className="text-2xl font-extrabold tracking-wide mb-6 md:mb-0">
          audiophile
        </h2>

        {/* Navigation Links */}
        <nav className="flex space-x-8 uppercase text-sm font-semibold tracking-widest text-[#F1F1F1]">
          <a href="#" className="hover:text-[#D87D4A] transition">Home</a>
          <a href="#" className="hover:text-[#D87D4A] transition">Headphones</a>
          <a href="#" className="hover:text-[#D87D4A] transition">Speakers</a>
          <a href="#" className="hover:text-[#D87D4A] transition">Earphones</a>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 space-y-8 md:space-y-0">
        {/* Description */}
        <p className="text-gray-400 max-w-xl leading-relaxed text-[15px]">
          Audiophile is an all in one stop to fulfill your audio needs. We’re a small team
          of music lovers and sound specialists who are devoted to helping you get the
          most out of personal audio. Come and visit our demo facility – we’re open 7
          days a week.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a href="#" className="hover:text-[#D87D4A] transition"><FaFacebookSquare /></a>
          <a href="#" className="hover:text-[#D87D4A] transition"><FaTwitter /></a>
          <a href="#" className="hover:text-[#D87D4A] transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-gray-400 text-sm font-medium">
        Copyright 2021. All Rights Reserved
      </div>
    </footer>
  );
}
