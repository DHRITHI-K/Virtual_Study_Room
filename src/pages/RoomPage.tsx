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
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-slate-400 text-lg">
            Loading room...
          </p>
        </div>
      </MainLayout>
    );
  }

  if (!room) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-slate-400 text-lg">
            Room not found
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-10">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-3">
              {room.roomName}
            </h1>

            <p className="text-slate-400 text-lg">
              Created by{" "}
              <span className="text-white">
                {room.createdBy}
              </span>
            </p>
          </div>

        </div>

        <div className="grid grid-cols-12 gap-8 items-start">

          <div className="col-span-4 space-y-6 sticky top-28">

            <PomodoroTimer roomId={room.id} />

            <StatusControls roomId={room.id} />

            <ParticipantsSection roomId={room.id} />

          </div>

          <div className="col-span-8">

            <ChatSection roomId={room.id} />

          </div>

        </div>

      </div>
    </MainLayout>
  );
}