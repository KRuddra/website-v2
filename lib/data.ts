import type {
  Project,
  ExperienceItem,
  EducationItem,
  SkillCategory,
} from "@/types";

export const bio = {
  name: "Ruddra Kantaria",
  shortBio:
    "Computer science student at the University of Waterloo. Currently building Atelier, an AI product analytics start-up. Previously at Shopify, BlueDot, and ConneXU.",
  location: "Based in Toronto, Canada",
  longBio:
    "I'm a computer science student at the University of Waterloo (BCS, 2024–2028). Co-founder and founding engineer at Atelier. I care about AI systems, data infrastructure, and building products that people actually use.",
};

export const socialLinks: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/kruddra" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ruddra-kantaria" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1PVpd51QclQeG30ahNOBqAzfiJfYdrxBC/view?usp=sharing",
  },
  { label: "Email", href: "mailto:ruddra.kantaria@uwaterloo.ca" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Co-Founder, Founding Engineer",
    company: "Atelier",
    dates: "Dec 2025 — Present",
    description:
      "Co-founded an AI-driven product analytics start-up backed by Telora ($60K). Built an end-to-end ingestion pipeline and a LangChain-powered engine that turns analytics into deployable UI/UX changes.",
  },
  {
    role: "Software Engineering Intern",
    company: "Shopify",
    dates: "May 2026 — Sep 2026",
    description:
      "Led a 100% uptime migration off legacy APIs, backfilling 5B+ rows. Designed Ruby on Rails GraphQL APIs powering cash management for 2M+ retailers, and shipped POS features in React Native + TypeScript.",
  },
  {
    role: "Software Engineer (Intern → Part-time)",
    company: "BlueDot",
    url: "https://bluedot.global/",
    dates: "May 2025 — Nov 2025",
    description:
      "Architected a Python + Azure ETL pipeline that cut ingestion time by 56% and saved $150K/year for epidemiologists. Improved data throughput by 50 GB/day and access latency by 71%.",
  },
  {
    role: "Co-Founder",
    company: "Quetzal",
    url: "https://www.quetzal.co.in/",
    dates: "Aug 2023 — Aug 2025",
    description:
      "Co-founded a quantum education start-up that taught 2,500+ students across 25+ countries, with partnerships at the University of Waterloo and the Perimeter Institute.",
  },
  {
    role: "Software Engineering Intern",
    company: "ConneXU",
    dates: "May 2024 — Sep 2024",
    description:
      "Grew the user base by 500+ on a SaaS AI platform deployed to AWS ECS. Implemented Supabase RPC semantic search across 10K+ events and a Redis-backed map view that cut payload by 95%.",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Waterloo",
    url: "https://uwaterloo.ca/future-students/programs/computer-science",
    dates: "Sep 2024 — Apr 2028",
    badge: "B.C.S.",
    detail:
      "Coursework: Data Structures, Algorithms, OOP, Operating Systems",
  },
];

