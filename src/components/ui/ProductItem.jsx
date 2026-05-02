"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShopContext } from "@/src/context/ShopContext";
import { toast } from "react-toastify";
import { ShoppingCart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const Productitem = ({ name, id, price, images, inStock }) => {
  const { currency, addtocart } = useContext(ShopContext);
  const [imageError, setImageError]   = useState(false);
  const [isHovered, setIsHovered]     = useState(false);
  const [cartBurst, setCartBurst]     = useState(false);

  const primaryImage =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "/placeholder-product.jpg";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) { toast.info("Currently out of stock"); return; }
    addtocart(id, "default");
    toast.success(`${name} added to cart!`);
    setCartBurst(true);
    setTimeout(() => setCartBurst(false), 600);
  };

  return (
    <Link href={`/product/${id}`}>
      <motion.div
        className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -6, transition: { duration: 0.28, ease: "easeOut" } }}
        style={{
          boxShadow: isHovered
            ? "0 20px 50px rgba(14, 127, 196, 0.18), 0 4px 16px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.07)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Blue glow ring on hover */}
        <motion.div
          className="absolute -inset-px rounded-2xl pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.5), rgba(14,127,196,0.3))",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Image container */}
        <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-blue-50 to-sky-50 overflow-hidden">
          {!imageError ? (
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Image
                src={primaryImage}
                alt={name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover object-center"
                onError={() => setImageError(true)}
                priority={false}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 to-sky-100">
              <PawPrint className="w-10 h-10 text-blue-200" />
              <span className="text-blue-300 text-xs font-medium">Image unavailable</span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0f2d5e]/40 via-transparent to-transparent pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Out of stock badge */}
          <AnimatePresence>
            {!inStock && (
              <motion.span
                className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold z-10 shadow-md"
                initial={{ opacity: 0, scale: 0.8, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Out of Stock
              </motion.span>
            )}
          </AnimatePresence>

          {/* ── Desktop action buttons (hover only) ── */}
          <motion.div
            className="hidden sm:flex absolute top-3 right-3 flex-col gap-2 z-10"
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Quick view */}
            <motion.div
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              title="Quick view"
            >
              <Eye size={15} />
            </motion.div>

            {/* Add to cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!inStock}
              aria-label={inStock ? "Add to cart" : "Out of stock"}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${
                inStock
                  ? "bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white hover:from-[#0f2d5e] hover:to-[#1a4a8a]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              whileHover={inStock ? { scale: 1.12 } : {}}
              whileTap={inStock ? { scale: 0.88 } : {}}
              animate={cartBurst ? { scale: [1, 1.35, 1] } : {}}
              transition={cartBurst ? { duration: 0.35 } : {}}
            >
              <ShoppingCart size={15} />
            </motion.button>
          </motion.div>

          {/* Cart burst particles */}
          <AnimatePresence>
            {cartBurst && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-3 right-3 w-2 h-2 rounded-full bg-sky-400 pointer-events-none z-20"
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 0.5,
                      x: Math.cos((i / 6) * Math.PI * 2) * 28,
                      y: Math.sin((i / 6) * Math.PI * 2) * 28,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Product info */}
        <div className="p-3 sm:p-4 flex flex-col gap-1.5 relative">
          {/* Animated bottom border on hover */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          <p
            className="text-sm md:text-base font-semibold text-gray-800 truncate leading-snug"
            title={name}
          >
            {name}
          </p>

          {/* ── Desktop: price + stock badge row ── */}
          <div className="hidden sm:flex items-center justify-between">
            <motion.p
              className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1a4a8a] to-[#0e7fc4]"
              animate={{ scale: isHovered ? 1.04 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {currency} {price.toLocaleString()}
            </motion.p>

            {inStock ? (
              <motion.span
                className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
              >
                In Stock
              </motion.span>
            ) : (
              <span className="text-[10px] font-semibold text-red-400 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                Sold Out
              </span>
            )}
          </div>

          {/* ── Mobile: price + cart button row (always visible) ── */}
          <div className="flex sm:hidden items-center justify-between mt-0.5">
            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1a4a8a] to-[#0e7fc4]">
              {currency} {price.toLocaleString()}
            </p>

            <motion.button
              onClick={handleAddToCart}
              disabled={!inStock}
              aria-label={inStock ? "Add to cart" : "Out of stock"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                inStock
                  ? "bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              animate={cartBurst ? { scale: [1, 1.15, 1] } : {}}
              transition={cartBurst ? { duration: 0.3 } : {}}
              whileTap={inStock ? { scale: 0.92 } : {}}
            >
              <ShoppingCart size={12} />
              {inStock ? "Add" : "Sold Out"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Productitem;