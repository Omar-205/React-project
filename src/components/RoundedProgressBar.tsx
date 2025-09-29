import type { ReactNode } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useTheme } from "../contexts/Theme/ThemeContext";

const styleBuild = {
    pathColor: '#FF6E00',
    textSize: '19px',
    textColor: '#000', 
    trailColor: '#d6d6d6', 
    text: {
        fill: '#000',
        fontSize: '16px',
        dominantBaseline: 'central', 
        textAnchor: 'middle', 
}}

interface IProps {
    title: string;
    total: number;
    progress: number;
    type: string;
    svg?: ReactNode;
    color: string;
}
export default function RoundedProgressBar({title, total, progress, type, svg, color}: IProps) {
    const {theme} = useTheme();
    styleBuild.pathColor = color;
    styleBuild.textColor = theme == 'dark' ? '#f1f5f9': styleBuild.textColor
    styleBuild.trailColor = theme == 'dark'? "#121A21": styleBuild.trailColor
    const percentage = Math.round((progress / total) * 100);
    return (
        <div className="bg-menu-white dark:bg-primary-dark border-light-border dark:border-transparent border-1 rounded-lg p-6 flex flex-col gap-4 align-center justify-between h-full">
            <div>
            <h4 className="dark:text-[#f1f5f9] text-lg flex justify-between">
                <span>{title}</span>
                
                {svg}
            </h4>
            <span className="text-slate-500 text-xl dark:text-text-dark">{`${progress}/${total} ${type}`}</span>
            </div>
            <div className=" h-[120px] mt-4 flex justify-center w-full">
                <CircularProgressbar value={percentage} text={`${percentage}%`} 
                styles={buildStyles(styleBuild)}
                />
            </div>
            
        </div>
     )
}