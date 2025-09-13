import {  useTheme } from "./contexts/Theme/ThemeContext"
import { Theme } from "./types/theme";
function App() {
  const { theme, setMyTheme } = useTheme();

  setMyTheme(Theme.Light);

  return (
    <div className=" bg-primary dark:bg-primary-dark 100 min-h-screen flex items-center justify-center" >
      <h1 className="heading">Hello, World!</h1>
    </div>
  )
}

export default App
