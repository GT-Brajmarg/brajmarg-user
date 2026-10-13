import TemplePage from "@/components/temples/TemplePage";
import TemplePageClient from "@/components/temples/TemplePageClient";

export default function Page() {
  return (
    <TemplePageClient>
      <TemplePage />
    </TemplePageClient>
  );
}
