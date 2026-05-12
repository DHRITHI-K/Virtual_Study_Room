import { useEffect, useState } from "react";

import { Timer } from "lucide-react";

import {
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

interface Props {
  roomId: string;
}

export default function PomodoroTimer({
  roomId,
}: Props) {
  const [seconds, setSeconds] =
    useState(1500);

  const [isRunning, setIsRunning] =
    useState(false);

  useEffect(() => {
    const timerRef = doc(
      db,
      "rooms",
      roomId,
      "timer",
      "shared"
    );

    const unsubscribe = onSnapshot(
      timerRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          setSeconds(data.seconds);

          setIsRunning(data.isRunning);
        } else {
          await setDoc(timerRef, {
            seconds: 1500,
            isRunning: false,
          });
        }
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(async () => {
      const newSeconds = seconds - 1;

      setSeconds(newSeconds);

      await setDoc(
        doc(
          db,
          "rooms",
          roomId,
          "timer",
          "shared"
        ),
        {
          seconds: newSeconds,
          isRunning: true,
        }
      );

      if (newSeconds <= 0) {
        clearInterval(interval);

        await setDoc(
          doc(
            db,
            "rooms",
            roomId,
            "timer",
            "shared"
          ),
          {
            seconds: 1500,
            isRunning: false,
          }
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, roomId]);

  const formatTime = (
    totalSeconds: number
  ) => {
    const minutes = Math.floor(
      totalSeconds / 60
    );

    const secs = totalSeconds % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const updateTimerState = async (
    running: boolean,
    newSeconds = seconds
  ) => {
    await setDoc(
      doc(
        db,
        "rooms",
        roomId,
        "timer",
        "shared"
      ),
      {
        seconds: newSeconds,
        isRunning: running,
      }
    );
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Timer size={28} />

        <h2 className="text-2xl font-bold">
            Shared Pomodoro Timer
        </h2>
      </div>

  

      <div className="text-7xl font-bold text-center mb-8">
        {formatTime(seconds)}
      </div>

      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={() =>
              updateTimerState(true)
            }
            className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() =>
              updateTimerState(false)
            }
            className="bg-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
          >
            Pause
          </button>
        )}

        <button
          onClick={() =>
            updateTimerState(
              false,
              1500
            )
          }
          className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}