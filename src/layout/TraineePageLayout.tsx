import { useState } from "react";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import Progress from "../Pages/Progress";
import Workouts from "../Pages/Workouts";
import Nutrition from "../Pages/Nutrition";
import StopWatches from "../Pages/StopWatches";

export default function TraineePageLayout() {
  const [hideMenu, setHideMenu] = useState(true); // true by default

  return (
    <div className="bg-[#F6F8FB] dark:bg-secondary-dark w-full min-h-dvh">
      {/* Navbar always at the top */}
      <Navbar buttonLabel="Omar Ahmed" />

      {/* Main content area */}
      <div className="flex mx-auto gap-[2vw] px-[5vw]">
        {/* Left sidebar menu */}
        <OptionsMenu hideMenu={hideMenu} setHideMenu={setHideMenu} />

        {/* Right main page section */}
        <div className="flex-1 flex justify-center">
          {hideMenu && (
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/timer" element={<StopWatches />} />
              <Route path="*" element={<Navigate to={"/dashboard"} />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}
