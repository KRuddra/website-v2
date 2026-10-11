"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
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
    src: "/carousel/bowen-island.jpg",
    alt: "Photo 5",
    title: "Bowen Island",
    caption: "British Columbia, 2026",
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
    src: "/carousel/stanley-park-aquarium.jpg",
    alt: "Photo 8",
    title: "Aquarium",
    caption: "Vancouver, 2026",
  },
  {
    src: "/carousel/grand-bend.jpg",
    alt: "Photo 9",
    title: "Grand Bend",
    caption: "Ontario, 2026",
  },
];

// Embla's loop recycles slides that scroll off-screen. For the wrap to stay
// invisible, the track must be wider than ~2x the viewport so there are always
// off-screen slides to move. Repeating the set guarantees that on any display.
const LOOP_COPIES = 3;
const slides = Array.from({ length: LOOP_COPIES }, () => photos).flat();

// Milliseconds between steps while an arrow is held down.
const HOLD_STEP_MS = 400;

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, containScroll: false },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopHold = useCallback(() => {
    if (holdTimer.current !== null) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
    // Resume the ambient drift once the arrow is released.
    emblaApi?.plugins().autoScroll?.play();
  }, [emblaApi]);

  const startHold = useCallback(
    (direction: "forward" | "backward") => {
      if (!emblaApi) return;
      // Pause the drift so the manual direction wins while held.
      emblaApi.plugins().autoScroll?.stop();
      const step = () =>
        direction === "forward"
          ? emblaApi.scrollNext()
          : emblaApi.scrollPrev();
      step();
      if (holdTimer.current !== null) clearInterval(holdTimer.current);
      holdTimer.current = setInterval(step, HOLD_STEP_MS);
    },
    [emblaApi],
  );

  // Clear any pending interval if the component unmounts mid-hold.
  useEffect(() => stopHold, [stopHold]);

  return (
    <section aria-label="Places">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading>Places</SectionHeading>
        <div className="mt-0.5 flex items-center gap-2">
          <ArrowButton
            label="Scroll backward"
            direction="left"
            onActivate={() => startHold("backward")}
            onRelease={stopHold}
          />
          <ArrowButton
            label="Scroll forward"
            direction="right"
            onActivate={() => startHold("forward")}
            onRelease={stopHold}
          />
        </div>
      </div>
      <div
        className="relative w-screen py-6"
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <div
          className="cursor-grab overflow-hidden active:cursor-grabbing"
          ref={emblaRef}
        >
          <ul className="flex items-center">
            {slides.map((photo, i) => (
              <li
                key={`${photo.src}-${i}`}
                className="group/photo relative mr-5 aspect-[3/2] w-72 flex-none select-none overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/10 transition-transform duration-500 ease-out [will-change:transform] hover:scale-105 sm:mr-8 sm:w-[28rem] sm:rounded-3xl dark:bg-zinc-800 dark:ring-white/10"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 28rem, 18rem"
                  className="pointer-events-none object-cover"
                  style={
                    photo.objectPosition
                      ? { objectPosition: photo.objectPosition }
                      : undefined
                  }
                  draggable={false}
                  loading="lazy"
                />
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
      </div>
    </section>
  );
}

interface ArrowButtonProps {
  label: string;
  direction: "left" | "right";
  onActivate: () => void;
  onRelease: () => void;
}

function ArrowButton({
  label,
  direction,
  onActivate,
  onRelease,
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onActivate();
      }}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      onPointerLeave={onRelease}
      className="grid h-7 w-7 place-items-center rounded-full border border-zinc-900/10 bg-white/70 text-zinc-600 backdrop-blur transition-colors duration-150 hover:text-zinc-900 active:bg-white dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:active:bg-zinc-900/90"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        {direction === "left" ? (
          <polyline points="15 6 9 12 15 18" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}
