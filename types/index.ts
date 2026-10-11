export type ProjectStatus = "live" | "private" | "coming-soon";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  /** Display date, also used for newest-first ordering (e.g. "Sep 2025"). */
  date: string;
  description: string;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  status: ProjectStatus;
  featured?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  url?: string;
  dates: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  url?: string;
  dates: string;
  badge?: string;
  detail?: string;
}

export interface Gym {
  name: string;
  location?: string;
  note?: string;
  duration?: string;
  current?: boolean;
  /** Path to a square logo/photo under /public; falls back to initials if absent. */
  image?: string;
}
