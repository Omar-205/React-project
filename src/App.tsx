import Navbar from "./components/Navbar";
import {  useTheme } from "./contexts/Theme/ThemeContext"
import { Theme } from "./types/theme";
function App() {
  const { theme, setMyTheme } = useTheme();

  setMyTheme(Theme.Light);

  return (
    <Navbar/>
  )
}

export default App
