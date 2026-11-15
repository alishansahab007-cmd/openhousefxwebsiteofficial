// Central copy/data for the homepage sections below the hero. Keeping this
// in one place makes it easy to swap in real photography/copy later without
// hunting through component files.

import { MEDIA } from "@/lib/media";

export const PROBLEM = {
  kicker: "The Problem",
  headline: "Your listing already has the assets. The problem is turning them into everything you need.",
  inputs: [
    "MLS Photos",
    "Floor Plan",
    "Existing Video",
    "3D Tour",
    "Agent Branding",
    "Property Info",
  ],
  scatteredCaption: "Multiple Tools · Multiple Vendors · Multiple Hours",
  funnelCaption: "One Partner · One Listing · Everything You Need",
};

export const TRANSFORMATION = {
  kicker: "The Transformation",
  headline: "One listing becomes everything you need to market it.",
  input: "One Listing",
  inputImage: MEDIA.listingExteriorDay,
  // Each output maps to the matching SERVICES entry (by number) so the
  // Transformation stage can reuse that service's real media/treatment
  // instead of duplicating it — see Transformation.tsx.
  outputs: [
    { label: "Enhanced Photography", serviceNumber: "01" },
    { label: "Cinematic Film", serviceNumber: "02" },
    { label: "Social Reels", serviceNumber: "03" },
    { label: "Virtual Staging", serviceNumber: "04" },
    { label: "Virtual Twilight", serviceNumber: "05" },
    { label: "Floor Plan Presentation", serviceNumber: "06" },
    { label: "3D Experience", serviceNumber: "07" },
    { label: "Property Website", serviceNumber: "08" },
  ],
};

interface ServiceBase {
  number: string;
  name: string;
  description: string;
}

export type Service =
  | (ServiceBase & {
      kind: "before-after";
      before: string;
      after: string;
    })
  | (ServiceBase & {
      kind: "video";
      poster: string;
      /** Left unset until a clip exists — see ServiceMedia/HoverVideoCard. */
      videoSrc?: string;
      variant?: "landscape" | "portrait";
    })
  | (ServiceBase & {
      kind: "interactive-3d";
      poster: string;
    })
  | (ServiceBase & {
      kind: "pan-zoom";
      image: string;
    })
  | (ServiceBase & { kind: "scroll-mock" });

export const SERVICES: Service[] = [
  {
    kind: "before-after",
    number: "01",
    name: "Photography Enhancement",
    description:
      "Lighting, exposure and perspective correction that keeps every image true to the property.",
    before: MEDIA.photoEnhancementBefore,
    after: MEDIA.photoEnhancementAfter,
  },
  {
    kind: "video",
    number: "02",
    name: "Cinematic Films",
    description:
      "Property films built with camera movement, pacing and sound design — not a slideshow.",
    // The exact Runway startFrame the clip was generated from, not a
    // different property's still — see lib/media.ts.
    poster: MEDIA.cinematicFilmsSource,
    videoSrc: "/media/services/cinematic-films.mp4",
    variant: "landscape",
  },
  {
    kind: "video",
    number: "03",
    name: "Social Reels",
    description:
      "Vertical, short-form cuts made for Instagram, TikTok and YouTube Shorts.",
    // The exact Runway startFrame the reel was generated from, not a
    // different property's still — see lib/media.ts.
    poster: MEDIA.socialReelsSource,
    videoSrc: "/media/services/social-reels.mp4",
    variant: "portrait",
  },
  {
    kind: "before-after",
    number: "04",
    name: "Virtual Staging",
    description:
      "Digitally furnished rooms that preserve the real architecture — never invented.",
    before: MEDIA.emptyRoom,
    after: MEDIA.stagedRoom,
  },
  {
    kind: "before-after",
    number: "05",
    name: "Virtual Twilight",
    description:
      "Suitable exterior imagery transformed into premium twilight presentation.",
    before: MEDIA.listingExteriorDay,
    after: MEDIA.listingExteriorTwilight,
  },
  {
    kind: "pan-zoom",
    number: "06",
    name: "Floor Plans",
    description:
      "Clean, professional floor plans, with interactive and 3D options.",
    image: MEDIA.floorPlan,
  },
  {
    kind: "interactive-3d",
    number: "07",
    name: "Interactive Experiences",
    description:
      "Spatial navigation and hotspots that turn a listing into a walkthrough.",
    // A captured still of the exact same procedural massing model shown on
    // hover (see CardArchitecturalScene), not an unrelated real photo — so
    // the poster and the interactive state show the same subject.
    poster: MEDIA.interactiveMassingPoster,
  },
  {
    kind: "scroll-mock",
    number: "08",
    name: "Property Websites",
    description:
      "A dedicated digital destination for the listing — built to convert.",
  },
];

