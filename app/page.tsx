import React from 'react'
import Hero from '@/src/components/Home/Hero'
import Latest from '@/src/components/Home/Latest'
import ShopByCollection from "@/src/components/Home/ShopByCollection"
import FAQs from "@/src/components/Home/FAQs"
import Deals from '@/src/components/Home/Deals'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Premium Pet Supplies in Pakistan | RSPetsHub", 
  description:
    "Shop the latest pet food, toys, grooming products, and accessories for cats and dogs. Discover deals and new arrivals at RSPetsHub — Pakistan's favourite pet store.",
  alternates: {
    canonical: "https://rspetshub.store",
  },
  openGraph: {
    url: "https://rspetshub.store",
    title: "RSPetsHub — Everything Your Pets Need",
    description:
      "Discover high-quality pet supplies — nutritious food, toys, accessories, and grooming essentials. Shop now with fast delivery across Pakistan.",
  },
};


export default function Home() {
  return (
    <>
    <Hero/>
    <Latest/>
    <Deals/>
    <ShopByCollection/>
    <FAQs/>
    </>
  )
}
