import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 text-white px-8 py-4 flex items-center justify-between border-b border-slate-800">
      <h1 className="text-2xl font-bold">
        Virtual Study Room
      </h1>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="hover:text-blue-400 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="hover:text-blue-400 transition"
        >
          Register
        </Link>

        <Link
          to="/dashboard"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}