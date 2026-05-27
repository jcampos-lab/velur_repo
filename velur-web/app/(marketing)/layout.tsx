import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import FloatingSideRail from "@/components/marketing/FloatingSideRail";
import SmoothScrollProvider from "@/components/marketing/SmoothScrollProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="pt-20">{children}</main>
      <FloatingSideRail />
      <Footer />
    </SmoothScrollProvider>
  );
}
