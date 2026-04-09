"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A section label with a thin underline that fills horizontally based on
 * how far the user has scrolled through the section's content. Feels like
 * a reading-progress cue tied specifically to that block.
 */
export default function SectionHeading({ children }: { children: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const section = el.parentElement; // the <section> or <div> that owns this heading
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the top of the section hits the bottom of the viewport,
      // 1 when the bottom of the section reaches the top of the viewport.
      const total = rect.height + viewport;
      const scrolled = viewport - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="mb-6 inline-flex flex-col">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
        {children}
      </h2>
      <div className="mt-2 h-px w-24 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-zinc-900 dark:bg-zinc-100"
          style={{
            width: `${progress * 100}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>
    </div>
  );
}
