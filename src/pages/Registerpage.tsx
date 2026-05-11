export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-slate-900 p-10 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-slate-800 mb-6 outline-none"
        />

        <button className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700 transition">
          Register
        </button>
      </div>
    </div>
  );
}