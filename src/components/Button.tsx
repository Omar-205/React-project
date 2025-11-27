import { Send, ArrowBigRight, Loader2 } from "lucide-react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label?: string;
  width?: string;
  isSecondary?: boolean;
  margin?: string;
  onClick?: (e: React.FormEvent) => void;
  icon?: "next" | "submit";
  disabled?: boolean;
  className?: string;
  shape?: string;
  loading?: boolean;
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
  loading = false, 
  className = "flex justify-center items-center h-12 sm:h-14 rounded-lg font-bold sm:text-md md:text-md",
}: ButtonProps) {
  return (
    <button
  type={type}
  onClick={onClick}
  disabled={disabled || loading}
  className={`
    ${width ?? "md:w-full"} 
    ${className}
    px-2 py-2 sm:px-4 sm:py-2
    text-sm sm:text-base
    text-center
    cursor-pointer
    bg-primary hover:bg-hover
    transition-all duration-200 ease-in-out
    focus:ring-4 focus:outline-none focus:ring-primary
    dark:bg-primary dark:hover:bg-hover dark:focus:ring-primary
    ${isSecondary
      ? "text-sm text-primary bg-secondary hover:bg-secondary-hover dark:bg-text-dark dark:text-primary dark:hover:bg-secondary-hover"
      : "text-white"}
    ${margin ?? ""} 
    ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  {/* Loading */}
  {loading ? (
    <>
      <Loader2 className="animate-spin mr-2" size={20} />
      Loading...
    </>
  ) : (
    <>
      {label}
      {icon === "next" && (
        <ArrowBigRight className="inline-block ml-2" size={20} />
      )}
      {icon === "submit" && (
        <Send className="inline-block ml-2" size={20} />
      )}
    </>
  )}
</button>
  );
}

export default Button;
