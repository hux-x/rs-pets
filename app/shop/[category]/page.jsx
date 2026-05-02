// app/shop/[category]/page.tsx
import { collections, products } from "../../../src/assets/assets";
import { notFound } from "next/navigation";
import CategoryContent from "../../../src/components/category/content";

export async function generateStaticParams() {
  return collections.map((col) => ({ category: col.slug }));
}

export async function generateMetadata({ params }) {
    params = await params;
  const col = collections.find((c) => c.slug === params.category);
  console.log("Generating metadata for category:", params.category, "Found collection:", col);
  if (!col) return { title: "Not Found" };

  const count = products.filter((p) => p.category === params.category).length;

  return {
    title: `${col.name} — Buy Online in Pakistan`,
    description: col.description,
    keywords: [
      `${col.name.toLowerCase()} Pakistan`,
      `buy ${col.name.toLowerCase()} online`,
      `${col.name.toLowerCase()} price Pakistan`,
      `pet shop ${col.name.toLowerCase()}`,
      "RSPetsHub",
    ],
    alternates: {
      canonical: `https://rspetshub.store/shop/${params.category}`,
    },
    openGraph: {
      url: `https://rspetshub.store/shop/${params.category}`,
      title: `${col.name} — RSPetsHub Pakistan`,
      description: `Shop ${count}+ ${col.name.toLowerCase()} products. ${col.description}`,
      images: [{ url: col.image, width: 1200, height: 630, alt: col.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${col.name} — RSPetsHub Pakistan`,
      description: col.description,
      images: [col.image],
    },
  };
}

export default async function CategoryPage({ params }) {
    params = await params;
  const col = collections.find((c) => c.slug === params.category);
  if (!col) notFound();

  const productCount = products.filter((p) => p.category === params.category).length;

  return <CategoryContent collection={col} productCount={productCount} />;
}