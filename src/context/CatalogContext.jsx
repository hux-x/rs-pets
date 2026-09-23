"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import productService from "@/src/api/services/productService";

const CatalogContext = createContext(undefined);

/**
 * Loads the live product catalog and category list from the WordPress
 * REST API once, and makes them available anywhere in the app via
 * useCatalog(). This replaces the old hard-coded src/assets/assets.js
 * product data.
 */
export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getAllProducts(),
        productService.getCategories(),
      ]);
      setProducts(productsRes?.products || []);
      setCategories(categoriesRes?.categories || []);
    } catch (err) {
      console.error("Failed to load catalog:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getProduct = useCallback(
    (id) => products.find((p) => String(p._id) === String(id)) || null,
    [products]
  );

  const value = useMemo(
    () => ({
      products,
      collections: categories,
      categories,
      loading,
      error,
      getProduct,
      refetch: load,
    }),
    [products, categories, loading, error, getProduct, load]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (ctx === undefined) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return ctx;
}
