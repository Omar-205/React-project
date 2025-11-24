import { useNavigate } from "react-router-dom";

interface Action {
  path: string;
  label: string;
  icon: string;
  bg: string;
}

interface Props {
  actions: Action[];
}

export default function ButtonsDash({ actions }: Props) {
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full ">
      
      {actions.map((action, idx) => (
        <li
          key={idx}
          className={`${action.bg} flex flex-col items-center justify-center 
            p-4 rounded-xl cursor-pointer hover:opacity-90 transition`}
          onClick={() => navigate(`/${action.path}`)}
        >
          <i className={`fa-solid ${action.icon} text-white text-xl mb-2`}></i>
          <p className="text-white font-semibold">{action.label}</p>
        </li>
      ))}
    </ul>
  );
}
