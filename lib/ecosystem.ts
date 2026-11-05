export type ProductIcon = "operations" | "production" | "verification" | "research";

type Screenshot = {
  label: string;
  src: string;
  alt: string;
};

export type EcosystemProduct = {
  id: string;
  name: string;
  category: string;
  area: string;
  headline: string;
  description: string;
  summary: string;
  features: readonly string[];
  status: "Product Preview" | "Planned";
  note: string;
  icon: ProductIcon;
  screenshots: readonly Screenshot[];
  workflow: {
    title: string;
    stages: readonly string[];
    details?: readonly string[];
  };
  action?: { label: string; href: string };
};

const MEDIA = "/media/ecosystem";

export const ECOSYSTEM_PRODUCTS: readonly EcosystemProduct[] = [
  {
    id: "alphacompanion",
    name: "AlphaCompanion",
    category: "Real estate CRM / ERP & operations",
    area: "Operations",
    headline: "Every relationship. Every property. In focus.",
    summary: "Keep leads, properties, and leasing workflows in a clearer workspace.",
    description: "A real estate operations workspace designed to bring lead management, property information, leasing workflows, and team coordination together.",
    features: [
      "CRM and lead pipeline",
      "Property and unit management",
      "Leasing and renewals",
      "Team operations and workspace tools",
    ],
    status: "Product Preview",
    note: "Workspace access and availability can vary.",
    icon: "operations",
    screenshots: [
      { label: "Overview", src: `${MEDIA}/alphacompanion-overview.webp`, alt: "AlphaCompanion overview with property and CRM navigation and a team workspace summary" },
      { label: "CRM pipeline", src: `${MEDIA}/alphacompanion-pipeline.webp`, alt: "AlphaCompanion sales and leasing board with inquiry, showing, application, and lease stages" },
      { label: "Suite launcher", src: `${MEDIA}/alphacompanion-suite.webp`, alt: "AlphaCompanion suite launcher with shortcuts to OpenhouseFX products" },
      { label: "Product directory", src: `${MEDIA}/alphacompanion-products.webp`, alt: "The AlphaCompanion product directory showing Lead Verifier, Pocket Studio, and a Scraper Ultra listing" },
    ],
    workflow: {
      title: "From inquiry to lease",
      stages: ["Inquiry", "Qualified", "Showing", "Application", "Lease signed"],
    },
  },
  {
    id: "pocket-studio",
    name: "Pocket Studio",
    category: "Creative property media production",
    area: "Creative production",
    headline: "Your next listing. Beautifully presented.",
    summary: "Turn authorized listing media into assets for a more complete presentation.",
    description: "An evolving workspace for creative property media. OpenhouseFX already offers post-production services, and the studio roadmap includes more tools for refining the work.",
    features: [
      "Cinematic presentations from authorized listing photos",
      "Virtual staging and twilight services",
      "Social Reels and short-form property content",
      "Clip editing, motion, and lighting controls on the roadmap",
    ],
    status: "Product Preview",
    note: "The screenshot shows the studio sign-in. The workflow illustrates media production, including ideas still on the roadmap.",
    icon: "production",
    screenshots: [
      { label: "Studio welcome", src: `${MEDIA}/pocket-studio-welcome.webp`, alt: "Pocket Studio welcome and sign-in screen beside a twilight property photograph" },
    ],
    workflow: {
      title: "From listing photos to ready-to-share media",
      stages: ["Authorized listing photos", "Creative production", "Media deliverables"],
      details: ["Enhanced photography", "Photo-motion video", "Virtual staging", "Virtual twilight", "Social Reels"],
    },
    action: { label: "Explore available media services", href: "/#services" },
  },
  {
    id: "lead-verifier",
    name: "Lead Verifier",
    category: "Email verification & lead intelligence",
    area: "Lead intelligence",
    headline: "Every lead. A clearer picture.",
    summary: "Screen contact lists for common email-data problems before outreach.",
    description: "An email-list verification workspace designed to help teams assess contact-data quality, flag common problems, and review cleaner prospect lists before outreach.",
    features: [
      "Bulk email-list processing",
      "Email syntax and domain-record checks",
      "Duplicate and disposable-address flags",
      "Role-account classification and export review",
    ],
    status: "Product Preview",
    note: "Syntax and domain checks help assess list quality. Mailbox activity and delivery remain unconfirmed.",
    icon: "verification",
    screenshots: [
      { label: "Verification workspace", src: `${MEDIA}/lead-verifier-workspace.webp`, alt: "Lead Verifier workspace with verification settings, upload controls, result categories, and report workspace" },
    ],
    workflow: {
      title: "From raw list to reviewed export",
      stages: ["Imported email list", "Validation checks", "Classified results", "Reviewed export"],
      details: ["Syntax", "Domain records", "Duplicates", "Role or disposable addresses"],
    },
  },
  {
    id: "scraper-ultra",
    name: "Scraper Ultra",
    category: "Real estate prospect research",
    area: "Prospect research",
    headline: "Prospect research. Reimagined.",
    summary: "Explore a desktop concept for organizing research from supported public sources.",
    description: "A planned desktop research companion intended to help real estate teams organize publicly available property and business lead information from supported sources.",
    features: [
      "Property prospect discovery",
      "Public business-contact research",
      "Prospect organization and structured exports",
      "Research workflows for supported sources",
    ],
    status: "Planned",
    note: "Proposed workflows depend on source permissions, applicable law, and platform terms.",
    icon: "research",
    screenshots: [],
    workflow: {
      title: "Conceptual Workflow",
      stages: ["Public sources", "Research workspace", "Organized prospect records", "Review and export"],
      details: ["Public property listings", "Business directories", "Other permitted sources"],
    },
  },
];
