import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
