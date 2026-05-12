import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { useAuth } from "../context/AuthContext";

import type { Stats } from "../types/stats";

export default function AnalyticsSection() {
  const { user } = useAuth();

  const [stats, setStats] =
    useState<Stats | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const defaultStats: Stats = {
          totalStudyMinutes: 0,
          sessionsCompleted: 0,
          roomsJoined: 0,
          streak: 0,
        };

        await setDoc(userRef, defaultStats);

        setStats(defaultStats);
      } else {
        setStats(userSnap.data() as Stats);
      }
    };

    fetchStats();
  }, [user]);

  if (!stats) {
    return (
      <div className="text-white">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6 mb-10">
      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">
          Study Minutes
        </h2>

        <p className="text-4xl font-bold">
          {stats.totalStudyMinutes}
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">
          Sessions
        </h2>

        <p className="text-4xl font-bold">
          {stats.sessionsCompleted}
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">
          Rooms Joined
        </h2>

        <p className="text-4xl font-bold">
          {stats.roomsJoined}
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">
          Study Streak
        </h2>

        <p className="text-4xl font-bold">
          {stats.streak}
        </p>
      </div>
    </div>
  );
}