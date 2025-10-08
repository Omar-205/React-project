import {  useTheme } from "./contexts/Theme/ThemeContext"
import TraineePageLayout from "./layout/TraineePageLayout";
import { Theme } from "./types/theme";
function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, setMyTheme } = useTheme();

  setMyTheme(Theme.Dark);

  return (
    
    <>
      <TraineePageLayout />
      
    </>
  )
}

export default App
