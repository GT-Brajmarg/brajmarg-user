import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import LayoutContent from "@/components/LayoutContent";
import { cormorant, cormorantInfant } from "@/lib/fonts";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
            offset={24}
            toastOptions={{
              className: "font-sans",
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
