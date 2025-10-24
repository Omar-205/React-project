import type { ReactNode } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface IProps {
    title: string;
    total: number;
    progress: number;
    type: string;
    svg?: ReactNode;
    color: string;
}

export default function RoundedProgressBar({
    title,
    total,
    progress,
    type,
    svg,
    color,
}: IProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const percentage = Math.round((progress / total) * 100);
    const styles = buildStyles({
        pathColor: color,
        textSize: "19px",
        textColor: theme === "dark" ? "#f1f5f9" : "#000",
        trailColor: theme === "dark" ? "#fff" : "#d6d6d6",
    });

    return (
        <div className="dark:bg-primary-dark border-light-border dark:border-transparent border-1 rounded-lg p-6 flex flex-col gap-4 justify-between h-full transition-colors duration-300">
            <div>
                <h4 className="dark:text-[#f1f5f9] text-lg flex justify-between">
                    <span>{title}</span>
                    {svg}
                </h4>
                <span className="text-black text-xl dark:text-text-dark">
                    {`${progress}/${total} ${type}`}
                </span>
            </div>

            <div className="h-[120px] mt-4 flex justify-center w-full">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    className="bg-transparent"
                    styles={styles}
                />
            </div>
        </div>
    );
}
