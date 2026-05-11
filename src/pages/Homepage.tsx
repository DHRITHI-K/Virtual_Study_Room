export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold mb-4">
          Virtual Study Room
        </h1>

        <p className="text-slate-400 text-lg">
          Study together. Stay focused.
        </p>

        <button className="mt-8 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}