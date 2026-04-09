import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

const photos: Photo[] = [
  {
    src: "https://picsum.photos/seed/ruddra-1/1200/800",
    alt: "Photo 1",
    title: "Banff",
    caption: "Mountain trip, 2024",
  },
  {
    src: "https://picsum.photos/seed/ruddra-2/1200/800",
    alt: "Photo 2",
    title: "Hack the North",
    caption: "Waterloo, 2024",
  },
  {
    src: "https://picsum.photos/seed/ruddra-3/1200/800",
    alt: "Photo 3",
    title: "Toronto",
    caption: "Home base",
  },
  {
    src: "https://picsum.photos/seed/ruddra-4/1200/800",
    alt: "Photo 4",
    title: "BlueDot",
    caption: "Internship, 2025",
  },
  {
    src: "https://picsum.photos/seed/ruddra-5/1200/800",
    alt: "Photo 5",
    title: "Garden",
    caption: "Side project",
  },
  {
    src: "https://picsum.photos/seed/ruddra-6/1200/800",
    alt: "Photo 6",
    title: "Lab",
    caption: "Late nights",
  },
  {
    src: "https://picsum.photos/seed/ruddra-7/1200/800",
    alt: "Photo 7",
    title: "Coastline",
    caption: "Weekend getaway",
  },
  {
    src: "https://picsum.photos/seed/ruddra-8/1200/800",
    alt: "Photo 8",
    title: "Friends",
    caption: "On campus",
  },
];

export default function PhotoCarousel() {
  // Duplicate items for seamless loop (we translate -50%)
  const items = [...photos, ...photos];

  return (
    <section
      aria-label="Photos"
      className="marquee relative w-screen overflow-hidden py-6"
      style={{ marginLeft: "calc(50% - 50vw)" }}
    >
      <ul className="animate-scroll-x flex w-max items-center gap-5 sm:gap-8">
        {items.map((photo, i) => (
          <li
            key={`${photo.src}-${i}`}
            className="group/photo relative aspect-[3/2] w-72 flex-none overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/10 transition-transform duration-500 ease-out hover:scale-105 sm:w-[28rem] sm:rounded-3xl dark:bg-zinc-800 dark:ring-white/10"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 28rem, 18rem"
              className="object-cover"
              unoptimized
            />
            {/* Overlay — fades in on hover */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100">
              <div className="text-base font-semibold text-white">
                {photo.title}
              </div>
              <div className="text-xs text-white/80">{photo.caption}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
