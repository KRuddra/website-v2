"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { bjj, gyms } from "@/lib/data";
import type { Gym } from "@/types";

// An easter egg: a plain black bar under the name gives nothing away.
//  - First click wipes the black aside to reveal a BJJ white belt, one stripe.
//  - Clicking the revealed belt opens a modal with my jiu-jitsu training history.

export default function BjjBelt() {
  const [revealed, setRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={
          revealed
            ? "Brazilian jiu-jitsu white belt — view training history"
            : "Click to reveal"
        }
        aria-haspopup={revealed ? "dialog" : undefined}
        className={`group relative h-7 w-48 shrink-0 cursor-pointer select-none overflow-hidden rounded-[4px] shadow-md ring-1 ring-zinc-900/20 transition-transform duration-300 ease-out hover:-translate-y-0.5 dark:ring-white/15 ${
          revealed ? "[animation:bjj-pop_0.45s_ease-out]" : ""
        }`}
      >
        {/* --- the belt, waiting underneath --- */}
        {/* woven cotton base */}
        <span className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff_0%,#f1f2f4_45%,#dfe1e6_100%)]" />
        {/* vertical weave ribbing */}
        <span
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.055) 0 1px, rgba(0,0,0,0) 1px 3px)",
          }}
        />
        {/* top sheen + bottom shade for rounded fabric depth */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/[0.07] to-transparent" />
        {/* lengthwise stitching rows (dashed = individual stitches) */}
        {[6, 9, 18, 21].map((top) => (
          <span
            key={top}
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{
              top: `${top}px`,
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(63,63,70,0.4) 0 3px, transparent 3px 6px)",
            }}
          />
        ))}
        {/* black rank bar, sewn in from the right tip */}
        <span className="absolute inset-y-0 right-5 w-12 bg-[linear-gradient(to_bottom,#27272a,#09090b)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),inset_1px_0_2px_rgba(0,0,0,0.6),inset_-1px_0_2px_rgba(0,0,0,0.6)]">
          {/* stitching where the bar is sewn onto the belt */}
          <span
            className="pointer-events-none absolute inset-y-0 left-[2px] w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.28) 0 2px, transparent 2px 4px)",
            }}
          />
          <span
            className="pointer-events-none absolute inset-y-0 right-[2px] w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.28) 0 2px, transparent 2px 4px)",
            }}
          />
          {/* one stripe — a strip of white athletic tape */}
          <span className="absolute inset-y-[3px] right-2.5 w-[6px] rounded-[1px] bg-[linear-gradient(to_bottom,#ffffff,#e7e7ea)] shadow-[0_0_1px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]" />
        </span>

        {/* --- the black cover that wipes away on the first click --- */}
        <span
          className={`absolute inset-0 flex items-center justify-center bg-zinc-950 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
            revealed ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {/* "click" hint — only while hidden, only on hover */}
          {!revealed && (
            <span className="pointer-events-none flex items-center gap-1 text-white/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              </svg>
              <span className="text-[10px] font-medium uppercase tracking-[0.08em]">
                click
              </span>
            </span>
          )}
        </span>
      </button>

      {modalOpen && <BjjModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

type View = "hub" | "journey" | "history" | "notes";

const TITLES: Record<View, string> = {
  hub: "Brazillian Jiu-jitsu",
  journey: "My journey",
  history: "Training history",
  notes: "Study notes",
};

function BjjModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("hub");
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Escape steps back to the hub first, then closes.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (view !== "hub") setView("hub");
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [view, onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-md [animation:bjj-fade_0.2s_ease-out] dark:bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bjj-modal-title"
        className="relative flex max-h-[85vh] w-full max-w-md flex-col rounded-3xl bg-white/70 shadow-xl ring-1 ring-zinc-900/10 backdrop-blur-xl backdrop-saturate-150 [animation:bjj-rise_0.3s_cubic-bezier(0.16,1,0.3,1)] dark:bg-zinc-900/70 dark:ring-white/10"
      >
        {/* header */}
        <div className="flex items-center gap-2 px-6 pt-5 pb-4">
          {view !== "hub" && (
            <button
              type="button"
              onClick={() => setView("hub")}
              aria-label="Back"
              className="-ml-1.5 grid h-7 w-7 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-900/[0.06] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          <h2
            id="bjj-modal-title"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {TITLES[view]}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto grid h-7 w-7 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-900/[0.06] hover:text-zinc-900 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* body — fades on each view change */}
        <div
          key={view}
          className="overflow-y-auto px-6 pb-6 [animation:bjj-fade_0.22s_ease-out]"
        >
          {view === "hub" && <Hub onSelect={setView} />}
          {view === "journey" && <Journey />}
          {view === "history" && <TrainingHistory />}
          {view === "notes" && <StudyNotes />}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Hub({ onSelect }: { onSelect: (v: View) => void }) {
  const items: {
    id: Exclude<View, "hub">;
    title: string;
    subtitle: string;
    badge?: string;
    icon: ReactNode;
  }[] = [
    {
      id: "journey",
      title: "My journey",
      subtitle: "How I started",
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
        </>
      ),
    },
    {
      id: "history",
      title: "Training history",
      subtitle: `${gyms.length} gyms so far`,
      icon: (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ),
    },
    {
      id: "notes",
      title: "Study notes",
      subtitle: "Synced from Obsidian",
      badge: "In progress",
      icon: (
        <>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip>{`${bjj.belt}, ${bjj.stripes === 1 ? "one stripe" : `${bjj.stripes} stripes`}`}</Chip>
        <Chip>{bjj.style}</Chip>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="group/card flex w-full items-center gap-3.5 rounded-2xl p-3 text-left ring-1 ring-zinc-900/[0.07] transition-colors hover:bg-zinc-900/[0.03] dark:ring-white/[0.08] dark:hover:bg-white/[0.04]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-900/[0.05] text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="block text-sm text-zinc-500 dark:text-zinc-400">
                {item.subtitle}
              </span>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-auto h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover/card:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function Journey() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip>{bjj.belt}</Chip>
        <Chip>{bjj.style}</Chip>
        <Chip>{`Since ${bjj.startedAt}`}</Chip>
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
        {bjj.journey.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

function TrainingHistory() {
  return (
    <ol className="space-y-5 pt-1">
      {gyms.map((gym, i) => (
        <li key={gym.name} className="relative flex gap-3.5">
          {/* circular gym logo doubles as the timeline node */}
          <div className="flex flex-col items-center">
            <GymAvatar gym={gym} />
            {i < gyms.length - 1 && (
              <span className="mt-1.5 w-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            )}
          </div>

          <div className="pt-2 pb-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {gym.name}
              </span>
              {gym.note && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    gym.current
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-zinc-900/[0.06] text-zinc-500 dark:bg-white/[0.08] dark:text-zinc-400"
                  }`}
                >
                  {gym.note}
                </span>
              )}
            </div>
            {(gym.location || gym.duration) && (
              <div className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {gym.location}
                {gym.location && gym.duration && " · "}
                {gym.duration}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function StudyNotes() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900/[0.05] text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </span>
      <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
        I&apos;m wiring up my Obsidian vault to publish my jiu-jitsu notes here —
        techniques, drill breakdowns, and things to fix.
      </p>
      <span className="mt-3 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
        In progress
      </span>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-zinc-900/[0.06] px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-300">
      {children}
    </span>
  );
}

// Circular gym logo — the full logo, centered on white. Falls back to the gym's
// initial when no image is present (or the file fails to load).
function GymAvatar({ gym }: { gym: Gym }) {
  const [errored, setErrored] = useState(false);
  const initial = gym.name.trim().charAt(0).toUpperCase();

  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
      {gym.image && !errored ? (
        <Image
          src={gym.image}
          alt={`${gym.name} logo`}
          width={44}
          height={44}
          className="h-full w-full scale-[0.9] object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {initial}
        </span>
      )}
    </div>
  );
}
