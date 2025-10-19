import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import type { TraineeData } from "../types/TraineeData";



export const getUserData = async (uid: string): Promise<TraineeData | null> => {
  try {
    const traineeRef = doc(db, "Trainees", uid);
    const traineeSnap = await getDoc(traineeRef);

    if (traineeSnap.exists()) {
      const data = traineeSnap.data() as any;

      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate().toISOString();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate().toISOString();
      }

      return data as TraineeData;
    } else {
      console.warn(`No trainee found with UID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const saveUserData = async (uid: string, data: Partial<TraineeData>): Promise<void> => {
  try {
    const traineeRef = doc(db, "Trainees", uid);
    await setDoc(traineeRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}
