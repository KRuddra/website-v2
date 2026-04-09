export type ProjectStatus = "live" | "private" | "coming-soon";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  description: string;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  status: ProjectStatus;
  image: string;
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

export interface SkillCategory {
  label: string;
  items: string[];
}
