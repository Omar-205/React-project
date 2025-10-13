import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", storedTheme);

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
