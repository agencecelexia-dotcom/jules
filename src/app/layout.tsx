import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/components/providers/AppProvider";
import { SkipLink } from "@/components/shared/SkipLink";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HandiConnect | Reseau social pour le handicap",
    template: "%s | HandiConnect",
  },
  description:
    "Decouvrez des activites adaptees, partagez vos experiences et connectez-vous avec des familles et etablissements engages pour le handicap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
      style={{ ["--font-sans" as string]: `var(--font-dm-sans), sans-serif` }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProvider>
          <TooltipProvider>
            <SkipLink />
            {children}
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}
