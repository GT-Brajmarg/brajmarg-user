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
    <div className="w-full rounded-[16px] border border-[#D49A2A] bg-[#F8F1E6] px-6 py-4">
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
            borderRadius: "8px",
            background: "#0D6B73",
            color: "#FFFFFF",
            fontSize: "14px",
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
              paddingLeft: "48px",
              paddingRight: "16px",
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
            width: "100%",
            height: "42px",
            borderRadius: "8px",
            background: "#0D6B73",
            color: "#FFFFFF",
            fontSize: "14px",
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
          paddingLeft: "8px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            color: "#5D4B33",
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
                height: "22px",
                padding: "0 12px",
                border: "1px solid #C88A1A",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
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
            fontSize: "13px",
            color: "#5D4B33",
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
                height: "22px",
                padding: "0 12px",
                border: "1px solid #C88A1A",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
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
