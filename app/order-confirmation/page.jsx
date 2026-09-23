"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ClipboardCopy, PawPrint } from "lucide-react";
import { toast } from "react-toastify";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const copyOrderNumber = () => {
    if (!orderNumber) return;
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2d5e] via-[#1a4a8a] to-[#0e7fc4] flex flex-col items-center justify-center px-4 py-16 text-center">
      <PawPrint className="w-10 h-10 text-white/20 mb-6" />
      <CheckCircle2 className="w-16 h-16 text-emerald-300 mb-5" />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Order placed!</h1>
      <p className="text-blue-100/80 text-sm max-w-md mb-8">
        Thanks for shopping with us. We&apos;ll email you once your order is confirmed, and you can check its
        status any time using your order number below.
      </p>

      {orderNumber ? (
        <button
          onClick={copyOrderNumber}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 mb-8 hover:bg-white/15 transition-colors"
        >
          <span className="text-white font-mono font-bold text-lg tracking-wide">{orderNumber}</span>
          <ClipboardCopy size={16} className="text-blue-200" />
        </button>
      ) : (
        <p className="text-blue-200/70 text-sm mb-8">
          We couldn&apos;t find your order number here — check your email confirmation, or contact us if you
          need help.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={orderNumber ? `/track-order?orderNumber=${encodeURIComponent(orderNumber)}` : "/track-order"}
          className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors"
        >
          Track My Order
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl text-sm hover:bg-white/15 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f2d5e]" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
