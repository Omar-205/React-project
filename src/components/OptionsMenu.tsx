import type { Dispatch } from "react"
import { useNavigate } from "react-router-dom"

interface IProps{
    hideMenu: boolean
    setHideMenu: Dispatch<React.SetStateAction<boolean>>
}

export default function OptionsMenu({hideMenu, setHideMenu} : IProps) {
    const navigate = useNavigate();
    return <nav 
    className={`md:flex flex-col  border-slate-300 shadow-sm bg-[#FFFFFF] ${hideMenu?"hidden": ""}
    rounded-sm w-[85%] mx-auto sm:mx-0 text-slate-500 dark:bg-primary-dark dark:text-text-dark m-8 font-medium
    max-w-[85%] sm:max-w-[280px] h-fit`}>
        <h2 className="px-12 pt-8 py-6 w-full">
            My Fitness
        </h2>
        <ul className="pb-6 min-w-[]">
            <li onClick={() => {
                navigate("/dashboard")
                setHideMenu(true)
            }} 
            className=" px-10 py-3 hover:bg-secondary hover:text-primary hover:cursor-pointer">
            <i className="fa-solid fa-chart-line mr-3">
            </i>
                Dashboard
            </li>
            <li onClick={() => {
                navigate("/profile")
                setHideMenu(true)
            }} 
             className=" px-10 py-3 hover:bg-secondary hover:text-primary hover:cursor-pointer">
            <i className="fa-regular fa-user mr-3"></i>
                Profile</li>
            <li onClick={() => {
                navigate("/progress")
                setHideMenu(true)
            }} 

             className=" px-10 py-3 hover:bg-secondary hover:text-primary hover:cursor-pointer">
            <i className="fa-solid fa-bullseye mr-3"></i>
                Progress</li>
            <li onClick={() => {
                navigate("/workouts")
                setHideMenu(true)
            }} 
             className=" px-10 py-3 hover:bg-secondary hover:text-primary hover:cursor-pointer">
            <i className="fa-solid fa-dumbbell mr-3"></i>
                Workouts</li>
            <li onClick={() => {
                navigate("/nutrition")
                setHideMenu(true)
            }} 
             className=" px-10 py-3 hover:bg-secondary hover:text-primary hover:cursor-pointer">
            <i className="fa-solid fa-apple-whole mr-3"></i>
                Nutrition</li>
        </ul>
    </nav>
}