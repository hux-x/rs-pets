export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RSPetsHub",
    url: "https://rspetshub.store",
    logo: "https://rspetshub.store/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-348-0026454",
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chakri Road, AlHaram City",
      addressLocality: "Rawalpindi",
      addressCountry: "PK",
    },
    sameAs: [
      // "https://www.facebook.com/rspetshub",
      // "https://www.instagram.com/rspetshub",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RSPetsHub",
    url: "https://rspetshub.store",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://rspetshub.store/shop?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "RSPetsHub",
    image: "https://rspetshub.store/og-image.jpg",
    url: "https://rspetshub.store",
    telephone: "+92-348-0026454",
    email: "support@rspetshub.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chakri Road, AlHaram City",
      addressLocality: "Rawalpindi",
      addressCountry: "PK",
    },
    priceRange: "PKR 200 - PKR 25,999",
    servesCuisine: undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "120", // update with real count
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
    </>
  );
}