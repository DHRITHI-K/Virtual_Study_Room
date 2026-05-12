import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { useAuth } from "../context/AuthContext";

import type { Participant } from "../types/participant";

interface Props {
  roomId: string;
}

export default function ParticipantsSection({
  roomId,
}: Props) {
  const { user } = useAuth();

  const [participants, setParticipants] =
    useState<Participant[]>([]);

  useEffect(() => {
    if (!user) return;

    const participantRef = doc(
      db,
      "rooms",
      roomId,
      "participants",
      user.uid
    );

    const joinRoom = async () => {
      await setDoc(participantRef, {
      email: user.email,
      status: "Studying",
      });
    };

    joinRoom();

    const unsubscribe = onSnapshot(
      collection(
        db,
        "rooms",
        roomId,
        "participants"
      ),
      (snapshot) => {
        const participantData:
          Participant[] = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<
              Participant,
              "id"
            >),
          })
        );

        setParticipants(participantData);
      }
    );

    return () => {
      deleteDoc(participantRef);

      unsubscribe();
    };
  }, [roomId, user]);

  return (
    
    <div className="flex items-center gap-3 mb-6">
        <Users size={28} />

      <h2 className="text-2xl font-bold">
        Online Participants
      </h2>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <div className="flex items-center justify-between">
  <span>{participant.email}</span>

  <span
    className={`text-sm px-3 py-1 rounded-full ${
      participant.status === "Studying"
        ? "bg-green-600"
        : participant.status === "Break"
        ? "bg-yellow-600"
        : "bg-slate-600"
    }`}
  >
    {participant.status}
  </span>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}