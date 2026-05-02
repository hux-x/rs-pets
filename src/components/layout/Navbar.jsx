"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShopContext } from "@/src/context/ShopContext";
import { assets } from "@/src/assets/assets";
import { X, Search, ShoppingBag, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

/* ─── Nav Link ─────────────────────────────────────────────────── */
const NavLink = ({ href, label, active, onClick }) => (
  <Link href={href} onClick={onClick}>
    <motion.div
      className="relative px-1 py-0.5 cursor-pointer group"
      whileHover="hover"
    >
      <span
        className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
          active ? "text-white" : "text-blue-200 group-hover:text-white"
        }`}
      >
        {label}
      </span>
      {/* Active pill */}
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-white"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {/* Hover underline (non-active) */}
      {!active && (
        <motion.span
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-blue-300 origin-left"
          initial={{ scaleX: 0 }}
          variants={{ hover: { scaleX: 1 } }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  </Link>
);

/* ─── Navbar ───────────────────────────────────────────────────── */
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { setshowsearch, getcartcount } = useContext(ShopContext);

  useEffect(() => { setMounted(true); }, []);

  /* Scroll detection for glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Click outside to close mobile menu */
  useEffect(() => {
    const handler = (e) => {
      if (visible && !e.target.closest(".mobile-menu") && !e.target.closest(".menu-toggle")) {
        setVisible(false);
      }
    };
    if (visible) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [visible]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [visible]);

  /* Search */
  const handleSearchClose = () => { setSearchVisible(false); setSearchQuery(""); };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      handleSearchClose();
    }
  };
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && searchVisible) handleSearchClose(); };
    if (searchVisible) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchVisible]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* ── Main Nav ── */}
      <motion.nav
        className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-10 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#0f2d5e]/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,.25)] border-b border-white/10"
            : "py-4 bg-gradient-to-r from-[#0f2d5e] via-[#1a4a8a] to-[#1558a8]"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.06, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 blur-md group-hover:bg-white/30 transition-all duration-300" />
            <Image
              src={assets.logo}
              alt="RSPetsHub Logo"
              className="relative w-10 sm:w-12 rounded-full border-2 border-white/30 shadow-lg"
            />
          </motion.div>
          <motion.span
            className="hidden sm:block text-white font-bold text-lg tracking-tight"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            RS<span className="text-sky-300">Pets</span>Hub
          </motion.span>
        </Link>

        {/* Desktop Links */}
        {mounted && (
          <ul className="hidden sm:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.name}
                active={pathname === link.href}
              />
            ))}
          </ul>
        )}

        {/* Right Icons */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search button */}
          <motion.button
            onClick={() => setSearchVisible(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-xs text-blue-200">Search…</span>
          </motion.button>

          {/* Cart */}
          {mounted && (
            <Link href="/cart">
              <motion.div
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {getcartcount() > 0 && (
                    <motion.span
                      key="badge"
                      className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-sky-400 rounded-full border-2 border-[#0f2d5e] shadow"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {getcartcount()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )}

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setVisible(true)}
            className="flex sm:hidden items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white menu-toggle"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Search Modal ── */}
      <AnimatePresence>
        {searchVisible && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#0f2d5e]/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSearchClose}
            />
            <motion.div
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,.3)] z-50 overflow-hidden"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              {/* Modal header strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1a4a8a] via-sky-400 to-[#1a4a8a]" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-gray-800 tracking-tight">Find Products</h2>
                  </div>
                  <motion.button
                    onClick={handleSearchClose}
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search pet food, toys, accessories…"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all"
                      autoFocus
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#1a4a8a] to-[#1558a8] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Search Products
                  </motion.button>
                </form>

                {/* Quick tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Dog Food", "Cat Toys", "Pet Grooming", "Accessories"].map((tag) => (
                    <motion.button
                      key={tag}
                      type="button"
                      onClick={() => { setSearchQuery(tag); }}
                      className="px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-full font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile Backdrop ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 bg-[#0f2d5e]/60 backdrop-blur-sm z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="mobile-menu fixed top-0 right-0 h-full w-72 z-50 sm:hidden overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            {/* Drawer background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f2d5e] to-[#0a1f42]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,.15),transparent_60%)]" />

            <div className="relative flex flex-col h-full">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-sky-300" />
                  <span className="text-white font-bold tracking-tight">
                    RS<span className="text-sky-300">Pets</span>Hub
                  </span>
                </div>
                <motion.button
                  onClick={() => setVisible(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col gap-1 px-4 py-6">
                {mounted && links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.35 }}
                  >
                    <Link href={link.href} onClick={() => setVisible(false)}>
                      <div
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors duration-200 ${
                          pathname === link.href
                            ? "bg-white/15 text-white"
                            : "text-blue-200 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {pathname === link.href && (
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                        )}
                        <span className="font-medium">{link.name}</span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom CTA */}
              <div className="mt-auto px-6 pb-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link href="/shop" onClick={() => setVisible(false)}>
                    <div className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-blue-800 font-bold rounded-xl hover:shadow-lg transition-all">
                      <ShoppingBag className="w-4 h-4" />
                      Shop Now
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;