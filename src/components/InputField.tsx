import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  width?: string;
  margin?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
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
  margin = "mb-4",
  onTogglePassword,
}: InputFieldProps) {
  return (
    <div className={`relative ${margin}`}>
      <label htmlFor={id} className="label">
        {name}
      </label>

      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`bg-input rounded-lg border border-text-dark block p-2.5 pr-10
        placeholder:text-text 
          placeholder:text-md
          placeholder:font-thin
          dark:bg-input-dark dark:border-gray-600 
          dark:text-text-dark
          dark:placeholder:text-text-dark
          w-full
          h-15
        `}
      />

      {/* Password toggle */}
      {isPassword && onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 bottom-3 -translate-y-2 text-text hover:text-primary-dark dark:text-text-dark dark:hover:text-primary"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}

export default InputField;
