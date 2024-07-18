import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../services/authService";
import { db } from "../services/firebaseConfig";
import { Link } from "react-router-dom";

interface AttemptType {
  id: string;
  score: number;
  timestamp: any;
}

const UserStats: React.FC = () => {
  const [attempts, setAttempts] = useState<AttemptType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchAttempts() {
      if (user) {
        const userAttemptsRef = collection(
          db,
          "userStats",
          user.uid,
          "attempts"
        );
        const attemptsQuery = query(
          userAttemptsRef,
          orderBy("timestamp", "desc")
        );
        const attemptDocs = await getDocs(attemptsQuery);
        const attemptsList: AttemptType[] = attemptDocs.docs.map((doc) => ({
          id: doc.id,
          score: doc.data().score,
          timestamp: doc.data().timestamp.toDate().toString(), // convert to readable string
        }));
        setAttempts(attemptsList);
      }
    }
    fetchAttempts();
  }, [user]);

  return (
    <div>
      <h2>Your Attempts</h2>
      {attempts.length === 0 ? (
        <p>No attempts found.</p>
      ) : (
        <ul>
          {attempts.map((attempt, index) => (
            <li key={index}>
              <p>Score: {attempt.score}</p>
              <p>Date: {attempt.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserStats;
