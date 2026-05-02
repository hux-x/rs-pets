import Explore from '../../src/components/explore/page'


export const metadata = {
  title: "Shop",  // renders as "Shop | RSPetsHub"
  description:
    "Browse all pet supplies at RSPetsHub — cat food, dog food, toys, grooming essentials, litter, beds, collars, and exclusive deals. Shop online with fast delivery across Pakistan.",
  keywords: [
    "pet shop online Pakistan",
    "buy cat food online",
    "buy dog food online",
    "pet toys Pakistan",
    "pet grooming supplies",
    "cat litter online",
    "pet accessories Pakistan",
    "pet deals Pakistan",
    "RSPetsHub shop",
  ],
  alternates: {
    canonical: "https://rspetshub.store/shop",
  },
  openGraph: {
    url: "https://rspetshub.store/shop",
    title: "Shop All Pet Supplies — RSPetsHub",
    description:
      "Explore hundreds of pet products — food, toys, grooming, accessories, and deals for cats, dogs, and more. Fast delivery across Pakistan.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RSPetsHub Shop — All Pet Supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Pet Supplies — RSPetsHub",
    description:
      "Explore hundreds of pet products — food, toys, grooming, accessories, and deals. Fast delivery across Pakistan.",
    images: ["/og-image.jpg"],
  },
};

export default function page() {
  return (
    <>
      <Explore />
    </>
  );
}