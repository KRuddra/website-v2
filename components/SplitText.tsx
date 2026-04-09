"use client";

import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the whole animation begins, in ms */
  delay?: number;
  /** Per-character stagger in ms */
  stagger?: number;
}

/**
 * Splits a string into individual characters and fades/slides each one in.
 * Whitespace is preserved as non-animated spacers so layout stays stable.
 */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 35,
}: SplitTextProps) {
  const [mounted, setMounted] = useState(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = window.setTimeout(() => setMounted(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);

  const chars = Array.from(text);

  return (
    <span
      aria-label={text}
      className={className}
      style={{ display: "inline-block" }}
    >
      {chars.map((ch, i) => {
        if (ch === " ") {
          return (
            <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.25em" }}>
              {"\u00A0"}
            </span>
          );
        }
        const visible = mounted || reduceRef.current;
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(0.5em)",
              opacity: visible ? 1 : 0,
              transition: `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
                i * stagger
              }ms, opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${i * stagger}ms`,
              willChange: "transform, opacity",
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
