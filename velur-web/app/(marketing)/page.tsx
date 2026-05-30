import HeroSection            from "@/components/marketing/HeroSection";
import ToolMarquee            from "@/components/marketing/ToolMarquee";
import BentoSection            from "@/components/marketing/BentoSection";
import BenchmarkGrid          from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection     from "@/components/marketing/ThreeThingsSection";
import SocialMediaAiSection   from "@/components/marketing/SocialMediaAiSection";
import CtaSection             from "@/components/marketing/CtaSection";
import CreativeBarRace        from "@/components/illustrations/CreativeBarRace";
import AttributionDonut       from "@/components/illustrations/AttributionDonut";
import ActivityCalendar       from "@/components/illustrations/ActivityCalendar";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Tool marquee */}
      <ToolMarquee />

      {/* Bento dashboard */}
      <BentoSection />

      {/* Creative performance bar race, the AI Studio measurement story */}
      <section className="bg-cream py-14 md:py-20 border-b border-line overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-paper border border-line p-6 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="lg:col-span-4">
                <p className="font-sans text-ink/55 text-[13px] mb-2">
                  Which creative actually sold
                </p>
                <h2
                  className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
                  style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                >
                  Every asset, every week, ranked by margin.
                </h2>
                <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
                  We tag every Higgsfield reel, MidJourney still, TikTok post and Claude email when it ships. Then we follow the dollars. The leaderboard reshuffles itself in front of you.
                </p>
              </div>
              <div className="lg:col-span-8">
                <CreativeBarRace />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attribution donut, desktop only */}
      <section className="hidden lg:block bg-paper py-14 md:py-20 border-b border-line overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-cream border border-line p-6 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="lg:col-span-4">
                <p className="font-sans text-ink/55 text-[13px] mb-2">
                  Where the money came from
                </p>
                <h2
                  className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
                  style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                >
                  Six channels. One honest split.
                </h2>
                <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
                  First-party events, server-side signals and modeled conversions reconciled in one view. Hover any segment to see how that channel actually contributed.
                </p>
              </div>
              <div className="lg:col-span-8">
                <AttributionDonut />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily order activity calendar, desktop only */}
      <section className="hidden lg:block bg-cream py-14 md:py-20 border-b border-line overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-paper border border-line p-6 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="lg:col-span-4">
                <p className="font-sans text-ink/55 text-[13px] mb-2">
                  Daily rhythm
                </p>
                <h2
                  className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
                  style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                >
                  Every order, every day, six months back.
                </h2>
                <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
                  GitHub-style calendar so you spot weekday troughs, weekend spikes and that one Wednesday a creator post broke your inbox. Hover any cell for the exact count.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ActivityCalendar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BenchmarkGrid />
      <ThreeThingsSection />
      <SocialMediaAiSection />
      <CtaSection />
    </>
  );
}
