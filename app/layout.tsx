import type React from "react";
import type { Metadata } from "next";
import { Inter, Oswald, Bebas_Neue, Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stormalong Cider | Quality Craft Hard Cider",
  description:
    "Stormalong Hard Cider. Explore our variety of craft, orchard based ciders - Legendary Dry, Red Skies at Night, Mass Appeal, Light of the Sun, Grand Banks, Farmstand Unfiltered, Kingston Black, Boston Heirloom and more. Respect the apple.",
  icons: {
    icon: "/favicon.jpg",
    apple: "/apple-icon.jpg",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} ${bebasNeue.variable} ${cinzel.variable} ${poppins.variable} font-sans font-normal`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
