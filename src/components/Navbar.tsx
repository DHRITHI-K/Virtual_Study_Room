import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  LogIn,
  UserPlus,
  Home,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
      
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">
            V
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Virtual Study Room
            </h1>

            <p className="text-xs text-slate-400">
              Study together in realtime
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-800 transition"
          >
            <Home size={18} />

            <span>Home</span>
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-800 transition"
          >
            <LogIn size={18} />

            <span>Login</span>
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-800 transition"
          >
            <UserPlus size={18} />

            <span>Register</span>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-2xl font-semibold shadow-lg"
          >
            <LayoutDashboard size={18} />

            <span>Dashboard</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}