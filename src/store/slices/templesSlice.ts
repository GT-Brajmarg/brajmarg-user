import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Temple {
  id: number;
  name: string;
  location: string;
  image: string;
  status: "LIVE" | "COMING SOON";
  href: string;
}

interface TemplesState {
  temples: Temple[];
  searchQuery: string;
  popularSearches: string[];
}

const initialState: TemplesState = {
  searchQuery: "",
  popularSearches: ["Nathdwara", "Khatu", "Jaipur", "Barsana", "Chittorgarh"],
  temples: [
    {
      id: 1,
      name: "Shreenathji Temple",
      location: "Nathdwara, Rajasthan",
      image: "/images/temple_shreenathji.png",
      status: "LIVE",
      href: "/temples/shreenathji",
    },
    {
      id: 2,
      name: "Shri Khatu Shyamji Temple",
      location: "Khatu, Rajasthan",
      image: "/images/temple_khatu_shyam.png",
      status: "LIVE",
      href: "/temples/khatu-shyamji",
    },
    {
      id: 3,
      name: "Shri Govind Devji Temple",
      location: "Jaipur, Rajasthan",
      image: "/images/temple_govind_devji.png",
      status: "LIVE",
      href: "/temples/govind-devji",
    },
    {
      id: 4,
      name: "Shree Radha Rani Temple",
      location: "Barsana, Uttar Pradesh",
      image: "/images/temple_radha_rani.png",
      status: "LIVE",
      href: "/temples/radha-rani",
    },
    {
      id: 5,
      name: "Shree Sawariya Seth Ji Temple",
      location: "Chittorgarh, Rajasthan",
      image: "/images/temple_banke_bihari.png",
      status: "LIVE",
      href: "/temples/sawariya-seth",
    },
    {
      id: 6,
      name: "Shreenathji Temple",
      location: "Nathdwara, Rajasthan",
      image: "/images/temple_shreenathji.png",
      status: "COMING SOON",
      href: "/temples/shreenathji-2",
    },
    {
      id: 7,
      name: "Shri Govind Devji Temple",
      location: "Jaipur, Rajasthan",
      image: "/images/temple_govind_devji.png",
      status: "COMING SOON",
      href: "/temples/govind-devji-2",
    },
    {
      id: 8,
      name: "Shri Khatu Shyamji Temple",
      location: "Khatu, Rajasthan",
      image: "/images/temple_khatu_shyam.png",
      status: "COMING SOON",
      href: "/temples/khatu-shyamji-2",
    },
  ],
};

const templesSlice = createSlice({
  name: "temples",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = templesSlice.actions;
export default templesSlice.reducer;
