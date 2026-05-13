import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  Plus,
  Clock3,
  Flame,
  Users,
  BookOpen,
} from "lucide-react";

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

    if (!roomName.trim()) {
      toast.error("Room name is required");

      return;
    }

    try {
      await addDoc(collection(db, "rooms"), {
        roomName,
        createdBy:
          user.email || "Unknown User",
        createdAt: Date.now(),
      });

      toast.success("Room created!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create room");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-10">

        <div>
          <h1 className="text-5xl font-bold mb-2">
            Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Welcome back,{" "}
            {user?.email}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400">
                Study Minutes
              </p>

              <Clock3 size={22} />
            </div>

            <h2 className="text-4xl font-bold">
              120
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400">
                Sessions
              </p>

              <BookOpen size={22} />
            </div>

            <h2 className="text-4xl font-bold">
              8
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400">
                Rooms Joined
              </p>

              <Users size={22} />
            </div>

            <h2 className="text-4xl font-bold">
              {rooms.length}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400">
                Study Streak
              </p>

              <Flame size={22} />
            </div>

            <h2 className="text-4xl font-bold">
              5
            </h2>
          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <Plus size={24} />

            <h2 className="text-2xl font-semibold">
              Create Study Room
            </h2>
          </div>

          <CreateRoomModal
            onCreate={createRoom}
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">
            Available Rooms
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}