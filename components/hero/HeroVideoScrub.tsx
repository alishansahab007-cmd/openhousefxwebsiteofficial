"use client";

import type { Ref } from "react";

interface Props {
  ref: Ref<HTMLVideoElement>;
  src: string;
  srcMobile: string;
  poster: string;
  onUnsupported: () => void;
}

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

/**
 * The hero video loops on its own so visitors see motion immediately without
 * needing to scroll through a pinned section. The matching mobile encode is
 * selected by the browser's source media query.
 */
export function HeroVideoScrub({ ref, src, srcMobile, poster, onUnsupported }: Props) {
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover brightness-110"
      poster={poster}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      onError={onUnsupported}
      onCanPlay={(event) => {
        void event.currentTarget.play().catch(() => {});
      }}
    >
      <source media={MOBILE_MEDIA_QUERY} src={srcMobile} type="video/mp4" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
