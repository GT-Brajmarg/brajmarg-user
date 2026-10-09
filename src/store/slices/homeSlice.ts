import { createSlice } from "@reduxjs/toolkit";

interface HomeState {
  heroLoaded: boolean;
}

const initialState: HomeState = {
  heroLoaded: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHeroLoaded(state) {
      state.heroLoaded = true;
    },
  },
});

export const { setHeroLoaded } = homeSlice.actions;
export default homeSlice.reducer;
