import Image from "next/image";
import type { Project } from "@/types";
import { getTagColor } from "@/lib/techColors";

interface ProjectCardProps {
  project: Project;
}

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const githubLink = project.links.find(
    (l) => l.label.toLowerCase() === "github",
  );

  return (
    <article className="group relative flex flex-col gap-4 transition-transform duration-300 ease-out hover:scale-[1.03]">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-900/10 dark:bg-zinc-800 dark:ring-white/10">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 16rem, (min-width: 640px) 22rem, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          unoptimized
        />
      </div>

      {/* Title row with GitHub icon */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {project.name}
        </h3>
        {githubLink && (
          <a
            href={githubLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="flex-shrink-0 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        )}
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>

      {/* Tech tags */}
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => {
          const c = getTagColor(tag);
          return (
            <li
              key={tag}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${c.bg} ${c.text} ${c.ring}`}
            >
              {tag}
            </li>
          );
        })}
      </ul>

      {project.status === "private" && (
        <span className="text-xs text-zinc-500">Currently Private</span>
      )}
      {project.status === "coming-soon" && (
        <span className="text-xs text-zinc-500">Coming Soon</span>
      )}
    </article>
  );
}
