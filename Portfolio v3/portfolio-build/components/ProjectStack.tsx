"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  GithubLogo,
  ShieldCheck,
  Cloud,
  DownloadSimple,
  BookOpen,
  CaretDown,
  CaretUp,
  CheckCircle,
  WarningCircle,
  ListBullets,
  RocketLaunch,
} from "@phosphor-icons/react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  badge: string;
  live?: boolean;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  architecture: string[];
  deployment: string;
  futureRoadmap: string[];
  techStack: string[];
  links: { label: string; href: string; icon: "demo" | "github" | "apk" | "docs" }[];
  callout: string;
}

const PROJECTS: Project[] = [
  {
    id: "kharcha-pani",
    title: "Kharcha Pani",
    badge: "In Production",
    live: true,
    tagline: "Finance & Expense Engine",
    description:
      "A Spring Boot backend that powers a live Android finance app. 40+ active users, multi-tenant data isolation, month-wise budgets, Docker container on AWS EC2 behind Nginx. It works, and people actually use it.",
    image: "/assets/kharcha_pani_logo.jpg",
    imageAlt: "Kharcha Pani Production Logo",
    metrics: [
      { label: "Active Users", value: "40+" },
      { label: "REST Endpoints", value: "12+" },
      { label: "Auth", value: "Stateless JWT" },
      { label: "Hosting", value: "AWS EC2" },
    ],
    problem:
      "Most finance trackers are just frontend wrappers around third-party APIs. I wanted to build the entire backend myself — auth, database, validation, deployment — and actually ship it.",
    solution:
      "Built a clean Controller → Service → Repository stack with Spring Security JWT filters, strict DTO validation, and global exception handling. Everything containerized with Docker.",
    keyFeatures: [
      "Stateless JWT authentication with custom filter chain",
      "Per-user query isolation at the repository layer",
      "Month-wise budget carry-over with automatic period generation",
      "Global exception handler for uniform error responses",
      "Live API consumption by a native Android client",
    ],
    architecture: [
      "Android Client",
      "Nginx HTTPS Reverse Proxy",
      "Spring Security JWT Filter",
      "Controller / DTO Validation",
      "Service Layer (@Transactional)",
      "Hibernate JPA Entities",
      "MySQL Database",
    ],
    deployment:
      "Multi-stage Docker build on AWS EC2. Nginx handles SSL termination. MySQL runs on a separate instance. Security groups manage network access.",
    futureRoadmap: [
      "Redis caching for analytics queries",
      "Docker Compose for local multi-container testing",
      "Automated spending forecast engine",
    ],
    techStack: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "MySQL",
      "Docker",
      "AWS EC2",
      "Nginx",
      "Swagger UI",
    ],
    links: [
      { label: "Swagger UI", href: "https://43.204.7.243/swagger-ui/index.html", icon: "docs" },
      { label: "GitHub", href: "https://github.com/PrashantOmBairagi/kharcha-pani", icon: "github" },
      { label: "Download APK", href: "https://github.com/PrashantOmBairagi/kharcha-pani/releases/latest", icon: "apk" },
    ],
    callout: "Hardened against SQL and parameter injection with Spring Data Pageable field allowlists.",
  },
  {
    id: "portfolio-contact-api",
    title: "Portfolio Contact API",
    badge: "Live Utility",
    live: true,
    tagline: "Backend for this portfolio's contact form",
    description:
      "You know those contact forms that just use Formspree or EmailJS? I built my own backend instead. Spring Boot service that validates inputs, stores them in PostgreSQL, and sends email notifications. Overkill? Maybe. But I learned a lot.",
    image: "/assets/contact-api.png",
    imageAlt: "Portfolio Contact API Architecture",
    metrics: [
      { label: "Email", value: "Spring SMTP" },
      { label: "Database", value: "Neon PostgreSQL" },
      { label: "Health Check", value: "/actuator" },
      { label: "Hosting", value: "Render / AWS" },
    ],
    problem:
      "Third-party form services give you zero control over your data pipeline, no audit logs, and no custom security. I wanted full ownership.",
    solution:
      "Custom Spring Boot REST service: form submission → DTO validation → email dispatch → database persistence. Clean and auditable.",
    keyFeatures: [
      "Strict input validation and email formatting",
      "CORS security filters",
      "Global exception handling",
      "Automated health check endpoint",
    ],
    architecture: [
      "Next.js Frontend (Vercel)",
      "POST /api/contacts",
      "Controller & Service Validation",
      "Spring Mail (SMTP)",
      "Neon PostgreSQL",
    ],
    deployment: "Containerized web service with automated SSL, connected to a cloud PostgreSQL instance.",
    futureRoadmap: [
      "Rate limiting with Bucket4j",
      "Admin dashboard for submission telemetry",
    ],
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Mail",
      "PostgreSQL",
      "Spring Data JPA",
      "Hibernate",
      "Render",
      "AWS EC2",
    ],
    links: [
      { label: "Health Endpoint", href: "https://43.204.7.243/contact-api/health-check", icon: "demo" },
      { label: "GitHub", href: "https://github.com/PrashantOmBairagi/portfolio-backend-api", icon: "github" },
    ],
    callout: "No third-party form intermediaries. Full log auditability.",
  },
  {
    id: "central-locking",
    title: "Smart Central Locking",
    badge: "1+ Year Daily Use",
    live: false,
    tagline: "Custom embedded access control",
    description:
      "An ATmega328-based RF transceiver system I built from scratch. It unlocks my car door wirelessly using 433 MHz signals. It's been running daily for over a year without a single failure.",
    image: "/assets/Central lock schematic.png",
    imageAlt: "Smart Central Locking Schematic",
    metrics: [
      { label: "Uptime", value: "365+ Days" },
      { label: "Frequency", value: "433 MHz" },
      { label: "Controller", value: "ATmega328" },
      { label: "Actuation", value: "Relay Drivers" },
    ],
    problem:
      "Older vehicles don't have wireless entry. Retail kits are expensive, bulky, and not optimized for low power. I wanted to build my own from components.",
    solution:
      "Designed a custom transceiver board around ATmega328 logic. RF modules handle signal transmission, optoisolated relays drive the door actuators.",
    keyFeatures: [
      "433 MHz RF transmitter/receiver with noise filtering",
      "Custom signal preamble matching for noise rejection",
      "High-current optoisolated relay driver interface",
      "Daily reliability in a real vehicle for over a year",
    ],
    architecture: [
      "433 MHz Handheld Remote",
      "RF Receiver & Noise Filter",
      "ATmega328 Microcontroller",
      "Optoisolated Relay Drivers",
      "Door Mechanical Actuators",
    ],
    deployment:
      "Installed in a junction box inside the vehicle cabin. Wired into the vehicle's electrical distribution and central locking actuators.",
    futureRoadmap: [
      "Rolling code encryption",
      "Low-power sleep modes for battery conservation",
    ],
    techStack: [
      "ATmega328",
      "Arduino",
      "RF 433 MHz",
      "Circuit Design",
      "Relay Logic",
      "Embedded C++",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/PrashantOmBairagi/Smart-Central-Locking-System", icon: "github" },
    ],
    callout: "Hardware-to-software root engineering. Long-term mechanical reliability.",
  },
];

