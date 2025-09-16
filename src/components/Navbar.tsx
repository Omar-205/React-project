import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Avatar from "./Avatar";
import { div } from "framer-motion/client";

function Navbar({ buttonLabel }: { buttonLabel: string }) {
  // const { username, isAuthenticated, logout } = useAuth();
  const [isAuthenticated, setAuth] = useState(false);
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
    <nav className="bg-white shadow-2xl dark:bg-primary-dark border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side (logo) */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <span className="text-primary text-3xl font-bold dark:text-text-dark">Coachy</span>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
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
          ) : (
            <div className="flex items-center gap-4">
              <a onClick={() => navigate("/")} className="text-black cursor-pointer"> Overview</a>
              <Button label={buttonLabel} onClick={buttonLabel === "Login" ?handleLogin:handleRegister} className="rounded-xl w-[94px] h-[46px] " />
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
