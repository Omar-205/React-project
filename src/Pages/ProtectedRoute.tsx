import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";

const ProtectedRoute: React.FC = () => {
    const navigate = useNavigate();
    const authUid= useSelector((state: RootState) => state.Authantication.uid);
    useEffect(() => {
        if (!authUid) {
            navigate("/login");
        }
    }, [authUid]);
    return <Outlet />;
};

export default ProtectedRoute;
