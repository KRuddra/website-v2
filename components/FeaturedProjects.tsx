import Link from "next/link";
import AnimateIn from "./AnimateIn";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/data";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section>
      <div className="mb-8 flex items-start justify-between">
        <AnimateIn>
          <SectionHeading>Featured Projects</SectionHeading>
        </AnimateIn>
        <Link
          href="/projects"
          className="mt-1 text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
        >
          All projects →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
        {featured.map((project, idx) => (
          <AnimateIn key={project.name} delay={idx * 100}>
            <ProjectCard project={project} />
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
