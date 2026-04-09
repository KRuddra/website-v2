import Image from "next/image";
import { Fragment } from "react";
import AnimateIn from "./AnimateIn";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import { bio, socialLinks } from "@/lib/data";

export default function Hero() {
  return (
    <section className="flex flex-col gap-10 pb-12">
      <AnimateIn delay={0}>
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 dark:ring-white/10">
          <Image
            src="/ruddra.png"
            alt="Ruddra Kantaria"
            fill
            priority
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
          />
        </div>
      </AnimateIn>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-none">
          <SplitText text={bio.name} delay={150} stagger={40} />
        </h1>
        <AnimateIn delay={100}>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-900 dark:text-zinc-100">
            {socialLinks.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && (
                  <li
                    aria-hidden="true"
                    className="text-zinc-400 dark:text-zinc-600"
                  >
                    /
                  </li>
                )}
                <li>
                  <Magnetic radius={50} strength={8}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-zinc-900 transition-colors duration-150 hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-400"
                    >
                      {link.label}
                    </a>
                  </Magnetic>
                </li>
              </Fragment>
            ))}
          </ul>
        </AnimateIn>
        <AnimateIn delay={200}>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-md">
            {bio.shortBio}
          </p>
        </AnimateIn>
        <AnimateIn delay={300}>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            — {bio.location}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
