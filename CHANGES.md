# Frontend Changes — WordPress Integration

This document lists every file that was changed or added to connect the
storefront to the new **RSPetsHub Store** WordPress plugin, and what was
deliberately left untouched.

## Setup

1. Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`
   to your WordPress site's REST API base (shown on the plugin's
   Dashboard page), e.g.:
   ```
   NEXT_PUBLIC_API_URL=https://your-wordpress-site.com/wp-json/rspetshub/v1
   ```
2. In the WordPress plugin's Settings, add this frontend's URL(s) to
   **Allowed frontend origin(s)** (CORS) — otherwise the browser will
   block the requests.

## ⚠️ Important: removed static export

`next.config.ts` had `output: 'export'` (pure static site generation).
**This was removed.** With a live WordPress backend, the site needs to
render product pages per-request (or via ISR) instead of freezing
everything at build time — otherwise a product added in wp-admin would
never show up on the live site until someone manually rebuilds and
redeploys the frontend. Deploy this to a platform that runs Next.js as a
server (Vercel, Node, etc.), not pure static hosting.

## Files changed

| File | What changed |
|---|---|
| `src/api/apiClient.js` | Removed dead account/token logic (this store has no accounts) and a debug `console.log` that leaked `process.env.API_KEY`. Cleaner error handling. |
| `src/api/services/productService.js` | One-character fix: `/category/` → `/category` to match the plugin's route exactly. |
| `src/api/services/orderService.js` | Rewritten. Removed PayFast/OTP methods (not used — the plugin only supports Cash on Delivery / Bank Transfer with no account/OTP flow). Added `trackOrderByNumber()` for the new public order-tracking endpoint. |
| `src/context/CatalogContext.jsx` | **New.** Fetches the live product & category list from the WordPress API once and shares it app-wide via `useCatalog()`. Replaces the old hard-coded `src/assets/assets.js` product data. |
| `app/layout.tsx` | Wraps the app in `<CatalogProvider>`. |
| `src/components/explore/page.jsx` | Shop/search page now sources products & categories from `useCatalog()` instead of the static import. Fuse.js search index is now built at runtime from live data. |
| `src/components/products/page.jsx` | Product detail page fetches the product from the real API (`productService.getProductById`) instead of a synchronous local lookup. "Related products" now searches the live catalog (via `useCatalog()`) instead of a stale module-scope index. |
| `app/product/[productId]/page.jsx` | Server component (SEO metadata / JSON-LD) now fetches from the API. Fails soft (returns `[]`/`null`) if the API is unreachable at build time, so a build never crashes because of it. |
| `app/cart/page.jsx` | Cart line items are now looked up via `useCatalog()` instead of the static file. Checkout button now goes to the new `/checkout` page; the WhatsApp option is kept as a secondary link. |
| `app/checkout/page.jsx` | **New.** Guest checkout form (name/email/phone/address/city/postal code + note), submits the order to the WordPress API, then redirects to the confirmation page. |
| `app/order-confirmation/page.jsx` | **New.** Shows the order number after checkout, with a link to track it. |
| `app/track-order/page.jsx` | **New.** Public order lookup by order number, with a status timeline. |
| `src/components/layout/Navbar.jsx` | Added a "Track Order" nav link. |
| `src/components/Home/Latest.jsx` | Homepage "Latest Products" section now pulls from `/products/latest` instead of the static array. |
| `next.config.ts` | Removed `output: 'export'` (see above). |
| `.env.local.example` | **New.** Template for `NEXT_PUBLIC_API_URL`. |

## Deliberately left on static/local data

- **`src/assets/assets.js`** itself is untouched and still exists — it's
  now only used for decorative/local content (icons, category hero
  images) rather than the live product catalog.
- **`src/components/category/content.jsx`** and
  **`src/components/Home/ShopByCollection.jsx`** still use the static
  `collections` array for category *hero images and description copy*.
  This is intentional — that's cosmetic content, not the live product
  list (the actual products shown on a category page come from the live
  API via the `Explore` component). If you'd rather manage those images
  from wp-admin too, the plugin's `/category` endpoint already returns
  an `image` field (via a category's featured image, settable in
  wp-admin) — wiring that in is a small follow-up.
- **`app/shop/[category]/page.jsx`** still reads the static `collections`
  array for its per-category SEO metadata (title/description) and a
  product-count figure used only in that meta description. The actual
  product grid on the page is fully live (via `CategoryContent` →
  `Explore` → `useCatalog()`).
- **`src/components/Home/Deals.jsx`** was left as-is. It filters for a
  `"deals"` category that doesn't exist among the real 9 categories, so
  it already rendered nothing in the original site — switching its data
  source wouldn't change its behavior.

## Testing performed

- `npm run build` succeeds cleanly (TypeScript, all routes, sitemap).
- `npx eslint` on every new/changed file — zero errors (a few
  pre-existing warnings unrelated to these changes).
- Verified no leftover references to the old static product data in any
  changed file.
