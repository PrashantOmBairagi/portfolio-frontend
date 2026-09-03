"use client";

import { motion } from "motion/react";
import { Cpu, Database, Cloud, BracketsCurly, type Icon } from "@phosphor-icons/react";

interface SkillCategory {
  title: string;
  subtitle: string;
  description: string;
  icon: Icon;
  accentColor: string;
  skills: string[];
}

const CAPABILITIES: SkillCategory[] = [
  {
    title: "Java & Spring",
    subtitle: "Backend & Microservices",
    description:
      "Stateless REST APIs with Spring Boot 3, JWT security filters, transactional boundaries, and DTO validation. This is where I spend most of my time.",
    icon: BracketsCurly,
    accentColor: "#ff6b52",
    skills: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "Stateless JWT",
      "Spring Data JPA",
      "Hibernate ORM",
      "RESTful API Design",
      "DTO Validation",
      "Global Exception Handling",
      "Maven",
    ],
  },
  {
    title: "Databases",
    subtitle: "Data Modeling & Integrity",
    description:
      "Normalized schemas in 3NF across MySQL and PostgreSQL. Foreign key cascades, indexed queries, per-user isolation. I actually enjoy writing SQL.",
    icon: Database,
    accentColor: "#38bdf8",
    skills: [
      "MySQL 8+",
      "PostgreSQL (Neon)",
      "Schema Design (3NF)",
      "JPA Entity Mapping",
      "Query Optimization",
      "Transaction Concurrency",
      "Data Isolation",
      "Database Migrations",
    ],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Deployment & Infrastructure",
    description:
      "Docker multi-stage builds deployed to AWS EC2. Nginx reverse proxy with SSL. Linux daemons, security groups, health checks. The unglamorous stuff that keeps things running.",
    icon: Cloud,
    accentColor: "#fb923c",
    skills: [
      "Docker",
      "AWS EC2",
      "Nginx HTTPS Proxy",
      "Linux / Bash",
      "Security Groups",
      "Vercel",
      "Postman",
      "Swagger / OpenAPI",
    ],
  },
  {
    title: "Problem Solving & Hardware",
    subtitle: "Algorithms + Embedded Systems",
    description:
      "200+ LeetCode problems. ATmega328 firmware in C++. I understand things from transistor-level signals to JVM garbage collection. Breadth matters.",
    icon: Cpu,
    accentColor: "#a78bfa",
    skills: [
      "200+ LeetCode",
      "Data Structures",
      "OOP Design",
      "C++ Firmware",
      "ATmega328 MCU",
      "RF 433 MHz",
      "Relay Drivers",
      "Circuit Design",
    ],
  },
];

export default function SkillsBento() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6 bg-zinc-950/40 border-t border-zinc-800/80"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header — no eyebrow, conversational */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-zinc-800">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100">
            What I actually work with
          </h2>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-zinc-400 font-mono max-w-[42ch]">
            From circuit boards to cloud servers.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {CAPABILITIES.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div
                      className="p-3 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center justify-center flex-shrink-0"
                      style={{ color: cat.accentColor }}
                    >
                      <Icon size={22} weight="bold" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>
                </div>

                {/* Tech chips — no dots */}
                <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-950/90 border border-zinc-800 text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