export const INTERACTIVE_EXPERIENCE = {
  kicker: "Beyond the Gallery",
  headline: "Give buyers a listing they can move through, not just scroll past.",
  body: "Interactive floor plans, spatial navigation and hotspots turn a set of photos into a walkthrough — the same architectural thinking that goes into every OpenHouseFX delivery.",
  hotspots: [
    { label: "Primary Suite", position: [1.5, 1.1, 0.6] as [number, number, number] },
    { label: "Great Room", position: [-1.3, -0.5, 1.0] as [number, number, number] },
    { label: "Outdoor Living", position: [0.4, -1.0, 1.3] as [number, number, number] },
  ],
};

export type BeforeAfterPair =
  | {
      kind: "slider";
      label: string;
      description: string;
      before: string;
      after: string;
      /** Shown on the image itself, so the nature of each edit is explicit. */
      beforeLabel: string;
      afterLabel: string;
    }
  | {
      kind: "video";
      label: string;
      description: string;
      poster: string;
      videoSrc: string;
    };

export const BEFORE_AFTER = {
  kicker: "The work",
  headline: "The difference is the deliverable.",
  // The current examples are demonstration imagery (see lib/media.ts). When
  // real client photography replaces them, update this note and the labels.
  disclosure:
    "Examples are illustrative demonstrations of each service. Furniture and decor in staged images are digitally generated.",
  pairs: [
    {
      kind: "slider",
      label: "Raw Photo → Enhanced Photo",
      description: "Lighting, color and perspective corrected — the room stays exactly as it is.",
      before: MEDIA.livingRaw,
      after: MEDIA.livingEnhanced,
      beforeLabel: "Unedited",
      afterLabel: "Enhanced",
    },
    {
      kind: "slider",
      label: "Empty Room → Virtual Staging",
      description: "Furnished digitally, architecture untouched.",
      before: MEDIA.emptyRoom,
      after: MEDIA.stagedRoom,
      beforeLabel: "Empty room",
      afterLabel: "Digitally staged",
    },
    {
      kind: "video",
      label: "Static Image → Cinematic Film",
      description: "The same listing, given camera movement and pacing.",
      // The exact keyframe the cinematic clip was generated from (Runway
      // startFrame), not a different property's still — see BeforeAfter.tsx.
      poster: MEDIA.cinematicFilmsSource,
      videoSrc: "/media/services/cinematic-films.mp4",
    },
  ] satisfies BeforeAfterPair[],
};

export const DISTRIBUTION = {
  kicker: "Where It Lives",
  headline: "Your Zillow listing is the starting point.",
  body: "You already have a place to list the property — MLS, Zillow, Realtor.com, your brokerage site. OpenHouseFX doesn't replace any of it. We produce what goes into it, so every channel you already use gets a stronger listing.",
  channels: ["MLS", "Zillow", "Realtor.com", "Brokerage Site", "Social Media"],
  image: MEDIA.distributionListing,
};

export interface ListingPackage {
  name: string;
  /** Who the collection is for, in a few words. */
  bestFor: string;
  description: string;
  listingLimit: string;
  features: readonly string[];
  /**
   * Approved starting price, e.g. "$249". Leave null until the business
   * approves one: the card then reads "Tailored quotation". Never put an
   * example or placeholder figure here; it is published as written.
   */
  startingPrice: string | null;
  /** Verified turnaround, e.g. "48 hours from complete assets". Null hides it. */
  turnaround: string | null;
  /** Recommended-collection emphasis. Only set with business approval. */
  featured: boolean;
}

