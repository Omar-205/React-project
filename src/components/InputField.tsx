import { Eye, EyeOff, Calendar } from "lucide-react";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  isDate?: boolean; 
}

function InputField({
  type,
  name,
  id,
  placeholder,
  required,
  onChange,
  isPassword = false,
  showPassword,
  onTogglePassword,
  isDate = false,
}: InputFieldProps) {
  return (
    <div className="relative">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : isDate ? "date" : type}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`bg-gray-50 text-gray-900 rounded-lg 
        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10
        placeholder:text-gray-400
        dark:bg-gray-700 dark:border-gray-600 
        dark:text-white dark:focus:ring-blue-500
        ${isDate ? "appearance-none" : ""}`}
      />

      {/* Password toggle */}
      {isPassword && onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Date icon */}
      {isDate && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Calendar className="w-5 h-5" />
        </span>
      )}
    </div>
  );
}

export default InputField;
