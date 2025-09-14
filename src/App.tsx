import Navbar from "./components/Navbar";
import {  useTheme } from "./contexts/Theme/ThemeContext"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Theme } from "./types/theme";
function App() {
  const { theme, setMyTheme } = useTheme();

  setMyTheme(Theme.Light);

  return (
    <>
    <Navbar />
    <RegisterPage/>
    </>
  )
}

export default App
