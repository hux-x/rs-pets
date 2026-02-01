import React from 'react'
import Hero from '@/src/components/Home/Hero'
import Latest from '@/src/components/Home/Latest'
import ShopByCollection from "@/src/components/Home/ShopByCollection"
import FAQs from "@/src/components/Home/FAQs"
import Deals from '@/src/components/Home/Deals'

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
