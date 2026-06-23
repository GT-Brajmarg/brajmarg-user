import Image from "next/image";

export default function TemplePage() {
  return (
    <section className="relative h-[420px] overflow-hidden bg-[#F7F0E5]">
      {/* Temple Artwork */}
      <Image
        src="/images/hero-temples.png"
        alt=""
        width={1920}
        height={400}
        priority
        className="absolute -bottom-40 left-0 w-[10%] w-full opacity-60"
      />

      {/* Content */}
      <div className="absolute inset-x-0 top-24 z-10 flex flex-col items-center">
        <h1 className="font-cormorant text-[45px] leading-none font-semibold text-[#0D6B73] md:text-[45px]">
          Sacred Temples
        </h1>

        {/* Decorative Divider */}
        <div className="mt-2 flex items-center gap-3">
          <div className="h-px w-16 bg-[#D7B06B]" />

          <Image
            src="/images/lotus.png"
            alt=""
            width={60}
            height={60}
            className="object-contain"
          />

          <div className="h-px w-16 bg-[#D7B06B]" />
        </div>

        <p className="mt-6 max-w-[500px] text-center text-[15px] text-[#6D5C44]">
          Discover and connect with divine temples across India
        </p>
      </div>
    </section>
  );
}
