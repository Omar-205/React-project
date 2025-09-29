import "react-circular-progressbar/dist/styles.css";
import RoundedProgressBar from "./RoundedProgressBar";
import { useTheme } from "../contexts/Theme/ThemeContext";



export default function Dashboard() {
    const { theme } = useTheme();
    
    console.log(theme)
    return <div className="max-w-[1000px] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
        <h3 className="font-bold text-3xl md:text-4xl mb-2 dark:text-[#f1f5f9]">Good morning, Omar! 👋</h3>
        <p className="text-slate-400 mb-6 dark:text-[#94a3b8]">Ready to crush your fitness goals today?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[1vw] gap-y-[3vw]">
            
            <RoundedProgressBar title="Daily Calories" total={2200} progress={1850} 
            type={"Kcal"} color="#FF6E00" 
            svg={<i className="fa-solid fa-fire-flame-curved" style={{color:"#FF6E00"}}></i>}
            />
            <RoundedProgressBar title="Today's Workout" total={1} progress={1} 
            type={"Completed"} color="#00B97F" 
            svg={<i className="fa-solid fa-dumbbell" style={{color:"#00B97F"}}></i>}
            />
            <div className="sm:max-lg:col-span-full">
                <RoundedProgressBar title="Daily Steps" total={10000} progress={8500} 
                type={"steps"} color="#217BFF" 
                svg={<i className="fa-solid fa-heart-pulse" style={{color:"#217BFF"}}></i>}
                />

            </div>
        </div>
    
    </div>
}