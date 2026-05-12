import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/Mainlayout";

import { db } from "../firebase/firebase";

import type { Room } from "../types/room";

import ChatSection from "../components/ChatSection";

import ParticipantsSection from "../components/ParticipantsSection";

import PomodoroTimer from "../components/PomodoroTimer";

import StatusControls from "../components/StatusControls";

export default function RoomPage() {
  const { roomId } = useParams();

  const [room, setRoom] =
    useState<Room | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;

      try {
        const roomRef = doc(
          db,
          "rooms",
          roomId
        );

        const roomSnap = await getDoc(roomRef);

        if (roomSnap.exists()) {
          setRoom({
            id: roomSnap.id,
            ...(roomSnap.data() as Omit<
              Room,
              "id"
            >),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-white">
          Loading room...
        </div>
      </MainLayout>
    );
  }

  if (!room) {
    return (
      <MainLayout>
        <div className="p-10 text-white">
          Room not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950 text-white p-8 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {room.roomName}
          </h1>

          <p className="text-slate-400">
            Created by: {room.createdBy}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          
          <div className="col-span-1 space-y-6">
            <PomodoroTimer roomId={room.id} />

            <StatusControls roomId={room.id} />

            <ParticipantsSection roomId={room.id} />
          </div>

          <div className="col-span-2">
            <ChatSection roomId={room.id} />
          </div>

        </div>
      </div>
    </MainLayout>
  );
}