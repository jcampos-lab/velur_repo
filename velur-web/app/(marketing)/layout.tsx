import Header from "@/components/marketing/Header";
import WordmarkFooter from "@/components/marketing/WordmarkFooter";
import AnnouncementBanner from "@/components/marketing/AnnouncementBanner";
import SmoothScrollProvider from "@/components/marketing/SmoothScrollProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <AnnouncementBanner />
      <Header />
      <main>{children}</main>
      <WordmarkFooter />
    </SmoothScrollProvider>
  );
}
