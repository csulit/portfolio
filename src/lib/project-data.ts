import { FileCode, Layout, Plane, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProjectTag {
  label: string;
  primary?: boolean;
}

export const CATEGORIES = ["All", "SaaS", "Web", "Mobile", "AI / ML"] as const;

type Category = Exclude<(typeof CATEGORIES)[number], "All">;

export interface Project {
  title: string;
  description: string;
  tags: Array<ProjectTag>;
  category: Category;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  highlighted?: boolean;
  url?: string;
}

export const projects: Array<Project> = [
  {
    title: "AI Document Processing Pipeline",
    description:
      "Built an AI-powered document processing system using GPT-4o/4o-mini agents with automated extraction, classification, and structured output. Handles high-throughput workloads with BullMQ queues and Prisma/PostgreSQL.",
    tags: [
      { label: "AI / ML", primary: true },
      { label: "OpenAI" },
      { label: "BullMQ" },
      { label: "Prisma" },
      { label: "PostgreSQL" },
    ],
    category: "AI / ML",
    icon: FileCode,
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
    highlighted: true,
  },
  {
    title: "Dreams Travel & Tours PH",
    description:
      "A Philippine travel agency website featuring tour packages, booking flows, and a modern responsive design — deployed on Cloudflare Workers for edge performance.",
    tags: [
      { label: "Web", primary: true },
      { label: "Cloudflare" },
      { label: "TypeScript" },
    ],
    category: "Web",
    icon: Plane,
    gradient: "from-sky/20 to-sky/5",
    iconColor: "text-sky",
    url: "https://dreams-travel-and-tours-ph.gelo.workers.dev",
  },
  {
    title: "Full-Stack SaaS Platform",
    description:
      "Production SaaS application built with TanStack Start (React), TypeScript, PostgreSQL, and Prisma. Includes authentication, dashboards, and background job processing via BullMQ/Redis.",
    tags: [
      { label: "SaaS", primary: true },
      { label: "React" },
      { label: "TypeScript" },
      { label: "Prisma" },
      { label: "BullMQ" },
    ],
    category: "SaaS",
    icon: Layout,
    gradient: "from-indigo/20 to-indigo/5",
    iconColor: "text-indigo",
  },
  {
    title: "React Native Mobile App",
    description:
      "Cross-platform mobile application with smooth animations, offline support, and a polished UX — built with React Native and TypeScript.",
    tags: [
      { label: "Mobile", primary: true },
      { label: "React Native" },
      { label: "TypeScript" },
    ],
    category: "Mobile",
    icon: Smartphone,
    gradient: "from-amber/20 to-amber/5",
    iconColor: "text-amber",
  },
];
