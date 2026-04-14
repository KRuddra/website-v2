"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import PhysicsToggle from "./PhysicsToggle";
import Magnetic from "./Magnetic";

const links = [
  { href: "/", label: "Home", external: false },
  { href: "/projects", label: "Projects", external: false },
  { href: "/resume.pdf", label: "Resume", external: true },
];

export default function Nav() {
  return (
    <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
      <div className="pointer-events-auto mx-auto w-full max-w-3xl px-6 sm:px-8">
        <div className="relative flex items-center justify-end gap-4">
          {/* Floating pill nav */}
          <nav className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
              {links.map((link) => (
                <li key={link.href}>
                  <Magnetic radius={40} strength={6}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block rounded-full px-3 py-2 transition-colors duration-150 hover:bg-zinc-900/[0.06] active:bg-zinc-900/[0.10] dark:hover:bg-white/[0.08] dark:active:bg-white/[0.12]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="relative block rounded-full px-3 py-2 transition-colors duration-150 hover:bg-zinc-900/[0.06] active:bg-zinc-900/[0.10] dark:hover:bg-white/[0.08] dark:active:bg-white/[0.12]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </Magnetic>
                </li>
              ))}
            </ul>
          </nav>

          {/* Toggles on the right */}
          <div className="pointer-events-auto flex items-center gap-2">
            <PhysicsToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
