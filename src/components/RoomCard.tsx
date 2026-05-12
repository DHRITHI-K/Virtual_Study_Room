import { Link } from "react-router-dom";

import type { Room } from "../types/room";

interface Props {
  room: Room;
}

export default function RoomCard({
  room,
}: Props) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-2">
        {room.roomName}
      </h2>

      <p className="text-slate-400 mb-4">
        Created by: {room.createdBy}
      </p>

      <Link
        to={`/room/${room.id}`}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
      >
        Join Room
      </Link>
    </div>
  );
}