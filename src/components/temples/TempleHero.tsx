import Image from "next/image";

export default function TemplePage() {
  return (
    <>
      {/* Desktop */}
      <section className="relative hidden h-[420px] overflow-hidden bg-[#F7F0E5] md:block">
        <Image
          src="/images/hero-temples.png"
          alt=""
          width={1920}
          height={600}
          priority
          className="absolute bottom-[-40px] left-0 w-full opacity-25"
        />

        <div className="absolute inset-x-0 top-24 z-10 flex flex-col items-center">
          <h1 className="font-cormorant text-[45px] leading-none font-semibold text-[#0D6B73]">
            Sacred Temples
          </h1>

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

      {/* Mobile */}
      <section className="relative h-[300px] overflow-hidden bg-[#F7F0E5] md:hidden">
        <Image
          src="/images/hero-temples.png"
          alt=""
          width={1920}
          height={600}
          priority
          className="absolute bottom-[-20px] left-0 w-full opacity-40"
        />

        <div className="absolute inset-x-0 top-12 z-10 flex flex-col items-center px-4">
          <h1
            className="font-cormorant text-[34px] leading-none font-semibold text-[#0D6B73]"
            style={{ marginTop: "35px" }}
          >
            Sacred Temples
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-px w-10 bg-[#D7B06B]" />

            <Image
              src="/images/lotus.png"
              alt=""
              width={36}
              height={36}
              className="object-contain"
            />

            <div className="h-px w-10 bg-[#D7B06B]" />
          </div>

          <p className="mt-4 max-w-[260px] text-center text-[13px] text-[#6D5C44]">
            Discover and connect with divine temples across India
          </p>
        </div>
      </section>
    </>
  );
}
