import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUser } from "../store/slices/authSlice";
import Loading from "../components/Loading";

export default function TraineePageLayout() {
    const dispatch = useDispatch<AppDispatch>();
    const { uid, error, status } = useSelector(
        (state: RootState) => state.Authantication
    );
    const [hideMenu, setHideMenu] = useState(true);

    useEffect(() => {
        if (uid && status === "idle") {
            dispatch(fetchUser(uid));
        }
    }, [uid, status, dispatch]);    
    return (
        <div className="bg-white dark:bg-secondary-dark w-full min-h-dvh">
            <Navbar
                icon={
                    <i className="fa-solid fa-bars text-3xl dark:text-white md:text-[0px] hover:cursor-pointer"></i>
                }
                hideMenu={hideMenu}
                setHideMenu={setHideMenu}
            />

            {status === "succeeded" && (
                <div className="flex mx-auto justify-center gap-[2vw] px-[5vw]">
                    <OptionsMenu hideMenu={hideMenu} setHideMenu={setHideMenu} />
                    {hideMenu && <Outlet />}
                </div>
            )}

            {error && <p className="text-center text-error mt-5">{error}</p>}

            {status === "loading" && (
                <Loading
                    color="#215482"
                    size="large"
                />
            )}
        </div>
    );
}
