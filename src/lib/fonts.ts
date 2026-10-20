import { Cormorant_Garamond, Cormorant_Infant, Inter } from "next/font/google";

// Load each Google font once and share it across the app. Declaring fonts per
// component makes Turbopack download dozens of font variants during the build,
// which fails on Vercel (`Can't resolve '@vercel/turbopack-next/internal/font/google/font'`).

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
