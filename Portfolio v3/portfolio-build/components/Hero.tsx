"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  Code,
  DownloadSimple,
  TreeStructure,
  CheckCircle,
  SpinnerGap,
  WarningCircle,
  ArrowClockwise,
  BracketsCurly,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"api" | "schema">("api");
  const [apiState, setApiState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<number | null>(null);
  const [apiLatency, setApiLatency] = useState<number | null>(null);

  // Scroll-tied ambient glow — the coral glow gently rises/cools as you scroll
  // down the page, then returns to rest when back at the hero. Purposeful,
  // motivated motion: it tracks scroll position, never free-running.
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 800], [0, 140]);
  const glowOpacity = useTransform(scrollY, [0, 600, 1400], [0.15, 0.08, 0.02]);

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

  const hitApi = async () => {
    setApiState("loading");
    setApiError("");
    setApiStatus(null);
    setApiLatency(null);
    const start = performance.now();
    try {
      const res = await fetch("/api/public-info", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const data = await res.json();
      const latency = Math.round(performance.now() - start);
      setApiLatency(latency);
      setApiStatus(res.status);
      setApiResponse(JSON.stringify(data, null, 2));
      setApiState("success");
    } catch (err) {
      const latency = Math.round(performance.now() - start);
      setApiLatency(latency);
      setApiError(err instanceof Error ? err.message : "Request failed");
      setApiState("error");
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Scroll-tied Coral Glow — outer drives scroll, inner breathes locally */}
      <motion.div
        className="absolute top-1/3 left-1/4 pointer-events-none"
        style={{ y: glowY, opacity: glowOpacity }}
        aria-hidden="true"
      >
        <div
          className="w-[480px] h-[480px] md:w-[550px] md:h-[550px] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(circle, #ff6b52 0%, transparent 70%)",
            animation: "hero-blob-float 18s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status — plain, no dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-300 font-mono text-xs mb-6 shadow-sm backdrop-blur-md">
            <span className="tracking-wide font-medium">JAVA BACKEND ENGINEER</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400">AWS · DOCKER · SPRING BOOT</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-zinc-50 leading-[1.08] mb-6">
            I build backends that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">
              don&apos;t go down
            </span>{" "}
            on a Friday night.
          </h1>

          {/* Subtext — conversational */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-[54ch] mb-8">
            Java &amp; Spring Boot developer. I containerize things, put them behind Nginx,
            and make sure they stay up. Currently studying at JEC Jabalpur while running
            production services on AWS.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ff6b52] text-zinc-950 font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:bg-[#ff816b] hover:shadow-[0_0_28px_rgba(255,107,82,0.3)] active:scale-[0.97]"
            >
              <span>See what I&apos;ve shipped</span>
              <ArrowUpRight size={16} weight="bold" />
            </a>

            <button
              onClick={handleResumeClick}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-200 font-mono font-medium text-xs sm:text-sm transition-all duration-200 hover:border-[#ff6b52] hover:text-white hover:bg-zinc-800 active:scale-[0.97]"
            >
              <DownloadSimple size={16} className="text-[#ff6b52]" weight="bold" />
              <span>Resume</span>
            </button>
          </div>

          {/* Resume date */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 mb-8 pl-1">
            <CheckCircle size={14} className="text-zinc-400" weight="bold" />
            <span>Updated August 2026</span>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-800/80 w-full font-mono text-xs text-zinc-500">
            <a
              href="https://github.com/PrashantOmBairagi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              <GithubLogo size={16} />
              <span>@PrashantOmBairagi</span>
            </a>
            <a
              href="https://www.linkedin.com/in/prashant-bairagi-kmlpr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              <LinkedinLogo size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/prashantbairagi2018/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              <Code size={16} />
              <span>200+ LeetCode</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column — API Tester + ER Schema */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-5"
        >
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/70">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Tabs */}
              <div className="flex items-center bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setActiveTab("api")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    activeTab === "api" ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <BracketsCurly size={13} />
                  <span>Live API</span>
                </button>
                <button
                  onClick={() => setActiveTab("schema")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    activeTab === "schema" ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <TreeStructure size={13} />
                  <span>ER Schema</span>
                </button>
              </div>

              {/* Right indicator */}
              {activeTab === "api" ? (
                <button
                  onClick={hitApi}
                  disabled={apiState === "loading"}
                  className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
                  title="Send GET request"
                  aria-label="Send GET request"
                >
                  {apiState === "loading" ? (
                    <SpinnerGap size={14} className="animate-spin" />
                  ) : (
                    <ArrowClockwise size={14} />
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-1 text-[#ff6b52] text-[11px] font-mono font-medium">
                  <span>3NF Relational</span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="h-[360px] overflow-hidden flex flex-col bg-zinc-950">
              {activeTab === "api" ? (
                /* API Tester Panel */
                <div className="flex-1 flex flex-col p-4 font-mono text-xs overflow-y-auto">
                  {/* Endpoint bar */}
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-lg border border-zinc-800 bg-zinc-900/60">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-[11px]">GET</span>
                    <span className="text-zinc-300 text-[11px] truncate">/api/v1/public/info</span>
                    <button
                      onClick={hitApi}
                      disabled={apiState === "loading"}
                      className="ml-auto px-3 py-1.5 rounded-md bg-[#ff6b52] text-zinc-950 font-bold text-[11px] hover:bg-[#ff816b] transition-colors disabled:opacity-50 active:scale-[0.97]"
                    >
                      {apiState === "loading" ? "Sending..." : "Send"}
                    </button>
                  </div>

                  {/* Response area */}
                  <div className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 p-4 overflow-y-auto">
                    {apiState === "idle" && (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
                        <BracketsCurly size={28} className="text-zinc-600" />
                        <span className="text-[11px]">Hit &quot;Send&quot; to query the live Spring Boot backend</span>
                        <span className="text-[10px] text-zinc-600">Returns Kharcha Pani service metadata</span>
                      </div>
                    )}

                    {apiState === "loading" && (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
                        <SpinnerGap size={28} className="animate-spin text-[#ff6b52]" />
                        <span className="text-[11px]">Fetching from live backend...</span>
                      </div>
                    )}

                    {apiState === "error" && (
                      <div className="h-full flex flex-col items-center justify-center gap-3">
                        <WarningCircle size={28} className="text-amber-400" />
                        <span className="text-[11px] text-zinc-400">Request failed</span>
                        <span className="text-[10px] text-zinc-500 max-w-[35ch] text-center">{apiError}</span>
                        <button
                          onClick={hitApi}
                          className="mt-1 px-3 py-1.5 rounded-md border border-zinc-700 text-[11px] text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {apiState === "success" && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-[11px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span className="text-emerald-400">
                            {apiStatus ?? 200} OK
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-400">
                            {apiLatency !== null ? `${apiLatency} ms` : "— ms"}
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-500">Kharcha Pani</span>
                        </div>
                        <pre className="text-zinc-300 text-[11px] leading-relaxed whitespace-pre-wrap break-words">
                          <JsonHighlight json={apiResponse} />
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ER Schema Panel */
                <div className="p-3 w-full h-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-zinc-900/50 border border-zinc-800 p-2">
                    <img
                      src="/assets/schema-er-diagram.png"
                      alt="Kharcha Pani Relational Schema ER Diagram"
                      className="max-h-full max-w-full object-contain rounded transition-transform duration-300 sm:scale-110 md:scale-125"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom bar — only show on success */}
            {activeTab === "api" && apiState === "success" && (
              <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="truncate">GET /api/v1/public/info</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-zinc-400">
                    {apiLatency !== null ? `${apiLatency} ms` : ""}
                  </span>
                  <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>{apiStatus ?? 200} OK</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Simple JSON syntax highlighter — no dependencies */
function JsonHighlight({ json }: { json: string }) {
  const lines = json.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const highlighted = line
          .replace(/"([^"]+)"(?=\s*:)/g, '<span class="text-[#ff6b52]">"$1"</span>')
          .replace(/:\s*"([^"]*)"/g, ': <span class="text-emerald-300">"$1"</span>')
          .replace(/:\s*(\d+)/g, ': <span class="text-amber-300">$1</span>')
          .replace(/:\s*(true|false)/g, ': <span class="text-purple-400">$1</span>');
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />
        );
      })}
    </>
  );
}
