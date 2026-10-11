import Link from "next/link";
import AnimateIn from "./AnimateIn";
import ProjectRow from "./ProjectRow";
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
      <ul className="space-y-1">
        {featured.map((project, idx) => (
          <li key={project.name}>
            <AnimateIn delay={idx * 100}>
              <ProjectRow project={project} />
            </AnimateIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
