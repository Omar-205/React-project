
import TraineePageLayout from "./layout/TraineePageLayout";
import { useTheme } from "./contexts/Theme/ThemeContext";
import { Theme } from "./types/theme";
import MainLayout from "./layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";

function App() {

  const { theme, setMyTheme } = useTheme();


  setMyTheme(Theme.Light);

  return (

    
    <>
      <TraineePageLayout />
      
   

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
