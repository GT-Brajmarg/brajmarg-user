import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  activeLink: string;
  menuOpen: boolean;
}

const initialState: NavState = {
  activeLink: "Home",
  menuOpen: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActiveLink(state, action: PayloadAction<string>) {
      state.activeLink = action.payload;
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu(state) {
      state.menuOpen = false;
    },
  },
});

export const { setActiveLink, toggleMenu, closeMenu } = navSlice.actions;
export default navSlice.reducer;
