// ExploreContent.jsx - Using local data from assets with enhanced search
"use client";
import React, { useState, useMemo, useCallback, Suspense } from "react";
import Productitem from "@/src/components/ui/ProductItem";
import ProductFilters from "@/src/components/explore/filters";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { products, collections } from "@/src/assets/assets";

const ExploreContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Derive categories directly - no need for state
  const categories = useMemo(() => {
    return collections.map(col => ({
      _id: col.slug,
      name: col.name,
      slug: col.slug
    }));
  }, []);

  // Derive filters from URL params
  const filters = useMemo(() => ({
    category: searchParams.get("category") ? searchParams.get("category").split(",") : [],
    search: searchParams.get("search") || null,
    sortBy: searchParams.get("sortBy") || "latest",
    minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : null,
    maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : null,
  }), [searchParams]);

  const currentPage = useMemo(() => parseInt(searchParams.get("page")) || 1, [searchParams]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Enhanced search with keyword matching and scoring
  const searchProducts = useCallback((products, searchTerm) => {
    if (!searchTerm) return products;

    const searchLower = searchTerm.toLowerCase().trim();
    const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);

    return products.map(product => {
      let score = 0;
      const nameLower = product.name.toLowerCase();
      const descLower = product.description.toLowerCase();
      const categoryLower = product.category.toLowerCase();

      // Exact phrase match (highest priority)
      if (nameLower.includes(searchLower)) score += 100;
      if (descLower.includes(searchLower)) score += 50;
      if (categoryLower.includes(searchLower)) score += 30;

      // Individual word matches
      searchWords.forEach(word => {
        // Name matches (high priority)
        if (nameLower.includes(word)) score += 20;
        if (nameLower.startsWith(word)) score += 10;
        
        // Description matches
        if (descLower.includes(word)) score += 5;
        
        // Category matches
        if (categoryLower.includes(word)) score += 15;
      });

      // Partial word matching (fuzzy matching)
      searchWords.forEach(word => {
        if (word.length >= 3) {
          const nameWords = nameLower.split(/\s+/);
          const descWords = descLower.split(/\s+/);
          
          nameWords.forEach(nameWord => {
            if (nameWord.startsWith(word) || word.startsWith(nameWord)) score += 8;
          });
          
          descWords.forEach(descWord => {
            if (descWord.startsWith(word) || word.startsWith(descWord)) score += 3;
          });
        }
      });

      return { ...product, searchScore: score };
    })
    .filter(product => product.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
  }, []);

  // Filter and paginate products - derived state using useMemo
  const { filteredProducts, pagination } = useMemo(() => {
    let filtered = [...products];

    // Apply enhanced search filter
    if (filters.search) {
      filtered = searchProducts(filtered, filters.search);
    }

    // Apply category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(product =>
        filters.category.includes(product.category)
      );
    }

    // Apply price filters
    if (filters.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }

    // Apply sorting (only if not searching, as search has its own relevance sorting)
    if (!filters.search) {
      switch (filters.sortBy) {
        case "high to low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "low to high":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "latest":
        default:
          // Keep original order for "latest"
          break;
      }
    } else {
      // When searching, optionally apply secondary sort by price
      if (filters.sortBy === "high to low") {
        filtered.sort((a, b) => {
          if (a.searchScore === b.searchScore) return b.price - a.price;
          return b.searchScore - a.searchScore;
        });
      } else if (filters.sortBy === "low to high") {
        filtered.sort((a, b) => {
          if (a.searchScore === b.searchScore) return a.price - b.price;
          return b.searchScore - a.searchScore;
        });
      }
    }

    // Calculate pagination
    const productsPerPage = 12;
    const totalProducts = filtered.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    return {
      filteredProducts: paginatedProducts,
      pagination: {
        currentPage,
        totalPages,
        totalProducts,
        productsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      }
    };
  }, [filters, currentPage, searchProducts]);

  const updateURL = useCallback((newFilters, newPage) => {
    const params = new URLSearchParams();

    if (newFilters.category && newFilters.category.length > 0) {
      params.set("category", newFilters.category.join(","));
    }
    if (newFilters.search) {
      params.set("search", newFilters.search);
    }
    if (newFilters.sortBy && newFilters.sortBy !== "latest") {
      params.set("sortBy", newFilters.sortBy);
    }
    if (newFilters.minPrice !== null) {
      params.set("minPrice", newFilters.minPrice.toString());
    }
    if (newFilters.maxPrice !== null) {
      params.set("maxPrice", newFilters.maxPrice.toString());
    }
    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.replace(newUrl, { scroll: false });
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
    const maxVisible = 5;
    const totalPages = pagination.totalPages;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      }
    }

    return range;
  }, [currentPage, pagination.totalPages]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            categories={categories}
            categoriesLoading={false}
          />

          <div className="flex-1 min-w-0">
            {filters.search && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <span className="text-gray-600">Searching for:</span>
                <span className="font-semibold text-black bg-gray-100 px-3 py-1 rounded-full">
                  &quot;{filters.search}&quot;
                </span>
                <button
                  onClick={() => handleFiltersChange({ ...filters, search: null })}
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              <p className="text-sm text-gray-600">
                {`${pagination.totalProducts} Product${pagination.totalProducts !== 1 ? 's' : ''} Found`}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 mb-8">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((item) => (
                    <Productitem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      images={item.image}  
                      inStock={item.inStock}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-2">No products found</p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center">
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-white border rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPaginationRange().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-2 text-gray-400">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`
                            min-w-[36px] h-9 px-3 rounded text-sm font-medium transition-colors
                            ${
                              currentPage === page
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with Suspense
const Explore = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
};

export default Explore;