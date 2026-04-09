"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface PhysicsContextValue {
  enabled: boolean;
  toggle: () => void;
}

const PhysicsContext = createContext<PhysicsContextValue | undefined>(undefined);

export function PhysicsProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("physics-toy");
      if (stored === "on") setEnabled(true);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("physics-toy", next ? "on" : "off");
      } catch {}
      return next;
    });
  }, []);

  return (
    <PhysicsContext.Provider value={{ enabled, toggle }}>
      {children}
    </PhysicsContext.Provider>
  );
}

export function usePhysics(): PhysicsContextValue {
  const ctx = useContext(PhysicsContext);
  if (!ctx) return { enabled: false, toggle: () => {} };
  return ctx;
}
