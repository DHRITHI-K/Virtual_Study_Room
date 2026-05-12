import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import MainLayout from "../layouts/Mainlayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log("Logged In:", userCredential.user);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);

      toast.error(error.message);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="bg-slate-900 p-10 rounded-2xl w-[400px]">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 mb-6 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </MainLayout>
  );
}