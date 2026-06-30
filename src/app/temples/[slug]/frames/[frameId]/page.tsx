import FrameBookingPage from "@/components/frames/FrameBookingPage";

interface Props {
  params: Promise<{
    slug: string;
    frameId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug, frameId } = await params;

  return (
    <main className="bg-[#F8F2E8]">
      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <FrameBookingPage slug={slug} frameId={frameId} />
        </div>
      </div>
    </main>
  );
}
