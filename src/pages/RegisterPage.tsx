import { useState } from "react";
import { ProgressBar } from "../components/ProgressBar";
import InputField from "../components/InputField";
import SelectionCard from "../components/SelectionCard";
import Button from "../components/Button";
import { useTheme } from "../contexts/Theme/ThemeContext";
import SelectField from "../components/SelectField";

function RegisterPage() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState<string>("Trainee");
    const { theme } = useTheme();

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <>
            <div className="flex flex-col items-center bg-white dark:bg-primary-dark px-4 min-h-[calc(100vh-64px)]">
                {/* progress bar */}
                <ProgressBar
                    percentage={step === 1 ? selected === "Trainee" ? 50 : 100 : 100}
                    step={step}
                    totalSteps={selected === "Trainee" ? 2 : 1}
                />
                {/* heading */}
                <h1 className="heading mt-10">
                    {step === 1 ? "Create your account" : "Tell us about yourself"}
                </h1>
                {/* first step  */}
                {step === 1 && (
                    <>
                        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">
                            {/* form */}
                            <div className="w-full max-w-[550px] space-y-4">
                                <form>
                                    <InputField type="text" name="Full Name" id="FullName" placeholder="Enter Your full name" />
                                    <InputField type="email" name="Email" id="Email" placeholder="Enter Your email" />
                                    {selected === "Trainee" && (
                                        <>
                                            <InputField type="text" name="Age" id="Age" placeholder="Enter Your age" />
                                            <SelectField select="Select Your Gender" options={["Male", "Female"]} id={"Gender"} name="Gender" />
                                        </>
                                    )}
                                    <InputField
                                        type="password"
                                        name="Password"
                                        id="Password"
                                        isPassword={true}
                                        placeholder="Enter Your password"
                                        showPassword={showPassword}
                                        onTogglePassword={() => setShowPassword(!showPassword)}
                                    />
                                    <InputField
                                        type="password"
                                        name="Confirm Password"
                                        id="ConfirmPassword"
                                        isPassword={true}
                                        placeholder="Confirm Your password"
                                        showPassword={showPassword}
                                        margin="mb-10"
                                    />
                                </form>
                            </div>

                            {/* cards */}
                            <div className="flex justify-center items-center space-x-10 mb-10 p-2">
                                <SelectionCard
                                    label="Trainee"
                                    image="src/assets/trainee.png"
                                    selected={selected === "Trainee"}
                                    onSelect={() => setSelected("Trainee")}
                                />
                                <SelectionCard
                                    label="Trainer"
                                    image="src/assets/trainer.png"
                                    selected={selected === "Trainer"}
                                    onSelect={() => setSelected("Trainer")}
                                />
                            </div>
                        </div>

                        {/* buttons */}
                        {selected === "Trainee" && (
                            <Button type="button" label="Next" icon="next" width="md:w-150" onClick={nextStep} />
                        )}
                        {selected === "Trainer" && (
                            <Button type="submit" label="Submit" icon="submit" width="md:w-150" />
                        )}
                    </>
                )}
                {/* second step */}
                {step === 2 && (
                    <>
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-center mt-5 md:mt-10 w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">
                            {/* form */}
                            <div className="w-full max-w-[550px]">
                                <form action="" className="space-y-4">
                                    <InputField name="Height" id="Height" type="text" placeholder="Enter Your height (cm)" />
                                    <InputField name="Current Weight" id="Weight" placeholder="Enter Your Weight (kg)" />
                                    <SelectField select="Select Your primary goal" options={["Lose Weight", "Maintain Weight", "Gain Weight"]} id={"PrimaryGoal"} name="Primary Goal" />
                                    <InputField name="Target Weight" id="TargetWeight" placeholder="Enter Your Target Weight (kg)" />
                                    <SelectField select="Select Your Activity Level" options={["Sedentary", "Light", "Moderate", "Active"]} id={"ActivityLevel"} name="Activity Level" />
                                    <div className="flex flex-col-reverse md:flex-row md:space-x-40 space-y-10 md:space-y-0 ">
                                        <Button isSecondary type="button" label="Back" margin="mt-10" onClick={prevStep} />
                                        <Button type="submit" label="Submit" margin="mt-10" icon="submit" />
                                    </div>
                                </form>
                            </div>
                            {/* image */}
                            <div className="justify-center items-center">
                                <div className="w-full max-w-96 flex justify-center mt-22">
                                    <img
                                        src={theme === "dark" ? "src/assets/Registerdark.png" : "src/assets/Register.png"}
                                        alt="Ready to train"
                                        className="rounded-[100px] w-full object-cover ring-1 ring-text-dark dark:ring-text hidden md:block"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default RegisterPage;
