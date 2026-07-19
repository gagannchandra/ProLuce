import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects | Pro-Luce Lighting",
  description: "View architectural spaces illuminated by Pro-Luce.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
