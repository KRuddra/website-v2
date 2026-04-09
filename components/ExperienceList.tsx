import AnimateIn from "./AnimateIn";
import SectionHeading from "./SectionHeading";
import { experience, education } from "@/lib/data";

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

function HoverArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-3 w-3 flex-shrink-0 -translate-x-1 text-zinc-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-zinc-400"
    >
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface RowProps {
  logoLabel: string;
  title: string;
  subtitle: string;
  dates: string;
  description: string;
  url?: string;
}

function Row({ logoLabel, title, subtitle, dates, description, url }: RowProps) {
  const Wrapper: React.ElementType = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <Wrapper {...wrapperProps} className="group block py-2">
      <div className="flex items-baseline gap-3">
        <PlaceholderLogo label={logoLabel} />
        <div className="flex flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-500">·</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </span>
        </div>
        <span className="flex-shrink-0 whitespace-nowrap text-xs text-zinc-500 tabular-nums dark:text-zinc-500">
          {dates}
        </span>
      </div>
      <div className="ml-11 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="flex items-start gap-2 pt-0 opacity-0 transition-all delay-100 duration-200 group-hover:pt-1.5 group-hover:opacity-100">
            <div className="pt-[5px]">
              <HoverArrow />
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default function ExperienceList() {
  return (
    <section className="space-y-10">
      <div>
        <AnimateIn>
          <SectionHeading>Experience</SectionHeading>
        </AnimateIn>
        <ul className="space-y-1">
          {experience.map((item, idx) => (
            <li key={`${item.company}-${idx}`}>
              <AnimateIn delay={Math.min(idx * 60, 240)}>
                <Row
                  logoLabel={item.company}
                  title={item.company}
                  subtitle={item.role}
                  dates={item.dates}
                  description={item.description}
                  url={item.url}
                />
              </AnimateIn>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <AnimateIn>
          <SectionHeading>Education</SectionHeading>
        </AnimateIn>
        <ul className="space-y-1">
          {education.map((item, idx) => (
            <li key={`${item.institution}-${idx}`}>
              <AnimateIn delay={idx * 60}>
                <Row
                  logoLabel={item.institution}
                  title={item.institution}
                  subtitle={item.degree}
                  dates={item.dates}
                  description={item.detail ?? ""}
                  url={item.url}
                />
              </AnimateIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
