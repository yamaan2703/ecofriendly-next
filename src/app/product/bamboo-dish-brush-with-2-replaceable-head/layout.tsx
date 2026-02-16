import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase-server";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  actual_price: number;
  discounted_price: number;
  product_images: string[];
  quantity: number;
}

async function getProduct(): Promise<Product | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "Dishwasher")
      .eq("status", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;
    return data as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProduct();

  const title = product
    ? `${product.product_name} - Ecofriendlyshop`
    : "Bamboo Dish Brush with 2 Replaceable Heads - Ecofriendlyshop";
  const description = product
    ? product.product_description
    : "Bamboo dish brush with 2 replaceable heads – durable, eco-friendly, and ideal for dishes. Make your kitchen zero-waste today!";
  const imageUrl = product && product.product_images && product.product_images.length > 0
    ? `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${product.product_images[0].replace(/^\/+/, "").replace(/^product-images\//, "")}`
    : "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957301-7huidefvctj.png";

  return {
    title,
    description,
    keywords: ["bamboo dish brush", "eco-friendly dish brush", "sustainable kitchen", "zero-waste", "replaceable brush heads"],
    alternates: {
      canonical: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
    },
    openGraph: {
      title,
      description,
      url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DishwasherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const product = await getProduct();

  // Generate schema markup with dynamic product data
  const schemaData = product
    ? {
      "@context": "http://schema.org/",
      "@type": "Product",
      name: product.product_name,
      url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
      image: product.product_images?.map((img: string) => {
        const cleanImg = img.replace(/^\/+/, "").replace(/^product-images\//, "");
        return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanImg}`;
      }) || [],
      description: product.product_description,
      brand: {
        "@type": "Brand",
        name: "EcoFriendly Shop",
      },
      offers: {
        "@type": "Offer",
        availability: product.quantity > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
        price: product.discounted_price,
        priceCurrency: "USD",
        url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
        priceValidUntil: "2026-12-31",
        itemCondition: "http://schema.org/NewCondition",
        inventoryLevel: {
          "@type": "QuantitativeValue",
          value: product.quantity,
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: "USD",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "US",
          },
        },
        seller: {
          "@type": "Organization",
          name: "EcoFriendly Shop",
        },
      },
    }
    : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      {/* Server-rendered product data for SEO - visible in view source */}
      {product && (
        <div style={{ display: "none" }} aria-hidden="true" itemScope itemType="https://schema.org/Product">
          <h1 itemProp="name">{product.product_name}</h1>
          <p itemProp="description">{product.product_description}</p>
          <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content={product.discounted_price.toString()} />
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="availability" content={product.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
          </span>
          <meta itemProp="brand" content="EcoFriendly Shop" />
          {product.product_images?.map((img, idx) => {
            const cleanImg = img.replace(/^\/+/, "").replace(/^product-images\//, "");
            return (
              <img
                key={idx}
                itemProp="image"
                src={`https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanImg}`}
                alt={product.product_name}
              />
            );
          })}
        </div>
      )}
      {children}
    </>
  );
}

