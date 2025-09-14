interface ProgressBarProps {
    percentage: number;
    step?: number;
    totalSteps?: number;
}

export function ProgressBar({ percentage , step,totalSteps}: ProgressBarProps) {
    return (
        <div className="w-full max-w-5xl mt-5 ">
        <p className="mb-4 small-label"> step {step} of {totalSteps}</p>
        <div className="w-full bg-input rounded-full h-2.5 mb-4 dark:bg-input-dark">
            <div
                className="bg-primary h-2.5 rounded-full dark:bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
        </div>
    );
}
