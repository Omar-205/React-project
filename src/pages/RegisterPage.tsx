import { useState } from "react";
import InputField from "../components/InputField";
import { ProgressBar } from "../components/ProgressBar";
import SelectField from "../components/SelectField";
import SelectionCard from "../components/SelectionCard";
import Button from "../components/Button";

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState<string>("");

    console.log(selected);

    return (
        <div className="flex flex-col items-center bg-white dark:bg-primary-dark px-4 min-h-[calc(100vh-64px)]">
            <ProgressBar percentage={50} step={1} totalSteps={2} />

            <h1 className="heading mt-10">Create your account</h1>

            {/* form + cards in one flex row */}
            <div className="flex flex-col md:flex-row justify-center items-center  w-full max-w-5xl md:space-x-30 space-y-10 md:space-y-0">

                {/* form */}
                <div className="w-full max-w-[550px] space-y-4">
                    <form>
                        <InputField type="FullName" name="Full Name" id="FullName" placeholder="Enter Your full name" />
                        <InputField type="email" name="Email" id="Email" placeholder="Enter Your email" />
                        <InputField type="text" name="Age" id="Age" placeholder="Enter Your age" />
                        <SelectField select="Select Your Gender" options={["Male", "Female"]} id={"Genger"} />
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

                {/* cards on the right, horizontal */}
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
            <Button type="submit" label="Next"  width="md:w-150" />
        </div>



    );
}

export default RegisterPage;