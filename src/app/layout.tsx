import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/components/providers/AppProvider";
import { SkipLink } from "@/components/shared/SkipLink";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
      style={{ ["--font-sans" as string]: `var(--font-source-sans), "Source Sans 3", sans-serif` }}
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
