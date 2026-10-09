import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  title: string;
  total: number;
}

export default function SearchResultTitle({ title, total }: Props) {
  return (
    <div className="mt-5">
      <h2
        className="font-cormorant text-[32px] text-[#C37000]"
        style={{ marginTop: "10px" }}
      >
        {title}
      </h2>
      <h3 className="font-cormorant text-[24px] text-[#3D352F]">
        Temple-blessed devotional frames crafted for your home altar and
        gifting.
      </h3>
      <p
        className={`${cormorantInfant.className} mt-1 text-[20px] font-bold text-[#3D352F]`}
      >
        {total} Products
      </p>
    </div>
  );
}
