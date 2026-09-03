"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { List, X, DownloadSimple } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Capabilities", href: "#skills", id: "skills" },
  { label: "Philosophy", href: "#about", id: "about" },
  { label: "Credentials", href: "#certifications", id: "certifications" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Track active section for wayfinding
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/assets/resume.pdf", "_blank");
    const link = document.createElement("a");
    link.href = "/assets/resume.pdf";
    link.download = "Prashant_Bairagi_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* -- Scroll Progress Line -- */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#ff6b52] origin-left z-[60]"
        aria-hidden="true"
      />

      {/* -- Fixed Navbar -- */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md"
          aria-hidden="true"
        />
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
          aria-label="Primary navigation"
        >
          {/* Brand Name */}
          <a
            href="#"
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Prashant Bairagi -- Home"
          >
            <span className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.18em] text-zinc-100 uppercase transition-colors group-hover:text-white">
              PRASHANT BAIRAGI
            </span>
          </a>

          {/* Desktop Links with Active State Wayfinding */}
          <ul className="hidden md:flex items-center gap-8 font-mono text-xs text-zinc-400" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`transition-colors duration-150 relative py-1 ${
                      isActive ? "text-[#ff6b52] font-semibold" : "hover:text-zinc-100"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b52] rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResumeClick}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-1.5 font-mono text-xs font-medium text-zinc-200 transition-all duration-200 hover:border-[#ff6b52] hover:text-white hover:bg-zinc-800 active:scale-[0.97]"
            >
              <DownloadSimple size={14} className="text-[#ff6b52]" weight="bold" />
              <span>Resume</span>
            </button>

            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white active:scale-[0.97]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </nav>
      </header>

      {/* -- Mobile Drawer -- */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed inset-x-0 top-[60px] z-40 border-b border-zinc-800 bg-zinc-950 px-6 py-6 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-5 font-mono text-sm" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`transition-colors ${
                  activeSection === link.id ? "text-[#ff6b52] font-semibold" : "text-zinc-400 hover:text-zinc-100"
                }`}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-zinc-800">
            <button
              onClick={(e) => {
                handleResumeClick(e);
                handleLinkClick();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#ff6b52] px-5 py-2.5 text-xs font-mono text-[#ff6b52]"
            >
              <DownloadSimple size={15} weight="bold" />
              <span>Download & Open Resume</span>
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
}
