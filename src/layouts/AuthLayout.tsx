// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function AuthLayout() {
  return (
        <><Navbar /><Outlet /></>
  );
}

export default AuthLayout;
