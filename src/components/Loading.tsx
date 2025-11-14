import { Commet } from "react-loading-indicators"

interface LoadingProps {
    size?: "small" | "medium" | "large",
    text ?: string
    textColor ?: string
    color ?: string
    className?: string
}
const Loading = ({ size, text, textColor, color, className }: LoadingProps) => {
    return (
        <div className={className}>
        <Commet color={[color || "#000000", "#C7E1FC"]} size={size} text={text} textColor={textColor}/>
        </div>
    )
}

export default Loading
        