import React from "react";

interface TrainPopupProps {
    isOpen: boolean;
    onClose: () => void;
    exercise: any;
    onComplete: () => void;
}

const TrainPopup: React.FC<TrainPopupProps> = ({
    isOpen,
    onClose,
    exercise,
    onComplete,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={onClose}
        >
            <div
                className="bg-input dark:bg-input-dark text-text dark:text-text-dark rounded-lg shadow-lg 
                   w-full max-w-md sm:max-w-lg p-6 sm:p-8 relative transition-transform duration-300
                   flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 text-lg"
                >
                    ✕
                </button>

                {/* Content */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Start Training: {exercise.title}
                    </h2>

                    <div className="space-y-2 text-md font-thin">
                        <p>
                            <span className="font-medium">Sets:</span> {exercise.sets}
                        </p>
                        <p>
                            <span className="font-medium">Reps:</span> {exercise.minReps} – {exercise.maxReps}
                        </p>
                        <p>
                            <span className="font-medium">Rest:</span> {exercise.rest}s
                        </p>
                        {exercise.note && (
                            <p className="italic opacity-80">
                                💡 {exercise.note}
                            </p>
                        )}
                    </div>
                </div>

                {/* Button */}
                <div className="mt-6">
                    <button
                        onClick={() => {
                            onComplete();
                            onClose();
                        }}
                        className="w-full bg-primary hover:bg-primary/90
                        text-white rounded-lg py-2.5 transition-colors duration-200"
                    >
                        Upload video 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainPopup;
