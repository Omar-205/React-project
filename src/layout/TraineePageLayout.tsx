import { useState } from "react";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";

export default function TraineePageLayout() {
    const [hideMenu, setHideMenu] = useState(true); //true by default
    return <div className="bg-[#F6F8FB] dark:bg-secondary-dark w-full min-h-dvh">
        <Navbar buttonLabel="omar" isLandingPage={false}/>
        {/* // breakpoint is md */}
        <div className="flex mx-auto justify-center gap-[2vw] px-[5vw]">
            <OptionsMenu hideMenu={hideMenu} setHideMenu={setHideMenu}/>
            {hideMenu && (<Routes>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="*" element={<Navigate to={'/'} />}/>

            </Routes>)}
        </div>
    </div>
}