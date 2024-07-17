// src/components/UserStats.tsx
import React, { useEffect, useState } from "react";
import { getUserStats } from "../services/userStatsService";
import { useAuth } from "../services/authService";

const UserStats: React.FC = () => {
  const [stats, setStats] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        const userStats = await getUserStats(user.uid);
        setStats(userStats as { correct: number; incorrect: number });
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div>
      <h3>User Stats</h3>
      <p>Correct: {stats.correct}</p>
      <p>Incorrect: {stats.incorrect}</p>
    </div>
  );
};

export default UserStats;
