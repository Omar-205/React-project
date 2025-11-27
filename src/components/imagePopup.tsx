import React, { type ReactNode } from "react";

interface ImagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    className?: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                className={`bg-white dark:bg-primary-dark rounded-2xl shadow-2xl w-[90%] sm:w-[500px] p-6 transition-all duration-300 ${className}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title || "Modal Title"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl font-bold leading-none cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="text-gray-700 dark:text-gray-200">{children}</div>
            </div>
        </div>
    );
};

export default ImagePopup;