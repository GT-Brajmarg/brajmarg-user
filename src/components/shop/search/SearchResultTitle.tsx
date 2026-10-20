import { cormorantInfant } from "@/lib/fonts";

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
