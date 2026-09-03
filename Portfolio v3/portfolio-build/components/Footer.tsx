"use client";

import { ArrowUp } from "@phosphor-icons/react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
        <div>
          <span className="text-zinc-300 font-bold">PRASHANT BAIRAGI</span>
          <span className="mx-2 text-zinc-700">/</span>
          <span>Java Backend Engineer</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/PrashantOmBairagi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/prashant-bairagi-kmlpr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/prashantbairagi2018/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LeetCode
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Prashant Bairagi</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:text-zinc-200 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
