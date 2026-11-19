const FILMS = [
  {
    slug: "entryway-dolly",
    title: "Front entrance dolly",
    caption: "A steady push up the illuminated steps brings the front entrance into focus.",
  },
  {
    slug: "drone-style-day-to-dusk",
    title: "Drone-style exterior at dusk",
    caption: "A simulated camera glide across the front of the home as daylight fades and the exterior lights come on.",
  },
  {
    slug: "living-room-parallax",
    title: "Living room parallax",
    caption: "The camera glides past the sofa toward the windows as daylight outside fades to blue.",
  },
  {
    slug: "aerial-pool-day-to-dusk",
    title: "Poolside day to dusk",
    caption: "An aerial view shifts from bright daylight to blue hour, with warm windows and a lit pool terrace.",
  },
  {
    slug: "portrait-exterior-twilight",
    title: "Exterior twilight reel",
    caption: "A vertical shot eases toward the home as the garden darkens and the windows glow.",
  },
  {
    slug: "portrait-interior-day-to-dusk",
    title: "Interior day-to-dusk reel",
    caption: "A sunlit living room transitions to blue hour, with warm accent lights picking out the sofa and fireplace wall.",
  },
  {
    slug: "modern-exterior-cloud-timelapse",
    title: "Modern exterior cloud timelapse",
    caption: "Stormy clouds move above the roofline as the windows and entry lights brighten.",
  },
  {
    slug: "sunset-cloud-timelapse",
    title: "Sunset cloud timelapse",
    caption: "Clouds sweep across the sky as it shifts from orange sunset to violet above the driveway.",
  },
  {
    slug: "library-sunlight-arc",
    title: "Library sunlight arc",
    caption: "Moving bands of sunlight and shadow sweep across the floor and seating in a curved library.",
  },
  {
    slug: "library-reflection-play",
    title: "Library reflection study",
    caption: "A slow glide past the spiral staircase shows changing reflections and highlights across the library.",
  },
  {
    slug: "loft-window-flare",
    title: "Loft window flare",
    caption: "A brief flare passes through the tall windows as the camera moves across the loft.",
  },
  {
    slug: "living-room-sunlight-arc",
    title: "Living room sunlight arc",
    caption: "Sunlight travels across the rug and seating beneath the room’s tall windows.",
  },
] as const;

const FILM_GROUPS = [
  {
    id: "room-lighting",
    heading: "One room, three lighting treatments",
    films: [
      {
        slug: "woodland-living-room-sunlight-arc",
        title: "Sunlight arc",
        caption: "Daylight moves across the sectional and coffee table, shifting the window shadows across the wood floor.",
      },
      {
        slug: "woodland-living-room-golden-hour",
        title: "Golden hour",
        caption: "Low amber light catches the cushions and the edge of the coffee table as the camera moves closer.",
      },
      {
        slug: "woodland-living-room-window-flare",
        title: "Window flare",
        caption: "The sun peeks past a window frame, sending a small flare across the view of the evergreens.",
      },
    ],
  },
  { id: "more-property-films", heading: "More property films", films: FILMS },
] as const;

export function StudioFilms() {
  return (
    <section id="studio-films" aria-labelledby="studio-films-heading" className="mt-16 border-t border-line pt-12 md:mt-20">
      <h3 id="studio-films-heading" className="editorial-heading">Pocket Studio films</h3>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Examples of how we turn property photos into cinematic clips using AI-assisted camera motion and lighting effects.
      </p>

      {FILM_GROUPS.map(({ id, heading, films }) => (
        <section key={id} id={id} aria-labelledby={`${id}-heading`} className="mt-10">
          <h4 id={`${id}-heading`} className="font-display text-2xl font-medium text-ink">{heading}</h4>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {films.map(({ slug, title, caption }) => {
              const asset = `/media/studio-films/${slug}`;

              return (
                <figure key={slug} className="glass-panel overflow-hidden rounded-md">
                  <video
                    className="block aspect-[16/10] w-full bg-black object-contain"
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster={`${asset}.webp`}
                    aria-labelledby={`${slug}-title`}
                    aria-describedby={`${slug}-caption`}
                  >
                    <source src={`${asset}.mp4`} type="video/mp4" />
                  </video>
                  <figcaption className="p-5">
                    <h5 id={`${slug}-title`} className="text-base font-semibold text-ink">{title}</h5>
                    <p id={`${slug}-caption`} className="mt-2 text-sm leading-relaxed text-ink-dim">{caption}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
