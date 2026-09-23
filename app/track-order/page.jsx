"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import orderService from "@/src/api/services/orderService";
import { Search, Loader2, PackageSearch, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";

const STATUS_ICONS = {
  pending: Clock,
  confirmed: CheckCircle2,
  processing: PackageSearch,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

const STATUS_STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("orderNumber") || "");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runLookup = async (number) => {
    if (!number.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await orderService.trackOrderByNumber(number.trim());
      setResult(data);
    } catch (err) {
      setError(
        (err && err.message) ||
          (typeof err === "string" ? err : "We couldn't find an order with that number. Please double-check and try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("orderNumber")) {
      runLookup(searchParams.get("orderNumber"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    runLookup(orderNumber);
  };

  const currentStepIndex = result ? STATUS_STEPS.indexOf(result.status) : -1;
  const isCancelled = result?.status === "cancelled";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] px-4 sm:px-6 lg:px-12 pt-14 pb-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Track Your Order</h1>
        <p className="text-blue-100/70 text-sm max-w-md mx-auto">
          Enter the order number you received after checkout — no account needed.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 -mt-10 relative z-10 pb-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-blue-50 shadow-[0_16px_48px_rgba(14,127,196,.1)] p-5 sm:p-6 flex gap-3"
        >
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. RSP-20260922-0007"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-br from-[#1a4a8a] to-[#0e7fc4] text-white font-bold rounded-xl text-sm disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Track
          </button>
        </form>

        {error && (
          <p className="mt-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-center">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 bg-white rounded-3xl border border-blue-50 shadow-[0_16px_48px_rgba(14,127,196,.1)] overflow-hidden">
            <div className="bg-gradient-to-br from-[#0f2d5e] to-[#1a4a8a] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-blue-200/70 text-xs">Order</p>
                <p className="text-white font-mono font-bold">{result.orderNumber}</p>
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full ${
                  isCancelled ? "bg-red-100 text-red-700" : "bg-white/15 text-white"
                }`}
              >
                {result.statusLabel}
              </span>
            </div>

            {!isCancelled && (
              <div className="px-6 pt-6 flex items-center justify-between">
                {STATUS_STEPS.map((step, i) => {
                  const Icon = STATUS_ICONS[step];
                  const reached = currentStepIndex >= i;
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            reached ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-300"
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <span className={`text-[10px] capitalize ${reached ? "text-blue-700 font-semibold" : "text-gray-300"}`}>
                          {step}
                        </span>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-4 ${currentStepIndex > i ? "bg-blue-600" : "bg-gray-100"}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            <div className="p-6 space-y-3">
              {(result.items || []).map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-800">
                    PKR {Number(item.subtotal).toLocaleString()}
                  </span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>PKR {Number(result.subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span>PKR {Number(result.deliveryFee).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-base pt-1">
                <span>Total</span>
                <span>PKR {Number(result.total).toLocaleString()}</span>
              </div>
              {result.city && (
                <p className="text-xs text-gray-400 pt-2">Delivering to {result.city}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f2d5e]" />}>
      <TrackOrderContent />
    </Suspense>
  );
}
