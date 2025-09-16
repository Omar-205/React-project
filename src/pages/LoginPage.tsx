import { use } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useTheme } from "../contexts/Theme/ThemeContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { theme } = useTheme();
    const navigator=useNavigate();

    return (
        <div className="flex flex-col items-center bg-white dark:bg-primary-dark px-4 min-h-[calc(100vh-64px)]">
            <h1 className="heading mt-10">
                Welcome back
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center mt-15 md:mt-25 w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">
                {/* form */}
                <div className="w-full max-w-[550px]">
                    <form action="" className="space-y-4">
                        <InputField name="Email" id="Email" type="text" placeholder="Enter Your Email" />
                        <InputField name="Password" id="Password" isPassword={true} margin="mb-15" placeholder="Enter Your Password" />
                        <Button type="submit" label="Login" />
                    </form>
                    <p className="mt-5 text-center text-gray-400 text-sm">
                        Don’t have an account?{" "}
                        <a onClick={() => navigator("/register")} className="text-gray-400 hover:underline font-bold">
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
