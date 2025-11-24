import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-light-bg dark:bg-primary-dark text-text dark:text-text-dark transition-colors duration-300">
      <h1 className="text-6xl sm:text-7xl font-bold text-primary dark:text-secondary-dark mb-4">
        404
      </h1>
      <p className="text-lg sm:text-xl text-text dark:text-text-secondary-dark mb-8 text-center max-w-md px-4">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-hover dark:bg-secondary-dark dark:text-text-dark dark:hover:bg-input-locked-dark transition-all duration-200"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFoundPage;
