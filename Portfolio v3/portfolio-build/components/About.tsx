"use client";

import { motion } from "motion/react";
import { GraduationCap, MapPin, Broadcast } from "@phosphor-icons/react";

const SUKTI_DEVANAGARI =
  "\u0909\u0926\u094D\u092F\u092E\u0903 \u0938\u093E\u0939\u0938\u0902 \u0927\u0948\u0930\u094D\u092F\u0902 \u092C\u0941\u0926\u094D\u0927\u093F\u0903 \u0936\u0915\u094D\u0924\u093F\u0903 \u092A\u0930\u093E\u0915\u094D\u0930\u092E\u0903 \u0964 \u0937\u0921\u0947\u0924\u0947 \u092F\u0924\u094D\u0930 \u0935\u0930\u094D\u0924\u0928\u094D\u0924\u0947 \u0924\u0924\u094D\u0930 \u0926\u0947\u0935\u0903 \u0938\u0939\u093E\u092F\u0915\u0903 \u0965";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 px-6 overflow-hidden border-t border-zinc-800/80"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Heading & Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-xs text-[#ff6b52] tracking-widest uppercase mb-2 block font-semibold">
              How I Think About Software
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-6">
              Hardware brain, server-side heart.
            </h2>

            <div className="space-y-3 font-mono text-xs text-zinc-400 border-l-2 border-[#ff6b52] pl-4 py-1">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#ff6b52]" />
                <span>Jabalpur, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[#ff6b52]" />
                <span>Jabalpur Engineering College (2023–2027)</span>
              </div>
              <div className="flex items-center gap-2">
                <Broadcast size={16} className="text-[#ff6b52]" />
                <span>B.Tech Electronics &amp; Telecommunication</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative — conversational */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal"
          >
            <p>
              I came into software through hardware. My degree is in Electronics
              &amp; Telecommunication, which means I spent my first year learning
              about signal propagation, clock cycles, and circuit design before I
              ever wrote a line of Java. That foundation stuck.
            </p>

            <p>
              I think about software the way an electrical engineer thinks about a
              circuit: what happens when this thing is under load? Where does the
              current leak? What fails first? That instinct drives how I build
              backends — every API endpoint is a load-bearing connection, every
              database query is a signal path, and every security filter is a
              fuse.
            </p>

            <p>
              Most of my projects stay deployed.{" "}
              <span className="text-zinc-100 font-semibold underline decoration-[#ff6b52] decoration-2 underline-offset-4">
                Kharcha Pani
              </span>{" "}
              is a containerized Spring Boot service on AWS EC2 that handles daily
              expenses for 40+ real Android clients. It&apos;s been running for
              months. I built it, deployed it, and now I maintain it. That cycle —
              build, ship, learn, repeat — is how I actually grow.
            </p>
          </motion.div>
        </div>

        {/* Sanskrit Sukti */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-baseline justify-between gap-4">
          <p className="font-serif text-lg sm:text-xl lg:text-2xl text-zinc-100 tracking-wide">
            {SUKTI_DEVANAGARI}
          </p>
          <p className="text-xs font-mono text-zinc-400 italic flex-shrink-0">
            &ldquo;Effort, courage, patience, intellect, strength, and
            valor.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
