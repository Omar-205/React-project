import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config.ts";
import { doc, setDoc } from "firebase/firestore";
import type { TraineeData } from "../types/TraineeData.ts";



// Sign up
export const registerTrainer = async (fullName: string, email: string, password: string) => {
    try {
        const trainer = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "Trainers", trainer.user.uid), {
            fullName,
            email,
            createdAt: new Date()
        });
        console.log("Trainer registered and profile saved!");
        return trainer.user;
    }
    catch (err) {
        console.error("Error registering trainer:", err);
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
        console.log("Trainee registered and profile saved!");
        return trainee.user;
    }
    catch (err) {
        console.error("Error registering trainee:", err);

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



