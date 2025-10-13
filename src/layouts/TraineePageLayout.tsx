import { useState } from "react";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import {  Outlet  } from "react-router-dom";




export default function TraineePageLayout() {
    const [hideMenu, setHideMenu] = useState(true); //true by default
    return <div className="bg-[#F6F8FB] dark:bg-secondary-dark w-full min-h-dvh">
        <Navbar buttonLabel="Omar Ahmed" icon={<i className="fa-solid fa-bars text-3xl dark:text-white md:text-[0px] hover:cursor-pointer"></i>} 
        hideMenu={hideMenu} setHideMenu={setHideMenu}
        />
        {/* // breakpoint is md */}
        
        <div className="flex mx-auto justify-center gap-[2vw] px-[5vw]">
            <OptionsMenu hideMenu={hideMenu} setHideMenu={setHideMenu}/>
            {hideMenu && <Outlet />}
        </div>
    </div>
}