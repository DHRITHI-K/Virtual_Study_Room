import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { MessageCircle } from "lucide-react";

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

    if (!text.trim()) {
      toast.error("Message cannot be empty");

      return;
    }

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

      toast.error("Failed to send message");
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl shadow-xl h-[750px] flex flex-col">
      
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle size={28} />

        <h2 className="text-2xl font-bold">
          Group Chat
        </h2>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto mb-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="bg-slate-800 p-4 rounded-2xl border border-slate-700"
          >
            <p className="text-sm text-slate-400 mb-1">
              {message.sender}
            </p>

            <p>{message.text}</p>
          </motion.div>
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
          className="flex-1 p-4 rounded-2xl bg-slate-800 outline-none border border-slate-700"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-8 rounded-2xl font-semibold hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}