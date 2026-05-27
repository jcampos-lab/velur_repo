"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const PILLARS = [
  {
    title: "Clarity over volume",
    body: "Most founders I work with don't need more metrics. They need someone to tell them which three actually matter this week — and why.",
  },
  {
    title: "AI as leverage, not gimmick",
    body: "Claude, MidJourney, Higgsfield — these tools should pay for themselves. I help small businesses fold them into the work they're already doing, then measure whether they moved revenue.",
  },
  {
    title: "Built for small teams",
    body: "Velur is designed for founders, owner-operators, and lean marketing teams. If you have a data department of one — or zero — this is for you.",
  },
];

export default function FounderSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-cream py-16 md:py-24 border-y border-line">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <SectionLabel left="THE FOUNDER" right="ALEXANDER CAMPOS" className="mb-10 md:mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] mb-6"
              style={{ fontSize: "clamp(28px, 4.2vw, 56px)" }}
            >
              Hi, I&apos;m Alexander.
              <br />
              <span className="text-muted">I built Velur for founders like you.</span>
            </h2>

            <div className="space-y-5 max-w-2xl">
              <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
                I&apos;ve spent the last several years inside DTC and small-business analytics — the kind of work where you watch a great product get stuck because the founder can&apos;t tell what&apos;s working. That problem is what Velur solves.
              </p>
              <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
                I&apos;m also the person building <Link href="https://camilab.studio" target="_blank" rel="noopener noreferrer" className="text-amber hover:underline underline-offset-4">Cami Lab Studio</Link>, a spa in Port St. Lucie — using the same playbook Velur runs on, plus Higgsfield and MidJourney for the creative side. It&apos;s a live test of what good analytics and good AI tooling can do for a small business, run by one person.
              </p>
              <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
                I&apos;m not here to upsell you on another dashboard. I&apos;m here to help you understand your numbers and put AI to work where it actually pays for itself. If that&apos;s useful, let&apos;s talk.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="mailto:hello@velur.io"
                className="inline-flex items-center gap-2 font-sans font-medium text-base text-ink hover:text-amber transition-colors"
              >
                hello@velur.io <span aria-hidden>→</span>
              </Link>
              <span className="text-line" aria-hidden>·</span>
              <Link
                href="https://linkedin.com/in/alexander-campos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-base text-muted hover:text-ink transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-8 lg:border-l border-line space-y-6"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              What guides the work
            </p>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                whileHover={prefersReduced ? undefined : { x: 4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-line pt-5 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-mono text-[11px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans font-semibold text-ink text-[17px] leading-snug tracking-[-0.01em]">
                    {p.title}
                  </h3>
                </div>
                <p className="font-sans text-[15px] text-muted leading-relaxed pl-7">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
