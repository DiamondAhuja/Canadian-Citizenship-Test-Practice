// userStatsService.ts
import { db, auth } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const getUserStats = async (userId: string) => {
  const userStatsRef = doc(db, "userStats", userId);
  const userStatsSnap = await getDoc(userStatsRef);
  if (userStatsSnap.exists()) {
    return userStatsSnap.data();
  } else {
    return { correct: 0, incorrect: 0 };
  }
};

const updateUserStats = async (userId: string, correct: boolean) => {
  const userStatsRef = doc(db, "userStats", userId);
  const userStatsSnap = await getDoc(userStatsRef);
  if (userStatsSnap.exists()) {
    const stats = userStatsSnap.data();
    if (correct) {
      await updateDoc(userStatsRef, {
        correct: stats.correct + 1,
      });
    } else {
      await updateDoc(userStatsRef, {
        incorrect: stats.incorrect + 1,
      });
    }
  } else {
    await setDoc(userStatsRef, {
      correct: correct ? 1 : 0,
      incorrect: correct ? 0 : 1,
    });
  }
};

export { getUserStats, updateUserStats };
