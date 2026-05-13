import { Link } from "react-router-dom";

import {
  ArrowRight,
  Users,
} from "lucide-react";

import type { Room } from "../types/room";

interface Props {
  room: Room;
}

export default function RoomCard({
  room,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition group">

      <div className="flex items-start justify-between mb-6">

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {room.roomName}
          </h2>

          <p className="text-slate-400">
            Created by
          </p>

          <p className="text-white">
            {room.createdBy}
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded-2xl">
          <Users size={22} />
        </div>

      </div>

      <Link
        to={`/room/${room.id}`}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-3 font-semibold"
      >
        Join Room

        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition"
        />
      </Link>

    </div>
  );
}