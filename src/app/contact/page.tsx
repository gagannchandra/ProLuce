import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact | Pro-Luce Lighting",
  description: "Get in touch with our team for project inquiries and catalogue requests.",
};

export default function ContactPage() {
  return <ContactClient />;
}
