"use client";

import { Search, MapPin, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPopularSearches } from "@/store/slices/popularSearchSlice";

interface TempleSearchProps {
  onSearch: (value: string) => void;
}

export default function TempleSearch({ onSearch }: TempleSearchProps) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const dispatch = useAppDispatch();

  const { searches } = useAppSelector((state) => state.popularSearches);

  useEffect(() => {
    dispatch(fetchPopularSearches());
  }, [dispatch]);

  return (
    <div
      className="w-full rounded-[18px] border border-white/40 bg-white/20 px-6 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(248,241,230,0.65))",
      }}
    >
      {/* ================= Desktop ================= */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 220px 120px",
          gap: "12px",
          alignItems: "center",
          marginTop: "24px",
          marginLeft: "5px",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",

              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#C88A1A",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Temple by name or Diety..."
            style={{
              width: "100%",
              height: "42px",
              paddingLeft: "48px",
              paddingRight: "16px",
              fontFamily: "font-cormonant",
              border: "1px solid #C88A1A",
              borderRadius: "8px",
              background: "transparent",
              fontSize: "14px",
              color: "#7A5A2D",
              outline: "none",
            }}
          />
        </div>

        {/* City / State */}
        <div style={{ position: "relative" }}>
          <MapPin
            size={15}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#C88A1A",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          <select
            style={{
              width: "100%",
              height: "42px",
              fontFamily: "font-cormonant",
              paddingLeft: "42px",
              paddingRight: "36px",
              border: "1px solid #C88A1A",
              borderRadius: "8px",
              background: "transparent",
              fontSize: "14px",
              color: "#7A5A2D",
              outline: "none",
              appearance: "none",
            }}
          >
            <option>Select City / State</option>
          </select>

          <ChevronDown
            size={15}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#C88A1A",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            height: "42px",
            fontFamily: "font-cormonant",
            borderRadius: "8px",
            background: "#0D6B73",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          Search
        </button>
      </div>

      {/* ================= Mobile ================= */}
      <div
        className="flex flex-col gap-3 md:hidden"
        style={{
          marginTop: "12px",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",

              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#C88A1A",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Temple by name or Diety..."
            style={{
              width: "100%",
              height: "42px",
              fontFamily: "var(--font-cormorant)",
              paddingLeft: "40px",
              paddingRight: "16px",
              border: "1px solid #C88A1A",
              borderRadius: "8px",
              background: "transparent",
              fontSize: "14px",
              color: "#7A5A2D",
              outline: "none",
            }}
          />
          {/* <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Temple by name or Diety..."
            className="font-cormorant placeholder:font-cormorant h-[42px] w-full rounded-[8px] border border-[#C88A1A] bg-transparent pr-4 pl-12 text-[14px] text-[#7A5A2D] outline-none placeholder:text-[16px] placeholder:text-[#7A5A2D] placeholder:opacity-100"
          /> */}
        </div>

        {/* City / State */}
        <div style={{ position: "relative" }}>
          <MapPin
            size={15}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#C88A1A",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          <select
            style={{
              width: "100%",
              height: "42px",
              paddingLeft: "42px",
              paddingRight: "36px",
              fontFamily: "font-cormonant",
              border: "1px solid #C88A1A",
              borderRadius: "8px",
              background: "transparent",
              fontSize: "14px",
              color: "#7A5A2D",
              outline: "none",
              appearance: "none",
            }}
          >
            <option>Select City / State</option>
          </select>

          <ChevronDown
            size={15}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#C88A1A",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            height: "42px",
            borderRadius: "8px",
            fontFamily: "font-cormonant",
            background: "#0D6B73",
            color: "#FFFFFF",
            fontSize: "20px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* ================= Desktop Popular Searches ================= */}
      <div
        className="hidden md:flex"
        style={{
          alignItems: "center",
          height: "28px",
          marginTop: "12px",
          paddingLeft: "10px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            // fontFamily: "font-cormonant",
            color: "#5D4B33",
            fontFamily: "font-cormonant",
            whiteSpace: "nowrap",
          }}
        >
          Popular Searches :
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft: "14px",
          }}
        >
          {searches.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSearchValue(item.name);
                onSearch(item.name);
              }}
              style={{
                height: "25px",
                padding: "0 20px",
                border: "1px solid #C88A1A",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                fontFamily: "font-cormonant",
                color: "#5D4B33",
                whiteSpace: "nowrap",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Mobile Popular Searches ================= */}
      <div className="mt-4 mb-2 text-center md:hidden">
        <span
          style={{
            fontSize: "16px",
            color: "#5D4B33",
            fontFamily: "font-cormonant",
            marginTop: "30px",
          }}
        >
          Popular Searches :
        </span>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
            marginBottom: "10px",
          }}
        >
          {searches.map((item) => (
            <div
              onClick={() => {
                setSearchValue(item.name);
                onSearch(item.name);
              }}
              key={item.id}
              style={{
                height: "26px",
                padding: "0 20px",
                border: "1px solid #C88A1A",
                fontFamily: "font-cormonant",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#5D4B33",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
