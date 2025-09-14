interface ButtonProps {
    type?: "button" | "submit" | "reset";
    label: string;
    onClick?: () => void;
}
function Button({ label, onClick,type }: ButtonProps) {
    return <button  type={type} onClick={onClick} className="w-full text-white bg-primary hover:bg-text 
  focus:ring-4 focus:outline-none focus:ring-primary
  font-medium rounded-lg text-sm px-5 py-2.5 text-center 
  dark:bg-primary dark:hover:bg-text dark:focus:ring-primary">{label} </button>;
}

export default Button;