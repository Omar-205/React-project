// src/layouts/AuthLayout.tsx
import { Outlet ,useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
function AuthLayout() {
  const Location=useLocation().pathname;
  return (
        <>
        <Navbar buttonLabel={Location==="/login"?"Get Started":"Login"} />
        <Outlet />
        </>
  );
}

export default AuthLayout;
