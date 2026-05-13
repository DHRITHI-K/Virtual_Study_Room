import { useState } from "react";

import { Plus } from "lucide-react";

interface Props {
  onCreate: (roomName: string) => void;
}

export default function CreateRoomModal({
  onCreate,
}: Props) {
  const [roomName, setRoomName] =
    useState("");

  return (
    <div className="space-y-5">

      <div className="flex items-center gap-3">
        <Plus size={24} />

        <h2 className="text-2xl font-semibold">
          Create Study Room
        </h2>
      </div>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter room name..."
          value={roomName}
          onChange={(e) =>
            setRoomName(e.target.value)
          }
          className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
        />

        <button
          onClick={() => {
            onCreate(roomName);

            setRoomName("");
          }}
          className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold shadow-lg"
        >
          Create
        </button>

      </div>

    </div>
  );
}