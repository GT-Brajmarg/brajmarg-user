import TempleHero from "./TempleHero";
import TempleSearch from "./TempleSearch";
import TempleGrid from "./TempleGrid";
import TempleCTA from "./TempleCTA";

export default function TemplePage() {
  return (
    <main className="min-h-screen bg-[#F7F0E5]">
      <section className="relative h-[340px] overflow-visible">
        <TempleHero />

        <div
          className="absolute left-1/2 z-20 w-full max-w-[1180px] -translate-x-1/2 px-5"
          style={{ bottom: "-95px" }}
        >
          <TempleSearch />
        </div>
      </section>

      <section
        className="pt-[200px]"
        style={{ marginTop: "120px", marginLeft: "120px" }}
      >
        <TempleGrid />
      </section>
      <section
        className="pt-8"
        style={{ marginBottom: "50px", marginLeft: "120px" }}
      >
        <TempleCTA />
      </section>
    </main>
  );
}
