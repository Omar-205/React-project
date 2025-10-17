import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {

  const isAuthenticated = useSelector((state: any) => state.Authantication.uid);

  if (!!isAuthenticated) {
    return <Navigate to="/trainee/dashboard" replace />;
  }


  return <Outlet />;
}
