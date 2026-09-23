// src/services/orderService.js
import axiosInstance from "../apiClient";

const orderService = {
  /**
   * Create a new order (guest checkout — no account required)
   * @param {Object} orderData - Order information
   * @param {Array} orderData.products - Array of products [{product: id, quantity: number}]
   * @param {Object} orderData.customer - {name, email, phone, address, city, postalCode}
   * @param {Object} orderData.payment - {provider: 'cod' | 'bank_transfer'}
   * @param {string} [orderData.notes] - Optional note for the store owner
   * @returns {Promise} The created order, including its orderNumber
   */
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Track an order's status by its order number (public, no account needed)
   * @param {string} orderNumber - e.g. "RSP-20260922-0007"
   * @returns {Promise} Order status summary
   */
  trackOrderByNumber: async (orderNumber) => {
    try {
      const response = await axiosInstance.get(
        `/orders/track/${encodeURIComponent(orderNumber)}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get all orders with filters (Admin only — requires an authenticated
   * WordPress session/Application Password; not used by the storefront)
   * @param {Object} filters - {status, page, limit}
   * @returns {Promise} API response with orders and pagination
   */
  getAllOrders: async (filters = {}) => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;

      const response = await axiosInstance.get("/orders", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get single order by ID (Admin only)
   * @param {string|number} id - Order ID
   * @returns {Promise} API response with order details
   */
  getOrderById: async (id) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update order status (Admin only)
   * @param {string|number} id - Order ID
   * @param {string} status - 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
   * @returns {Promise} API response with updated order
   */
  updateOrderStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default orderService;
