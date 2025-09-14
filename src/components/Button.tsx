interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  width?: string;
  margin?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({
  label,
  onClick,
  type = "button",
  margin,
  width,
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
        text-white text-center
        bg-primary hover:bg-hover
        transition-all duration-200 ease-in-out
        focus:ring-4 focus:outline-none focus:ring-primary-300
        dark:bg-primary dark:hover:bg-hover dark:focus:ring-primary
        ${margin ?? ""} 
        ${className}
      `}
    >
      {label}
    </button>
  );
}

export default Button;
