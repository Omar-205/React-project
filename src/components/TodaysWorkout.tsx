import { useEffect, useLayoutEffect, useState } from "react";
import { TodaysWorkoutExercise } from "./TodaysWorkoutExercise";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { workoutPrograms } from "../types/weeklyPlans";
import { saveUserData } from "../services/DatabaseServices";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { CheckCheck, } from "lucide-react";
export function TodaysWorkout() {
  const authData = useSelector((state: RootState) => state.Authantication);
  const dispatch = useDispatch();
  const [selectedProgramName, setSelectedProgramName] = useState(authData?.user?.workoutData?.selectedWorkout || "beginnerFullBodyPlan");
  console.log(selectedProgramName);
  useLayoutEffect(() => {
    //access the user data inwhich the workoutData exists
    const userData = authData.user;
    //hanlde workout name does not exist
    if (!userData?.workoutData || !userData?.workoutData?.selectedWorkout || !userData?.workoutData?.history || !Object.keys(workoutPrograms).includes(userData.workoutData.selectedWorkout)) {
      saveUserData(authData.uid as string, { workoutData: { selectedWorkout: userData?.workoutData?.selectedWorkout || "beginnerFullBodyPlan", history: userData?.workoutData?.history || {} } })
      if (authData.user) {
        dispatch(setUser(
          {
            ...authData.user,
            workoutData: {
              selectedWorkout: "beginnerFullBodyPlan"
              , history: authData.user?.workoutData?.history || {}
            },
          }
        ));
      }
      return;
    }
    // if the selected plan is found ?
    else {
      setSelectedProgramName(userData?.workoutData?.selectedWorkout);
    }
  }, [])

  console.log(selectedProgramName);
  const selectedProgram = workoutPrograms[selectedProgramName];
  console.log(selectedProgram)

  // todays index
  const today = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
  const todayIndex = (today - 1) % 7;
  const [workout, setWorkout] = useState(selectedProgram.program[todayIndex]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [startWorkout, setStartWorkout] = useState(false);
  const isRestDay = workout.exercises.length === 0;
  console.log(workout.exercises);
  const isDone = authData.user?.workoutData?.history?.[today] as unknown as boolean
  console.log(isDone ? "this work out is done" : "this workout isn't done")

  function handleFinishedTodaysWorkout() {
    console.log("today's workout is done");
    saveUserData(authData.uid as string, { workoutData: { selectedWorkout: selectedProgramName, history: { ...authData.user?.workoutData.history, [today]: { caloriesBurned: workout.calories } } } })
    if (authData.user) {
      dispatch(setUser(
        {
          ...authData.user,
          workoutData: {
            selectedWorkout: selectedProgramName
            , history: { ...authData.user?.workoutData.history, [today]: { caloriesBurned: workout.calories } }
          },
        }
      ));
    }
  }
  useEffect(() => {
    const progress = workout.exercises.filter(ex => ex.completed).length;
    setProgressPercent(progress);
    if (progress === workout.exercises.length) {
      handleFinishedTodaysWorkout()
    }
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
  if (isDone) {
    return (
      <div>
        <div className=" text-6xl text-center text-text font-bold ">Workout Completed</div>
        <p className="text-center text-slate-700 pt-2">You Crushed it! {workout.duration} minuits completed</p>
        <div className="w-full flex justify-center"><CheckCheck size={200} color="#22BB61" /></div>
        <div className="w-full max-w-5xl mt-5 ">
          <div className="text-text font-bold w-full text-end">100%</div>
          <div className="w-full bg-input rounded-full h-3 mb-4 dark:bg-input-dark">
            <div
              className="bg-primary h-3 rounded-full dark:bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${100}%` }}
            />
          </div>
        </div>
        <div className="text-4xl text-center text-text">Keep it up!</div>
        <div>
          <div>calories: {authData?.user?.workoutData?.history?.[today]?.caloriesBurned}</div>
          {/* <div>Reps: {workout.exercises.reduce((acc, wo) => acc + wo.)}</div> */}
        </div>
      </div >
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
        {
          workout.exercises.map((exercise) => (
            <TodaysWorkoutExercise key={exercise.id} exercise={exercise} workout={workout} setWorkout={setWorkout} startWorkout={startWorkout} />
          ))}
      </div>
    </div>
  )

}