import Webring from "./Webring";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 flex flex-col items-start gap-6 border-t border-zinc-900/[0.07] pt-8 pb-12 dark:border-white/[0.07]">
      <Webring />
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 underline-offset-4 transition-colors duration-150 hover:text-zinc-900 hover:underline dark:text-zinc-500 dark:hover:text-zinc-100"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs text-zinc-500 dark:text-zinc-600">
        © {year} Ruddra Kantaria
      </p>
    </footer>
  );
}
