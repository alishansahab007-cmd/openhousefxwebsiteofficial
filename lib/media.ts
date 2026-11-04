// Central map of generated property imagery. Keeping paths here (rather than
// inline in each component) makes it a single place to swap in real client
// photography later.

export const MEDIA = {
  listingExteriorDay: "/media/listing-exterior-day.webp",
  listingExteriorTwilight: "/media/listing-exterior-twilight.webp",
  livingRaw: "/media/living-raw.webp",
  livingEnhanced: "/media/living-enhanced.webp",
  emptyRoom: "/media/empty-room.webp",
  stagedRoom: "/media/staged-room.webp",
  sceneStatic: "/media/scene-static.webp",
  sceneCinematic: "/media/scene-cinematic.webp",
  socialVertical: "/media/social-vertical.webp",
  floorPlan: "/media/floor-plan.webp",
  architecturalInterior: "/media/architectural-interior.webp",
  agentListing: "/media/agent-listing.webp",
  teamConsistency: "/media/team-consistency.webp",
  brokerageScale: "/media/brokerage-scale.webp",
  distributionListing: "/media/distribution-listing.webp",
  photoEnhancementBefore: "/media/photo-enhancement-before.webp",
  photoEnhancementAfter: "/media/photo-enhancement-after.webp",
  cinematicFilmsSource: "/media/cinematic-films-source.webp",
  socialReelsSource: "/media/social-reels-source.webp",
  interactiveMassingPoster: "/media/interactive-massing-poster.webp",
  logoIcon: "/media/logo-icon.webp",
  logoLockup: "/media/logo-lockup.webp",
} as const;
