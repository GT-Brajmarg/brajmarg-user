import ClothBookingPage from "@/components/cloth/ClothBookingPage";

interface Props {
  params: Promise<{
    slug: string;
    clothId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug, clothId } = await params;

  return (
    <main className="bg-[#F8F2E8]">
      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <ClothBookingPage slug={slug} clothId={clothId} />
        </div>
      </div>
    </main>
  );
}
