"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    if (window.matchMedia("(hover: none)").matches) {
      dot.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => dot.classList.add("is-hovering");
    const onLeave = () => dot.classList.remove("is-hovering");

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    const hoverables = document.querySelectorAll<HTMLElement>(
      "a, button, [data-cursor-hover]",
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed z-[99999] rounded-full bg-white"
      style={{
        width: 8,
        height: 8,
        transform: "translate(-50%, -50%)",
        willChange: "left, top",
      }}
    />
  );
}
