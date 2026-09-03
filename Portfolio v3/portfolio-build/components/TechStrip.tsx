"use client";

import { motion } from "motion/react";

interface TechItem {
  name: string;
  category: string;
  iconPath: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "Java",
    category: "Core Language",
    iconPath: "/assets/tech/java.svg",
  },
  {
    name: "Spring Boot",
    category: "Framework",
    iconPath: "/assets/tech/spring.svg",
  },
  {
    name: "Spring Security",
    category: "Stateless JWT",
    iconPath: "/assets/tech/springsecurity.svg",
  },
  {
    name: "MySQL",
    category: "Relational DB",
    iconPath: "/assets/tech/mysql.svg",
  },
  {
    name: "PostgreSQL",
    category: "Cloud DB (Neon)",
    iconPath: "/assets/tech/postgresql.svg",
  },
  {
    name: "Docker",
    category: "Containers",
    iconPath: "/assets/tech/docker.svg",
  },
  {
    name: "AWS EC2",
    category: "Cloud Compute",
    iconPath: "/assets/tech/amazonwebservices.svg",
  },
  {
    name: "JWT Auth",
    category: "Security Token",
    iconPath: "/assets/tech/jwt.svg",
  },
];

export default function TechStrip() {
  return (
    <section className="relative border-y border-zinc-800/80 bg-zinc-950/70 py-10 px-6 backdrop-blur-sm overflow-hidden">
      {/* Background Micro Architecture Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ff6b52" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <h2 className="text-sm font-mono text-zinc-400 tracking-wider uppercase">
              Things I use in production
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              All proven in deployment
            </span>
          </div>
        </motion.div>

        {/* Precision 8-Column Grid with Real Official Brand SVGs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {TECH_ITEMS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.23, 1, 0.32, 1] }}
              className="group relative flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/40 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90 hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110">
                <img
                  src={item.iconPath}
                  alt={item.name}
                  className="w-7 h-7 object-contain"
                  loading="lazy"
                  width="28"
                  height="28"
                />
              </div>
              <span className="text-xs font-semibold text-zinc-200 text-center tracking-tight mb-0.5">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 text-center">
                {item.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
