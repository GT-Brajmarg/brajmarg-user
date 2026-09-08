"use client";

import OrderCard from "./OrderCard";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  image: string;
  orderId: string;
  temple: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
}

interface Props {
  search: string;
  sort: string;
  activeTab: string;
}

const orders: Order[] = [
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267894",
    temple: "Shreenathji Temple, Nathdwara",
    date: "24 June 2026, 12:15 PM",
    items: 1,
    amount: 2300,
    status: "processing",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267895",
    temple: "Shreenathji Temple, Nathdwara",
    date: "24 June 2026, 12:15 PM",
    items: 1,
    amount: 2300,
    status: "shipped",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267896",
    temple: "Shreenathji Temple, Nathdwara",
    date: "24 June 2026, 12:15 PM",
    items: 1,
    amount: 2300,
    status: "delivered",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267897",
    temple: "Shreenathji Temple, Nathdwara",
    date: "24 June 2026, 12:15 PM",
    items: 1,
    amount: 2300,
    status: "processing",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267898",
    temple: "Shreenathji Temple, Nathdwara",
    date: "24 June 2026, 12:15 PM",
    items: 1,
    amount: 2300,
    status: "cancelled",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267899",
    temple: "Shri Banke Bihari Temple, Vrindavan",
    date: "18 June 2026, 09:30 AM",
    items: 1,
    amount: 999,
    status: "processing",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267900",
    temple: "Shri Krishna Janmabhoomi, Mathura",
    date: "15 June 2026, 02:15 PM",
    items: 1,
    amount: 1499,
    status: "shipped",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267901",
    temple: "Prem Mandir, Vrindavan",
    date: "10 June 2026, 11:45 AM",
    items: 1,
    amount: 3400,
    status: "delivered",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267902",
    temple: "ISKCON Temple, Vrindavan",
    date: "05 June 2026, 04:00 PM",
    items: 1,
    amount: 1850,
    status: "cancelled",
  },
  {
    image: "/images/demo/product.png",
    orderId: "BM2502267903",
    temple: "Dwarkadhish Temple, Mathura",
    date: "01 June 2026, 08:20 AM",
    items: 1,
    amount: 5200,
    status: "processing",
  },
];

export default function OrdersList({ search, sort, activeTab }: Props) {
  let filteredOrders = orders.filter((order) => {
    // Search
    const matchesSearch =
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.temple.toLowerCase().includes(search.toLowerCase());

    // Tab Filter
    const matchesTab =
      activeTab === "All Orders" || order.status === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  // Sort
  switch (sort) {
    case "Oldest first":
      filteredOrders = [...filteredOrders].reverse();
      break;

    case "Highest Amount":
      filteredOrders = [...filteredOrders].sort((a, b) => b.amount - a.amount);
      break;

    case "Lowest Amount":
      filteredOrders = [...filteredOrders].sort((a, b) => a.amount - b.amount);
      break;

    default:
      break;
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-[#D9B382] bg-[#FFF9F2] p-12 text-center">
        <p className="font-cormorant-infant text-[28px] text-[#5A412C]">
          No orders found
        </p>

        <p className="mt-2 text-[#7C6550]">
          Try changing the search or selected tab.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5" style={{ marginTop: "20px" }}>
      {filteredOrders.map((order) => (
        <OrderCard key={order.orderId} {...order} />
      ))}
    </div>
  );
}
