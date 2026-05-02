"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { assets } from "@/src/assets/assets";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Floating Orb ──────────────────────────────────────────────── */
const Orb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -24, 0], x: [0, 10, 0], scale: [1, 1.07, 1] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

/* ─── Animated Paw Print SVG ────────────────────────────────────── */
const PawPrint = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <circle cx="8" cy="8" r="3" />
    <circle cx="24" cy="8" r="3" />
    <circle cx="5" cy="15" r="2.5" />
    <circle cx="27" cy="15" r="2.5" />
    <path d="M16 12c-5 0-9 4-7 10 1 3 3 5 7 5s6-2 7-5c2-6-2-10-7-10z" />
  </svg>
);

/* ─── Stat Badge ────────────────────────────────────────────────── */
const StatBadge = ({ icon, label, value, delay }) => (
  <motion.div
    className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.18)" }}
  >
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="text-white font-bold text-base leading-none">{value}</p>
      <p className="text-blue-200 text-xs mt-0.5">{label}</p>
    </div>
  </motion.div>
);

/* ─── Hero ──────────────────────────────────────────────────────── */
const Hero = () => {
  const images = assets.hero_images;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  /* Tilt effect on mouse move */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(-y * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  /* Auto-rotate */
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length, hovered]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── Background Mesh & Orbs ── */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,#60a5fa,transparent_50%),radial-gradient(circle_at_80%_20%,#3b82f6,transparent_50%)]" />
      <Orb delay={0}  style={{ width: 320, height: 320, top: "-80px",  left: "-80px",  background: "radial-gradient(circle,rgba(96,165,250,.25),transparent 70%)" }} />
      <Orb delay={2}  style={{ width: 200, height: 200, bottom: "60px", right:  "10%",  background: "radial-gradient(circle,rgba(59,130,246,.3),transparent 70%)" }} />
      <Orb delay={3.5} style={{ width: 140, height: 140, top: "30%",    right:  "5%",   background: "radial-gradient(circle,rgba(147,197,253,.2),transparent 70%)" }} />

      {/* Decorative paw prints */}
      {[
        { top: "12%",  left: "6%",   rotate: -20, size: "w-8  h-8",  opacity: "opacity-10" },
        { top: "70%",  left: "3%",   rotate: 10,  size: "w-5  h-5",  opacity: "opacity-10" },
        { top: "20%",  right: "4%",  rotate: 30,  size: "w-6  h-6",  opacity: "opacity-10" },
        { bottom:"8%", right: "8%",  rotate: -15, size: "w-10 h-10", opacity: "opacity-10" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className={`absolute text-white ${p.size} ${p.opacity}`}
          style={{ ...p }}
          animate={{ rotate: [p.rotate, p.rotate + 10, p.rotate] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <PawPrint className="w-full h-full" />
        </motion.div>
      ))}

      {/* ── Main Grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ─ LEFT TEXT ─ */}
          <motion.div
            className="flex flex-col space-y-6 order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
       

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-white"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Everything{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
                  Your Pets
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-sky-400 to-blue-300 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <br />
              <span className="text-white">Need</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              className="text-blue-100/90 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              RSPetsHub brings you high-quality pet supplies — from nutritious food to
              toys, accessories, and grooming essentials. Keep your furry friends
              happy, healthy, and playful.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="/shop">
                <motion.span
                  className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-xl shadow-[0_6px_32px_rgba(255,255,255,.25)] hover:shadow-[0_8px_40px_rgba(255,255,255,.35)] transition-shadow duration-300 cursor-pointer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop Now
                  <PawPrint className="w-5 h-5 text-blue-500" />
                </motion.span>
              </Link>
           
            </motion.div>

        
          </motion.div>

          {/* ─ RIGHT CAROUSEL ─ */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center items-center perspective-[1200px]"
            style={{ rotateX: springX, rotateY: springY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
          >
            {/* Glow ring behind image */}
            <div className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-3xl bg-blue-400/20 blur-2xl" />

            {/* Card frame */}
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[460px]">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,.4)]">
                <AnimatePresence mode="wait">
                  {images.map((img, i) =>
                    index === i ? (
                      <motion.div
                        key={i}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Image
                          src={img}
                          alt={`Hero slide ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width:640px) 260px,(max-width:768px) 300px,(max-width:1024px) 400px,460px"
                          priority={i === 0}
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d5e]/50 via-transparent to-transparent" />
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>

                {/* Slide counter inside card */}
                <motion.div
                  className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20"
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {index + 1} / {images.length}
                </motion.div>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-5">
                {images.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 outline-none ${
                      index === i ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
                    }`}
                    whileTap={{ scale: 0.85 }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating badge — top left */}
            <motion.div
              className="absolute -left-4 top-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 border border-blue-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-yellow-400 text-xl">★</span>
              <div>
                <p className="text-gray-800 font-bold text-sm leading-none">4.9/5</p>
                <p className="text-gray-400 text-xs mt-0.5">Customer Rating</p>
              </div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              className="absolute -right-4 bottom-16 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 border border-blue-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">🐾</span>
              <div>
                <p className="text-gray-800 font-bold text-sm leading-none">New Arrivals</p>
                <p className="text-gray-400 text-xs mt-0.5">Updated weekly</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20 fill-white">
          <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;