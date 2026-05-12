import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { useAuth } from "../context/AuthContext";

import type { Message } from "../types/message";

interface Props {
  roomId: string;
}

export default function ChatSection({
  roomId,
}: Props) {
  const { user } = useAuth();

  const [messages, setMessages] = useState<
    Message[]
  >([]);

  const [text, setText] = useState("");

  useEffect(() => {
    const messagesRef = collection(
      db,
      "rooms",
      roomId,
      "messages"
    );

    const q = query(
      messagesRef,
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messageData: Message[] =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<
              Message,
              "id"
            >),
          }));

        setMessages(messageData);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async () => {
    if (!user) return;

    if (!text.trim()) return;

    try {
      await addDoc(
        collection(
          db,
          "rooms",
          roomId,
          "messages"
        ),
        {
          text,
          sender:
            user.email || "Unknown User",
          createdAt: Date.now(),
        }
      );

      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Group Chat
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <p className="text-sm text-slate-400 mb-1">
              {message.sender}
            </p>

            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="flex-1 p-3 rounded-lg bg-slate-800 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}