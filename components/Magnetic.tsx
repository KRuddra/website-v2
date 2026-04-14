"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** How far outside the element bounds the magnet still pulls, in px */
  radius?: number;
  /** Max displacement of the element toward the cursor, in px */
  strength?: number;
}

/**
 * Wraps children in a <span> and applies a gentle CSS transform that pulls
 * it toward the cursor while hovered. Uses rAF for smooth animation.
 */
export default function Magnetic({
  children,
  radius = 80,
  strength = 10,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    current.current.x += (target.current.x - current.current.x) * 0.2;
    current.current.y += (target.current.y - current.current.y) * 0.2;
    el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;
    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(
        0,
        1 - dist / (radius + Math.max(rect.width, rect.height) / 2),
      );
      target.current.x = dx * pull * (strength / 15);
      target.current.y = dy * pull * (strength / 15);
      if (rafRef.current === null)
        rafRef.current = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      if (rafRef.current === null)
        rafRef.current = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [radius, strength, animate]);

  return (
    <span
      ref={ref}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
