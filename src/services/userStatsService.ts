// userStatsService.ts
import { db, auth } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

const getUserStats = async (userId: string) => {
  const userStatsRef = doc(db, "userStats", userId);
  const userStatsSnap = await getDoc(userStatsRef);
  if (userStatsSnap.exists()) {
    return userStatsSnap.data();
  } else {
    return { attempts: [] }; // Changed to store attempts array
  }
};

const addUserAttempt = async (userId: string, score: number) => {
  const userAttemptsRef = collection(doc(db, "userStats", userId), "attempts");
  await addDoc(userAttemptsRef, {
    score: score,
    timestamp: serverTimestamp()
  });
};

const updateUserStats = async (userId: string, score: number) => {
  const userStatsRef = doc(db, "userStats", userId);
  const userStatsSnap = await getDoc(userStatsRef);
  if (userStatsSnap.exists()) {
    const stats = userStatsSnap.data();
    const attempts = stats.attempts || [];
    attempts.push({ score, timestamp: new Date() }); // Track each attempt
    await updateDoc(userStatsRef, { attempts });
  } else {
    await setDoc(userStatsRef, {
      attempts: [{ score, timestamp: new Date() }]
    });
  }
};

export { getUserStats, updateUserStats, addUserAttempt };
