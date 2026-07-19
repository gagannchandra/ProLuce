import { Metadata } from "next";
import CollectionsClient from "./collections-client";

export const metadata: Metadata = {
  title: "Collections | Pro-Luce Lighting",
  description: "Explore our curated collections of architectural, commercial, hospitality, and residential lighting solutions.",
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
