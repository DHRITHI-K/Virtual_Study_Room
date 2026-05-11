import { Link } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
        <h1 className="text-6xl font-bold mb-6 text-center">
          Study Together Online
        </h1>

        <p className="text-slate-400 text-xl mb-8 text-center max-w-2xl">
          Join virtual study rooms, stay productive with
          Pomodoro timers, and focus together with friends.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="bg-slate-800 px-6 py-3 rounded-xl hover:bg-slate-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}