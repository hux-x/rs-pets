import ProductPage from '../../../src/components/products/page';
import { products, getProduct } from '../../../src/assets/assets';

const SITE_URL = 'https://rspetshub.store';
const SITE_NAME = 'RSPetsHub';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;


export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product._id,
  }));
}

// ── Dynamic metadata ─────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product) {
    return {
      title: `Product Not Found | ${SITE_NAME}`,
      description: 'This product could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const productUrl = `${SITE_URL}/product/${product._id}`;

  // Resolve primary image
  const rawImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const ogImage = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : DEFAULT_OG_IMAGE;

  // Category label(s)
  const categoryLabel = Array.isArray(product.categories)
    ? product.categories
        .map((c) => (typeof c === 'object' ? c.name : c))
        .join(', ')
    : product.category || 'Pet Supplies';

  // Rich description
  const metaDescription = product.description
    ? `${product.description.slice(0, 140).trim()}…`
    : `Buy ${product.name} for your pet at RSPetsHub. ${categoryLabel} — fast delivery across Pakistan. Cash on Delivery available.`;

  // Keywords
  const keywords = [
    product.name,
    categoryLabel,
    'pet supplies Pakistan',
    'pet shop online Pakistan',
    'buy pet products',
    'RSPetsHub',
    'pet food Pakistan',
    'dog supplies Pakistan',
    'cat supplies Pakistan',
    'cash on delivery pet shop',
  ].join(', ');

  return {
    // ── Core ──────────────────────────────────────────────────────
    title: `${product.name} | ${SITE_NAME}`,
    description: metaDescription,
    keywords,

    // ── Canonical ─────────────────────────────────────────────────
    alternates: {
      canonical: productUrl,
    },

    // ── Open Graph ────────────────────────────────────────────────
    openGraph: {
      type: 'website',
      url: productUrl,
      siteName: SITE_NAME,
      title: `${product.name} | ${SITE_NAME}`,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_PK',
    },

    // ── Twitter Card ──────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${SITE_NAME}`,
      description: metaDescription,
      images: [ogImage],
      site: '@rspetshub',
      creator: '@rspetshub',
    },

    // ── Robots ────────────────────────────────────────────────────
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // ── Other ─────────────────────────────────────────────────────
    category: categoryLabel,
  };
}

// ── JSON-LD structured data ──────────────────────────────────────
function ProductJsonLd({ product }) {
  const rawImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const image = rawImage
    ? rawImage.startsWith('http') ? rawImage : `${SITE_URL}${rawImage}`
    : DEFAULT_OG_IMAGE;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} — available at RSPetsHub.`,
    image,
    url: `${SITE_URL}/product/${product._id}`,
    sku: product._id,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product._id}`,
      priceCurrency: 'PKR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFinalizeSale',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 290,
          currency: 'PKR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK',
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── BreadcrumbList JSON-LD ────────────────────────────────────────
function BreadcrumbJsonLd({ product }) {
  const primaryCategory = Array.isArray(product.categories) && product.categories.length > 0
    ? (typeof product.categories[0] === 'object' ? product.categories[0] : null)
    : null;

  const items = [
    { position: 1, name: 'Home',  id: SITE_URL },
    { position: 2, name: 'Shop',  id: `${SITE_URL}/shop` },
    primaryCategory && {
      position: 3,
      name: primaryCategory.name,
      id: `${SITE_URL}/shop?category=${primaryCategory.slug}`,
    },
    {
      position: primaryCategory ? 4 : 3,
      name: product.name,
      id: `${SITE_URL}/product/${product._id}`,
    },
  ].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.id,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Page component ───────────────────────────────────────────────
export default async function Page({ params }) {
  const { productId } = await params;
  const product = getProduct(productId);

  return (
    <>
      {product && (
        <>
          <ProductJsonLd product={product} />
          <BreadcrumbJsonLd product={product} />
        </>
      )}
      <ProductPage productId={productId} />
    </>
  );
}