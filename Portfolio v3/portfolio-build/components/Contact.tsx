"use client";

import { useState } from "react";
import {
  EnvelopeSimple,
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  Code,
  Phone,
  MapPin,
  CheckCircle,
  WarningCircle,
  DownloadSimple,
  Copy,
  Check,
  SpinnerGap,
  Envelope,
} from "@phosphor-icons/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    const isPhoneValid = (val: string) => /^[0-9]{10}$/.test(val);
    const isEmailValid = (val: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);

    if (name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (phone && isPhoneValid(phone) === false) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (isEmailValid(email) === false) {
      errors.email = "Please enter a valid email address";
    }
    if (message.length < 5) {
      errors.message = "Message must be at least 5 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || status === "loading") return;

    setStatus("loading");

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim() || undefined,
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else if (response.status === 400) {
        const serverErrors = await response.json();
        setFieldErrors(serverErrors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const mailtoUrl = `mailto:hello.prashantbairagi@gmail.com?subject=${encodeURIComponent(
    `Message from ${formData.name || "you"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="relative py-28 px-6 border-t border-zinc-800/80">
      <div className="relative mx-auto max-w-7xl">
        {/* Header — conversational */}
        <div className="mb-14 pb-6 border-b border-zinc-800">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100">
            Let&apos;s talk
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Info */}
          <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 font-mono text-xs text-zinc-400">
                <span>How to reach me</span>
                <span className="text-zinc-300 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span>Available</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-100 mb-3">
                Open for backend roles &amp; internships
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-mono">
                I reply to every message. Email is the fastest way to reach me.
              </p>

              {/* Contact details */}
              <div className="space-y-3 font-mono text-xs mb-8">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-300">
                  <div className="flex items-center gap-3">
                    <EnvelopeSimple size={18} className="text-[#ff6b52]" />
                    <span className="text-zinc-200">hello.prashantbairagi@gmail.com</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard("hello.prashantbairagi@gmail.com", "email")}
                    className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} className="text-zinc-200" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-300">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#ff6b52]" />
                    <span className="text-zinc-200">+91-9981100383</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard("+919981100383", "phone")}
                    className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Copy Phone"
                    aria-label="Copy Phone"
                  >
                    {copiedPhone ? <Check size={14} className="text-zinc-200" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-300">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-[#ff6b52]" />
                    <span className="text-zinc-200">Jabalpur, Madhya Pradesh, India</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* Socials & Resume */}
            <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/PrashantOmBairagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubLogo size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/prashant-bairagi-kmlpr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={18} />
                </a>
                <a
                  href="https://leetcode.com/u/prashantbairagi2018/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="LeetCode"
                >
                  <Code size={18} />
                </a>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/assets/resume.pdf", "_blank");
                  const link = document.createElement("a");
                  link.href = "/assets/resume.pdf";
                  link.download = "Prashant_Bairagi_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-zinc-200 font-mono text-xs font-semibold hover:border-[#ff6b52] hover:text-white transition-all duration-200 active:scale-[0.98]"
              >
                <DownloadSimple size={15} className="text-[#ff6b52]" weight="bold" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 font-mono text-xs text-zinc-400">
                <span>Send me a message</span>
                <span className="text-zinc-300 flex items-center gap-1.5 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span>POST /api/contacts</span>
                </span>
              </div>

              {status === "success" ? (
                <div className="py-10 px-6 rounded-xl border border-zinc-700 bg-zinc-950 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 text-[#ff6b52] flex items-center justify-center mx-auto">
                    <CheckCircle size={28} weight="bold" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">Message sent</h3>
                  <p className="text-xs text-zinc-400 max-w-[42ch] mx-auto font-mono leading-relaxed">
                    Got it. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : status === "error" ? (
                <div className="py-8 px-6 rounded-xl border border-zinc-700 bg-zinc-950 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 text-[#ff6b52] flex items-center justify-center mx-auto">
                    <WarningCircle size={28} weight="bold" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">Couldn&apos;t send</h3>
                  <p className="text-xs text-zinc-400 max-w-[44ch] mx-auto font-mono leading-relaxed">
                    Something went wrong reaching the server. Use the email fallback below — it goes to the same inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={mailtoUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff6b52] text-zinc-950 font-mono text-xs font-bold hover:bg-[#ff816b] transition-colors"
                    >
                      <Envelope size={16} weight="bold" />
                      <span>Open email client</span>
                    </a>
                    <button
                      onClick={() => setStatus("idle")}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      Back to form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your name"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-zinc-950 text-zinc-100 text-xs sm:text-sm focus:ring-1 outline-none transition-colors ${
                        fieldErrors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-zinc-800 focus:border-[#ff6b52] focus:ring-[#ff6b52]"
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                        <WarningCircle size={12} />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="you@email.com"
                        className={`w-full px-4 py-2.5 rounded-lg border bg-zinc-950 text-zinc-100 text-xs sm:text-sm focus:ring-1 outline-none transition-colors ${
                          fieldErrors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-zinc-800 focus:border-[#ff6b52] focus:ring-[#ff6b52]"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                          <WarningCircle size={12} />
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="10-digit number"
                        className={`w-full px-4 py-2.5 rounded-lg border bg-zinc-950 text-zinc-100 text-xs sm:text-sm focus:ring-1 outline-none transition-colors ${
                          fieldErrors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-zinc-800 focus:border-[#ff6b52] focus:ring-[#ff6b52]"
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                          <WarningCircle size={12} />
                          <span>{fieldErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="What's on your mind?"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-zinc-950 text-zinc-100 text-xs sm:text-sm focus:ring-1 outline-none transition-colors resize-none ${
                        fieldErrors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-zinc-800 focus:border-[#ff6b52] focus:ring-[#ff6b52]"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                        <WarningCircle size={12} />
                        <span>{fieldErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-lg bg-[#ff6b52] text-zinc-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 hover:bg-[#ff816b] hover:shadow-[0_0_24px_rgba(255,107,82,0.35)] transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <div className="flex items-center gap-2 font-mono">
                        <SpinnerGap size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send message</span>
                        <PaperPlaneTilt size={16} weight="bold" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
