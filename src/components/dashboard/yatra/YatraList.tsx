"use client";

import YatraCard from "./YatraCard";

type YatraStatus = "upcoming" | "completed" | "cancelled";

interface Yatra {
  bookingId: string;
  yatra: string;
  destinations: string;
  dates: string;
  status: YatraStatus;
}

interface Props {
  search: string;
  sort: string;
  activeTab: string;
}

const yatras: Yatra[] = [
  {
    bookingId: "YT250624001",
    yatra: "Char Dham Yatra",
    destinations: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    dates: "12 July 2026 - 20 July 2026",
    status: "upcoming",
  },
  {
    bookingId: "YT250624002",
    yatra: "Char Dham Yatra",
    destinations: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    dates: "12 July 2026 - 20 July 2026",
    status: "completed",
  },
  {
    bookingId: "YT250624003",
    yatra: "Char Dham Yatra",
    destinations: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    dates: "12 July 2026 - 20 July 2026",
    status: "upcoming",
  },
  {
    bookingId: "YT250624004",
    yatra: "Char Dham Yatra",
    destinations: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    dates: "12 July 2026 - 20 July 2026",
    status: "cancelled",
  },
];

export default function YatraList({ search, sort, activeTab }: Props) {
  let filtered = yatras.filter((item) => {
    const matchesSearch =
      item.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      item.yatra.toLowerCase().includes(search.toLowerCase()) ||
      item.destinations.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "All Yatras" || item.status === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  switch (sort) {
    case "Oldest first":
      filtered = [...filtered].reverse();
      break;

    case "Upcoming First":
      filtered = [...filtered].sort((a, b) =>
        a.status === "upcoming" ? -1 : 1,
      );
      break;

    case "Completed First":
      filtered = [...filtered].sort((a, b) =>
        a.status === "completed" ? -1 : 1,
      );
      break;
  }

  if (!filtered.length) {
    return (
      <div className="mt-10 rounded-2xl border border-[#D9B382] bg-[#FFF9F2] p-12 text-center">
        <p className="text-[28px] font-semibold text-[#5A412C]">
          No yatras found
        </p>

        <p className="mt-2 text-[#7C6550]">
          Try changing the search or selected tab.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5" style={{ marginTop: "20px" }}>
      {filtered.map((item) => (
        <YatraCard key={item.bookingId} {...item} />
      ))}
    </div>
  );
}
