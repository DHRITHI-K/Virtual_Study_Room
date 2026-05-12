import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

import MainLayout from "../layouts/Mainlayout";

import { db } from "../firebase/firebase";

import { useAuth } from "../context/AuthContext";

import CreateRoomModal from "../components/CreateRoomModal";

import RoomCard from "../components/RoomCard";

import type { Room } from "../types/room";

export default function DashboardPage() {
  const { user } = useAuth();

  const [rooms, setRooms] = useState<Room[]>(
    []
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rooms"),
      (snapshot) => {
        const roomData: Room[] =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<
              Room,
              "id"
            >),
          }));

        setRooms(roomData);
      }
    );

    return () => unsubscribe();
  }, []);

  const createRoom = async (
    roomName: string
  ) => {
    if (!user) return;

    if (!roomName.trim()) return;

    try {
      await addDoc(collection(db, "rooms"), {
        roomName,
        createdBy:
          user.email || "Unknown User",
        createdAt: Date.now(),
      });

      alert("Room created!");
    } catch (error) {
      console.error(error);

      alert("Failed to create room");
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <CreateRoomModal
          onCreate={createRoom}
        />

        <div className="grid grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}