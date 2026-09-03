"use client";

import { motion, AnimatePresence } from "motion/react";
import { Certificate, Trophy, Cpu, CloudCheck, Eye, X, type Icon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

interface CertItem {
  id: string;
  title: string;
  issuer: string;
  status: string;
  image: string;
  icon: Icon;
  color: string;
  details: string;
  skills: string[];
}

const CERTS: CertItem[] = [
  {
    id: "dbms",
    title: "Database Management Systems",
    issuer: "NPTEL (IIT)",
    status: "Elite Certification (2026)",
    image: "/assets/Database Management System.jpg",
    icon: Certificate,
    color: "#ff6b52",
    details: "Advanced relational algebra, normal forms (1NF-BCNF), SQL optimization, B+ trees, ACID transaction concurrency control, and index structures.",
    skills: ["SQL", "Relational Algebra", "Normalization", "Concurrency Control"],
  },
  {
    id: "aws",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    status: "Verified Credential",
    image: "/assets/AWS Cloud Practitioner Essentials.jpg",
    icon: CloudCheck,
    color: "#FF9900",
    details: "Core AWS cloud architecture, EC2 compute models, IAM policies, VPC security groups, S3, and cloud billing concepts.",
    skills: ["AWS EC2", "IAM", "VPC Networking", "Cloud Security"],
  },
  {
    id: "mems",
    title: "Fabrication Techniques for MEMS-Based Sensors",
    issuer: "NPTEL (IIT)",
    status: "Elite Certification (2025)",
    image: "/assets/Fabrication Techniques for MEMS-Based Sensors.jpg",
    icon: Cpu,
    color: "#00E5FF",
    details: "Micro-electromechanical systems, silicon micromachining, photolithography, cleanroom fabrication, and transducer physics.",
    skills: ["MEMS", "Microfabrication", "Sensor Physics", "Cleanroom Techniques"],
  },
  {
    id: "python",
    title: "The Joy of Computing Using Python",
    issuer: "NPTEL (IIT)",
    status: "Certified (2024)",
    image: "/assets/The Joy of Computing Using Python.jpg",
    icon: Trophy,
    color: "#3776AB",
    details: "Algorithmic thinking, recursion, data structures, dynamic programming paradigms, and computational problem solving.",
    skills: ["Python", "Algorithms", "Recursion", "Data Structures"],
  },
  {
    id: "nokia-aiml",
    title: "Advanced AIML Training",
    issuer: "Nokia",
    status: "Industrial Training",
    image: "/assets/Nokia Advanced AIML Training.jpg",
    icon: Certificate,
    color: "#124191",
    details: "Machine learning pipelines, predictive modeling, statistical validation, and telecommunications data analytics.",
    skills: ["Machine Learning", "Data Analytics", "Telecom Systems"],
  },
  {
    id: "gis",
    title: "Remote Sensing & GIS for Environmental Studies",
    issuer: "ISRO / IIRS",
    status: "Technical Course",
    image: "/assets/Remote Sensing & GIS for Environmental Studies.png",
    icon: Trophy,
    color: "#10B981",
    details: "Satellite telemetry, multispectral data analysis, spatial coordinates mapping, and digital image processing.",
    skills: ["Satellite Telemetry", "Spatial Analysis", "Data Processing"],
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="certifications" className="relative py-28 px-6 bg-zinc-950/60 border-t border-zinc-800/80">
      <div className="relative mx-auto max-w-7xl">
        {/* Header — no eyebrow */}
        <div className="mb-16 pb-6 border-b border-zinc-800">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100">
            Courses I actually completed
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 hover:-translate-y-1 shadow-lg overflow-hidden"
              >
                <div>
                  {/* Thumbnail with overlay on hover */}
                  <div 
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full h-36 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 mb-4 cursor-pointer"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-mono text-zinc-100 font-medium backdrop-blur-[2px]">
                      <Eye size={16} />
                      <span>View Credential</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-7 h-7 rounded flex items-center justify-center border border-zinc-800 bg-zinc-950"
                        style={{ color: cert.color }}
                      >
                        <Icon size={16} weight="bold" />
                      </div>
                      <span className="text-xs font-mono text-[#ff6b52] font-semibold">
                        {cert.status}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-zinc-950 border border-zinc-800 text-zinc-400">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-100 mb-2 line-clamp-1">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                    {cert.details}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-zinc-800/80">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certificate Preview Modal / Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#ff6b52] font-semibold">{selectedCert.issuer}</span>
                  <span className="text-zinc-600">|</span>
                  <h4 className="text-sm font-bold text-zinc-200">{selectedCert.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="p-6 overflow-y-auto bg-zinc-950 flex flex-col items-center">
                <div className="relative rounded-lg overflow-hidden border border-zinc-800 shadow-xl max-w-full">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[60vh] object-contain w-auto mx-auto rounded"
                  />
                </div>

                <div className="mt-5 text-center max-w-xl">
                  <p className="text-xs text-zinc-300 font-mono mb-2">
                    {selectedCert.details}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {selectedCert.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
