import type { Service } from "@/lib/content";
import { BeforeAfterHover } from "./BeforeAfterHover";
import { HoverVideoCard } from "./HoverVideoCard";
import { InteractivePreviewCard } from "./InteractivePreviewCard";
import { PanZoomImage } from "./PanZoomImage";
import { ScrollMockCard } from "./ScrollMockCard";

interface Props {
  service: Service;
  /** Drives the picked treatment's activation externally — see useCardInteraction. */
  forceActive?: boolean;
  sizes?: string;
  preload?: boolean;
}

/**
 * Picks the right interactive treatment for a service card's media slot.
 * Stays a server component (no hooks of its own) so Services.tsx doesn't
 * need "use client" just to route to one — each treatment below opts into
 * client interactivity individually.
 */
export function ServiceMedia({ service, forceActive, sizes, preload }: Props) {
  switch (service.kind) {
    case "before-after":
      return (
        <BeforeAfterHover
          before={service.before}
          after={service.after}
          label={service.name}
          forceActive={forceActive}
          sizes={sizes}
        />
      );
    case "video":
      return (
        <HoverVideoCard
          poster={service.poster}
          videoSrc={service.videoSrc}
          variant={service.variant}
          preload={preload}
          label={service.name}
          forceActive={forceActive}
          sizes={sizes}
        />
      );
    case "interactive-3d":
      return (
        <InteractivePreviewCard
          poster={service.poster}
          label={service.name}
          forceActive={forceActive}
          sizes={sizes}
        />
      );
    case "pan-zoom":
      return (
        <PanZoomImage image={service.image} label={service.name} forceActive={forceActive} sizes={sizes} />
      );
    case "scroll-mock":
      return <ScrollMockCard label={service.name} forceActive={forceActive} sizes={sizes} />;
    default: {
      const exhaustiveCheck: never = service;
      return exhaustiveCheck;
    }
  }
}
