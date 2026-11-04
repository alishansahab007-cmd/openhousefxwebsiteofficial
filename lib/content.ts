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
    }
  | {
      kind: "video";
      label: string;
      description: string;
      poster: string;
      videoSrc: string;
    };

export const BEFORE_AFTER = {
  kicker: "Proof, Not Promises",
  headline: "The difference is the deliverable.",
  pairs: [
    {
      kind: "slider",
      label: "Raw Photo → Enhanced Photo",
      description: "Lighting, color and perspective corrected — the room stays exactly as it is.",
      before: MEDIA.livingRaw,
      after: MEDIA.livingEnhanced,
    },
    {
      kind: "slider",
      label: "Empty Room → Virtual Staging",
      description: "Furnished digitally, architecture untouched.",
      before: MEDIA.emptyRoom,
      after: MEDIA.stagedRoom,
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

export const PACKAGES = [
  {
    name: "Essential",
    description: "Enhanced photography and a floor plan, ready for MLS.",
    features: ["Photo enhancement", "Floor plan presentation", "48-hour turnaround"],
    featured: false,
  },
  {
    name: "Professional",
    description: "The complete package for a listing that needs to perform.",
    features: [
      "Everything in Essential",
      "Cinematic property film",
      "3 social reels",
      "Virtual twilight",
    ],
    featured: true,
  },
  {
    name: "Signature",
    description: "Full-scale production for competitive or luxury listings.",
    features: [
      "Everything in Professional",
      "Virtual staging (up to 4 rooms)",
      "Interactive floor plan",
      "Property landing page",
    ],
    featured: false,
  },
  {
    name: "Luxury",
    description: "The full OpenHouseFX system for flagship properties.",
    features: [
      "Everything in Signature",
      "3D interactive experience",
      "Extended social content set",
      "Dedicated producer",
    ],
    featured: false,
  },
] as const;

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
  cta: "Start a Listing",
};

export const FOOTER = {
  tagline: "Real Estate. Higher Standards.",
  email: "info@openhousefx.com",
};
