import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
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
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
