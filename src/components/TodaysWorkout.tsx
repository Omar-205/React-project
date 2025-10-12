import workOutData from "../types/todaysWorkout";
import { useEffect, useState } from "react";
import { TodaysWorkoutExercise } from "./TodaysWorkoutExercise";
export function TodaysWorkout() {

  const [workout, setWorkout] = useState(workOutData);
  const [progressPercent, setProgressPercent] = useState(0);
  const [startWorkout, setStartWorkout] = useState(false);
  useEffect(() => {
    const progress = workout.exercises.filter(ex => ex.completed).length;
    setProgressPercent(progress);
  }, [workout]);

  const handleStartWorkout = () => {
    setStartWorkout(!startWorkout);
  };

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
          <div className="h-full bg-blue-600 rounded-lg transition-all duration-300 dark:bg-primary"
            style={{
              width: `${(progressPercent / workout.exercises.length) * 100}%`,
            }}></div>
        </div>
      </div>
      
      <div>
        {workout.exercises.map((exercise) => (
          <TodaysWorkoutExercise key={exercise.id} exercise={exercise} workout={workout} setWorkout={setWorkout} startWorkout={startWorkout} />
        ))}
      </div>
    </div>
  )

}