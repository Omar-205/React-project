import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import type { TraineeData } from "../types/TraineeData";

export const getUserData = async (uid?: string): Promise<TraineeData | null> => {
  if (!uid) {
    console.error("❌ getUserData called without a valid UID");
    return null;
  }

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
      console.warn(`⚠️ No trainee found with UID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    return null;
  }
};

export const saveUserData = async (uid?: string, data?: Partial<TraineeData>): Promise<void> => {
  if (!uid) {
    console.error("❌ saveUserData called without a valid UID");
    return;
  }

  if (!data) {
    console.error("❌ saveUserData called without valid data");
    return;
  }

  try {
    const traineeRef = doc(db, "Trainees", uid);
    await setDoc(traineeRef, data, { merge: true });
    console.log(`✅ User data saved successfully for UID: ${uid}`);
  } catch (error) {
    console.error("❌ Error saving user data:", error);
    throw error;
  }
};
