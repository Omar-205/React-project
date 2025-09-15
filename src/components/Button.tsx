import { Send , ArrowBigRight } from "lucide-react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  width?: string;
  isSecondary?: boolean;
  margin?: string;
  onClick?: () => void;
  icon?: "next" | "submit";
  disabled?: boolean;
  className?: string;
}

function Button({
  label,
  onClick,
  type = "button",
  margin,
  width,
  icon,
  isSecondary = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${width ?? "md:w-full"} 
        w-full
        h-12 sm:h-14
        px-4 sm:px-6
        text-sm sm:text-base md:text-lg
        font-bold rounded-lg 
         text-center
        bg-primary hover:bg-hover
        transition-all duration-200 ease-in-out
        focus:ring-4 focus:outline-none focus:ring-primary-300
        dark:bg-primary dark:hover:bg-hover dark:focus:ring-primary
        ${isSecondary ? "text-primary bg-secondary hover:bg-secondary-hover dark:bg-text-dark dark:text-primary  dark:hover:bg-secondary-hover " : "text-white"}
        ${margin ?? ""} 
        ${className}
      `}
    >
      {label}
      {icon==="next" && <ArrowBigRight className="inline-block ml-2 " size={20} />}
      {icon==="submit" && <Send className="inline-block ml-2" size={20} />}
    </button>
  );
}

export default Button;
