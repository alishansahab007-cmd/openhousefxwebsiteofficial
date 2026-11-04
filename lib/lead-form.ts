// Shared between the Start a Listing form (client) and its API route
// (server) so the list of selectable services has a single source of
// truth — the server validates submitted services against this list.
export const LEAD_SERVICE_OPTIONS = [
  "Listing Photography Enhancement",
  "Property Video",
  "Social Media Reels",
  "Virtual Staging",
  "Twilight / Day-to-Dusk",
  "Interactive 3D Experience",
  "Full Listing Campaign",
  "Not sure — I'd like to discuss it",
] as const;
