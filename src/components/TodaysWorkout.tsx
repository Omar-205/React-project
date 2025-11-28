import { useEffect, useLayoutEffect, useState } from "react";
import { TodaysWorkoutExercise } from "./TodaysWorkoutExercise";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { workoutPrograms } from "../types/weeklyPlans";
import { saveUserData } from "../services/DatabaseServices";
import { setUser } from "../store/slices/authSlice";
import { CheckCheck } from "lucide-react";

export function TodaysWorkout() {
  const authData = useSelector((state: RootState) => state.Authantication);
  const dispatch = useDispatch();

  const [selectedProgramName, setSelectedProgramName] = useState(
    authData.user?.workoutData?.selectedWorkout || "beginnerFullBodyPlan"
  );

  useLayoutEffect(() => {
    const user = authData.user;

    const invalid =
      !user?.workoutData ||
      !user.workoutData.selectedWorkout ||
      !user.workoutData.history ||
      !Object.keys(workoutPrograms).includes(user.workoutData.selectedWorkout);

    if (invalid) {
      const selectedWorkout = user?.workoutData?.selectedWorkout || "beginnerFullBodyPlan";
      const history = user?.workoutData?.history || {};

      saveUserData(authData.uid!, {
        workoutData: { selectedWorkout, history },
      });

      dispatch(
        setUser({
          ...user!,
          workoutData: { selectedWorkout, history },
        })
      );

      setSelectedProgramName(selectedWorkout);
    } else {
      setSelectedProgramName(user.workoutData.selectedWorkout);
    }
  }, []);

  const selectedProgram = workoutPrograms[selectedProgramName];
  const today = Math.floor((Date.now() + 3 * 3600 * 1000) / 86400000);
  const todayIndex = (today - 1) % 7;

  const [workout, setWorkout] = useState(selectedProgram.program[todayIndex]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [startWorkout, setStartWorkout] = useState(false);

  useEffect(() => {
    setWorkout(selectedProgram.program[todayIndex]);
  }, [selectedProgramName]);

  const isRestDay = workout.exercises.length === 0;
  const isDone = authData.user?.workoutData?.history?.[today] != null;

  function isExerciseCompletedToday(exercise: any) {
    try {
      const history = JSON.parse(localStorage.getItem("workoutHistory") || "{}");
      return !!history?.[today]?.[exercise.title];
    } catch {
      return false;
    }
  }

  useEffect(() => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => ({
        ...ex,
        completed: isExerciseCompletedToday(ex),
      })),
    }));
  }, []);

  function handleFinishedTodaysWorkout() {
    const netTotalWorkouts = (authData.user?.totalWorkouts || 0) + 1;

    const newHistory = {
      ...authData.user?.workoutData?.history,
      [today]: {
        caloriesBurned: workout.calories,
        type: workout.title
      },
    };

    saveUserData(authData.uid!, {
      workoutData: {
        selectedWorkout: selectedProgramName,
        history: newHistory,
      },
    });

    dispatch(
      setUser({
        ...authData.user!,
        totalWorkouts: netTotalWorkouts,
        workoutData: {
          selectedWorkout: selectedProgramName,
          history: newHistory,
        },
      })
    );
  }

  useEffect(() => {
    const count = workout.exercises.filter((ex) => ex.completed).length;
    setProgressPercent(count);

    if (count === workout.exercises.length && workout.exercises.length > 0) {
      setTimeout(handleFinishedTodaysWorkout, 300);
    }
  }, [workout]);

  const handleStartWorkout = () => setStartWorkout(true);


  if (isRestDay) {
    return (
      <div className="p-4 shadow-xl rounded-lg bg-white">
        <h4><i className="fa-solid fa-dumbbell mr-2"></i>{workout.title}</h4>
        <p>Today is a rest day. Recover well!</p>
      </div>
    );
  }

  if (isDone) {
    return (
      <div>
        <div className=" text-6xl text-center text-text font-bold ">Workout Completed</div>
        <p className="text-center text-slate-500 pt-2">You Crushed it! {workout.duration} minuits completed</p>
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
        <div className="mt-8 flex justify-center">
          <div className="bg-white dark:bg-primary-dark shadow-md rounded-lg p-6 flex items-center gap-4">
            <i className="fa-solid fa-fire text-4xl text-orange-500"></i>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-text dark:text-white">
                {authData?.user?.workoutData?.history?.[today]?.caloriesBurned}
              </p>
              <p className="text-prof-text-secondary dark:text-text-secondary-dark">
                Calories Burned
              </p>
            </div>
          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="w-full shadow-xl rounded-lg p-4 
  bg-white dark:bg-primary-dark
  text-prof-text dark:text-text-dark
  transition-colors duration-300"
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-lg dark:text-text-dark">
            <i className="fa-solid fa-dumbbell mr-2 text-black dark:text-primary"></i>
            {workout.title}
          </h4>

          <div className="flex gap-4 mt-4 text-prof-text-secondary dark:text-text-secondary-dark">
            <p>{workout.calories} kcal</p>
            <p>{workout.level}</p>
          </div>
        </div>

        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer
        text-white 
        ${startWorkout
              ? "bg-green-600 dark:bg-green-700 cursor-not-allowed"
              : "bg-black dark:bg-primary hover:bg-primary dark:hover:bg-primary/90"
            }`}
          onClick={handleStartWorkout}
          disabled={startWorkout}
        >
          {startWorkout ? "Workout Started" : "Start Workout"}
        </button>
      </div>

      <div className="mt-4">
        <span className="text-prof-text dark:text-text-dark">
          {progressPercent}/{workout.exercises.length} Exercises
        </span>

        <div className="w-full bg-neutral-300 dark:bg-input-locked-dark h-4 rounded-lg mt-2">
          <div
            className="h-full bg-primary dark:bg-primary rounded-lg transition-all duration-300"
            style={{
              width: `${(progressPercent / workout.exercises.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        {workout.exercises.map((exercise) => (
          <TodaysWorkoutExercise
            key={exercise.id}
            exercise={exercise}
            workout={workout}
            setWorkout={setWorkout}
            startWorkout={startWorkout}
          />
        ))}
      </div>
    </div>

  );
}
