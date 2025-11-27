import { useState } from "react";
import TrainPopup from "./TrainPopup";

export function TodaysWorkoutExercise(props: {
    exercise: any;
    workout: any;
    setWorkout: any;
    startWorkout: any;
}) {
    const { exercise, workout, setWorkout, startWorkout } = props;
    const [showPopup, setShowPopup] = useState(false);
    function markExerciseComplete() {
        setWorkout({
            ...workout,
            exercises: workout.exercises.map((ex: any) =>
                ex.id === exercise.id ? { ...ex, completed: true } : ex
            ),
        });
        if (!localStorage) return;
        const today = Math.floor((new Date().getTime() + 3 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));
        const workoutHistory = JSON.parse(localStorage.getItem("workoutHistory") || "{}");
        if (!Object.keys(workoutHistory).includes(today.toString())) {
            workoutHistory[today] = {};
        }
        workoutHistory[today][exercise.title] = true;
        localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));

    };


    return (
        <>
            <div
                className={`flex justify-between items-center w-full border rounded-lg p-4 mt-4
    ${startWorkout
                        ? "bg-input dark:bg-input-unlocked-dark text-prof-text dark:text-text-dark"
                        : "bg-neutral-300 dark:bg-input-locked-dark text-prof-text-secondary dark:text-text-secondary-dark"
                    }
    ${startWorkout
                        ? "border-gray-300 dark:border-text-dark"
                        : "border-gray-300 dark:border-text-secondary-dark"
                    }
  `}
            >
                <div>
                    <h5 className="font-bold text-prof-text dark:text-text-dark">
                        {exercise.title}
                    </h5>

                    <p className="text-sm text-prof-text dark:text-text-dark">
                        {exercise.sets} sets × {exercise.minReps} - {exercise.maxReps} reps – {exercise.rest}s rest
                    </p>

                    {exercise.note && (
                        <p className="text-sm text-prof-text dark:text-text-dark">
                            <i className="fa-solid fa-lightbulb mr-1 text-yellow-400 dark:text-yellow-300"></i>
                            {exercise.note}
                        </p>
                    )}
                </div>

                <button
                    className={`rounded-lg px-4 py-2 transition-colors duration-200 cursor-pointer
      text-white
      ${exercise.completed
                            ? "bg-green-500 dark:bg-green-600 cursor-not-allowed"
                            : startWorkout
                                ? "bg-black dark:bg-primary hover:bg-slate-900 dark:hover:bg-primary/70"
                                : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                        }
    `}
                    onClick={() => {
                        if (startWorkout && !exercise.completed) {
                            setShowPopup(true);
                        }
                    }}
                    disabled={!startWorkout || exercise.completed}
                >
                    {exercise.completed ? "Completed" : "Start Training"}
                </button>
            </div>

            <TrainPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                exercise={exercise}
                onComplete={markExerciseComplete}
            />

        </>
    );
}
