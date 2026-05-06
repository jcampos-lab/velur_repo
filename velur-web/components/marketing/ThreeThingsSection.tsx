"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const ROWS = [
  {
    num: "01",
    heading: "We don't sell another dashboard.",
    body: "You already have five. We replace them with one you own — built in your warehouse, on your domain, with your data.",
  },
  {
    num: "02",
    heading: "We don't lock you in.",
    body: "Every model, every query, every dashboard we build is yours. SQL files in your GitHub. No hidden infrastructure. Cancel us tomorrow and nothing breaks.",
  },
  {
    num: "03",
    heading: "We don't pretend to be an AI agency.",
    body: "We use AI to ship faster. Claude, Cursor, modern tooling — they make us 5× faster than agencies still writing PowerPoints. That speed becomes your savings.",
  },
];

export default function ThreeThingsSection() {
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowsRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      rowsRef.current!.querySelectorAll(".thing-row").forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: prefersReduced ? 0 : 20 },
          {
            opacity: 1, y: 0,
            duration: prefersReduced ? 0 : 0.5,
            delay:    prefersReduced ? 0 : i * 0.1,
            ease: "cubic-bezier(0.16,1,0.3,1)",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
      });
    };

    animate();
  }, []);

  return (
    <section className="bg-paper py-36">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <SectionLabel left="02 / THE SHAPE" right="HOW VELUR IS DIFFERENT" className="mb-14" />

        <h2
          className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.04em] mb-16"
          style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
        >
          Three things{" "}
          <em className="font-serif not-italic italic font-normal" style={{ fontStyle: "italic" }}>
            we don&apos;t
          </em>{" "}
          do.
        </h2>

        {/* Rows */}
        <div ref={rowsRef} className="divide-y divide-line border-t border-line">
          {ROWS.map(row => (
            <div key={row.num} className="thing-row grid grid-cols-12 gap-6 py-14 opacity-0">
              <div className="col-span-1 flex items-start pt-1">
                <span className="font-mono text-sm font-medium text-muted tracking-wide">{row.num}</span>
              </div>
              <div className="col-span-12 md:col-span-5">
                <h3
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.025em]"
                  style={{ fontSize: "clamp(22px, 2.5vw, 36px)" }}
                >
                  {row.heading}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <p className="font-sans text-lg text-ink leading-relaxed">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
