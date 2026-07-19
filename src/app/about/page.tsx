import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | Pro-Luce Lighting",
  description: "Learn about the heritage, engineering, and design philosophy behind Pro-Luce.",
};

export default function AboutPage() {
  return <AboutClient />;
}
