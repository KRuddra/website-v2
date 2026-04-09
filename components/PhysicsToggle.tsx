"use client";

import { usePhysics } from "./PhysicsProvider";

export default function PhysicsToggle() {
  const { enabled, toggle } = usePhysics();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Turn off physics toy" : "Turn on physics toy"}
      aria-pressed={enabled}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:bg-white dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:bg-zinc-800 dark:hover:ring-white/20"
    >
      {/* A tiny falling-cube icon — a square with a motion streak below it */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        className={`h-5 w-5 transition-colors ${
          enabled
            ? "text-zinc-900 dark:text-zinc-100"
            : "text-zinc-500 dark:text-zinc-500"
        }`}
      >
        {/* Cube */}
        <rect
          x="8"
          y="10"
          width="8"
          height="8"
          rx="1.5"
          strokeLinejoin="round"
        />
        {/* Motion lines above (implying it just fell) */}
        <path
          d="M7 6.5h2M11 4.5h2M15 6.5h2"
          strokeLinecap="round"
        />
        {/* Ground line */}
        <path d="M4 20.5h16" strokeLinecap="round" />
      </svg>
    </button>
  );
}
