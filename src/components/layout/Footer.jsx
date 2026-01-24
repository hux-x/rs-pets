"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { assets } from "@/src/assets/assets";
import { collections } from "@/src/assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16 lg:px-24">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10">

        {/* Logo & Description */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Image
            src={assets.logo}
            alt="RSPetsHub Logo"
            width={140}
            height={50}
            className="object-contain"
          />

          <p className="text-sm md:text-base">
            RSPetsHub is your one-stop shop for premium pet food, accessories,
            grooming essentials, and comfort products for your furry friends.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2 text-lg">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaPinterestP /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a
              href="https://wa.me/923096399939"
              target="_blank"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-12">

          {/* Shop */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Shop</h3>

            {collections.map((item) => (
              <Link
                key={item.slug}
                href={`/shop?category=${item.slug}`}
                className="hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}

            <Link href="/shop" className="hover:text-white transition">
              All Products
            </Link>
          </div>

          {/* Policies */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Policies</h3>
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/return-refund-policy" className="hover:text-white transition">Return & Refund</Link>
            <Link href="/shipping-service-policy" className="hover:text-white transition">Shipping Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white">Contact</h3>
          <p>Email: support@rspetshub.com</p>
          <p>Phone: +92 309 6399939</p>
          <p>Location: Karachi, Pakistan</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
        © {new Date().getFullYear()} RSPetsHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
