import { useRef, useState, type FormEvent } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import { loginUser } from "../services/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setUid } from "../store/slices/authSlice";

function LoginPage() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const FormRef=useRef<HTMLFormElement>(null);

    // Clear specific field error
    const clearError = (field: keyof typeof errors) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };
    const clearAllFields = () => {
        setEmail("");
        setPassword("");
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string, password?: string } = {};
        if (!email) {
            newErrors.email = "Email is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setAlert(true);
            setAlertMessage("Error: Please fill all fields in the form");
            return;
        }
        const user = await loginUser({ email, password });
        if ("error" in user) {
            setAlert(true);
            setAlertMessage(user.error);
            return;
        }
        if (user && !("error" in user)) {
            setAlert(true);
            setAlertMessage("Login Successful");
            console.log(user);
        }
        FormRef.current?.reset();
        clearAllFields();
        dispatch(setUid(user.uid));
        setTimeout(() => {
        navigator("/trainee");
        }, 1000);
    }

    return (
        <div className="flex flex-col items-center bg-white dark:bg-primary-dark px-4 min-h-[calc(100vh-71px)]">
            <h1 className="heading mt-10">
                Welcome back
            </h1>
            {alert &&
                <AlertCard message={alertMessage} variant={alertMessage.includes("Error") ? "error" : "success"} onClose={() => setAlert(false)} />
            }
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center mt-5 md:mt-25 w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">
                {/* form */}
                <div className="w-full max-w-[550px]">
                    <form onSubmit={(e)=>handleLogin(e)} className="space-y-4" ref={FormRef}>
                        <InputField name="Email"
                            id="Email"
                            type="text"
                            placeholder="Enter Your Email"
                            onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                        />
                        {errors.email && <p className="text-sm text-error -mt-2 mb-2">{errors.email}</p>}
                        <InputField name="Password"
                            id="Password"
                            isPassword={true}
                            placeholder="Enter Your Password"
                            margin={errors.password ? "" : "mb-15"}
                            onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                            showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)}
                        />
                        {errors.password && <p className="text-sm text-error -mt-2 mb-8">{errors.password}</p>}
                        <Button type="submit" label="Login" width="w-full text-xl" />
                    </form>
                    <p className="mt-5 text-center text-gray-400 text-sm">
                        Don’t have an account?{" "}
                        <a onClick={() => navigator("/register")} className="text-gray-400 hover:underline font-bold cursor-pointer">
                            Register
                        </a>
                    </p>
                </div>

                {/* image */}
                <div className="w-full max-w-96 flex justify-center">
                    <img
                        src={theme === "dark" ? "src/assets/Logindark.png" : "src/assets/Login.png"}
                        alt="Ready to train"
                        className="rounded-[100px] w-full object-cover ring-2 ring-text-dark dark:ring-text hidden md:block"
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
