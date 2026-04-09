// Color-coded tech tag classes. Tailwind utility strings only —
// no dynamic class names so the JIT picks them up at build time.

interface TagColor {
  bg: string;
  text: string;
  ring: string;
}

const TAG_COLORS: Record<string, TagColor> = {
  Python: {
    bg: "bg-yellow-100 dark:bg-yellow-500/10",
    text: "text-yellow-800 dark:text-yellow-300",
    ring: "ring-yellow-600/20 dark:ring-yellow-500/30",
  },
  JavaScript: {
    bg: "bg-yellow-100 dark:bg-yellow-500/10",
    text: "text-yellow-800 dark:text-yellow-300",
    ring: "ring-yellow-600/20 dark:ring-yellow-500/30",
  },
  TypeScript: {
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-800 dark:text-blue-300",
    ring: "ring-blue-600/20 dark:ring-blue-500/30",
  },
  React: {
    bg: "bg-cyan-100 dark:bg-cyan-500/10",
    text: "text-cyan-800 dark:text-cyan-300",
    ring: "ring-cyan-600/20 dark:ring-cyan-500/30",
  },
  "Next.js": {
    bg: "bg-zinc-200 dark:bg-zinc-700/40",
    text: "text-zinc-800 dark:text-zinc-200",
    ring: "ring-zinc-600/20 dark:ring-zinc-500/30",
  },
  "Node.js": {
    bg: "bg-green-100 dark:bg-green-500/10",
    text: "text-green-800 dark:text-green-300",
    ring: "ring-green-600/20 dark:ring-green-500/30",
  },
  MongoDB: {
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
    text: "text-emerald-800 dark:text-emerald-300",
    ring: "ring-emerald-600/20 dark:ring-emerald-500/30",
  },
  PostgreSQL: {
    bg: "bg-sky-100 dark:bg-sky-500/10",
    text: "text-sky-800 dark:text-sky-300",
    ring: "ring-sky-600/20 dark:ring-sky-500/30",
  },
  OpenCV: {
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
    text: "text-emerald-800 dark:text-emerald-300",
    ring: "ring-emerald-600/20 dark:ring-emerald-500/30",
  },
  Selenium: {
    bg: "bg-lime-100 dark:bg-lime-500/10",
    text: "text-lime-800 dark:text-lime-300",
    ring: "ring-lime-600/20 dark:ring-lime-500/30",
  },
  BeautifulSoup: {
    bg: "bg-orange-100 dark:bg-orange-500/10",
    text: "text-orange-800 dark:text-orange-300",
    ring: "ring-orange-600/20 dark:ring-orange-500/30",
  },
  Azure: {
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-800 dark:text-blue-300",
    ring: "ring-blue-600/20 dark:ring-blue-500/30",
  },
  TensorFlow: {
    bg: "bg-orange-100 dark:bg-orange-500/10",
    text: "text-orange-800 dark:text-orange-300",
    ring: "ring-orange-600/20 dark:ring-orange-500/30",
  },
  "scikit-learn": {
    bg: "bg-amber-100 dark:bg-amber-500/10",
    text: "text-amber-800 dark:text-amber-300",
    ring: "ring-amber-600/20 dark:ring-amber-500/30",
  },
  "AI/ML": {
    bg: "bg-pink-100 dark:bg-pink-500/10",
    text: "text-pink-800 dark:text-pink-300",
    ring: "ring-pink-600/20 dark:ring-pink-500/30",
  },
  "Full-Stack": {
    bg: "bg-violet-100 dark:bg-violet-500/10",
    text: "text-violet-800 dark:text-violet-300",
    ring: "ring-violet-600/20 dark:ring-violet-500/30",
  },
  "Hack the North": {
    bg: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-800 dark:text-red-300",
    ring: "ring-red-600/20 dark:ring-red-500/30",
  },
  SLAM: {
    bg: "bg-indigo-100 dark:bg-indigo-500/10",
    text: "text-indigo-800 dark:text-indigo-300",
    ring: "ring-indigo-600/20 dark:ring-indigo-500/30",
  },
  YOLO: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-500/10",
    text: "text-fuchsia-800 dark:text-fuchsia-300",
    ring: "ring-fuchsia-600/20 dark:ring-fuchsia-500/30",
  },
  Whisper: {
    bg: "bg-teal-100 dark:bg-teal-500/10",
    text: "text-teal-800 dark:text-teal-300",
    ring: "ring-teal-600/20 dark:ring-teal-500/30",
  },
  Docker: {
    bg: "bg-sky-100 dark:bg-sky-500/10",
    text: "text-sky-800 dark:text-sky-300",
    ring: "ring-sky-600/20 dark:ring-sky-500/30",
  },
  "MCP Servers": {
    bg: "bg-purple-100 dark:bg-purple-500/10",
    text: "text-purple-800 dark:text-purple-300",
    ring: "ring-purple-600/20 dark:ring-purple-500/30",
  },
  Gemini: {
    bg: "bg-indigo-100 dark:bg-indigo-500/10",
    text: "text-indigo-800 dark:text-indigo-300",
    ring: "ring-indigo-600/20 dark:ring-indigo-500/30",
  },
  Ruby: {
    bg: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-800 dark:text-red-300",
    ring: "ring-red-600/20 dark:ring-red-500/30",
  },
  Java: {
    bg: "bg-orange-100 dark:bg-orange-500/10",
    text: "text-orange-800 dark:text-orange-300",
    ring: "ring-orange-600/20 dark:ring-orange-500/30",
  },
  C: {
    bg: "bg-slate-100 dark:bg-slate-500/10",
    text: "text-slate-800 dark:text-slate-300",
    ring: "ring-slate-600/20 dark:ring-slate-500/30",
  },
  "C++": {
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-800 dark:text-blue-300",
    ring: "ring-blue-600/20 dark:ring-blue-500/30",
  },
  "C#": {
    bg: "bg-violet-100 dark:bg-violet-500/10",
    text: "text-violet-800 dark:text-violet-300",
    ring: "ring-violet-600/20 dark:ring-violet-500/30",
  },
  "HTML/CSS": {
    bg: "bg-orange-100 dark:bg-orange-500/10",
    text: "text-orange-800 dark:text-orange-300",
    ring: "ring-orange-600/20 dark:ring-orange-500/30",
  },
  SQL: {
    bg: "bg-sky-100 dark:bg-sky-500/10",
    text: "text-sky-800 dark:text-sky-300",
    ring: "ring-sky-600/20 dark:ring-sky-500/30",
  },
  Bash: {
    bg: "bg-zinc-200 dark:bg-zinc-700/40",
    text: "text-zinc-800 dark:text-zinc-200",
    ring: "ring-zinc-600/20 dark:ring-zinc-500/30",
  },
  Git: {
    bg: "bg-orange-100 dark:bg-orange-500/10",
    text: "text-orange-800 dark:text-orange-300",
    ring: "ring-orange-600/20 dark:ring-orange-500/30",
  },
  AWS: {
    bg: "bg-amber-100 dark:bg-amber-500/10",
    text: "text-amber-800 dark:text-amber-300",
    ring: "ring-amber-600/20 dark:ring-amber-500/30",
  },
  GCP: {
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-800 dark:text-blue-300",
    ring: "ring-blue-600/20 dark:ring-blue-500/30",
  },
  Kubernetes: {
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-800 dark:text-blue-300",
    ring: "ring-blue-600/20 dark:ring-blue-500/30",
  },
  Redis: {
    bg: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-800 dark:text-red-300",
    ring: "ring-red-600/20 dark:ring-red-500/30",
  },
  Supabase: {
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
    text: "text-emerald-800 dark:text-emerald-300",
    ring: "ring-emerald-600/20 dark:ring-emerald-500/30",
  },
  "Express.js": {
    bg: "bg-zinc-200 dark:bg-zinc-700/40",
    text: "text-zinc-800 dark:text-zinc-200",
    ring: "ring-zinc-600/20 dark:ring-zinc-500/30",
  },
  Tailwind: {
    bg: "bg-cyan-100 dark:bg-cyan-500/10",
    text: "text-cyan-800 dark:text-cyan-300",
    ring: "ring-cyan-600/20 dark:ring-cyan-500/30",
  },
  Flask: {
    bg: "bg-zinc-200 dark:bg-zinc-700/40",
    text: "text-zinc-800 dark:text-zinc-200",
    ring: "ring-zinc-600/20 dark:ring-zinc-500/30",
  },
};

const DEFAULT_COLOR: TagColor = {
  bg: "bg-zinc-100 dark:bg-zinc-800/60",
  text: "text-zinc-700 dark:text-zinc-300",
  ring: "ring-zinc-500/20 dark:ring-zinc-500/30",
};

export function getTagColor(tag: string): TagColor {
  return TAG_COLORS[tag] ?? DEFAULT_COLOR;
}
