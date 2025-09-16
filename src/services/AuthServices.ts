import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config.ts";
import { doc, setDoc } from "firebase/firestore";
import type { TraineeData } from "../types/TraineeData.ts";



// Sign up
export const registerTrainer = async ({fullName,email,password}:{fullName:string,email:string,password:string}) => {
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
            return { error: err.message };
        } else {
            return { error: "An unknown error occurred" };
        }
    }
};
export const registerTrainee = async ({ email, password, targetWeight, height, currentWeight, fullName, primaryGoal, activityLevel, gender, age }: TraineeData) => {
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
            createdAt: new Date()
        });
        return trainee.user;
    }
    catch (err) {
        if (err instanceof Error) {
            return { error: err.message };
        } else {
            return { error: "An unknown error occurred" };
        }
    }
}

// Sign in
export const loginUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = async () => {
    return await signOut(auth);
};



