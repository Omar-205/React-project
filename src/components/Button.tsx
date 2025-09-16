import { Send, ArrowBigRight } from "lucide-react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  width?: string;
  isSecondary?: boolean;
  margin?: string;
  onClick?: (e: React.FormEvent) => void;
  icon?: "next" | "submit";
  disabled?: boolean;
  className?: string;
  shape?: string;
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
  className = "w-full h-12 sm:h-14 rounded-lg font-bold  ",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${width ?? "md:w-full"} 
        ${className}
        px-4 sm:px-6 
        text-sm sm:text-base md:text-lg
         text-center
         cursor-pointer
        bg-primary hover:bg-hover
        transition-all duration-200 ease-in-out
        focus:ring-4 focus:outline-none focus:ring-primary-300
        dark:bg-primary dark:hover:bg-hover dark:focus:ring-primary
        ${isSecondary ? "text-primary bg-secondary hover:bg-secondary-hover dark:bg-text-dark dark:text-primary  dark:hover:bg-secondary-hover " : "text-white"}
        ${margin ?? ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {label}
      {icon === "next" && <ArrowBigRight className="inline-block ml-2 " size={20} />}
      {icon === "submit" && <Send className="inline-block ml-2" size={20} />}
    </button>
  );
}

export default Button;
