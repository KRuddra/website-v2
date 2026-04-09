"use client";

import { useTheme } from "./ThemeProvider";
import { webring } from "@/lib/data";

export default function Webring() {
  const { theme } = useTheme();
  const lionSrc = theme === "dark" ? "/lionwhite.svg" : "/lion.svg";

  return (
    <div
      className="flex items-center gap-3"
      aria-label="CS UWaterloo Webring"
    >
      <a
        href={webring.prev}
        className="text-zinc-500 transition-colors duration-150 hover:text-zinc-900 dark:hover:text-zinc-100"
        aria-label="Previous site in webring"
      >
        ←
      </a>
      <a
        href={webring.center}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-60 transition-opacity duration-150 hover:opacity-100"
        aria-label="CS UWaterloo Webring"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lionSrc}
          width={24}
          height={24}
          alt="CS UWaterloo Webring"
        />
      </a>
      <a
        href={webring.next}
        className="text-zinc-500 transition-colors duration-150 hover:text-zinc-900 dark:hover:text-zinc-100"
        aria-label="Next site in webring"
      >
        →
      </a>
    </div>
  );
}
