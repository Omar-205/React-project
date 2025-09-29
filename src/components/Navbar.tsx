import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Avatar from "./Avatar";
import { NavLink } from "react-router-dom";

function Navbar({ buttonLabel, secondButtonLabel, isLandingPage }: { buttonLabel: string, secondButtonLabel?: string, isLandingPage?: boolean }) {
  // const { username, isAuthenticated, logout } = useAuth();
  const [isAuthenticated, setAuth] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const username = "Hazem Emad";
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  }
  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md dark:bg-primary-dark border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-3 py-3 flex justify-between items-center">
        {/* Left side (logo) */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img src="src/assets/Logo.png" alt="Logo" className="w-12 h-12" />
          <span className=" text-primary text-3xl font-bold dark:text-white">Coachy</span>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-6">
          {isAuthenticated ?
            <div className="relative ">
              {/* Avatar */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-white"
              >
                <Avatar name={username} />
              </button>
              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-input text-text "
                  >
                    Logout
                  </button>
                </div>
              )
              }
            </div>
            :
            <div className="flex items-center gap-4 w-min-[250px]">
              {!isLandingPage && <NavLink to="/" className="text-black cursor-pointer dark:text-white"> Overview</NavLink>}
              <Button label={buttonLabel} onClick={buttonLabel === "Login" ? handleLogin : handleRegister} width={buttonLabel === "Login" ? "md:w-[90px] w-[60px]" : "md:w-[135px]"} />
              {secondButtonLabel && <Button label={secondButtonLabel} onClick={handleRegister} isSecondary={true} width="md:w-[135px]  w-[80px]" />}
            </div>
          }

        </div>
      </div>
    </nav>
  );
}

export default Navbar;