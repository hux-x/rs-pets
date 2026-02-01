"use client";
import React, { useState, useEffect } from "react";
import Title from "@/src/components/ui/Title";
import Productitem from "@/src/components/ui/ProductItem";
import Link from "next/link";
import { products } from "@/src/assets/assets"; // import local products

const Latestcollection = () => {
  const [latestProducts] = useState(
    products
       // only show in-stock items
      .slice(0, 8) // limit to 8 latest products
  );

  return (
    <div className="my-10 px-4 md:px-12 lg:px-20">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="PRODUCTS" />
        <p className="w-full md:w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest pet products, from toys to nutritious food and accessories.
        </p>
      </div>

      {latestProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {latestProducts.map((item) => (
              <Productitem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                images={item.image} // updated to match your products array
                inStock={item.inStock}
              />
            ))}
          </div>

          {/* Explore More Button */}
          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md text-sm md:text-base font-semibold hover:bg-blue-600 transition-colors"
            >
              Explore More 🐾
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      )}
    </div>
  );
};

export default Latestcollection;
