


export default function HomePage() {


  return (
    <>
      <h1 className="text-3xl font-black text-white mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">Total Vehicles</p>
          <p className="text-2xl font-bold text-white mt-2">12</p>
        </div>
      </div>
    </>
  );
}