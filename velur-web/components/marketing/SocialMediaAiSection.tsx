"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

type Tool = { name: string; role: string };

const ANALYTICS: Tool[] = [
  { name: "Shopify",   role: "orders + margin"          },
  { name: "Klaviyo",   role: "flows + LTV signals"      },
  { name: "Meta Ads",  role: "spend + creative tags"    },
  { name: "TikTok Ads",role: "spend + saves"            },
  { name: "GA4",       role: "sessions + funnels"       },
  { name: "Postgres",  role: "your warehouse, if any"   },
];

const CREATIVE_AI: Tool[] = [
  { name: "Claude",      role: "email + brand copy"      },
  { name: "ChatGPT",     role: "ad angles + briefs"      },
  { name: "MidJourney",  role: "static creative"          },
  { name: "Flux",        role: "stylized visuals"        },
  { name: "Higgsfield",  role: "video + reels"            },
  { name: "Leonardo AI", role: "motion + iterations"     },
];

function Tile({ tool, index, prefersReduced }: { tool: Tool; index: number; prefersReduced: boolean | null }) {
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: prefersReduced ? 0 : index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReduced ? undefined : { y: -2 }}
      className="rounded-xl border border-line bg-paper px-4 py-3.5 hover:border-amber transition-colors"
    >
      <p className="font-sans font-semibold text-ink text-[14px] leading-tight">{tool.name}</p>
      <p className="font-mono text-[10.5px] tracking-[0.06em] text-muted mt-1">{tool.role}</p>
    </motion.div>
  );
}

export default function SocialMediaAiSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <SectionLabel left="ANALYTICS + CREATIVE AI" right="TWO HALVES, ONE BRIEF" className="mb-10 md:mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 4.2vw, 56px)" }}
            >
              Two halves of the same job.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
              Velur reads your data <em className="not-italic font-medium">and</em> helps you use AI tools where they actually pay off. They&apos;re different jobs — we keep them honest by treating them that way.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">

          {/* Analytics side */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-line bg-cream p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex w-7 h-7 rounded-full bg-amber items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 11 L5 7 L8 9 L12 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="font-mono text-[11px] tracking-[0.16em] text-amber uppercase">
                Analytics
              </p>
            </div>
            <h3
              className="font-sans font-bold text-ink leading-tight tracking-[-0.02em] mb-3"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              Read the stack. Explain the why.
            </h3>
            <p className="font-sans text-base text-muted leading-relaxed mb-7">
              We pull from your existing tools, reconcile what they disagree about, and send one daily brief that tells you what actually moved revenue.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {ANALYTICS.map((tool, i) => (
                <Tile key={tool.name} tool={tool} index={i} prefersReduced={prefersReduced} />
              ))}
            </div>
          </motion.div>

          {/* Creative AI side */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-line bg-cream p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex w-7 h-7 rounded-full bg-ink items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5 L8.4 5.6 L12.5 7 L8.4 8.4 L7 12.5 L5.6 8.4 L1.5 7 L5.6 5.6 Z" fill="white" />
                </svg>
              </span>
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink uppercase">
                Creative AI
              </p>
            </div>
            <h3
              className="font-sans font-bold text-ink leading-tight tracking-[-0.02em] mb-3"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              Put the tools to work, on purpose.
            </h3>
            <p className="font-sans text-base text-muted leading-relaxed mb-7">
              We help you fold generative AI into the parts of your business where it pays — copy, ad creative, video, brand visuals — and tie the output back to what actually sold.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {CREATIVE_AI.map((tool, i) => (
                <Tile key={tool.name} tool={tool} index={i} prefersReduced={prefersReduced} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-sm md:text-base text-muted leading-relaxed mt-8 md:mt-10 max-w-2xl"
        >
          Same brief, two perspectives. Some customers come for the analytics. Some come because their TikToks aren&apos;t converting. Most stay because both happen on one screen.
        </motion.p>
      </div>
    </section>
  );
}
