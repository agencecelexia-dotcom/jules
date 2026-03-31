import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-6">
        {children}
      </main>
      <MobileNav />
    </>
  );
}
