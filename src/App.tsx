
import {  Route, Routes } from "react-router-dom";
import { useTheme } from "./contexts/Theme/ThemeContext";
import RegisterPage from "./pages/RegisterPage";
import { Theme } from "./types/theme";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";

function App() {
  const { setMyTheme } = useTheme();

  setMyTheme(Theme.Light);

  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
  )
}

export default App
