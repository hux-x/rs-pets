"use client";
// src/components/category/CategoryContent.tsx
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Tag, ShoppingBag, ChevronRight, Home } from "lucide-react";
import Explore from "@/src/components/explore/page";
import { collections } from "@/src/assets/assets";

/* ─── Paw Print SVG ─────────────────────────────────────────────── */
const PawPrint = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <circle cx="8"  cy="8"  r="3"   />
    <circle cx="24" cy="8"  r="3"   />
    <circle cx="5"  cy="15" r="2.5" />
    <circle cx="27" cy="15" r="2.5" />
    <path d="M16 12c-5 0-9 4-7 10 1 3 3 5 7 5s6-2 7-5c2-6-2-10-7-10z" />
  </svg>
);

/* ─── Stat pill ─────────────────────────────────────────────────── */
const StatPill = ({
  icon,
  label,
  delay,
}) => (
  <motion.div
    className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="text-sky-300">{icon}</span>
    <span className="text-white text-sm font-medium">{label}</span>
  </motion.div>
);

/* ─── Related category card ─────────────────────────────────────── */
const RelatedCard = ({
  col,
  index,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/shop/${col.slug}`}
        className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <Image
          src={col.image}
          alt={col.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/80 via-[#0a1f44]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          <span className="text-white text-sm font-semibold drop-shadow">{col.name}</span>
          <span className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight size={12} className="text-white" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const CategoryContent = ({ collection, productCount }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const relatedCollections = collections
    .filter((c) => c.slug !== collection.slug)
    .slice(0, 4);

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[520px] max-h-[760px] overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: imageY }}
        >
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlay — matches site blue palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f44]/85 via-[#0f3470]/70 to-[#0b5fa5]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/60 via-transparent to-transparent" />

        {/* Mesh dots */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #93c5fd 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Decorative paw prints */}
        {[
          { top: "12%", left: "4%",  size: 36, rotate: -18, opacity: 0.1  },
          { top: "70%", right: "5%", size: 28, rotate: 14,  opacity: 0.08 },
          { top: "35%", right: "12%",size: 20, rotate: -5,  opacity: 0.06 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-sky-200 pointer-events-none"
            style={{ top: p.top, left: p.left, right: p.right, opacity: p.opacity }}
            animate={{ rotate: [p.rotate, p.rotate + 8, p.rotate] }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <PawPrint className={`w-[${p.size}px] h-[${p.size}px]`} />
          </motion.div>
        ))}

        {/* Hero text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ y: textY, opacity }}
        >
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-1.5 text-blue-200/70 text-xs mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={11} /> Home
            </Link>
            <ChevronRight size={11} />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight size={11} />
            <span className="text-white font-medium">{collection.name}</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <PawPrint className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-blue-100 text-[11px] font-semibold tracking-[0.2em] uppercase">
              RSPetsHub Collection
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-none tracking-tight mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {collection.name.split(" ").map((word, i) => (
              <span key={i}>
                {i === collection.name.split(" ").length - 1 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
                    {word}
                  </span>
                ) : (
                  word + " "
                )}
              </span>
            ))}
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            className="h-[3px] w-24 bg-gradient-to-r from-sky-400 to-blue-300 rounded-full mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />

          {/* Description */}
          <motion.p
            className="text-blue-100/80 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {collection.description}
          </motion.p>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <StatPill
              icon={<ShoppingBag size={14} />}
              label={`${productCount} Products`}
              delay={0.45}
            />
            <StatPill
              icon={<Tag size={14} />}
              label="Fast Delivery · Pakistan"
              delay={0.55}
            />
            <StatPill
              icon={<PawPrint className="w-3.5 h-3.5" />}
              label="Quality Guaranteed"
              delay={0.65}
            />
          </div>
        </motion.div>

        {/* Bottom wave — same as ExploreHeader */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-14 sm:h-20 fill-gray-50"
          >
            <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ── Product grid via Explore (pre-filtered) ──────────────── */}
      {/* 
        Explore already reads ?category= from the URL.
        Since this is /shop/cat-food we pass it as a prop so the 
        filter is pre-seeded without needing a query param.
        The full filter/search/sort/pagination UI remains intact.
      */}
      <div className="-mt-2">
        <Explore defaultCategory={collection.slug} hideHeader />
      </div>

      {/* ── Related Collections ───────────────────────────────────── */}
      <section  
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Browse Other Collections</h2>
          <p className="text-gray-500 text-sm mt-1">More products for your furry friends</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedCollections.map((col, i) => (
            <RelatedCard key={col.slug} col={col} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
          >
            View all collections
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default CategoryContent;