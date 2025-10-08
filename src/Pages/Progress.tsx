import Activity from "../components/Activity";
import NavTabs from "../components/NavTabs";
import ProgressPhotos from "../components/ProgressPhotos";
import RecCard from "../components/RecCard";
import WeightProgress from "../components/WeightProgress";
import WorkoutStats from "../components/WorkoutStats";
import { useTheme } from "../contexts/Theme/ThemeContext";

const titles = ["Weight Progress", "Workout Stats", "Progress Photos", "Activity"];
  const components = [
    <WeightProgress />,
    <WorkoutStats />,
    <ProgressPhotos />,
    <Activity />,
  ];

interface ProgRecData {
    given: number;
    statement: string;
    icon: JSX.Element;
  }
  
  const progRecData: ProgRecData[] = [
    { 
      given: 0, 
      statement: "Weight lost", 
      icon: <i className="fa-solid fa-arrow-down text-green-500"></i> 
    },
    { 
      given: 0, 
      statement: "To goal", 
      icon: <i className="fa-solid fa-bullseye text-blue-500"></i> 
    },
    { 
      given: 0, 
      statement: "Workouts", 
      icon: <i className="fa-solid fa-dumbbell text-violet-500"></i> 
    },
    { 
      given: 2400, 
      statement: "Calories burned", 
      icon: <i className="fa-solid fa-heart-pulse text-orange-500"></i> 
    },
  ];
  

export default function Progress() {
    const { theme } = useTheme();
    
    console.log(theme)
    return <div className="flex flex-col gap-4 max-w-[1000px] md:min-w-[55vw] min-w-[95vw] bg-transparent mt-8">
    <h3 className="font-bold text-3xl md:text-3xl mb-2 dark:text-[#f1f5f9]">Progress tracking
    <p className="text-slate-400  text-lg md:text-lg  dark:text-[#94a3b8]">Monitor your fitness journey and celebrate achievements </p>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full ">
  {progRecData.map((item, index) => (
    <RecCard 
      key={index}
      given={item.given}
      statement={item.statement}
      icon={item.icon}
    />
  ))}
</div>
<div className="p-4">
      {/* Your cards component above */}
      {/* <ProgressCards /> */}

      {/* Dynamic Navbar */}
      <NavTabs titles={titles} components={components} />
    </div>


    </div>
}