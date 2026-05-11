import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import MainLayout from "../layouts/Mainlayout";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log("User Registered:", userCredential.user);

      alert("Registration successful!");
    } catch (error: any) {
      console.error(error.message);

      alert(error.message);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="bg-slate-900 p-10 rounded-2xl w-[400px]">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Register
          </h1>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none"
          />

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
            onClick={handleRegister}
            className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </MainLayout>
  );
}