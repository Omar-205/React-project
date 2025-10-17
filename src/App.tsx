
import { Theme } from "./types/theme";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import TraineePageLayout from "./layouts/TraineePageLayout";
import Dashboard from "./Pages/Dashboard";
import Profile from "./components/Profile";
import Progress from "./Pages/Progress";
import Workouts from "./Pages/Workouts";
import Nutrition from "./Pages/Nutrition";
import StopWatches from "./Pages/StopWatches";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import ProtectedRoute from "./Pages/ProtectedRoute";
import PublicRoute from "./Pages/PublicRoute";

function App() {

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (

    <Routes>
      <Route element={<PublicRoute />}>
    <Route element={<MainLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  </Route>
      <Route element={<ProtectedRoute />}>
      <Route path="trainee" element={<TraineePageLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="progress" element={<Progress />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="timer" element={<StopWatches />} />
      </Route>
      </Route>
    </Routes>

  )
}

export default App
