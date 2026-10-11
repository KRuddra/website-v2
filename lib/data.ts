import type {
  Project,
  ExperienceItem,
  EducationItem,
  Gym,
} from "@/types";

export interface BioSegment {
  text: string;
  href?: string;
}

export const bio = {
  name: "Ruddra Kantaria",
  // Rendered as flowing prose; segments with an href become magnetic links.
  intro: [
    { text: "I'm in my 3A term as a computer science student at the " },
    { text: "University of Waterloo", href: "https://uwaterloo.ca" },
    { text: ". This winter I'm headed to " },
    { text: "Essos", href: "https://www.essos.com" },
    { text: ", as a founding engineering intern. Previously I was at " },
    { text: "Amazon", href: "https://www.amazon.com" },
    { text: ", co-founded Atelier, and built data pipelines at " },
    { text: "BlueDot", href: "https://bluedot.global/" },
    { text: "." },
  ] as BioSegment[],
};

export const socialLinks: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/kruddra" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ruddra-kantaria" },
  {
    label: "Resume",
    href: "/resume.pdf",
  },
  { label: "Email", href: "mailto:ruddra.kantaria@uwaterloo.ca" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Founding Engineering Intern",
    company: "Essos",
    dates: "Jan 2027 — Apr 2027",
    description:
      "Incoming full-stack engineer building the patient and clinic platform for Essos, a seed-stage healthcare start-up backed by Saga Ventures and Sound Ventures.",
  },
  {
    role: "Software Development Engineering Intern",
    company: "Amazon",
    dates: "May 2026 — Sep 2026",
    description:
      "Shipped Arbor, a full-stack alarm visualization platform adopted by 100+ teams and used by VPs and directors to assess cross-team impact during high-severity (SEV-2+) incidents. Unified three monitoring systems behind a rate-limited concurrent batching scheduler that aggregates 1.3M+ alarms at p95 under 10s.",
  },
  {
    role: "Co-Founder, Founding Engineer",
    company: "Atelier",
    dates: "Dec 2025 — Apr 2026",
    description:
      "Co-founded an AI-driven product analytics start-up backed by Telora ($60K), serving 10+ customers across 10+ connected sites. Built an end-to-end ingestion pipeline and a LangChain-powered engine that turned analytics into 10K+ deployable UI/UX changes, cutting per-analysis cost by 50% and latency from 4s to 200ms.",
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

// Ordered newest-first by date.
export const projects: Project[] = [
  {
    name: "LawRAG",
    date: "Oct 2026",
    summary:
      "A retrieval-augmented generation system for querying statutes and regulations across US and Canadian jurisdictions.",
    description:
      "Pick a jurisdiction and categories of law, ask a question, and get an answer grounded only in the law that applies there. A sub-national jurisdiction (e.g. British Columbia) automatically includes its country's federal layer, and every query is hard-filtered so law from another jurisdiction never leaks into the answer. Ingests official, machine-readable government sources — US Code via govinfo, Canada's Justice Laws, and BC Laws — through per-source adapters, with a FastAPI backend and cited, confidence-scored answers.",
    tags: ["Python", "FastAPI", "RAG", "AI/ML"],
    links: [{ label: "GitHub", href: "https://github.com/KRuddra/LawRAG" }],
    status: "live",
  },
  {
    name: "FATELESS Studios",
    date: "Oct 2025",
    summary:
      "Hack the Valley winner — an MCP-powered AI pipeline that generates entire games in real time.",
    description:
      "Selected as a track winner out of 750+ hackers and 100+ projects at Hack the Valley. Built an MCP-powered AI pipeline system that automates the generation of entire games — characters, cutscenes, backgrounds, animation, gameplay logic, and player decision management — in real time. Uses 8 different generation pipelines including NanoBanana for sprites and backgrounds.",
    tags: ["Python", "MCP Servers", "Gemini", "AI/ML"],
    links: [
      { label: "Demo", href: "https://devpost.com/software/fateless-studios" },
      { label: "GitHub", href: "https://github.com/WhyILived/HTV" },
    ],
    status: "live",
    featured: true,
  },
  {
    name: "BeyondSight",
    date: "Sep 2025",
    summary:
      "Hack the North winner — a hardware + AI navigation system for individuals who are deafblind.",
    description:
      "Selected as a track winner out of 2,000+ hackers and 300+ projects at Hack the North. Built a full-stack hardware + AI system enabling navigation and communication for individuals who are deafblind, using AI-powered text-to-speech, a vest with haptic motors, and a braille-enabled gauntlet. Integrated OpenAI Whisper with in-house optimizations that improved transcription accuracy by 15% and reduced latency by 21%.",
    tags: ["Python", "SLAM", "YOLO", "Whisper", "Docker"],
    links: [
      { label: "Demo", href: "https://devpost.com/software/beyondsight-589mh7" },
      { label: "GitHub", href: "https://github.com/WhyILived/HTN" },
    ],
    status: "live",
    featured: true,
  },
  {
    name: "IntroSpectacle",
    date: "Sep 2024",
    summary:
      "Real-time facial recognition built at Hack the North to enhance memory in social interactions.",
    description:
      "A real-time facial recognition system built at Hack the North using Python, OpenCV, and MongoDB to enhance memory in social interactions. Features live video processing and smart contact management.",
    tags: ["Python", "OpenCV", "MongoDB", "Hack the North"],
    links: [
      { label: "Demo", href: "https://devpost.com/software/introspectacle" },
      { label: "GitHub", href: "https://github.com/vinny-nguyen/IntroSpectacle" },
    ],
    status: "live",
  },
  {
    name: "Symbiote",
    date: "2024",
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
  },
  {
    name: "NextImage AI",
    date: "2023",
    summary:
      "AI image generator with a community gallery, powered by the OpenAI API and MongoDB.",
    description:
      "Generate stunning AI images from custom prompts using the OpenAI API. Includes a community page where users can share and browse artwork, all stored securely in MongoDB.",
    tags: ["MongoDB", "JavaScript", "AI/ML", "Full-Stack"],
    links: [{ label: "GitHub", href: "https://github.com/KRuddra/NextImage_AI" }],
    status: "live",
  },
];

// Brazilian jiu-jitsu, surfaced by the belt easter egg in the hero.
export const bjj = {
  belt: "White belt",
  stripes: 1,
  style: "Mostly no-gi",
  startedAt: "Vancouver, 2026",
  journey: [
    "I started training in Vancouver during a co-op term. A close friend were started going and talked me into trying a class, and I enjoyed it.",
    "A couple of months in now, I'm still, training mostly no-gi. White Belt.",
  ],
};

// Training history, shown in the belt modal. Drop square logos at the
// referenced paths to replace the initials.
export const gyms: Gym[] = [
  {
    name: "Lions MMA",
    location: "Vancouver, BC",
    note: "Started here",
    duration: "Jul. 2026 - Aug. 2026",
    image: "/gyms/lions-mma.png",
  },
  {
    name: "Chesswood BJJ",
    location: "Toronto, ON",
    note: "Couple of classes",
    duration: "Periodically",
    image: "/gyms/chesswood-bjj.png",
  },
  {
    name: "The Lab BJJ",
    location: "Waterloo, ON",
    note: "Current gym",
    duration: "Sep. 2026 — present",
    current: true,
    image: "/gyms/the-lab-bjj.png",
  },
];

export const webring = {
  prev: "https://cs.uwatering.com/#ruddrakantaria.com?nav=prev",
  center: "https://cs.uwatering.com/#ruddrakantaria.com",
  next: "https://cs.uwatering.com/#ruddrakantaria.com?nav=next",
};
