import type { Metadata } from "next";
import TemplePage from "@/components/temples/TemplePage";
import TemplePageClient from "@/components/temples/TemplePageClient";

export const metadata: Metadata = {
  title: "Temples",
  description: "Discover sacred temples and divine shrines across Braj Bhoomi.",
};

export default function Page() {
  return (
    <TemplePageClient>
      <TemplePage />
    </TemplePageClient>
  );
}
