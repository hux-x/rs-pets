"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "Due to hygiene and safety reasons, pet food, treats, and grooming products cannot be returned once delivered. Accessories can be returned within 7 days if unused and in original packaging.",
  },
  {
    question: "Do you offer home delivery?",
    answer:
      "Yes, we offer home delivery for all products. Delivery times and charges may vary depending on your location.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely! You can contact us on +92 348 0026454 to get real-time updates on your order status.",
  },
  {
    question: "Are your pet products safe and authentic?",
    answer:
      "Yes, all our products are 100% authentic, vet-approved where applicable, and sourced from trusted brands to ensure your pet’s safety.",
  },
  {
    question: "Do you sell products for all types of pets?",
    answer:
      "We currently offer products for cats, dogs, birds, and small pets. More pet categories are coming soon!",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-16 px-4 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">
          Everything you need to know about shopping for your pets.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              <span>{faq.question}</span>
              <span className="ml-4 text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 py-4 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
