import { useState } from "react";

interface Props {
  onCreate: (roomName: string) => void;
}

export default function CreateRoomModal({
  onCreate,
}: Props) {
  const [roomName, setRoomName] =
    useState("");

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Create Study Room
      </h2>

      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) =>
          setRoomName(e.target.value)
        }
        className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none"
      />

      <button
        onClick={() => {
          onCreate(roomName);

          setRoomName("");
        }}
        className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Create Room
      </button>
    </div>
  );
}