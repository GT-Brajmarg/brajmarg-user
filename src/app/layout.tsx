import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import LayoutContent from "@/components/LayoutContent";
import { Cormorant_Garamond, Cormorant_Infant } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
});

export const metadata: Metadata = {
  title: "Brajmarg – Discover Sacred Temples & Pilgrimages",
  description:
    "Explore Brajmarg for curated pilgrimages, temple visits, seva opportunities, and spiritual yatras across Braj Bhoomi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${cormorantInfant.variable}`}>
        <ReduxProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#FAF5EC",
                border: "1px solid #DCC6A5",
                color: "#2D241E",
                borderRadius: "14px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
              },
              className: "font-sans",
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
