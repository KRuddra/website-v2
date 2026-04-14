"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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

type Mode = "normal" | "forward" | "backward";

const NORMAL_CYCLE_MS = 90_000;
const BOOST_MULTIPLIER = 3;
const SNAP_DURATION_MS = 450;

export default function PhotoCarousel() {
  const items = [...photos, ...photos];
  const ulRef = useRef<HTMLUListElement | null>(null);
  const modeRef = useRef<Mode>("normal");
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const slotRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const snapRef = useRef<
    null | { from: number; to: number; start: number }
  >(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;

    const measure = () => {
      halfWidthRef.current = ul.scrollWidth / 2;
      const li0 = ul.children[0] as HTMLElement | undefined;
      const li1 = ul.children[1] as HTMLElement | undefined;
      if (li0 && li1) {
        slotRef.current = li1.offsetLeft - li0.offsetLeft;
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    window.addEventListener("resize", measure);

    let rafId = 0;
    const step = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = ts - last;
      lastTsRef.current = ts;

      const half = halfWidthRef.current;
      if (half > 0) {
        const snap = snapRef.current;
        if (snap) {
          const t = Math.min(1, (ts - snap.start) / SNAP_DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          offsetRef.current = snap.from + (snap.to - snap.from) * eased;
          if (t >= 1) snapRef.current = null;
        } else if (!hoverRef.current || modeRef.current !== "normal") {
          const base = half / NORMAL_CYCLE_MS;
          const mode = modeRef.current;
          let v = base;
          if (mode === "forward") v = base * BOOST_MULTIPLIER;
          else if (mode === "backward") v = -base * BOOST_MULTIPLIER;
          offsetRef.current -= v * dt;
        }

        let o = offsetRef.current;
        if (o <= -half) o += half;
        else if (o > 0) o -= half;
        offsetRef.current = o;

        ul.style.transform = `translate3d(${o}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const activate = (m: Mode) => {
    modeRef.current = m;
    snapRef.current = null;
  };

  const release = () => {
    if (modeRef.current === "normal") return;
    modeRef.current = "normal";
    const slot = slotRef.current;
    if (slot > 0) {
      const from = offsetRef.current;
      const to = Math.round(from / slot) * slot;
      snapRef.current = { from, to, start: performance.now() };
    }
  };

  return (
    <section aria-label="Places">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading>Places</SectionHeading>
        <div className="mt-0.5 flex items-center gap-2">
          <ArrowButton
            label="Scroll backward"
            direction="left"
            onActivate={() => activate("backward")}
            onRelease={release}
          />
          <ArrowButton
            label="Scroll forward"
            direction="right"
            onActivate={() => activate("forward")}
            onRelease={release}
          />
        </div>
      </div>
      <div
        className="relative w-screen overflow-hidden py-6"
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <ul
          ref={ulRef}
          className="flex w-max items-center gap-5 will-change-transform sm:gap-8"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
        >
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
