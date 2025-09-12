import {  useTheme } from "./contexts/Theme/ThemeContext"
function App() {
  const { theme, setMyTheme } = useTheme();

  setMyTheme('dark');

  return (
    <div className=" bg-primary dark:bg-primary-dark 100 min-h-screen flex items-center justify-center" data-theme={theme} >
      <h1 className="heading">Hello, World!</h1>
    </div>
  )
}

export default App
