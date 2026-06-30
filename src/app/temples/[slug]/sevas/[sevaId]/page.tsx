import SevaHero from "@/components/seva/SevaHero";
import Booking from "@/components/seva/Booking";
import ImportantNotes from "@/components/seva/ImportantNotes";
import BookingSummary from "@/components/seva/BookingSummary";
import { fetchSevaDetailsService } from "@/lib/services/seva.service";

interface Props {
  params: Promise<{
    slug: string;
    sevaId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug, sevaId } = await params;

  const seva = await fetchSevaDetailsService(sevaId);

  const temple = seva.temples;

  return (
    <main className="bg-[#F8F2E8]">
      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <SevaHero templeSlug={slug} temple={temple} seva={seva} />
          <Booking />
          <div style={{ marginTop: "30px" }}>
            <ImportantNotes />
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <BookingSummary seva={seva} temple={temple} />
          </div>
        </div>{" "}
      </div>
    </main>
  );
}
