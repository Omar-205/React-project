import React, { useEffect, useRef, useState } from "react";

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
    const [cameraActive, setCameraActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
                audio: false,
            });
            streamRef.current = stream;
            setCameraActive(true);
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Please allow camera access to continue.");
        }
    };

    useEffect(() => {
        if (cameraActive && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play().catch((err) =>
                console.warn("Autoplay blocked:", err)
            );
        }
    }, [cameraActive]);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    };

    useEffect(() => {
        if (!isOpen) stopCamera();
        return () => stopCamera();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={handleClose}
        >
            <div
                className={`bg-input dark:bg-input-dark text-text dark:text-text-dark rounded-lg shadow-lg
        w-full transition-all duration-300 overflow-hidden relative
        ${cameraActive ? "max-w-3xl h-[80vh]" : "max-w-md sm:max-w-lg p-6 sm:p-8"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 text-lg z-10"
                >
                    ✕
                </button>

                <div className={`${cameraActive ? "h-full flex flex-col" : ""}`}>
                    {!cameraActive ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4">
                                Start Training: {exercise.title}
                            </h2>

                            <div className="space-y-2 text-md font-thin">
                                <p>
                                    <span className="font-medium">Sets:</span> {exercise.sets}
                                </p>
                                <p>
                                    <span className="font-medium">Reps:</span> {exercise.minReps} –{" "}
                                    {exercise.maxReps}
                                </p>
                                <p>
                                    <span className="font-medium">Rest:</span> {exercise.rest}s
                                </p>
                                {exercise.note && (
                                    <p className="italic opacity-80">💡 {exercise.note}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="relative flex-grow rounded-lg overflow-hidden border border-gray-300">
                            {/* Video feed */}
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover bg-black"
                            />

                            {/* Frame Overlay */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute inset-0 border-2 border-white/30 rounded-lg" />
                                <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                                <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                                <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg" />
                            </div>

                            {/* Floating End Training Button */}
                            <button
                                onClick={() => {
                                    onComplete();
                                    handleClose();
                                }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-200 z-20"
                            >
                                End Training
                            </button>
                        </div>
                    )}
                </div>

                {!cameraActive && (
                    <div className="mt-6">
                        <button
                            onClick={startCamera}
                            className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 transition-colors duration-200"
                        >
                            Open Camera
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainPopup;