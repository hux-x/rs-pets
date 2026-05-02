"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Title from "@/src/components/ui/Title";
import Totalcartvalue from "@/src/components/cart/CartTotalValue";
import { Trash, Plus, Minus, ShoppingBag, MessageCircle, ArrowLeft } from "lucide-react";
import { getProduct } from "../../src/assets/assets";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

/* ─── Paw Print SVG (matches Hero) ─────────────────────────────── */
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

/* ─── Loading State ─────────────────────────────────────────────── */
const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white"
    />
  </div>
);

/* ─── Empty State ───────────────────────────────────────────────── */
const EmptyCart = ({ goToPage }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero banner */}
    <CartHeroBanner itemCount={0} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-12 relative z-10 pb-24">
      <motion.div
        className="bg-white rounded-3xl shadow-[0_16px_48px_rgba(14,127,196,.1)] border border-blue-50 flex flex-col items-center justify-center py-24 px-8 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShoppingBag size={56} className="text-blue-100 mx-auto mb-5" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">
          Looks like your furry friends are waiting — add something to get started!
        </p>
        <motion.button
          onClick={() => goToPage("/shop")}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white font-bold rounded-2xl shadow-[0_6px_24px_rgba(14,127,196,.35)]"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  </div>
);

/* ─── Hero Banner ───────────────────────────────────────────────── */
const CartHeroBanner = ({ itemCount }) => (
  <div className="relative bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] pt-10 pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,#60a5fa,transparent_50%),radial-gradient(circle_at_80%_20%,#3b82f6,transparent_50%)] pointer-events-none" />
    <Orb delay={0}   style={{ width: 200, height: 200, top: "-50px",  left: "-50px",  background: "radial-gradient(circle,rgba(96,165,250,.22),transparent 70%)" }} />
    <Orb delay={2.5} style={{ width: 140, height: 140, bottom: "20px", right: "8%",   background: "radial-gradient(circle,rgba(59,130,246,.25),transparent 70%)" }} />

    {[
      { top: "10%", left: "2%",  rotate: -20, size: "w-7 h-7", opacity: "opacity-10" },
      { top: "60%", right: "3%", rotate: 15,  size: "w-5 h-5", opacity: "opacity-10" },
    ].map((p, i) => (
      <motion.div key={i} className={`absolute text-white ${p.size} ${p.opacity} pointer-events-none`}
        style={{ ...p }}
        animate={{ rotate: [p.rotate, p.rotate + 10, p.rotate] }}
        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}>
        <PawPrint className="w-full h-full" />
      </motion.div>
    ))}

    <div className="relative z-10 max-w-7xl mx-auto">
      <motion.div
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShoppingBag size={14} className="text-sky-300" />
        <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">Your Cart</span>
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-white leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        My{" "}
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
            Bag
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-sky-400 to-blue-300 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </span>
      </motion.h1>

      {itemCount > 0 && (
        <motion.p
          className="mt-3 text-blue-100/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {itemCount} {itemCount === 1 ? "item" : "items"} ready for checkout
        </motion.p>
      )}
    </div>

    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 sm:h-20 fill-white">
        <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
      </svg>
    </div>
  </div>
);

/* ─── Quantity Stepper ──────────────────────────────────────────── */
const QuantityStepper = ({ quantity, onDecrease, onIncrease, disabled }) => (
  <div className="inline-flex items-center rounded-xl border-2 border-blue-100 overflow-hidden bg-white shadow-sm">
    <motion.button
      onClick={onDecrease}
      className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
      whileTap={{ scale: 0.85 }}
      aria-label="Decrease"
    >
      <Minus size={13} />
    </motion.button>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={quantity}
        className="w-10 text-center text-sm font-bold text-gray-800 tabular-nums"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        {quantity}
      </motion.span>
    </AnimatePresence>
    <motion.button
      onClick={onIncrease}
      disabled={disabled}
      className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      whileTap={!disabled ? { scale: 0.85 } : {}}
      aria-label="Increase"
    >
      <Plus size={13} />
    </motion.button>
  </div>
);