export default function ProjectStack() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    "kharcha-pani": false,
  });

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header — conversational */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-800">
          <div>
            <span className="font-mono text-xs text-[#ff6b52] tracking-widest uppercase mb-2 block">
              Things I&apos;ve Built &amp; Shipped
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100">
              Actual work, running in production
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-zinc-400 font-mono max-w-[40ch]">
            Not tutorials. Not todo apps. Real systems with real users.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-12">
          {PROJECTS.map((project, idx) => {
            const isExpanded = !!expandedProjects[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-2xl border border-zinc-800/90 bg-zinc-900/90 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-zinc-700 shadow-xl overflow-hidden"
              >
                {/* Subtle top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                  style={{
                    background:
                      idx === 0
                        ? "linear-gradient(90deg, #ff6b52, #ff816b, transparent)"
                        : "linear-gradient(90deg, #3f3f46, transparent)",
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left: Details */}
                  <div className="lg:col-span-8 flex flex-col justify-between h-full">
                    <div>
                      {/* Badge & Number */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] font-medium border border-zinc-800 bg-zinc-950/80 text-zinc-300">
                          {project.live && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          )}
                          {project.badge}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-4">
                        {/* Project Image */}
                        <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            className={`w-full h-full object-cover object-center ${
                              project.id === "kharcha-pani" ? "scale-[1.35]" : ""
                            } opacity-95 hover:opacity-100 transition-all duration-300`}
                            loading="lazy"
                          />
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium text-[#ff6b52] mt-1">
                            {project.tagline}
                          </p>
                        </div>
                      </div>

                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-zinc-800/70 bg-zinc-950/60 mb-6">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="flex flex-col">
                            <span className="text-[11px] font-mono text-zinc-500 uppercase">
                              {m.label}
                            </span>
                            <span className="text-sm font-bold text-zinc-200 mt-0.5">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack & links */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-[#ff6b52] hover:text-white hover:bg-zinc-800 active:scale-[0.97]"
                          >
                            {link.icon === "github" && <GithubLogo size={14} />}
                            {link.icon === "docs" && (
                              <BookOpen size={14} className="text-[#ff6b52]" />
                            )}
                            {link.icon === "apk" && (
                              <DownloadSimple size={14} className="text-emerald-400" />
                            )}
                            {link.icon === "demo" && (
                              <ArrowUpRight size={14} className="text-cyan-400" />
                            )}
                            <span>{link.label}</span>
                          </a>
                        ))}

                        <button
                          onClick={() => toggleExpand(project.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "Less" : "Details"}</span>
                          {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Architecture Flow */}
                  <div className="lg:col-span-4 rounded-xl border border-zinc-800/90 bg-zinc-950/80 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                        <span>Architecture Flow</span>
                        <ShieldCheck size={14} className="text-[#ff6b52]" />
                      </div>

                      <div className="space-y-2 font-mono text-xs">
                        {project.architecture.map((node, i) => (
                          <div key={node} className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <span className="w-5 h-5 rounded flex items-center justify-center bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-400">
                                {i + 1}
                              </span>
                              {i < project.architecture.length - 1 && (
                                <div className="w-px h-2.5 bg-zinc-800 my-0.5" />
                              )}
                            </div>
                            <span className="text-zinc-300 text-[11px] leading-tight">
                              {node}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500">
                      {project.callout}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="mt-8 pt-8 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70">
                      <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold mb-3">
                        <WarningCircle size={16} weight="bold" />
                        <span>Why This Exists</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-3">
                        <CheckCircle size={16} weight="bold" />
                        <span>How I Built It</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70">
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-3">
                        <ListBullets size={16} weight="bold" />
                        <span>Key Capabilities</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-400">
                        {project.keyFeatures.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <span className="text-[#ff6b52] mt-0.5">&rsaquo;</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 md:col-span-2">
                      <div className="flex items-center gap-2 text-[#ff6b52] font-mono text-xs font-semibold mb-3">
                        <Cloud size={16} weight="bold" />
                        <span>Infrastructure</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {project.deployment}
                      </p>
                    </div>

                    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/70">
                      <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold mb-3">
                        <RocketLaunch size={16} weight="bold" />
                        <span>What&apos;s Next</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-400">
                        {project.futureRoadmap.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-0.5">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
