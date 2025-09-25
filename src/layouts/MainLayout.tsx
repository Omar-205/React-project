// src/layouts/AuthLayout.tsx
import { Outlet ,useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
function AuthLayout() {
  const location = useLocation();
  return (
        <>
        <Navbar buttonLabel={location.pathname === "/login" ? "Get Started" : "Login"} secondButtonLabel={location.pathname === '/' ? "Get Started" : ""} isLandingPage={location.pathname==='/'?true:false} />
        <Outlet />
        </>
  );
}

export default AuthLayout;
