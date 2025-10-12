
export function TodaysWorkoutExercise(props: { exercise: any; workout: any; setWorkout: any; startWorkout: any; }) {
    const { exercise, workout, setWorkout, startWorkout } = props;
    return (
        <div className={`flex justify-between items-center w-full border border-gray-300 rounded-lg p-4 mt-4 ${startWorkout ? 'bg-input dark:bg-input-unlocked-dark text-prof-text dark:text-text-dark' : 'bg-neutral-300 dark:bg-input-locked-dark text-prof-text-secondary dark:text-text-secondary-dark'}`}>
            <div>
                <h5 className="font-bold dark:text-text-dark">{exercise.title}</h5>
                <p className="text-sm">{exercise.sets} sets × {exercise.minReps} - {exercise.maxReps} reps - {exercise.rest}s rest</p>
                <p className="text-sm"><i className="fa-solid fa-lightbulb"></i>{exercise.note}</p>
            </div>
            <button
                className={`text-white rounded-lg px-4 py-2 transition-colors duration-200 
                        ${exercise.completed
                        ? 'bg-green-500 dark:bg-green-500 cursor-not-allowed'
                        : startWorkout
                            ? 'bg-black dark:bg-primary hover:bg-slate-900'
                            : 'bg-black dark:bg-primary cursor-not-allowed'}
                        `}
                onClick={() => {
                    if (startWorkout) {
                        setWorkout({
                            ...workout,
                            exercises: workout.exercises.map((ex: any) =>
                                ex.id === exercise.id ? { ...ex, completed: true } : ex
                            ),
                        });
                    }
                }}
            >
                {exercise.completed ? 'Completed' : 'Mark Done'}
            </button>

        </div>
    )
}