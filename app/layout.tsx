import type React from "react";
import type { Metadata } from "next";
import { Alfa_Slab_One, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { AgeGate } from "@/components/press-house/age-gate";
import { AGE_GATE_BOOTSTRAP } from "@/components/press-house/age-gate-bootstrap";
import { Footer } from "@/components/press-house/footer";
import { Masthead } from "@/components/press-house/masthead";

/**
 * Press House uses exactly two faces. Alfa Slab One has a single
 * weight, so display hierarchy comes from size alone; Libre Franklin
 * carries everything else, with 300 for prose and 700 for the
 * tracked-caps labels.
 */
const alfaSlab = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alfa-slab",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-libre-franklin",
});

export const metadata: Metadata = {
  title: {
    default: "Stormalong Cider | Quality Craft Hard Cider",
    template: "%s | Stormalong Cider",
  },
  description:
    "Unfiltered hard cider from Sherborn, Massachusetts. 100% fresh pressed apples, 26 medals since 2015. Find Legendary Dry, Mass Appeal, Kingston Black and the rest of the range near you.",
  icons: {
    icon: "/favicon.jpg",
    apple: "/apple-icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Must run before first paint — see AGE_GATE_BOOTSTRAP. */}
        <script dangerouslySetInnerHTML={{ __html: AGE_GATE_BOOTSTRAP }} />
      </head>
      <body
        className={`${alfaSlab.variable} ${libreFranklin.variable} ph-page bg-paper font-franklin text-ink antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="ph-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-gold focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <AgeGate />
        <div className="flex min-h-screen flex-col">
          <Masthead />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
