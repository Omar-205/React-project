import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  width?: string;
  margin?: string;
  placeholder?: string;
  value?: string;
  error?: string;
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
  error="",
  placeholder,
  required,
  onChange,
  isPassword = false,
  showPassword,
  value,

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
        value={value}
        className={`bg-input rounded-lg  block p-2.5 pr-10
          text-text
        placeholder:text-text 
          placeholder:text-md
          placeholder:font-thin
          dark:bg-input-dark 
          dark:text-text-dark
          dark:placeholder:text-text-dark
          w-full
          h-15
          ${error ? "border-1 border-error ring-error" : "border border-text-dark focus:border-primary dark:focus:border-primary "}
        `}
      />

      {/* Password toggle */}
      {isPassword && onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 bottom-3 -translate-y-2 text-text hover:text-primary-dark dark:text-text-dark dark:hover:text-primary cursor-pointer"
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
