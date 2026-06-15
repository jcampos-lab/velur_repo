import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";

/* Native scrolling, no Lenis. Lenis cached the page's max-scroll at init
   and didn't recompute it once art/fonts grew the page, which clamped the
   scroll partway down ("stuck until reload"). Native scroll has no such
   limit; all GSAP ScrollTrigger animations work directly against it. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
