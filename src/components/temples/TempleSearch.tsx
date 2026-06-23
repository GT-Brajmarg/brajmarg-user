"use client";

import { Search, MapPin, ChevronDown } from "lucide-react";

const popularSearches = [
  "Mathura",
  "Vrindavan",
  "Kashi",
  "Nathdwara",
  "Dwarka",
  "Rameshwaram",
];

export default function TempleSearch() {
  return (
    <div className="w-full rounded-[16px] border border-[#D49A2A] bg-[#F8F1E6] px-6 py-4">
      {/* Search Row */}
      <div
        style={{
          display: "grid",
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

      {/* Popular Searches */}
      <div
        style={{
          display: "flex",
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
          {popularSearches.map((item) => (
            <div
              key={item}
              style={{
                height: "22px",
                padding: "0 14px",
                border: "1px solid #C88A1A",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#5D4B33",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
