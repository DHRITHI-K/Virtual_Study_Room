import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { useAuth } from "../context/AuthContext";

import { Activity } from "lucide-react";

interface Props {
  roomId: string;
}

export default function StatusControls({
  roomId,
}: Props) {
  const { user } = useAuth();

  const updateStatus = async (
    status: string
  ) => {
    if (!user) return;

    try {
      await updateDoc(
        doc(
          db,
          "rooms",
          roomId,
          "participants",
          user.uid
        ),
        {
          status,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
        <Activity size={28} />

      <h2 className="text-2xl font-bold mb-6">
        Focus Status
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() =>
            updateStatus("Studying")
          }
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Studying
        </button>

        <button
          onClick={() =>
            updateStatus("Break")
          }
          className="bg-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
        >
          Break
        </button>

        <button
          onClick={() =>
            updateStatus("Idle")
          }
          className="bg-slate-600 px-6 py-3 rounded-lg hover:bg-slate-700 transition"
        >
          Idle
        </button>
      </div>
    </div>
  );
}