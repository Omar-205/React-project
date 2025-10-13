
import { Theme } from "./types/theme";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import TraineePageLayout from "./layouts/TraineePageLayout";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Progress from "./Pages/Progress";
import Workouts from "./Pages/Workouts";
import Nutrition from "./Pages/Nutrition";
import StopWatches from "./Pages/StopWatches";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";

function App() {

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="trainee" element={<TraineePageLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="progress" element={<Progress />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="timer" element={<StopWatches />} />
      </Route>
    </Routes>



  )
}

export default App
