import workOutData from "../types/todaysWorkout";
import { use, useEffect, useState } from "react";
import { TodaysWorkoutExercise } from "./TodaysWorkoutExercise";
import { getWorkoutProgram } from "../store/slices/workoutProgram";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { workoutPrograms } from "../types/weeklyPlans";
export function TodaysWorkout() {
  const selectedProgramName = useSelector((state: RootState) => state.WorkoutProgram.name);
  console.log(selectedProgramName);
  const selectedProgram = workoutPrograms[selectedProgramName as keyof typeof workoutPrograms];

  //console.log(todaysso)
  //const workoutProgram = useSelector(state => state.workoutProgram)
  const [workout, setWorkout] = useState(selectedProgram.program[(new Date().getDay() - 1 + 7) % 7]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [startWorkout, setStartWorkout] = useState(false);
  const isRestDay = workout.exercises.length === 0;
  console.log(workout.exercises);
  useEffect(() => {
    const progress = workout.exercises.filter(ex => ex.completed).length;
    setProgressPercent(progress);
  }, [workout]);

  const handleStartWorkout = () => {
    setStartWorkout(!startWorkout);
  };

  if (isRestDay) {
    return (
      <div className="w-full shadow-xl rounded-lg p-4 bg-white dark:bg-primary-dark">
        <div className="flex flex-col justify-center items-center"></div>
        <h4 className="text-prof-text dark:text-text-dark text-lg"><i className="fa-solid fa-dumbbell mr-2"></i>{workout.title}</h4>
        <p className="text-prof-text-secondary dark:text-text-secondary-dark mt-4">Today is a rest day! Take time to recover and prepare for your next workout.</p>
      </div>
    )
  }

  return (
    <div className="w-full shadow-xl rounded-lg p-4 bg-white dark:bg-primary-dark">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-prof-text dark:text-text-dark text-lg"><i className="fa-solid fa-dumbbell mr-2"></i>{workout.title}</h4>
          <div className="flex gap-4 mt-4 text-prof-text-secondary dark:text-text-secondary-dark">
            <p><i className="fa-solid fa-bowl-food"></i>{workout.calories} kcal</p>
            <p><i className="fa-solid fa-level-up-alt"></i>{workout.level}</p>
          </div>
        </div>
        <button className="bg-black text-white rounded-lg px-4 py-2 hover:bg-slate-900 dark:bg-primary" onClick={handleStartWorkout}>{startWorkout ? 'Workout Started' : 'Start Workout'}</button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-4">
          <h6 className="text-prof-text-secondary">Progress</h6>
          <span className="text-prof-text-secondary">{progressPercent}/{workout.exercises.length} Exercises</span>
        </div>
        <div className="w-full bg-neutral-300 h-4 rounded-lg mt-2 dark:bg-secondary">
          <div className="h-full bg-primary rounded-lg transition-all duration-300 dark:bg-primary"
            style={{
              width: `${(progressPercent / workout.exercises.length) * 100}%`,
            }}></div>
        </div>
      </div>

      <div>
        {!isRestDay &&

          workout.exercises.map((exercise) => (
            <TodaysWorkoutExercise key={exercise.id} exercise={exercise} workout={workout} setWorkout={setWorkout} startWorkout={startWorkout} />
          ))}
      </div>
    </div>
  )

}