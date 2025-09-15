
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./contexts/Theme/ThemeContext";
import RegisterPage from "./pages/RegisterPage";
import { Theme } from "./types/theme";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  const { setMyTheme } = useTheme();

  setMyTheme(Theme.Dark);

  return (
    <BrowserRouter>
      <Routes>
        {/* All Auth-related routes use AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
