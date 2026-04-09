import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I've built — side projects, hackathon work, and tools I made for myself.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-12">
      <AnimateIn>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Things I&apos;ve built.
        </h1>
      </AnimateIn>
      <AnimateIn delay={100}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          A mix of side projects, hackathon hacks, and tools I built for
          myself. Some are open source, some are still in progress.
        </p>
      </AnimateIn>

      <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <li key={project.name}>
            <AnimateIn delay={Math.min(idx * 80, 320)}>
              <ProjectCard project={project} />
            </AnimateIn>
          </li>
        ))}
      </ul>

      <AnimateIn>
        <div className="mt-24 flex flex-col items-center gap-3 border-t border-zinc-900/[0.07] pt-12 text-center dark:border-white/[0.07]">
          <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            More on GitHub
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            I build in the open. Source for most projects is public.
          </p>
          <a
            href="https://github.com/kruddra"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-lg border border-zinc-900/15 px-5 py-2.5 text-sm text-zinc-700 transition-colors duration-150 hover:border-zinc-900/30 hover:bg-zinc-900/[0.04] dark:border-white/20 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:bg-white/[0.06]"
          >
            github.com/kruddra →
          </a>
        </div>
      </AnimateIn>
    </div>
  );
}
