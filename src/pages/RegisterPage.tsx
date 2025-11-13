import { useRef, useState, type FormEvent } from "react";
import { ProgressBar } from "../components/ProgressBar";
import InputField from "../components/InputField";
import SelectionCard from "../components/SelectionCard";
import Button from "../components/Button";
import SelectField from "../components/SelectField";
import { registerTrainee, registerTrainer } from "../services/AuthServices";
import { validate } from "../utils/helper";
import AlertCard from "../components/AlertCard";
import { Weight } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    // states
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState<string>("Trainee");
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [currentWeight, setCurrentWeight] = useState<string>("");
    const [primaryGoal, setprimaryGoal] = useState<string>("");
    const [targetWeight, setTargetWeight] = useState<string>("");
    const [activityLevel, setActivityLevel] = useState<string>("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loading, setloading] = useState(false);
    const FormRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    //error
    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        age?: string;
        gender?: string;
        height?: string;
        currentWeight?: string;
        primaryGoal?: string;
        targetWeight?: string;
        activityLevel?: string;
    }>({});
    // Clear specific field error
    const clearError = (field: keyof typeof errors) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };
    //Clear all Fields content
    const clearAllFields = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        setAge("");
        setHeight("");
        setCurrentWeight("");
        setprimaryGoal("");
        setTargetWeight("");
        setActivityLevel("");
        setErrors({});
    };

    // functions to display basic info or detailed info form
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    // handle form submission for trainer and trainee
    const handleTrainerSubmit = async (e: FormEvent) => {
        e.preventDefault();
        alert && setAlert(false);
        const newErrors: typeof errors = {};
        validate({ fullName, email, password, confirmPassword, errors: newErrors });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setAlert(true);
            setAlertMessage("Error: Please fill all fields in the form");
            return;
        }
        const Trainer = await registerTrainer({ fullName, email, password });
        if ('error' in Trainer) {
            setAlert(true);
            setAlertMessage(Trainer.error);
            return;
        }
        if (Trainer && !('error' in Trainer)) {
            setAlert(true);
            setAlertMessage("Trainer registered successfully!");
        }
        FormRef.current?.reset();
        clearAllFields();

    }

    const handleTraineeSubmit = async (e: React.FormEvent) => {
        setloading(true);
        e.preventDefault();
        const newErrors: typeof errors = {};
        validate({ fullName, email, password, confirmPassword, errors: newErrors });
        if (!age || isNaN(Number(age))) newErrors.age = "Please enter a valid age";
        if (!height || isNaN(Number(height))) newErrors.height = "Please enter a valid height";
        if (!currentWeight || isNaN(Number(currentWeight))) newErrors.currentWeight = "Please enter a valid current weight";
        if (!targetWeight || isNaN(Number(targetWeight))) newErrors.targetWeight = "Please enter a valid target weight";
        if (!gender) newErrors.gender = "Gander is required";
        if (!primaryGoal) newErrors.primaryGoal = "Primary Goal is required";
        if (!activityLevel) newErrors.activityLevel = "Activity Level is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setAlert(true);
            setAlertMessage("Error: Please fill all fields in the form");
            setloading(false);
            return;
        }
        const bmi = (Number(currentWeight) / ((Number(height) / 100) ** 2)).toFixed(2);
        const Trainee = await registerTrainee({ email, password, targetWeight, height, currentWeight, fullName, primaryGoal, activityLevel, gender, age, bio: "", createdAt: new Date().toISOString(), workoutData: { selectedWorkout: "beginnerFullBodyPlan", history: {} }, bmi });
        setloading(false);
        if ('error' in Trainee) {
            setAlert(true);
            setAlertMessage(Trainee.error);
            return;
        }
        if (Trainee && !('error' in Trainee)) {
            setAlert(true);
            setAlertMessage("Trainee registered successfully!");
        }
        FormRef.current?.reset;
        clearAllFields();
        setTimeout(() => {
            navigate("/login")
        }, 2000);
    }


    return (
        <>
            <div className="flex flex-col items-center bg-white dark:bg-primary-dark px-4 min-h-[calc(100vh-71px)]">
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
                {alert &&
                    <AlertCard message={alertMessage} variant={alertMessage.includes("Error") ? "error" : "success"} onClose={() => setAlert(false)} />
                }
                {/* first step  */}
                {step === 1 && (
                    <>
                        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">
                            {/* form */}
                            <div className="w-full max-w-[550px] space-y-4">
                                <form onSubmit={(e) => handleTrainerSubmit(e)} ref={FormRef} >
                                    <InputField type="text" name="Full Name" id="fullName" placeholder="Enter Your full name" value={fullName} onChange={(e) => { setFullName(e.target.value); clearError("fullName"); }} error={errors.fullName} />
                                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                                    <InputField type="email" name="Email" id="email" placeholder="Enter Your email" value={email} onChange={(e) => { setEmail(e.target.value); clearError("email") }} error={errors.email} />
                                    {errors.email && <p className="error">{errors.email}</p>}
                                    {selected === "Trainee" && (
                                        <>
                                            <InputField type="text" name="Age" id="age" placeholder="Enter Your age" error={errors.age} value={age} onChange={(e) => { setAge(e.target.value); clearError("age") }} />
                                            {errors.age && <p className="error">{errors.age}</p>}
                                            <SelectField select={gender === "" ? "Select Your Gender" : gender} options={["Male", "Female"]} id={"gender"} name="Gender" onchange={(e) => { setGender(e.target.value); clearError("gender") }} error={errors.gender} />
                                            {errors.gender && <p className="error">{errors.gender}</p>}
                                        </>
                                    )}
                                    <InputField
                                        type="password"
                                        name="Password"
                                        id="password"
                                        isPassword={true}
                                        placeholder="Enter Your password"
                                        showPassword={showPassword}
                                        value={password}
                                        onTogglePassword={() => setShowPassword(!showPassword)}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            clearError("password")
                                        }}
                                        error={errors.password}
                                    />
                                    {errors.password && <p className="error">{errors.password}</p>}
                                    <InputField
                                        type="password"
                                        name="Confirm Password"
                                        id="confirmPassword"
                                        isPassword={true}
                                        placeholder="Confirm Your password"
                                        showPassword={showPassword}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                            clearError("confirmPassword")
                                        }}
                                        error={errors.confirmPassword}
                                        margin={`${errors.confirmPassword ? "mb-4" : "mb-10"}`}
                                    />
                                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
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
                            <Button type="button" label="Next" icon="next" width="md:w-150 w-full" onClick={nextStep} />
                        )}
                        {selected === "Trainer" && (
                            <><Button type="submit" label="Submit" icon="submit" width="md:w-150 w-full" onClick={handleTrainerSubmit} />
                                <div></div>
                            </>
                        )}
                    </>
                )}
                {/* second step */}
                {step === 2 && (
                    <>
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-center mt-5 md:mt-10 w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">
                            {/* form */}
                            <div className="w-full max-w-[550px]">
                                <form onSubmit={(e) => { handleTraineeSubmit(e) }} ref={FormRef} >
                                    <InputField name="Height" id="Height" type="text" placeholder="Enter Your height (cm)" value={height} onChange={(e) => { setHeight(e.target.value); clearError("height") }} error={errors.height} />
                                    {errors.height && <p className="error">{errors.height}</p>}
                                    <InputField name="Current Weight" id="Weight" placeholder="Enter Your Weight (kg)" value={currentWeight} onChange={(e) => { setCurrentWeight(e.target.value); clearError("currentWeight") }} error={errors.currentWeight} />
                                    {errors.currentWeight && <p className="error">{errors.currentWeight}</p>}
                                    <SelectField select={primaryGoal === "" ? "Select Your primary goal" : primaryGoal} options={["Lose Weight", "Maintain Weight", "Gain Weight"]} id={"primaryGoal"} name="Primary Goal" onchange={(e) => { setprimaryGoal(e.target.value); clearError("primaryGoal") }} error={errors.primaryGoal} />
                                    {errors.primaryGoal && <p className="error">{errors.primaryGoal}</p>}
                                    <InputField name="Target Weight" id="TargetWeight" placeholder="Enter Your Target Weight (kg)" value={targetWeight} onChange={(e) => { setTargetWeight(e.target.value); clearError("targetWeight") }} error={errors.targetWeight} />
                                    {errors.targetWeight && <p className="error">{errors.targetWeight}</p>}
                                    <SelectField select={activityLevel === "" ? "Select Your Activity Level" : activityLevel} options={["Sedentary (little to no exercise)", "Light (1-3 days/week)", "Moderate (3-5 days/week)", "Active (6-7 days/week)"]} id={"ActivityLevel"} name="Activity Level" onchange={(e) => { setActivityLevel(e.target.value); clearError("activityLevel") }} error={errors.activityLevel} />
                                    {errors.activityLevel && <p className="error">{errors.activityLevel}</p>}
                                    <div className="flex flex-col-reverse md:flex-row md:space-x-40 space-y-10 md:space-y-0 ">
                                        <Button isSecondary type="button" label="Back" margin="mt-10" onClick={prevStep} />
                                        <Button type="submit" label="Submit" margin="mt-10" icon="submit" loading={loading} />
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
