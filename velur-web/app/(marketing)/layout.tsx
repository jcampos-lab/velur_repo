import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import FloatingSideRail from "@/components/marketing/FloatingSideRail";
import SmoothScrollProvider from "@/components/marketing/SmoothScrollProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Header />
      <main className="pt-16 md:pt-[68px]">{children}</main>
      <FloatingSideRail />
      <Footer />
    </SmoothScrollProvider>
  );
}