export const PACKAGES: readonly ListingPackage[] = [
  {
    name: "Essential",
    bestFor: "MLS-ready listings",
    description: "Enhanced photography and a floor plan, ready for MLS.",
    listingLimit: "1 listing max",
    features: [
      "Photo enhancement (up to 10)",
      "Floor plan presentation",
      "Video walkthrough (exterior only)",
    ],
    startingPrice: null,
    turnaround: null,
    featured: false,
  },
  {
    name: "Professional",
    bestFor: "Listings that need to perform",
    description: "The complete package for a listing that needs to perform.",
    listingLimit: "2 listings max",
    features: [
      "Everything in Essential",
      "Cinematic property film (interior + exterior)",
      "2 social reels per listing",
      "Virtual twilight",
    ],
    startingPrice: null,
    turnaround: null,
    featured: true,
  },
  {
    name: "Signature",
    bestFor: "Competitive or luxury listings",
    description: "Full-scale production for competitive or luxury listings.",
    listingLimit: "Up to 3 listings max",
    features: [
      "Everything in Professional",
      "Cinematic video walkthrough (interior + exterior)",
      "Virtual staging (up to 5 rooms per property)",
      "Interactive interior designing",
      "Virtual twilight (interior + exterior)",
    ],
    startingPrice: null,
    turnaround: null,
    featured: false,
  },
  {
    name: "Luxury",
    bestFor: "Flagship properties",
    description: "The full OpenHouseFX system for flagship properties.",
    listingLimit: "Up to 5 listings; more on demand",
    features: [
      "Everything in Signature",
      "Landing page",
      "Social media account management",
      "MLS management",
      "Dedicated producer",
    ],
    startingPrice: null,
    turnaround: null,
    featured: false,
  },
];

export const HOW_IT_WORKS = [
  {
    number: "01",
    name: "Send",
    description: "Share the listing's existing assets — photos, floor plan, video, branding.",
  },
  {
    number: "02",
    name: "Produce",
    description: "OpenHouseFX transforms them into the full media system.",
  },
  {
    number: "03",
    name: "Review",
    description: "Review and approve every deliverable before it goes live.",
  },
  {
    number: "04",
    name: "Launch",
    description: "Deploy across MLS, Zillow, social media and your own campaigns.",
  },
] as const;

export const FOR_TEAMS = [
  {
    segment: "Agent",
    flow: "Multiple Listings",
    description: "A consistent media partner across every listing you take on.",
    image: MEDIA.agentListing,
  },
  {
    segment: "Team",
    flow: "Consistent Brand",
    description: "Every agent on the team ships the same premium standard.",
    image: MEDIA.teamConsistency,
  },
  {
    segment: "Brokerage",
    flow: "Scalable Production",
    description: "Media production that scales with the office, not against it.",
    image: MEDIA.brokerageScale,
  },
] as const;

export const FINAL_CTA = {
  headline: "Have a listing? Let's turn it into a campaign.",
  cta: "Send Your First Listing",
};

export const HERO = {
  eyebrow: "Real estate media studio",
  description:
    "Photo enhancement, virtual staging, twilight conversions, listing films and social reels, produced from the listing media you already have.",
  primaryCta: "Enhance Your Listing",
  secondaryCta: "Explore Our Work",
};

// Every line here restates something already published elsewhere on the site
// (quotation flow, review step, service definitions, contact details). Add
// client logos, delivery times or counts only when backed by business records.
export const TRUST_POINTS = [
  {
    title: "A quotation before any work",
    body: "We confirm the scope and send a tailored quotation before production begins.",
  },
  {
    title: "You approve every deliverable",
    body: "Nothing goes live until you have reviewed it.",
  },
  {
    title: "True to the property",
    body: "Enhancement and staging keep the real architecture of the home.",
  },
  {
    title: "Fits the channels you use",
    body: "Delivered for MLS, Zillow, Realtor.com, your brokerage site and social.",
  },
] as const;

export interface Testimonial {
  name: string;
  quote: string;
  /** Only with the client's approval. */
  organization?: string;
  market?: string;
  /** Approved portrait or logo under /public. */
  image?: string;
  project?: string;
}

export interface CaseStudy {
  listing: string;
  challenge: string;
  transformation: string;
  /** State documented outcomes only; describe the finished assets otherwise. */
  result: string;
  image?: string;
}

// Deliberately empty: the section renders nothing until genuine, approved
// client feedback or documented projects are added here.
export const TESTIMONIALS: readonly Testimonial[] = [];
export const CASE_STUDIES: readonly CaseStudy[] = [];

export const FOUNDER = {
  heading: "A note from our founder",
  message:
    "We built OpenHouseFX with a simple belief: real estate professionals shouldn't have to juggle endless tools and vendors to bring a listing to life. Our mission is to make property media simpler today, while building the technology for a more connected tomorrow.",
};

export const ECOSYSTEM_PREVIEW = {
  kicker: "OpenHouseFX technology",
  headline: "Beyond the listing.",
  accent: "Built for what comes next.",
  body: "Explore the growing OpenHouseFX technology ecosystem, designed to support modern real estate operations.",
  cta: "Explore the Ecosystem",
};

export const FOOTER = {
  tagline: "Real Estate. Higher Standards.",
  email: "info@openhousefx.com",
  phone: "(888) 815-0017",
  telephone: "+18888150017",
};
