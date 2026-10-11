import type { Project } from "@/types";
import { getTagColor } from "@/lib/techColors";

function PlaceholderLogo({ label }: { label: string }) {
  const initial = label.charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-zinc-200 text-[11px] font-semibold text-zinc-600 ring-1 ring-zinc-900/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10"
    >
      {initial}
    </div>
  );
}

// Primary destination for the whole row: prefer a live/demo link over source.
const LINK_PRIORITY = ["live", "demo", "github"];

function primaryHref(project: Project): string | undefined {
  const sorted = [...project.links].sort(
    (a, b) =>
      LINK_PRIORITY.indexOf(a.label.toLowerCase()) -
      LINK_PRIORITY.indexOf(b.label.toLowerCase()),
  );
  return sorted[0]?.href;
}

export default function ProjectRow({ project }: { project: Project }) {
  const href = primaryHref(project);
  const Wrapper: React.ElementType = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper {...wrapperProps} className="group block py-2">
      <div className="flex items-baseline gap-3">
        <PlaceholderLogo label={project.name} />
        <div className="flex flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-500">·</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </span>
        </div>
        <span className="flex-shrink-0 whitespace-nowrap text-xs text-zinc-500 tabular-nums dark:text-zinc-500">
          {project.date}
        </span>
      </div>
      <div className="ml-11 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="pt-0 opacity-0 transition-all delay-100 duration-200 group-hover:pt-1.5 group-hover:opacity-100">
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {project.description}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
