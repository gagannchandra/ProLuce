import { Metadata } from "next";
import ProductsClient from "./products-client";

export const metadata: Metadata = {
  title: "Products Catalogue | Pro-Luce Lighting",
  description: "Browse the complete Pro-Luce architectural lighting catalogue.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
