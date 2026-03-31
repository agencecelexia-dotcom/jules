import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/components/providers/AppProvider";
import { SkipLink } from "@/components/shared/SkipLink";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "HandiConnect",
    template: "%s — HandiConnect",
  },
  description:
    "Le reseau social qui connecte les familles en situation de handicap avec des activites et etablissements adaptes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} h-full`}
      style={{ ["--font-sans" as string]: `var(--font-jakarta), "Plus Jakarta Sans", system-ui, sans-serif` }}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground antialiased">
        <AppProvider>
          <TooltipProvider>
            <SkipLink />
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}