export const skills: SkillCategory[] = [
  {
    label: "Languages",
    items: [
      "Java",
      "Python",
      "Ruby",
      "JavaScript",
      "TypeScript",
      "C",
      "C++",
      "C#",
      "HTML/CSS",
      "SQL",
      "Bash",
    ],
  },
  {
    label: "Technologies",
    items: [
      "Git",
      "AWS",
      "GCP",
      "Azure",
      "MCP Servers",
      "Docker",
      "Kubernetes",
      "Redis",
      "Supabase",
      "MongoDB",
    ],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Node.js",
      "Next.js",
      "Express.js",
      "Tailwind",
      "Flask",
      "TensorFlow",
      "OpenCV",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "BeyondSight",
    summary:
      "Hack the North winner — a hardware + AI navigation system for individuals who are deafblind.",
    description:
      "Selected as a track winner out of 2,000+ hackers and 300+ projects at Hack the North. Built a full-stack hardware + AI system enabling navigation and communication for individuals who are deafblind, using AI-powered text-to-speech, a vest with haptic motors, and a braille-enabled gauntlet. Integrated OpenAI Whisper with in-house optimizations that improved transcription accuracy by 15% and reduced latency by 21%.",
    tags: ["Python", "SLAM", "YOLO", "Whisper", "Docker"],
    links: [
      {
        label: "Demo",
        href: "https://devpost.com/software/beyondsight-589mh7",
      },
      {
        label: "GitHub",
        href: "https://github.com/WhyILived/HTN",
      },
    ],
    status: "live",
    image: "https://picsum.photos/seed/beyondsight/800/600",
    featured: true,
  },
  {
    name: "FATELESS Studios",
    summary:
      "Hack the Valley winner — an MCP-powered AI pipeline that generates entire games in real time.",
    description:
      "Selected as a track winner out of 750+ hackers and 100+ projects at Hack the Valley. Built an MCP-powered AI pipeline system that automates the generation of entire games — characters, cutscenes, backgrounds, animation, gameplay logic, and player decision management — in real time. Uses 8 different generation pipelines including NanoBanana for sprites and backgrounds.",
    tags: ["Python", "MCP Servers", "Gemini", "AI/ML"],
    links: [
      {
        label: "Demo",
        href: "https://devpost.com/software/fateless-studios",
      },
      {
        label: "GitHub",
        href: "https://github.com/WhyILived/HTV",
      },
    ],
    status: "live",
    image: "https://picsum.photos/seed/fateless/800/600",
    featured: true,
  },
  {
    name: "Wisconsin Law RAG",
    summary:
      "RAG-powered legal assistant helping Wisconsin law enforcement query statutes and case law conversationally.",
    description:
      "A retrieval-augmented generation system built for Wisconsin law enforcement officers to query statutes, case law, and departmental policies through natural language. Backend in FastAPI handles multi-format document ingestion (PDF, DOCX, HTML, plain text) with automatic metadata extraction for titles, jurisdictions, statute numbers, and dates. Frontend built in Next.js + TypeScript. Includes built-in evaluation tooling to measure retrieval accuracy and response latency.",
    tags: ["Python", "FastAPI", "Next.js", "TypeScript", "RAG", "AI/ML"],
    links: [
      { label: "GitHub", href: "https://github.com/KRuddra/codefourrag" },
    ],
    status: "live",
    image: "https://picsum.photos/seed/codefourrag/800/600",
  },
  {
    name: "IntroSpectacle",
    summary:
      "Real-time facial recognition built at Hack the North to enhance memory in social interactions.",
    description:
      "A real-time facial recognition system built at Hack the North using Python, OpenCV, and MongoDB to enhance memory in social interactions. Features live video processing and smart contact management.",
    tags: ["Python", "OpenCV", "MongoDB", "Hack the North"],
    links: [
      { label: "Demo", href: "https://devpost.com/software/introspectacle" },
      {
        label: "GitHub",
        href: "https://github.com/vinny-nguyen/IntroSpectacle",
      },
    ],
    status: "live",
    image: "https://picsum.photos/seed/introspectacle/800/600",
  },
  {
    name: "Symbiote",
    summary:
      "Full-stack React AI platform for creating and editing images with generative tools.",
    description:
      "A full-stack React-based AI platform enabling users to create and edit images using advanced generative tools. Features real-time processing and an intuitive design interface.",
    tags: ["React", "JavaScript", "AI/ML", "Full-Stack"],
    links: [
      { label: "Live", href: "https://ruddrakantaria.com/" },
      { label: "GitHub", href: "https://github.com/KRuddra/Symbiote" },
    ],
    status: "live",
    image: "https://picsum.photos/seed/symbiote/800/600",
  },
  {
    name: "NextImage AI",
    summary:
      "AI image generator with a community gallery, powered by the OpenAI API and MongoDB.",
    description:
      "Generate stunning AI images from custom prompts using the OpenAI API. Includes a community page where users can share and browse artwork, all stored securely in MongoDB.",
    tags: ["MongoDB", "JavaScript", "AI/ML", "Full-Stack"],
    links: [
      { label: "GitHub", href: "https://github.com/KRuddra/NextImage_AI" },
    ],
    status: "live",
    image: "https://picsum.photos/seed/nextimage/800/600",
  },
];

export const webring = {
  prev: "https://cs.uwatering.com/#ruddrakantaria.com?nav=prev",
  center: "https://cs.uwatering.com/#ruddrakantaria.com",
  next: "https://cs.uwatering.com/#ruddrakantaria.com?nav=next",
};
