import { useState } from "react";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import Progress from "../Pages/Progress";
import Workouts from "../Pages/Workouts";
import Nutrition from "../Pages/Nutrition";
import StopWatches from "../Pages/StopWatches";



export default function TraineePageLayout() {
    const [hideMenu, setHideMenu] = useState(true); //true by default
    return <div className="bg-[#F6F8FB] dark:bg-secondary-dark w-full min-h-dvh">
        <Navbar buttonLabel="Omar Ahmed" />
        {/* // breakpoint is md */}
        <div className="flex mx-auto justify-center gap-[2vw] px-[5vw]">
            <OptionsMenu hideMenu={hideMenu} setHideMenu={setHideMenu}/>
            {hideMenu && <Outlet />}
        </div>
    </div>
}