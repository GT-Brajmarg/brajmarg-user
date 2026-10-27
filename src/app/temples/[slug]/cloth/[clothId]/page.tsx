import ClothBookingPage from "@/components/cloth/ClothBookingPage";
import Image from "next/image";

interface Props {
  params: Promise<{
    slug: string;
    clothId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug, clothId } = await params;

  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      {/* Mandala Background */}
      <Image
        src="/images/temple-paper-texture.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.24]"
      />
      {/* Lite Lotus BG — desktop only */}
      <div className="hidden lg:block pointer-events-none absolute top-[-60px] inset-0 z-0 overflow-hidden">
        <Image
          src="/images/lite-lotus-bg.png"
          alt=""
          width={1500}
          height={100}
          className="object-cover opacity-70"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[200px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.06]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1250px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
        />
      </div>

      {/* Cloth Booking Content */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1340px] px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <ClothBookingPage slug={slug} clothId={clothId} />
        </div>
      </div>
    </main>
  );
}
