export function NutritionProgress({
    title,
    total,
    progress,
    color
}: {
    title: string,
    total: number,
    progress: number,
    color: string
}) {
    const percentage = progress / total * 100;
    console.log(color)
    return <>
        <div className="flex justify-between mb-1">
            <h6 className="font-semibold text-">{title}</h6>
            <p className="text-md">{progress}/{total}g</p>
        </div>
        <div className={`w-full  bg-input rounded-full h-2.5 mb-4 dark:bg-input-locked-dark`}>
            <div
                className={` h-2.5 rounded-full dark:bg-primary transition-all duration-500 ease-in-out`}
                style={{ width: `${percentage}%`, backgroundColor: color }}
            />
        </div>
    </>
}