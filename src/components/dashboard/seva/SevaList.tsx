"use client";

import SevaCard from "./SevaCard";

type SevaStatus = "upcoming" | "completed" | "cancelled";

interface Seva {
  image: string;
  bookingId: string;
  seva: string;
  temple: string;
  date: string;
  amount: number;
  status: SevaStatus;
}

interface Props {
  search: string;
  sort: string;
  activeTab: string;
}

const sevas: Seva[] = [
  {
    image: "/images/demo/product.png",
    bookingId: "SV2502267894",
    seva: "Raj Bhog Seva",
    temple: "Shreenathji Temple, Nathdwara",
    date: "24 June 2026 • 07:30 AM",
    amount: 2500,
    status: "upcoming",
  },
  {
    image: "/images/demo/product.png",
    bookingId: "SV2502267895",
    seva: "Mangla Aarti",
    temple: "Banke Bihari Temple, Vrindavan",
    date: "22 June 2026 • 05:00 AM",
    amount: 1200,
    status: "completed",
  },
  {
    image: "/images/demo/product.png",
    bookingId: "SV2502267896",
    seva: "Chappan Bhog",
    temple: "Dwarkadhish Temple, Mathura",
    date: "28 June 2026 • 12:30 PM",
    amount: 5100,
    status: "upcoming",
  },
  {
    image: "/images/demo/product.png",
    bookingId: "SV2502267897",
    seva: "Sandhya Aarti",
    temple: "Prem Mandir, Vrindavan",
    date: "18 June 2026 • 06:30 PM",
    amount: 900,
    status: "completed",
  },
  {
    image: "/images/demo/product.png",
    bookingId: "SV2502267898",
    seva: "Annadan Seva",
    temple: "ISKCON Temple, Vrindavan",
    date: "15 June 2026 • 11:00 AM",
    amount: 1500,
    status: "cancelled",
  },
  {
    image: "/images/demo/product.png",
    bookingId: "SV2502267899",
    seva: "Raj Bhog Seva",
    temple: "Shreenathji Temple, Nathdwara",
    date: "30 June 2026 • 07:30 AM",
    amount: 3200,
    status: "upcoming",
  },
];

export default function SevaList({ search, sort, activeTab }: Props) {
  let filteredSevas = sevas.filter((seva) => {
    const matchesSearch =
      seva.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      seva.seva.toLowerCase().includes(search.toLowerCase()) ||
      seva.temple.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "All Sevas" || seva.status === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  switch (sort) {
    case "Oldest first":
      filteredSevas = [...filteredSevas].reverse();
      break;

    case "Upcoming First":
      filteredSevas = [...filteredSevas].sort((a, b) =>
        a.status === "upcoming" ? -1 : 1,
      );
      break;

    case "Completed First":
      filteredSevas = [...filteredSevas].sort((a, b) =>
        a.status === "completed" ? -1 : 1,
      );
      break;

    default:
      break;
  }

  if (filteredSevas.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-[#D9B382] bg-[#FFF9F2] p-12 text-center">
        <p className="text-[28px] font-semibold text-[#5A412C]">
          No sevas found
        </p>

        <p className="mt-2 text-[#7C6550]">
          Try changing the search or selected tab.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5" style={{ marginTop: "20px" }}>
      {filteredSevas.map((seva) => (
        <SevaCard key={seva.bookingId} {...seva} />
      ))}
    </div>
  );
}
