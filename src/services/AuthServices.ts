import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config.ts";
import { doc, setDoc } from "firebase/firestore";
import type { TraineeData } from "../types/TraineeData.ts";



// Sign up
export const registerTrainer = async ({ fullName, email, password }: { fullName: string, email: string, password: string }) => {
    try {
        const trainer = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "Trainers", trainer.user.uid), {
            fullName,
            email,
            createdAt: new Date()
        });
        return trainer.user;
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                return { error: "Error: Email already in use" };
            }
        }
        return { error: "An unknown error occurred" };
    }
};
export const registerTrainee = async ({ email, password, targetWeight, height, currentWeight, fullName, primaryGoal, activityLevel, gender, age ,bio, createdAt }: { email: string, password: string } & TraineeData) => {
    try {
        const trainee = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "Trainees", trainee.user.uid), {
            fullName,
            email,
            age,
            gender,
            currentWeight,
            targetWeight,
            height,
            primaryGoal,
            activityLevel,
            bio,
            createdAt: new Date()
        });
        return trainee.user;
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                return { error: "Error: Email already in use" };
            }
        }
        return { error: "An unknown error occurred" };
    }
}

// Sign in
export const loginUser = async ({ email, password }: { email: string, password: string }) => {

    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user.user;
    }
    catch (err) {
        if (err instanceof Error) {
            let errorMessage = "Error: An unknown error occurred";
            switch (err.message) {
                case "Firebase: Error (auth/user-not-found).":
                    errorMessage = "Error: Invalid Email";
                    break;
                case "Firebase: Error (auth/wrong-password).":
                    errorMessage = "Error: Incorrect password";
                    break;
            }
            return { error: errorMessage };
        }  
        return { error: "Error: An unknown error occurred" };
    }
};

// Logout
export const logoutUser = async () => {
    return await signOut(auth);
};



