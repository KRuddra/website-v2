import AnimateIn from "./AnimateIn";
import SectionHeading from "./SectionHeading";
import { skills } from "@/lib/data";
import { getTagColor } from "@/lib/techColors";

export default function Skills() {
  return (
    <section>
      <AnimateIn>
        <SectionHeading>Skills</SectionHeading>
      </AnimateIn>
      <ul className="space-y-4">
        {skills.map((category, idx) => (
          <li key={category.label}>
            <AnimateIn delay={idx * 80}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="w-28 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => {
                    const color = getTagColor(item);
                    return (
                      <span
                        key={item}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${color.bg} ${color.text} ${color.ring}`}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </AnimateIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
