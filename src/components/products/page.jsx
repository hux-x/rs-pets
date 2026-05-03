"use client";
import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import {
  MessageCircle, Truck, Ban, Plus, Minus,
  Package, Wallet, ShoppingCart, ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { getProduct, products } from "../../assets/assets";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Fuse from "fuse.js";
import Productitem from "@/src/components/ui/ProductItem";

/* ─── Paw Print SVG ─────────────────────────────────────────────── */
const PawPrint = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <circle cx="8" cy="8" r="3" />
    <circle cx="24" cy="8" r="3" />
    <circle cx="5" cy="15" r="2.5" />
    <circle cx="27" cy="15" r="2.5" />
    <path d="M16 12c-5 0-9 4-7 10 1 3 3 5 7 5s6-2 7-5c2-6-2-10-7-10z" />
  </svg>
);

/* ─── Floating Orb ──────────────────────────────────────────────── */
const Orb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -24, 0], x: [0, 10, 0], scale: [1, 1.07, 1] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

/* ─── Loading Skeleton ──────────────────────────────────────────── */
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white"
    />
  </div>
);

/* ─── Quantity Stepper ──────────────────────────────────────────── */
const QuantityStepper = ({ quantity, onDecrease, onIncrease }) => (
  <div className="inline-flex items-center rounded-xl border-2 border-blue-100 overflow-hidden shadow-sm">
    <motion.button
      onClick={onDecrease}
      className="w-11 h-11 flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
      whileTap={{ scale: 0.88 }}
    >
      <Minus size={16} />
    </motion.button>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={quantity}
        className="w-12 text-center font-bold text-gray-800 text-base tabular-nums"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {quantity}
      </motion.span>
    </AnimatePresence>
    <motion.button
      onClick={onIncrease}
      className="w-11 h-11 flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
      whileTap={{ scale: 0.88 }}
    >
      <Plus size={16} />
    </motion.button>
  </div>
);

/* ─── Info Row ──────────────────────────────────────────────────── */
const InfoRow = ({ icon: Icon, children, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-3 text-sm text-gray-600"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.45 }}
    >
      <span className="mt-0.5 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-blue-600" />
      </span>
      <span className="leading-relaxed pt-1">{children}</span>
    </motion.div>
  );
};

/* ─── Fuse.js singleton ─────────────────────────────────────────── */
const RELATED_FUSE_OPTIONS = {
  keys: [
    { name: "name",        weight: 0.3 },
    { name: "category",    weight: 0.5 },
    { name: "description", weight: 0.2 },
  ],
  threshold: 0.5,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  shouldSort: true,
};

const productFuse = new Fuse(products, RELATED_FUSE_OPTIONS);

/* ─── useRelatedProducts hook ───────────────────────────────────── */
const useRelatedProducts = (productData, limit = 8) => {
  return useMemo(() => {
    if (!productData) return [];
    const queryParts = [];
    if (productData.category) queryParts.push(productData.category);
    const nameWords = productData.name?.split(/\s+/).slice(0, 2).join(" ");
    if (nameWords) queryParts.push(nameWords);
    const query = queryParts.join(" ");
    if (!query.trim()) return [];
    return productFuse
      .search(query)
      .filter((r) => r.item._id !== productData._id)
      .slice(0, limit)
      .map((r) => r.item);
  }, [productData, limit]);
};

