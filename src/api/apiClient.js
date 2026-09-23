// src/api/apiClient.js
import axios from "axios";

// This must point at your WordPress site's RSPetsHub Store REST namespace,
// e.g. https://your-wordpress-site.com/wp-json/rspetshub/v1
// Set NEXT_PUBLIC_API_URL in .env.local (see .env.local.example).

const API_BASE_URL = "https://cms.rspetshub.store/wp-json/rspetshub/v1"

if (!API_BASE_URL && typeof window !== "undefined") {
  console.error(
    "NEXT_PUBLIC_API_URL is not set. The storefront can't reach the WordPress API. " +
      "Add it to .env.local, e.g. NEXT_PUBLIC_API_URL=https://your-site.com/wp-json/rspetshub/v1"
  );
}

// Create axios instance with default config.
// The store has no customer accounts, so there is no auth token to attach —
// every request here is either a public read/checkout call, or (for the
// handful of admin-only endpoints, unused by the storefront itself) would
// be authenticated separately via a WordPress Application Password.
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — dev-only logging.
axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log("API Request:", config.method.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("API Response:", response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
        case 409:
          // Validation / stock errors — the calling code shows these to the user.
          break;

        case 404:
          console.error("Not Found:", data?.message);
          break;

        case 429:
          console.error("Rate limited:", data?.message);
          break;

        case 500:
          console.error("Server Error:", data?.message);
          break;

        default:
          console.error("API Error:", data?.message || "Something went wrong");
      }
    } else if (error.request) {
      console.error("Network Error: No response from server");
    } else {
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
