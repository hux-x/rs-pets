"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Title from "@/src/components/ui/Title";
import Productitem from "@/src/components/ui/ProductItem";
import Link from "next/link";
import { products } from "@/src/assets/assets";

/* ─── Animated Paw Print SVG (matches Hero) ────────────────────── */
const PawPrint = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <circle cx="8" cy="8" r="3" />
    <circle cx="24" cy="8" r="3" />
    <circle cx="5" cy="15" r="2.5" />
    <circle cx="27" cy="15" r="2.5" />
    <path d="M16 12c-5 0-9 4-7 10 1 3 3 5 7 5s6-2 7-5c2-6-2-10-7-10z" />
  </svg>
);

/* ─── Floating Orb (matches Hero) ──────────────────────────────── */
const Orb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -24, 0], x: [0, 10, 0], scale: [1, 1.07, 1] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

/* ─── Deal Tag Badge ────────────────────────────────────────────── */
const DealTag = ({ label, delay }) => (
  <motion.span
    className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.22)" }}
  >
    {label}
  </motion.span>
);

/* ─── Section Title with Hero-style underline ───────────────────── */
const SectionHeading = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="text-center mb-12">
      {/* Pill badge */}
      <motion.div
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5"
        initial={{ opacity: 0, y: -12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-yellow-300 text-sm">🔥</span>
        <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">
          Limited Time Offers
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.h2
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        Latest{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
            Deals
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-sky-400 to-blue-300 rounded-full"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </span>
      </motion.h2>

      {/* Subtext */}
      <motion.p
        className="mt-4 text-blue-100/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Hand-picked savings on everything your furry friends love — updated every week.
      </motion.p>


    </div>
  );
};

/* ─── Animated Product Card Wrapper ────────────────────────────── */
const AnimatedCard = ({ children, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: (index % 4) * 0.09,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group"
    >
      {/* Card glow on hover */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-400/30 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[0_16px_48px_rgba(14,127,196,.22)] transition-shadow duration-300">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Countdown Timer Unit ───────────────────────────────────────── */
const Unit = ({ val, label }) => (
  <div className="flex flex-col items-center">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={val}
        className="text-white font-extrabold text-xl sm:text-2xl tabular-nums leading-none"
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 14, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {val}
      </motion.span>
    </AnimatePresence>
    <span className="text-blue-200 text-[10px] font-semibold tracking-widest uppercase mt-0.5">
      {label}
    </span>
  </div>
);

/* ─── Countdown Timer ───────────────────────────────────────────── */
const Countdown = () => {
  const getTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    return {
      h: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
      m: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
      s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <span className="text-yellow-300 text-sm font-semibold">⏱ Ends in</span>
      <div className="flex items-center gap-2">
        <Unit val={time.h} label="hrs" />
        <span className="text-white/50 font-bold pb-3">:</span>
        <Unit val={time.m} label="min" />
        <span className="text-white/50 font-bold pb-3">:</span>
        <Unit val={time.s} label="sec" />
      </div>
    </motion.div>
  );
};

/* ─── Main Deals Component ──────────────────────────────────────── */
const Deals = () => {
  const [latestProducts] = useState(
    products.filter((item) => item.category === "deals").slice(0, 8)
  );

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* ── Background mesh & Orbs ── */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,#60a5fa,transparent_50%),radial-gradient(circle_at_80%_20%,#3b82f6,transparent_50%)] pointer-events-none" />
      <Orb delay={0}  style={{ width: 280, height: 280, top: "-60px",   left: "-60px",  background: "radial-gradient(circle,rgba(96,165,250,.22),transparent 70%)" }} />
      <Orb delay={2}  style={{ width: 180, height: 180, bottom: "40px", right:  "8%",   background: "radial-gradient(circle,rgba(59,130,246,.28),transparent 70%)" }} />
      <Orb delay={4}  style={{ width: 120, height: 120, top:  "35%",    right:  "3%",   background: "radial-gradient(circle,rgba(147,197,253,.18),transparent 70%)" }} />

      {/* Decorative paw prints */}
      {[
        { top: "8%",   left: "4%",   rotate: -20, size: "w-8  h-8",  opacity: "opacity-10" },
        { top: "75%",  left: "2%",   rotate: 10,  size: "w-5  h-5",  opacity: "opacity-8"  },
        { top: "15%",  right: "3%",  rotate: 30,  size: "w-6  h-6",  opacity: "opacity-10" },
        { bottom:"6%", right: "6%",  rotate: -15, size: "w-10 h-10", opacity: "opacity-10" },
        { top: "50%",  left: "48%",  rotate: 5,   size: "w-7  h-7",  opacity: "opacity-5"  },
      ].map((p, i) => (
        <motion.div
          key={i}
          className={`absolute text-white ${p.size} ${p.opacity} pointer-events-none`}
          style={{ ...p }}
          animate={{ rotate: [p.rotate, p.rotate + 10, p.rotate] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <PawPrint className="w-full h-full" />
        </motion.div>
      ))}

      {/* Top wave (mirrors Hero's bottom wave, flipped) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none rotate-180">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 sm:h-16 fill-white">
          <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        {/* ── Header ── */}
        <SectionHeading />


        {/* ── Product Grid ── */}
        {latestProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {latestProducts.map((item, index) => (
                <AnimatedCard key={item._id} index={index}>
                  <Productitem
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    images={item.image}
                    inStock={item.inStock}
                  />
                </AnimatedCard>
              ))}
            </div>

            {/* ── Explore More CTA ── */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link href="/shop?category=deals">
                <motion.span
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-[0_6px_32px_rgba(255,255,255,.25)] hover:shadow-[0_8px_40px_rgba(255,255,255,.35)] transition-shadow duration-300 cursor-pointer text-base"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore All Deals
                  <PawPrint className="w-5 h-5 text-blue-500" />
                </motion.span>
              </Link>
              <p className="text-blue-200/70 text-xs mt-3">
                New deals added every Monday & Thursday
              </p>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <PawPrint className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-blue-200 text-lg font-medium">No deals available right now</p>
            <p className="text-blue-300/60 text-sm mt-1">Check back soon — new deals drop weekly!</p>
          </motion.div>
        )}
      </div>

      {/* Bottom wave (same as Hero) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20 fill-white">
          <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Deals;