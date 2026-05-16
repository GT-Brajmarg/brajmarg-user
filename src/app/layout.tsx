import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingTour from "@/components/OnboardingTour";
import CartSync from "@/components/CartSync";
import CartDrawer from "@/components/CartDrawer";
import CartFab from "@/components/CartFab";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brajmarg - Connecting Devotees",
  description:
    "Book temple sevas, order prasad, frames, and poshaks from sacred temples across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        {children}
        <Footer />
        <OnboardingTour />
        <CartSync />
        <CartDrawer />
        <CartFab />
      </body>
    </html>
  );
}
