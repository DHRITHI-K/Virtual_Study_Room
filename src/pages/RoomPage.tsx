import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/Mainlayout";

import { db } from "../firebase/firebase";

import type { Room } from "../types/room";

import ChatSection from "../components/ChatSection";

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
      <div className="p-10 text-white">
        <h1 className="text-5xl font-bold mb-4">
          {room.roomName}
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          Created by: {room.createdBy}
        </p>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            Study Session
          </h2>

          <p className="text-slate-400">
            Pomodoro timer and realtime chat
            coming soon...
          </p>
        </div>

        <ChatSection roomId={room.id} />
      </div>
    </MainLayout>
  );
}