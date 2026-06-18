import { createSlice } from "@reduxjs/toolkit";

interface HeroState {
  heroTemple: string;
  darshan: {
    templeName: string;
    location: string;
    label: string;
    hours: number;
    minutes: number;
    seconds: number;
    date: string;
  };
}

const initialState: HeroState = {
  heroTemple: "Shreenathji Temple",
  darshan: {
    templeName: "Shreenathji Temple",
    location: "Nathdwara, Rajasthan",
    label: "Rajbhog darshan starts in",
    hours: 0,
    minutes: 12,
    seconds: 45,
    date: "16 June, 2026",
  },
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    tickCountdown(state) {
      if (state.darshan.seconds > 0) {
        state.darshan.seconds -= 1;
      } else if (state.darshan.minutes > 0) {
        state.darshan.minutes -= 1;
        state.darshan.seconds = 59;
      } else if (state.darshan.hours > 0) {
        state.darshan.hours -= 1;
        state.darshan.minutes = 59;
        state.darshan.seconds = 59;
      }
    },
  },
});

export const { tickCountdown } = heroSlice.actions;
export default heroSlice.reducer;
