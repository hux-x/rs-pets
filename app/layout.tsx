import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import ShopContextProvider from "@/src/context/ShopContext";
import Footer from '@/src/components/layout/Footer'
import JsonLd from "@/src/components/jsonLd";


export const metadata: Metadata = {
  metadataBase: new URL("https://rspetshub.store"),
  title: {
    default: "RSPetsHub — Premium Pet Supplies in Pakistan",
    template: "%s | RSPetsHub",
  },
  description:
    "RSPetsHub is Pakistan's trusted online pet store. Shop high-quality cat food, dog food, toys, grooming essentials, accessories, and more. Fast delivery across Pakistan.",
  keywords: [
    "pet supplies Pakistan",
    "cat food Pakistan",
    "dog food Pakistan",
    "pet shop online Pakistan",
    "buy pet food online",
    "cat accessories Pakistan",
    "pet grooming Pakistan",
    "cat litter Pakistan",
    "RSPetsHub",
    "pet store Rawalpindi",
  ],
  authors: [{ name: "RSPetsHub", url: "https://rspetshub.store" }],
  creator: "RSPetsHub",
  publisher: "RSPetsHub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://rspetshub.store",
    siteName: "RSPetsHub",
    title: "RSPetsHub — Premium Pet Supplies in Pakistan",
    description:
      "Everything your pets need — food, toys, grooming, and accessories. Shop now at RSPetsHub with fast delivery across Pakistan.",
    images: [
      {
        url: "/og-image.jpg", // 1200×630px recommended
        width: 1200,
        height: 630,
        alt: "RSPetsHub — Premium Pet Supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RSPetsHub — Premium Pet Supplies in Pakistan",
    description:
      "Everything your pets need — food, toys, grooming, and accessories. Shop now at RSPetsHub.",
    images: ["/og-image.jpg"],
    // site: "@rspetshub", // add if you have a Twitter/X account
  },
  alternates: {
    canonical: "https://rspetshub.store",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <ShopContextProvider>
        <Navbar/>
        <JsonLd/>
        {children}
        </ShopContextProvider>
        <Footer/>
      </body>
    </html>
  );
}
