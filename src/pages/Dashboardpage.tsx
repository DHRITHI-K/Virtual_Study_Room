export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Study Hours
          </h2>

          <p className="text-slate-400 mt-2">
            12 hours this week
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Active Rooms
          </h2>

          <p className="text-slate-400 mt-2">
            3 rooms available
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Study Streak
          </h2>

          <p className="text-slate-400 mt-2">
            5 day streak
          </p>
        </div>
      </div>
    </div>
  );
}