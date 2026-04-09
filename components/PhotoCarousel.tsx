import Image from "next/image";
import SectionHeading from "./SectionHeading";

interface Photo {
  src: string;
  alt: string;
  title: string;
  caption: string;
  objectPosition?: string;
}

const photos: Photo[] = [
  {
    src: "/carousel/ruddra-1.jpg",
    alt: "Photo 1",
    title: "Rare",
    caption: "Waterloo, 2025",
  },
  {
    src: "/carousel/ruddra-2.jpg",
    alt: "Photo 2",
    title: "Safari",
    caption: "Kenya, 2025",
    objectPosition: "center bottom",
  },
  {
    src: "/carousel/ruddra-3.jpg",
    alt: "Photo 3",
    title: "Girnar Mountains",
    caption: "India, 2024",
  },
  {
    src: "/carousel/ruddra-4.jpg",
    alt: "Photo 4",
    title: "Miami Beach",
    caption: "Miami, 2025",
  },
  {
    src: "/carousel/ruddra-5.jpg",
    alt: "Photo 5",
    title: "Downtown",
    caption: "Toronto, 2025",
    objectPosition: "center bottom",
  },
  {
    src: "/carousel/ruddra-6.jpg",
    alt: "Photo 6",
    title: "Alaska Cruise",
    caption: "Atlantic Ocean, 2025",
  },
  {
    src: "/carousel/ruddra-7.jpg",
    alt: "Photo 7",
    title: "Downtown",
    caption: "Vancover, 2025",
  },
  {
    src: "/carousel/ruddra-8.jpg",
    alt: "Photo 8",
    title: "Fields",
    caption: "Vaughan, 2025",
  },
];

export default function PhotoCarousel() {
  // Duplicate items for seamless loop (we translate -50%)
  const items = [...photos, ...photos];

  return (
    <section aria-label="Places">
      <SectionHeading>Places</SectionHeading>
      <div
        className="marquee relative w-screen overflow-hidden py-6"
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <ul className="animate-scroll-x flex w-max items-center gap-5 sm:gap-8">
          {items.map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              className="group/photo relative aspect-[3/2] w-72 flex-none overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/10 transition-transform duration-500 ease-out [will-change:transform] hover:scale-105 sm:w-[28rem] sm:rounded-3xl dark:bg-zinc-800 dark:ring-white/10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 28rem, 18rem"
                className="object-cover"
                style={
                  photo.objectPosition
                    ? { objectPosition: photo.objectPosition }
                    : undefined
                }
                loading="lazy"
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
      </div>
    </section>
  );
}
