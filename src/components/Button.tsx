interface ButtonProps {
    type?: "button" | "submit" | "reset";
    label: string;
    onClick?: () => void;
}
function Button({ label, onClick,type }: ButtonProps) {
    return <button  type={type} onClick={onClick} className="w-full text-white bg-primary h-12 text-md hover:bg-hover  
   font-bold  rounded-lg px-5 py-2.5 text-center transition-all duration-200 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300
  dark:bg-primary dark:hover:bg-hover  dark:focus:ring-primary">{label} </button>;
}

export default Button;