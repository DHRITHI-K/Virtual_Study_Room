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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <div className="flex items-center gap-3 mb-8">
        <Timer size={26} />

        <h2 className="text-2xl font-semibold">
          Pomodoro Timer
        </h2>
      </div>

      <div className="text-center mb-10">

        <div className="text-8xl font-bold tracking-tight">
          {formatTime(seconds)}
        </div>

      </div>

      <div className="flex items-center justify-center gap-4">

        {!isRunning ? (
          <button
            onClick={() =>
              updateTimerState(true)
            }
            className="bg-green-600 hover:bg-green-700 transition px-7 py-3 rounded-2xl font-semibold"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() =>
              updateTimerState(false)
            }
            className="bg-yellow-500 hover:bg-yellow-600 transition px-7 py-3 rounded-2xl font-semibold"
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
          className="bg-slate-800 hover:bg-slate-700 transition px-7 py-3 rounded-2xl font-semibold border border-slate-700"
        >
          Reset
        </button>

      </div>

    </div>
  );
}