"use client";
import React, { useState, useRef } from "react";
import Title from "@/src/components/ui/Title";
import Productitem from "@/src/components/ui/ProductItem";
import Link from "next/link";
import { products } from "@/src/assets/assets";
import { motion, useInView } from "framer-motion";

/* ─── Paw SVG ──────────────────────────────────────────────────── */
const PawPrint = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <circle cx="8" cy="8" r="3" />
    <circle cx="24" cy="8" r="3" />
    <circle cx="5" cy="15" r="2.5" />
    <circle cx="27" cy="15" r="2.5" />
    <path d="M16 12c-5 0-9 4-7 10 1 3 3 5 7 5s6-2 7-5c2-6-2-10-7-10z" />
  </svg>
);

/* ─── Animated Product Card Wrapper ────────────────────────────── */
const AnimatedCard = ({ children, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group"
    >
      {children}
    </motion.div>
  );
};

/* ─── Section ──────────────────────────────────────────────────── */
const Latestcollection = () => {
  const [latestProducts] = useState(products.slice(0, 8));
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative overflow-hidden py-16 px-4 md:px-12 lg:px-20 bg-white">

      {/* Subtle top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a4a8a] via-sky-400 to-[#1a4a8a]" />

      {/* Faint background orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-50 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sky-50 blur-3xl opacity-50" />

      {/* ── Header ── */}
      <div ref={headerRef} className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-300" />
          <PawPrint className="w-5 h-5 text-blue-500" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Title text1="LATEST" text2="PRODUCTS" />
        </motion.div>

        <motion.p
          className="w-full md:w-2/3 mx-auto text-sm md:text-base text-gray-500 leading-relaxed mt-3"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover our newest pet products — from toys and treats to nutritious
          food and accessories, curated just for your furry friends.
        </motion.p>


      </div>

      {/* ── Grid ── */}
      {latestProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:gap-6">
            {latestProducts.map((item, i) => (
              <AnimatedCard key={item._id} index={i}>
                {/* Card shell with hover ring */}
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(30,90,200,.12)] transition-all duration-300 bg-white">
                  <Productitem
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    images={item.image}
                    inStock={item.inStock}
                  />
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* ── Explore More ── */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/shop">
              <motion.span
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#1a4a8a] to-[#1e68c8] text-white py-3.5 px-8 rounded-xl text-sm font-bold shadow-[0_4px_20px_rgba(26,74,138,.35)] hover:shadow-[0_6px_28px_rgba(26,74,138,.45)] transition-shadow duration-300 cursor-pointer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore All Products
                <PawPrint className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <PawPrint className="w-12 h-12 text-blue-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg font-medium">No products available yet</p>
          <p className="text-gray-300 text-sm mt-1">Check back soon for new arrivals!</p>
        </motion.div>
      )}
    </section>
  );
};

export default Latestcollection;