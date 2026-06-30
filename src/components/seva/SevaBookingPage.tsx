import SevaHero from "@/components/seva/SevaHero";

interface Props {
  params: Promise<{
    slug: string;
    sevaId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const temple = {
    id: "1",
    name: "Shreenathji Temple",
    location: "Nathdwara",
  };

  const seva = {
    id: "1",
    name: "Rajbhog Seva",
    image_url: "/images/seva.png",
    details:
      "Offered during the afternoon Rajbhog, this seva includes bhog, vastra and special prayers for prosperity and well-being.",
    price: 751,
  };

  return (
    <main className="min-h-screen bg-[#F8F2E8]">
      <div className="mx-auto w-full px-12 py-10">
        <SevaHero templeSlug={slug} temple={temple} seva={seva} />
      </div>
    </main>
  );
}
