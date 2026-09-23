"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import { useCatalog } from "@/src/context/CatalogContext";
import orderService from "@/src/api/services/orderService";
import Link from "next/link";
import { ArrowLeft, Loader2, ShieldCheck, Truck } from "lucide-react";
import { toast } from "react-toastify";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

export default function CheckoutPage() {
  const { currency, cartitems, goToPage, clearcart } = useContext(ShopContext);
  const { getProduct, loading: catalogLoading } = useCatalog();

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!catalogLoading && cartitems.length === 0) {
      goToPage("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartitems.length, catalogLoading]);

  const cartProducts = useMemo(
    () => cartitems.map((item) => ({ item, product: getProduct(item.productId) })),
    [cartitems, getProduct]
  );

  const subtotal = useMemo(
    () =>
      cartProducts.reduce(
        (sum, { item, product }) => (product ? sum + product.price * item.quantity : sum),
        0
      ),
    [cartProducts]
  );

  const deliveryFee = cartitems.length > 0 ? 190 + 50 * (cartitems.length - 1) : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const payload = {
      products: cartitems.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
      },
      payment: { provider: "cod" },
      notes: form.notes.trim(),
    };

    setSubmitting(true);
    try {
      const order = await orderService.createOrder(payload);
      clearcart();
      goToPage(`/order-confirmation?orderNumber=${encodeURIComponent(order.orderNumber)}`);
    } catch (err) {
      const message =
        (err && err.message) || (typeof err === "string" ? err : "Could not place your order. Please try again.");
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (catalogLoading || cartitems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] px-4 sm:px-6 lg:px-12 pt-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/cart" className="inline-flex items-center gap-2 text-blue-100/80 text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft size={15} /> Back to cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Checkout</h1>
          <p className="text-blue-100/70 text-sm mt-2">No account needed — just your delivery details.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 -mt-10 relative z-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-blue-50 shadow-[0_16px_48px_rgba(14,127,196,.1)] p-6 sm:p-8 space-y-5"
          >
            <h2 className="text-lg font-bold text-gray-900">Delivery Details</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
              <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Field label="Delivery Address" name="address" value={form.address} onChange={handleChange} required />

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="City" name="city" value={form.city} onChange={handleChange} required />
              <Field label="Postal Code (optional)" name="postalCode" value={form.postalCode} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Note for the store (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                placeholder="E.g. please call before delivery"
              />
            </div>

            <div className="bg-blue-50/60 rounded-2xl p-4 flex items-start gap-3">
              <Truck size={18} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed">
                Payment is <strong>Cash on Delivery</strong>. You&apos;ll get an order number to track your
                delivery status any time — no account required.
              </p>
            </div>

            {formError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{formError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white font-bold rounded-2xl shadow-[0_6px_24px_rgba(14,127,196,.35)] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
              {submitting ? "Placing your order…" : `Place Order — ${currency} ${total.toLocaleString()}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_16px_48px_rgba(14,127,196,.1)] overflow-hidden">
            <div className="bg-gradient-to-br from-[#0f2d5e] to-[#1a4a8a] px-6 py-5">
              <h2 className="text-white font-bold text-lg">Order Summary</h2>
              <p className="text-blue-200/70 text-xs mt-0.5">
                {cartitems.length} {cartitems.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="p-6 space-y-3">
              {cartProducts.map(({ item, product }) =>
                product ? (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm gap-3">
                    <span className="text-gray-600 line-clamp-1">
                      {product.name} <span className="text-gray-400">×{item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {currency} {(product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ) : null
              )}
              <hr className="my-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{currency} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span>{currency} {deliveryFee.toLocaleString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-extrabold text-gray-900 text-base">
                <span>Total</span>
                <span>{currency} {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
      />
    </div>
  );
}
