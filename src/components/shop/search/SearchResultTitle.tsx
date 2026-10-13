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
      <p
        className={`${cormorantInfant.className} mt-1 text-[20px] font-bold text-[#3D352F]`}
      >
        {total} Products
      </p>
    </div>
  );
}
