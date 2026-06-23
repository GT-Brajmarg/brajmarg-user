import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "@/components/ReduxProvider";
import { Cormorant_Garamond } from "next/font/google";
import { Cormorant_Infant } from "next/font/google";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cormorant",
});

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
});

// const lato = Lato({
//   variable: "--font-lato",
//   subsets: ["latin"],
//   weight: ["400", "700", "900"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Brajmarg – Discover Sacred Temples & Pilgrimages",
  description:
    "Explore Brajmarg for curated pilgrimages, temple visits, seva opportunities, and spiritual yatras across Braj Bhoomi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${cormorantInfant.variable}`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
