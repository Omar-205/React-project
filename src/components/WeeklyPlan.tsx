import WeeklyExcercise from "./WeeklyExcercise";

export function WeeklyPlan() {
  return <div className="w-full shadow-xl rounded-lg p-4 bg-white dark:bg-primary-dark">
    <h3 className="text-prof-text dark:text-text-dark text-lg">This Week's Plan</h3>
    <p className=" dark:text-text-dark">Your Structured Workout Schedule</p>
    {/**
     * weeklt excercise has it's index to reference the weekly workouts array
     * 0  friday 
     * 6 thursday 
     * */  }
    <WeeklyExcercise day={0} />
    <WeeklyExcercise day={1} />
    <WeeklyExcercise day={2} />
    <WeeklyExcercise day={3} />
    <WeeklyExcercise day={4} />
    <WeeklyExcercise day={5} />
    <WeeklyExcercise day={6} />
  </div>;
}