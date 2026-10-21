import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  activeLink: string;
  menuOpen: boolean;
  loginModalOpen: boolean;
}

const initialState: NavState = {
  activeLink: "Home",
  menuOpen: false,
  loginModalOpen: false,
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
    setLoginModalOpen(state, action: PayloadAction<boolean>) {
      state.loginModalOpen = action.payload;
    },
  },
});

export const { setActiveLink, toggleMenu, closeMenu, setLoginModalOpen } = navSlice.actions;
export default navSlice.reducer;