/* ─── Cart Item Row ─────────────────────────────────────────────── */
const CartRow = ({ item, productdata, currency, onQuantityChange, onRemove, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [removing, setRemoving] = useState(false);

  const imageSrc = (() => {
    if (Array.isArray(productdata.image)) {
      return typeof productdata.image[0] === "string"
        ? productdata.image[0]
        : productdata.image[0]?.src || "";
    }
    return productdata.image || "";
  })();

  const isOutOfStock = !productdata.inStock || (productdata.stock && item.quantity > productdata.stock);
  const itemTotal = productdata.price * item.quantity;

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.productId, item.size), 320);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, x: -40, scale: 0.95, transition: { duration: 0.3 } }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-[0_8px_32px_rgba(14,127,196,.1)] transition-shadow duration-300 p-4 sm:p-5 ${isOutOfStock ? "opacity-60" : ""} ${removing ? "pointer-events-none" : ""}`}
    >
      {isOutOfStock && (
        <motion.div
          className="mb-3 flex items-center gap-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
            {!productdata.inStock ? "Out of Stock" : `Only ${productdata.stock} available`}
          </span>
        </motion.div>
      )}

      <div className="flex gap-4 items-center">
        {/* Image */}
        <motion.div
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 flex-shrink-0 border border-blue-100"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.25 }}
        >
          <img
            src={imageSrc}
            alt={productdata.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{productdata.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 mb-2">Size: {item.size}</p>

          <div className="flex items-center flex-wrap gap-3">
            <QuantityStepper
              quantity={item.quantity}
              onDecrease={() => onQuantityChange(item.productId, item.size, item.quantity - 1)}
              onIncrease={() => onQuantityChange(item.productId, item.size, item.quantity + 1)}
              disabled={productdata.stock && item.quantity >= productdata.stock}
            />

            {/* Price */}
            <div className="ml-auto text-right">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={itemTotal}
                  className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a4a8a] to-[#0e7fc4] text-base sm:text-lg"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currency}{itemTotal.toLocaleString()}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-gray-400">{currency}{productdata.price.toLocaleString()} each</p>
            </div>
          </div>
        </div>

        {/* Remove button */}
        <motion.button
          onClick={handleRemove}
          className="self-start ml-1 w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          aria-label="Remove item"
        >
          <Trash size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ─── Missing Product Row ───────────────────────────────────────── */
const MissingProductRow = ({ item, onRemove }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center justify-between"
  >
    <p className="text-red-500 text-sm font-medium">Product no longer available</p>
    <button
      onClick={() => onRemove(item.productId, item.size)}
      className="text-red-400 text-xs underline hover:text-red-600 transition-colors"
    >
      Remove
    </button>
  </motion.div>
);

/* ─── Main Cart ─────────────────────────────────────────────────── */
const Cart = () => {
  const { currency, cartitems, updatequantity, goToPage, deliveryFee } = useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartitems.length === 0) { setLoading(false); return; }
      try {
        setLoading(true);
        setError(null);
        const productIds = [...new Set(cartitems.map((i) => i.productId))];
        const prods = productIds.map((id) => getProduct(id)).filter(Boolean);
        setCartProducts(prods);
      } catch (err) {
        console.error(err);
        setError("Failed to load cart products");
      } finally {
        setLoading(false);
      }
    };
    fetchCartProducts();
  }, [cartitems]);

  const handleQuantityChange = (productId, size, newQty) => {
    if (newQty >= 1) updatequantity(productId, size, newQty);
  };

  const handleRemove = (productId, size) => updatequantity(productId, size, 0);

  const handleWhatsAppCheckout = () => {
    let subtotal = 0;
    const itemsList = cartitems.map((item) => {
      const product = cartProducts.find((p) => p._id === item.productId);
      if (!product) return null;
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      return `• ${product.name}\n  Size: ${item.size}\n  Qty: ${item.quantity}\n  Price: ${currency} ${product.price.toLocaleString()}\n  Subtotal: ${currency} ${itemTotal.toLocaleString()}`;
    }).filter(Boolean);

    const total = subtotal + (deliveryFee || 0);
    const message = `Hi! I want to place an order:\n\n📦 ORDER DETAILS\n${itemsList.join("\n\n")}\n\n💰 PRICE BREAKDOWN\nSubtotal: ${currency} ${subtotal.toLocaleString()}\nDelivery Fee: ${currency} ${(deliveryFee || 0).toLocaleString()}\n━━━━━━━━━━━━━━━\nTotal: ${currency} ${total.toLocaleString()}\n\nPlease confirm my order. Thank you!`;
    window.open(`https://wa.me/923424136198?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) return <LoadingState />;
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex flex-col items-center justify-center gap-4">
      <PawPrint className="w-14 h-14 text-white/30" />
      <p className="text-white/70 text-base font-medium">{error}</p>
      <motion.button onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-white text-blue-700 font-bold rounded-xl text-sm"
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        Retry
      </motion.button>
    </div>
  );
  if (cartitems.length === 0) return <EmptyCart goToPage={goToPage} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeroBanner itemCount={cartitems.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-14 relative z-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Item list ── */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cartitems.map((item, index) => {
                const productdata = cartProducts.find((p) => p._id === item.productId);
                if (!productdata) return (
                  <MissingProductRow key={`${item.productId}-${item.size}`} item={item} onRemove={handleRemove} />
                );
                return (
                  <CartRow
                    key={`${item.productId}-${item.size}`}
                    index={index}
                    item={item}
                    productdata={productdata}
                    currency={currency}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                );
              })}
            </AnimatePresence>

            {/* Continue shopping link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => goToPage("/shop")}
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors mt-2"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </button>
            </motion.div>
          </div>

          {/* ── Summary panel ── */}
          <motion.div
            className="lg:sticky lg:top-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_16px_48px_rgba(14,127,196,.1)] overflow-hidden">
              {/* Panel header */}
              <div className="bg-gradient-to-br from-[#0f2d5e] to-[#1a4a8a] px-6 py-5">
                <h2 className="text-white font-bold text-lg">Order Summary</h2>
                <p className="text-blue-200/70 text-xs mt-0.5">{cartitems.length} {cartitems.length === 1 ? "item" : "items"}</p>
              </div>

              <div className="p-6">
                <Totalcartvalue cartProducts={cartProducts} />

                {/* Checkout button */}
                <motion.button
                  onClick={handleWhatsAppCheckout}
                  className="mt-6 w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white font-bold rounded-2xl shadow-[0_6px_24px_rgba(14,127,196,.35)] hover:shadow-[0_8px_32px_rgba(14,127,196,.5)] transition-shadow duration-250 text-sm"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle size={18} />
                  Checkout via WhatsApp
                </motion.button>

                <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
                  You'll be redirected to WhatsApp to confirm your order
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Cart;