/* ─── Animated card wrapper (scroll-triggered) ──────────────────── */
const AnimatedCard = ({ children, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: (index % 4) * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Related Products Section ──────────────────────────────────── */
const RelatedProducts = ({ productData }) => {
  const related = useRelatedProducts(productData, 8);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  if (!related.length) return null;

  return (
    <section className="bg-white border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14">

        {/* Heading */}
        <div ref={headingRef} className="flex items-end justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 inline-block" />
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
                You might also like
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Related Products
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link
              href="/shop"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {related.map((item, index) => (
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

      </div>
    </section>
  );
};

/* ─── Main ProductPage ──────────────────────────────────────────── */
const ProductPage = ({ productId }) => {
  const { currency, addtocart } = useContext(ShopContext);

  const [productData, setProductData]     = useState(null);
  const [loading, setLoading]             = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity]           = useState(1);
  const [cartBurst, setCartBurst]         = useState(false);
  const [imageReady, setImageReady]       = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = getProduct(productId);
        setProductData(response);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <LoadingSkeleton />;

  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex flex-col items-center justify-center gap-4">
        <PawPrint className="w-16 h-16 text-white/30" />
        <p className="text-white/70 text-lg font-medium">Product not found</p>
      </div>
    );
  }

  const isOutOfStock    = !productData.inStock || productData.stock === 0;
  const totalPrice      = productData.price * quantity;
  const images          = Array.isArray(productData.image) ? productData.image : [];
  const categories      = Array.isArray(productData.categories) ? productData.categories : [];
  const primaryCategory = categories.length > 0
    ? (typeof categories[0] === "object" ? categories[0] : null)
    : null;

  const addItems = () => {
    for (let i = 0; i < quantity; i++) addtocart(productData._id, "default");
    setCartBurst(true);
    setTimeout(() => setCartBurst(false), 600);
    toast.success(`${productData.name} added to cart!`);
  };

  const handleWhatsAppRequest = () => {
    const msg = `Hi! I'm interested in this product:\n\nProduct: ${productData.name}\nStatus: Out of stock\n\nPlease notify me when it's available.`;
    window.open(`https://wa.me/923480026454?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleWhatsAppOrder = () => {
    const msg = `Hi! I want to buy this product:\n\nProduct: ${productData.name}\nPrice: ${currency} ${productData.price.toLocaleString()}\nQuantity: ${quantity}\nTotal: ${currency} ${totalPrice.toLocaleString()}\n\nI want to buy this.`;
    window.open(`https://wa.me/923480026454?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <div className="relative bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] pt-10 pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,#60a5fa,transparent_50%),radial-gradient(circle_at_80%_20%,#3b82f6,transparent_50%)] pointer-events-none" />
        <Orb delay={0}   style={{ width: 200, height: 200, top: "-50px",  left: "-50px",  background: "radial-gradient(circle,rgba(96,165,250,.22),transparent 70%)" }} />
        <Orb delay={2.5} style={{ width: 140, height: 140, bottom: "30px", right: "8%",   background: "radial-gradient(circle,rgba(59,130,246,.25),transparent 70%)" }} />

        {[
          { top: "10%", left: "2%",  rotate: -20, size: "w-7 h-7", opacity: "opacity-10" },
          { top: "55%", right: "3%", rotate: 15,  size: "w-5 h-5", opacity: "opacity-10" },
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

        <motion.nav
          className="relative z-10 flex items-center gap-1.5 text-xs text-blue-200/80 mb-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="opacity-50" />
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          {primaryCategory && (
            <>
              <ChevronRight size={12} className="opacity-50" />
              <Link href={`/shop?category=${primaryCategory.slug}`} className="hover:text-white transition-colors">
                {primaryCategory.name}
              </Link>
            </>
          )}
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-white/60 truncate max-w-[180px]">{productData.name}</span>
        </motion.nav>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 sm:h-20 fill-white">
            <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </div>

      {/* ══════════════════ PRODUCT CONTENT ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-20 relative z-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* ── GALLERY ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative bg-white rounded-3xl shadow-[0_24px_64px_rgba(14,127,196,.13)] border border-blue-50 overflow-hidden aspect-square">
              {images.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <Image
                      src={images[selectedImage]}
                      alt={productData.name}
                      fill
                      priority
                      className="object-contain p-6 sm:p-10"
                      onLoad={() => setImageReady(true)}
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <PawPrint className="w-16 h-16 text-blue-100" />
                  <span className="text-blue-200 text-sm">No image available</span>
                </div>
              )}

              <AnimatePresence>
                {isOutOfStock && (
                  <motion.span
                    className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                    initial={{ opacity: 0, scale: 0.8, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    Out of Stock
                  </motion.span>
                )}
              </AnimatePresence>

              {images.length > 1 && (
                <motion.div
                  key={selectedImage}
                  className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedImage + 1} / {images.length}
                </motion.div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                      selectedImage === i
                        ? "border-blue-500 shadow-[0_0_0_3px_rgba(14,127,196,.15)]"
                        : "border-transparent hover:border-blue-200 bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <Image src={img} alt="" fill className="object-contain p-1" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── INFO PANEL ── */}
          <motion.div
            className="space-y-5 pt-4 lg:pt-6"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {categories.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {categories.map((cat, i) => {
                  const catName = typeof cat === "object" ? cat.name : cat;
                  const catSlug = typeof cat === "object" ? cat.slug : cat;
                  return (
                    <Link
                      key={i}
                      href={`/shop?category=${catSlug}`}
                      className="text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 hover:border-blue-300 text-blue-700 rounded-full transition-colors"
                    >
                      {catName}
                    </Link>
                  );
                })}
              </motion.div>
            )}

            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {productData.name}
            </motion.h1>

            <motion.div
              className="flex items-baseline gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a4a8a] to-[#0e7fc4]">
                {currency}{productData.price.toLocaleString()}
              </span>
              {quantity > 1 && (
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={totalPrice}
                    className="text-sm text-gray-400 font-medium"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    × {quantity} = {currency}{totalPrice.toLocaleString()}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44 }}
            >
              <span className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-400" : "bg-emerald-400 animate-pulse"}`} />
              <span className={`text-sm font-semibold ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`}>
                {isOutOfStock
                  ? "Out of Stock"
                  : productData.stock
                    ? `${productData.stock} ${productData.stock === 1 ? "item" : "items"} in stock`
                    : "In Stock"}
              </span>
            </motion.div>

            {productData.description && (
              <motion.p
                className="text-gray-500 leading-relaxed text-sm sm:text-base max-w-lg border-l-2 border-blue-100 pl-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {productData.description}
              </motion.p>
            )}

            <motion.div
              className="space-y-4 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.55 }}
            >
              {!isOutOfStock && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-600">Qty</span>
                  <QuantityStepper
                    quantity={quantity}
                    onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                    onIncrease={() => {
                      if (!productData.stock || quantity < productData.stock) {
                        setQuantity(quantity + 1);
                      } else {
                        toast.warning("Maximum stock reached");
                      }
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 max-w-md">
                {!isOutOfStock ? (
                  <>
                    <motion.button
                      onClick={addItems}
                      className="relative w-full flex items-center justify-center gap-2.5 py-4 bg-white border-2 border-blue-600 text-blue-700 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-colors duration-250 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      animate={cartBurst ? { scale: [1, 1.04, 1] } : {}}
                      transition={cartBurst ? { duration: 0.3 } : {}}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                      <AnimatePresence>
                        {cartBurst && [...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-sky-400 pointer-events-none"
                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            animate={{
                              opacity: 0, scale: 0.5,
                              x: Math.cos((i / 5) * Math.PI * 2) * 32,
                              y: Math.sin((i / 5) * Math.PI * 2) * 32,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.button>

                    <motion.button
                      onClick={handleWhatsAppOrder}
                      className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white font-bold rounded-2xl shadow-[0_6px_24px_rgba(14,127,196,.35)] hover:shadow-[0_8px_32px_rgba(14,127,196,.5)] transition-shadow duration-250"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <MessageCircle size={18} />
                      Order via WhatsApp
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      onClick={handleWhatsAppRequest}
                      className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-[0_6px_24px_rgba(16,185,129,.3)] hover:shadow-[0_8px_32px_rgba(16,185,129,.45)] transition-shadow duration-250"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <MessageCircle size={18} />
                      Request on WhatsApp
                    </motion.button>
                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                      This item is out of stock. Contact us on WhatsApp and we&apos;ll notify you when it&apos;s back.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ DETAILS STRIP ══════════════════ */}
      <section className="bg-gradient-to-br from-[#f0f7ff] to-[#e8f4fd] border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14">
          <motion.h2
            className="text-lg font-bold text-gray-700 mb-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 inline-block" />
            Delivery & Policies
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <InfoRow icon={Truck} delay={0.05}>
              Delivery in <strong>3–7 business days</strong>
            </InfoRow>
            <InfoRow icon={Package} delay={0.12}>
              Shipping: <strong>{currency} 290</strong> for 0–2 kg &nbsp;|&nbsp; +110/kg above
            </InfoRow>
            <InfoRow icon={Wallet} delay={0.19}>
              <strong>Cash on Delivery</strong> available across Pakistan
            </InfoRow>
            <InfoRow icon={Ban} delay={0.26}>
              <strong>No returns</strong> — please review your order carefully
            </InfoRow>
          </div>
        </div>
      </section>

      {/* ══════════════════ RELATED PRODUCTS ══════════════════ */}
      <RelatedProducts productData={productData} />

    </main>
  );
};

export default ProductPage;