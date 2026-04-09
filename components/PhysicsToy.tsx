"use client";

import { useEffect, useRef } from "react";
import { usePhysics } from "./PhysicsProvider";

/**
 * A subtle physics "toy" — a single square that falls with gravity,
 * bounces off the viewport edges, and can be grabbed + tossed with the pointer.
 *
 * The canvas is always pointer-events:none. We forward global window pointer
 * events directly into matter.js's Mouse object so drags never break when the
 * cursor moves faster than the body can follow.
 */
export default function PhysicsToy() {
  const { enabled } = usePhysics();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const Matter = await import("matter-js");
      if (destroyed) return;

      const {
        Engine,
        Render,
        Runner,
        Bodies,
        Body,
        World,
        Mouse,
        MouseConstraint,
        Query,
      } = Matter;

      const getSize = () => ({
        w: window.innerWidth,
        h: window.innerHeight,
      });
      const { w: initialW, h: initialH } = getSize();

      const engine = Engine.create();
      engine.gravity.y = 1;
      engine.gravity.scale = 0.0013;
      // Higher position iterations = tighter drag tracking, no tunneling
      engine.positionIterations = 10;
      engine.velocityIterations = 10;
      engine.constraintIterations = 4;

      const render = Render.create({
        element: container,
        engine,
        options: {
          width: initialW,
          height: initialH,
          background: "transparent",
          wireframes: false,
          pixelRatio: window.devicePixelRatio || 1,
        },
      });

      const isDark = () => document.documentElement.classList.contains("dark");
      const fillFor = (dark: boolean) => (dark ? "#f4f4f5" : "#18181b");
      const strokeFor = (dark: boolean) => (dark ? "#ffffff22" : "#00000022");

      const size = 40;
      const block = Bodies.rectangle(initialW - 140, 80, size, size, {
        restitution: 0.5,
        friction: 0.08,
        frictionAir: 0.012,
        density: 0.003,
        chamfer: { radius: 6 },
        render: {
          fillStyle: fillFor(isDark()),
          strokeStyle: strokeFor(isDark()),
          lineWidth: 1,
        },
      });

      // Invisible walls that track the viewport
      const wallThickness = 200;
      const makeWalls = (w: number, h: number) => [
        Bodies.rectangle(w / 2, h + wallThickness / 2, w + wallThickness * 2, wallThickness, {
          isStatic: true,
          render: { visible: false },
        }),
        Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h * 2, {
          isStatic: true,
          render: { visible: false },
        }),
        Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h * 2, {
          isStatic: true,
          render: { visible: false },
        }),
        Bodies.rectangle(w / 2, -wallThickness / 2, w + wallThickness * 2, wallThickness, {
          isStatic: true,
          render: { visible: false },
        }),
      ];
      let walls = makeWalls(initialW, initialH);
      World.add(engine.world, [block, ...walls]);

      // --- Mouse / drag setup ---------------------------------------------
      // Create a Mouse bound to a dummy element, then strip its listeners so
      // we can drive it entirely from window pointer events. This gives us
      // tight tracking no matter how fast the cursor moves.
      const canvas = render.canvas;
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.pointerEvents = "none";

      const mouse = Mouse.create(canvas);
      // Detach matter's default listeners so they don't fight ours.
      // @ts-expect-error — private fields
      canvas.removeEventListener("mousemove", mouse.mousemove);
      // @ts-expect-error — private fields
      canvas.removeEventListener("mousedown", mouse.mousedown);
      // @ts-expect-error — private fields
      canvas.removeEventListener("mouseup", mouse.mouseup);
      // @ts-expect-error — private fields
      canvas.removeEventListener("touchmove", mouse.touchmove);
      // @ts-expect-error — private fields
      canvas.removeEventListener("touchstart", mouse.touchstart);
      // @ts-expect-error — private fields
      canvas.removeEventListener("touchend", mouse.touchend);
      // @ts-expect-error — private fields
      if (mouse.mousewheel) canvas.removeEventListener("wheel", mouse.mousewheel);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          // Stiff enough to track fast motion without ripping the body apart
          stiffness: 0.7,
          damping: 0.08,
          render: { visible: false },
        },
      });
      World.add(engine.world, mouseConstraint);

      // Track pointer state manually
      let pointerDown = false;
      let latestX = -1000;
      let latestY = -1000;

      const setMousePos = (x: number, y: number) => {
        mouse.absolute.x = x;
        mouse.absolute.y = y;
        mouse.position.x = x;
        mouse.position.y = y;
      };

      const onPointerMove = (e: PointerEvent) => {
        latestX = e.clientX;
        latestY = e.clientY;
        setMousePos(latestX, latestY);
      };

      const onPointerDown = (e: PointerEvent) => {
        latestX = e.clientX;
        latestY = e.clientY;
        setMousePos(latestX, latestY);
        // Only engage the constraint if the press started over the block
        const hits = Query.point([block], { x: latestX, y: latestY });
        if (hits.length > 0) {
          pointerDown = true;
          mouse.button = 0;
          // Lock the page cursor so native selection doesn't fight the drag
          document.body.style.userSelect = "none";
        }
      };

      const onPointerUp = () => {
        if (pointerDown) {
          pointerDown = false;
          mouse.button = -1;
          document.body.style.userSelect = "";
        }
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      window.addEventListener("pointercancel", onPointerUp, { passive: true });

      // Run physics + render
      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      // Resize handling
      const onResize = () => {
        const { w, h } = getSize();
        render.canvas.width = w * (window.devicePixelRatio || 1);
        render.canvas.height = h * (window.devicePixelRatio || 1);
        render.canvas.style.width = `${w}px`;
        render.canvas.style.height = `${h}px`;
        render.options.width = w;
        render.options.height = h;
        Render.setPixelRatio(render, window.devicePixelRatio || 1);
        World.remove(engine.world, walls);
        walls = makeWalls(w, h);
        World.add(engine.world, walls);
        if (block.position.x > w - size)
          Body.setPosition(block, { x: w - size, y: block.position.y });
        if (block.position.y > h - size)
          Body.setPosition(block, { x: block.position.x, y: h - size });
      };
      window.addEventListener("resize", onResize);

      // Recolor on theme change
      const themeObserver = new MutationObserver(() => {
        const dark = isDark();
        block.render.fillStyle = fillFor(dark);
        block.render.strokeStyle = strokeFor(dark);
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        document.body.style.userSelect = "";
        themeObserver.disconnect();
        Render.stop(render);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
        if (render.canvas.parentNode)
          render.canvas.parentNode.removeChild(render.canvas);
        render.textures = {};
      };
    })();

    return () => {
      destroyed = true;
      if (cleanup) cleanup();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    />
  );
}
