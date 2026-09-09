import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getProductsByCategory } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import ProductDetailView from "@/components/product/ProductDetailView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.model} — ${product.category} Datasheet | Pro-Luce`;
  const description = `${product.model} architectural specifications: ${product.power}, ${product.ipRating}, ${product.dimensions}. Beam angles: ${product.beamAngles.join(", ")}. CCT: ${product.cct.join(", ")}.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.images[0] || siteConfig.ogImage,
          width: 1200,
          height: 1200,
          alt: product.model,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category).filter(
    (p) => p.slug !== product.slug
  );

  return (
    <div className="container-site py-8 md:py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.model,
          description: product.description,
          category: product.category,
          image: product.images.map((img) => `${siteConfig.url}${img}`),
          brand: {
            "@type": "Brand",
            name: siteConfig.name,
          },
          additionalProperty: [
            { "@type": "PropertyValue", name: "Power", value: product.power },
            { "@type": "PropertyValue", name: "IP Rating", value: product.ipRating },
            { "@type": "PropertyValue", name: "Dimensions", value: product.dimensions },
            { "@type": "PropertyValue", name: "Color Temperature", value: product.cct.join(", ") },
            { "@type": "PropertyValue", name: "Beam Angle", value: product.beamAngles.join(", ") },
          ],
        }}
      />

      <ProductDetailView product={product} relatedProducts={related} />
    </div>
  );
}
