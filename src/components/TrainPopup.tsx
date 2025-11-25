import React, { useEffect, useRef, useState } from "react";

interface Exercise {
    title: string;
    sets: number;
    minReps: number;
    maxReps: number;
    rest: number;
    note?: string;
    modelName?: string;
}

interface TrainPopupProps {
    isOpen: boolean;
    onClose: () => void;
    exercise: Exercise;
    onComplete: () => void;
}

const TrainPopup: React.FC<TrainPopupProps> = ({
    isOpen,
    onClose,
    exercise,
    onComplete,
}) => {
    const [cameraActive, setCameraActive] = useState(false);
    const [formStatus, setFormStatus] = useState("Analyzing...");
    const [connected, setConnected] = useState(false);
    const [repsCompleted, setRepsCompleted] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });
            streamRef.current = stream;
            setCameraActive(true);
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Please allow camera access to continue.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
    };

    useEffect(() => {
        if (cameraActive && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play().catch((err) => console.warn("Autoplay blocked:", err));
        }
    }, [cameraActive]);

    useEffect(() => {
        if (!cameraActive) return;

        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        wsRef.current = ws;

        ws.onopen = () => {
            setConnected(true);
            ws.send(JSON.stringify({ model: exercise.modelName }));
        };

        ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                if (data.error) {
                    console.error("Backend error:", data.error);
                    setFormStatus("Error");
                } else {
                    setFormStatus(data.form_status || "Unknown");
                    setRepsCompleted(data.rep_state?.rep_counter || 0);
                }
            } catch (e) {
                console.error("Invalid message", e);
            }
        };

        ws.onclose = () => setConnected(false);
        ws.onerror = () => setConnected(false);

        // Canvas used for resizing
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const sendFrame = () => {
            if (!videoRef.current || ws.readyState !== WebSocket.OPEN) return;

            const v = videoRef.current;
            if (v.videoWidth === 0 || v.videoHeight === 0) return;

            // 🔥 Bigger resolution → 480 × 480
            canvas.width = 480;
            canvas.height = 480;

            ctx?.drawImage(v, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

            ws.send(JSON.stringify({ frame: dataUrl }));
        };

        intervalRef.current = setInterval(sendFrame, 100);

        return () => {
            ws.close();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [cameraActive, exercise.modelName]);


    const handleClose = () => {
        stopCamera();
        wsRef.current?.close();
        setConnected(false);
        onClose();
    };

    if (!isOpen) return null;
    console.log()
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={handleClose}
        >
            <div
                className={`bg-white text-text dark:bg-input-dark dark:text-text-dark rounded-xl shadow-lg w-full transition-all duration-300 overflow-hidden relative ${cameraActive
                    ? "max-w-5xl h-[90vh]" // full popup size
                    : "max-w-md sm:max-w-lg p-6 sm:p-8"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 text-lg z-10"
                >
                    ✕
                </button>

                {!cameraActive ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Start Training: {exercise.title}</h2>
                        <p><strong>Sets:</strong> {exercise.sets}</p>
                        <p><strong>Reps:</strong> {exercise.minReps} – {exercise.maxReps}</p>
                        <p><strong>Rest:</strong> {exercise.rest}s</p>
                        {exercise.note && (
                            <p className="italic opacity-80 mt-2 placeholder:text-text placeholder:text-md placeholder:font-thin">
                                💡 {exercise.note}
                            </p>
                        )}
                        <button
                            onClick={startCamera}
                            className="mt-6 w-full bg-primary hover:bg-primary/45 text-white rounded-lg py-2.5"
                        >
                            Open Camera
                        </button>
                    </>
                ) : (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover bg-black"
                        />
                        <div
                            className="
                   absolute top-4 left-1/2 -translate-x-1/2
                   bg-input dark:bg-input-dark 
                   text-text dark:text-text-dark
                   rounded-xl px-4 py-3
                   flex flex-wrap lg:flex-nowrap
                   whitespace-normal lg:whitespace-nowrap
                   items-center justify-center
                   gap-x-4 gap-y-1
                   max-w-[90%]
                   text-sm sm:text-base
               "
                        >
                            <span className="dark:text-secondary text-primary font-semibold text-lg sm:text-xl">
                                {exercise.title} Train
                            </span>

                            <span className="hidden sm:inline">|</span>

                            <span className={connected ? "text-success font-semibold" : "text-error font-semibold"}>
                                {connected ? "🟢 Connected" : "🔴 Disconnected"}
                            </span>

                            <span className="hidden sm:inline">|</span>

                            <span
                                className={`
      font-bold 
      text-xl sm:text-2xl
      ${formStatus.toLowerCase().includes("good")
                                        ? "dark:text-green-500 text-green-700"
                                        : "dark:text-red-500 text-red-700"
                                    }
    `}
                            >
                                {formStatus}
                            </span>

                            <span className="hidden sm:inline">|</span>

                            <span className="dark:text-secondary text-primary font-semibold text-lg sm:text-2xl">
                                Reps: {repsCompleted}
                            </span>
                        </div>



                        <button
                            onClick={() => {
                                onComplete();
                                handleClose();
                            }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-success hover:bg-success/80 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-200"
                        >
                            End Training
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainPopup;
