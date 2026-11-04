import Image from "next/image";
import { HERO_VIDEO_POSTER } from "@/lib/config/hero";

interface Props {
  animated: boolean;
}

export function HeroFallbackScene({ animated }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bg" aria-hidden="true">
      <Image
        src={HERO_VIDEO_POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className={
          animated
            ? "hero-fallback-image hero-fallback-image--animated"
            : "hero-fallback-image"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/10" />
    </div>
  );
}
