// ExploreContent.jsx - Hero-themed with animations
"use client";
import React, { useState, useMemo, useCallback, Suspense, useRef } from "react";
import Fuse from "fuse.js";
import Productitem from "@/src/components/ui/ProductItem";
import ProductFilters from "@/src/components/explore/filters";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { products, collections } from "@/src/assets/assets";
import { motion, AnimatePresence, useInView } from "framer-motion";

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

/* ─── Floating Orb (matches Hero) ──────────────────────────────── */
const Orb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -24, 0], x: [0, 10, 0], scale: [1, 1.07, 1] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

/* ─── Animated Card Wrapper ─────────────────────────────────────── */
const AnimatedCard = ({ children, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: (index % 4) * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Fuse.js config ────────────────────────────────────────────── */
const FUSE_OPTIONS = {
  keys: [
    { name: "name",        weight: 0.5 },
    { name: "category",    weight: 0.3 },
    { name: "description", weight: 0.2 },
  ],
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  shouldSort: true,
};

/* ─── Page Header ───────────────────────────────────────────────── */
const ExploreHeader = ({ totalProducts }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] px-4 sm:px-6 lg:px-8 pt-16 pb-24"
    >
      {/* mesh */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,#60a5fa,transparent_50%),radial-gradient(circle_at_80%_20%,#3b82f6,transparent_50%)] pointer-events-none" />
      <Orb delay={0}   style={{ width: 240, height: 240, top: "-60px",  left: "-60px",  background: "radial-gradient(circle,rgba(96,165,250,.22),transparent 70%)" }} />
      <Orb delay={2.5} style={{ width: 160, height: 160, bottom: "0px", right:  "10%",  background: "radial-gradient(circle,rgba(59,130,246,.25),transparent 70%)" }} />

      {/* Decorative paw prints */}
      {[
        { top: "10%", left: "3%",  rotate: -20, size: "w-8 h-8",  opacity: "opacity-10" },
        { top: "60%", right: "4%", rotate: 15,  size: "w-6 h-6",  opacity: "opacity-10" },
        { bottom: "10%", left: "40%", rotate: -5, size: "w-5 h-5", opacity: "opacity-5" },
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

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5"
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <PawPrint className="w-4 h-4 text-sky-300" />
          <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">
            Pet Store
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Explore{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
              Everything
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-sky-400 to-blue-300 rounded-full"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 text-blue-100/80 text-sm sm:text-base max-w-md mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {totalProducts.toLocaleString()} products for your furry, feathered & finned friends
        </motion.p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 sm:h-20 fill-white">
          <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </div>
  );
};

/* ─── Search Pill ───────────────────────────────────────────────── */
const SearchPill = ({ query, onClear }) => (
  <motion.div
    className="mb-5 flex items-center gap-2.5"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Search size={14} className="text-blue-400 shrink-0" />
    <span className="text-sm text-gray-500">Results for</span>
    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a4a8a]/10 to-[#0e7fc4]/10 border border-blue-200 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
      &quot;{query}&quot;
      <button
        onClick={onClear}
        className="text-blue-400 hover:text-blue-700 transition-colors"
        aria-label="Clear search"
      >
        <X size={13} />
      </button>
    </span>
  </motion.div>
);

/* ─── Pagination ────────────────────────────────────────────────── */
const Pagination = ({ pagination, currentPage, onPageChange, getPaginationRange }) => (
  <motion.div
    className="flex justify-center mt-10"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <div className="inline-flex items-center gap-1 bg-white border border-blue-100 rounded-2xl p-1.5 shadow-[0_4px_24px_rgba(14,127,196,.1)]">
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!pagination.hasPrevPage}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        whileHover={pagination.hasPrevPage ? { scale: 1.08 } : {}}
        whileTap={pagination.hasPrevPage ? { scale: 0.92 } : {}}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {getPaginationRange().map((page, i) => (
        <React.Fragment key={i}>
          {page === "..." ? (
            <span className="px-2 text-gray-400 text-sm select-none">…</span>
          ) : (
            <motion.button
              onClick={() => onPageChange(page)}
              className={`min-w-[36px] h-9 px-3 rounded-xl text-sm font-semibold transition-colors ${
                currentPage === page
                  ? "bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
              whileHover={{ scale: currentPage === page ? 1 : 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              {page}
            </motion.button>
          )}
        </React.Fragment>
      ))}

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!pagination.hasNextPage}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        whileHover={pagination.hasNextPage ? { scale: 1.08 } : {}}
        whileTap={pagination.hasNextPage ? { scale: 0.92 } : {}}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  </motion.div>
);

/* ─── Empty State ───────────────────────────────────────────────── */
const EmptyState = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-24 text-center"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <PawPrint className="w-16 h-16 text-blue-200 mx-auto mb-4" />
    </motion.div>
    <p className="text-gray-700 text-lg font-semibold mb-1">No products found</p>
    <p className="text-gray-400 text-sm max-w-xs">
      Try adjusting your filters or search terms — we have something for every pet!
    </p>
  </motion.div>
);

/* ─── Main ExploreContent ───────────────────────────────────────── */
const ExploreContent = () => {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const pathname      = usePathname();

  const categories = useMemo(() =>
    collections.map((col) => ({ _id: col.slug, name: col.name, slug: col.slug })),
  []);

  const fuse = useMemo(() => new Fuse(products, FUSE_OPTIONS), []);

  const filters = useMemo(() => ({
    category: searchParams.get("category") ? searchParams.get("category").split(",") : [],
    search:   searchParams.get("search") || null,
    sortBy:   searchParams.get("sortBy") || "latest",
    minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : null,
    maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : null,
  }), [searchParams]);

  const currentPage = useMemo(() => parseInt(searchParams.get("page")) || 1, [searchParams]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { filteredProducts, pagination, totalUnpaginated } = useMemo(() => {
    let filtered;
    if (filters.search && filters.search.trim().length > 0) {
      filtered = fuse.search(filters.search.trim()).map((r) => r.item);
    } else {
      filtered = [...products];
    }
    if (filters.category.length > 0)
      filtered = filtered.filter((p) => filters.category.includes(p.category));
    if (filters.minPrice !== null)
      filtered = filtered.filter((p) => p.price >= filters.minPrice);
    if (filters.maxPrice !== null)
      filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    if (filters.sortBy === "high to low")
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (filters.sortBy === "low to high")
      filtered = [...filtered].sort((a, b) => a.price - b.price);

    const productsPerPage   = 12;
    const totalProducts     = filtered.length;
    const totalPages        = Math.ceil(totalProducts / productsPerPage);
    const startIndex        = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filtered.slice(startIndex, startIndex + productsPerPage);

    return {
      filteredProducts: paginatedProducts,
      totalUnpaginated: totalProducts,
      pagination: {
        currentPage, totalPages, totalProducts,
        productsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    };
  }, [filters, currentPage, fuse]);

  const updateURL = useCallback((newFilters, newPage) => {
    const params = new URLSearchParams();
    if (newFilters.category?.length > 0) params.set("category", newFilters.category.join(","));
    if (newFilters.search)               params.set("search",   newFilters.search);
    if (newFilters.sortBy && newFilters.sortBy !== "latest") params.set("sortBy", newFilters.sortBy);
    if (newFilters.minPrice !== null)    params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice !== null)    params.set("maxPrice", newFilters.maxPrice.toString());
    if (newPage > 1)                     params.set("page",     newPage.toString());
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router]);

  const handlePageChange = useCallback((page) => {
    if (page < 1 || page > pagination.totalPages) return;
    updateURL(filters, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters, pagination.totalPages, updateURL]);

  const handleFiltersChange = useCallback((newFilters) => {
    updateURL(newFilters, 1);
  }, [updateURL]);

  const getPaginationRange = useCallback(() => {
    const range = [];
    const { totalPages } = pagination;
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else if (currentPage <= 3) {
      range.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      range.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return range;
  }, [currentPage, pagination]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero header ── */}
      <ExploreHeader totalProducts={products.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6 relative z-10">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            categories={categories}
            categoriesLoading={false}
          />

          <div className="flex-1 min-w-0">
            {/* Search pill */}
            <AnimatePresence>
              {filters.search && (
                <SearchPill
                  query={filters.search}
                  onClear={() => handleFiltersChange({ ...filters, search: null })}
                />
              )}
            </AnimatePresence>

            {/* Toolbar */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mobile filter toggle */}
              <motion.button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-blue-100 rounded-xl shadow-sm hover:border-blue-300 transition-colors text-sm font-medium text-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <SlidersHorizontal size={15} className="text-blue-500" />
                Filters
              </motion.button>

              {/* Result count badge */}
              <motion.div
                className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-4 py-2 shadow-sm"
                key={totalUnpaginated}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-700">
                  {totalUnpaginated.toLocaleString()}{" "}
                  <span className="font-normal text-gray-400">
                    product{totalUnpaginated !== 1 ? "s" : ""}
                  </span>
                </span>
              </motion.div>
            </motion.div>

            {/* Product grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={`${filters.search}-${filters.category.join()}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                >
                  {filteredProducts.map((item, index) => (
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
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                getPaginationRange={getPaginationRange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Suspense wrapper ──────────────────────────────────────────── */
const Explore = () => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white"
        />
      </div>
    }
  >
    <ExploreContent />
  </Suspense>
);

export default Explore;