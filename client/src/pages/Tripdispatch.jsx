import { useState } from "react";
import { useForm } from "react-hook-form";

/* ── UI Icons ── */
const IconTruck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10 17h4V5H2v12h3m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m9 0h1V12l-5-5h-3v10h1m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0" /></svg>;
const IconPlus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 4v16m8-8H4" /></svg>;
const IconList = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7" /></svg>;

/* ── Static Mock Data ── */
const VEHICLES = [
  { _id: "v1", name: "Heavy Hauler", plate: "GJ-01-AX-1234", maxCapacity: 5000, status: "Available" },
  { _id: "v2", name: "Delivery Van", plate: "GJ-05-BK-5678", maxCapacity: 800, status: "Available" },
];
const DRIVERS = [
  { _id: "d1", name: "Suresh Kumar", status: "ON_DUTY" },
  { _id: "d2", name: "Ramesh Singh", status: "ON_DUTY" },
];

export default function TripManager() {
  const [activeTab, setActiveTab] = useState("feed");
  const [trips, setTrips] = useState([
    { _id: "T-99", startLocation: "Surat", endLocation: "Vapi", cargoWeight: 300, status: "DISPATCHED", startOdometer: 1000, createdAt: new Date() }
  ]);

  // Modal & Selection State
  const [completingTrip, setCompletingTrip] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  
  const cargoWeight = watch("cargoWeight", 0);
  const isOverCapacity = selectedVehicle && cargoWeight > selectedVehicle.maxCapacity;

  // ── Handlers ──
  const onCreateTrip = (data) => {
    const newTrip = {
      ...data,
      _id: `T-${Math.floor(Math.random() * 1000)}`,
      vehicleId: selectedVehicle._id,
      driverId: selectedDriver._id,
      status: "DRAFT",
      createdAt: new Date(),
    };
    setTrips([newTrip, ...trips]);
    setActiveTab("feed");
    reset();
    setSelectedVehicle(null);
    setSelectedDriver(null);
  };

  const finalizeCompletion = (e) => {
    e.preventDefault();
    const endOdo = parseInt(e.target.endOdometer.value);
    
    if (endOdo < completingTrip.startOdometer) {
      alert("End odometer cannot be less than start odometer!");
      return;
    }

    setTrips(prev => prev.map(t => 
      t._id === completingTrip._id 
        ? { ...t, status: "COMPLETED", endOdometer: endOdo } 
        : t
    ));
    setCompletingTrip(null);
  };

  const updateStatus = (id, nextStatus) => {
    setTrips(prev => prev.map(t => t._id === id ? { ...t, status: nextStatus } : t));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-400">
      
      {/* Navigation */}
      <nav className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center text-black shadow-lg shadow-amber-400/20">
              <IconTruck />
            </div>
            <h1 className="font-black text-xl tracking-tighter text-white uppercase italic">Fleet.OS</h1>
          </div>
          <div className="flex bg-zinc-900 p-1 rounded-xl">
            <button onClick={() => setActiveTab("feed")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "feed" ? "bg-zinc-800 text-amber-400 shadow-inner" : "text-zinc-500 hover:text-zinc-300"}`}><IconList /> LIVE FEED</button>
            <button onClick={() => setActiveTab("create")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "create" ? "bg-zinc-800 text-amber-400 shadow-inner" : "text-zinc-500 hover:text-zinc-300"}`}><IconPlus /> DISPATCH</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 mt-4">
        
        {/* TAB 1: COMMAND CENTER */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white italic">COMMAND CENTER</h2>
            <div className="grid grid-cols-1 gap-4">
              {trips.map(trip => (
                <div key={trip._id} className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl flex flex-wrap md:flex-nowrap items-center gap-8 group hover:border-zinc-700 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-zinc-500">{trip._id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                        trip.status === 'DRAFT' ? 'border-zinc-700 text-zinc-500' : 
                        trip.status === 'DISPATCHED' ? 'border-amber-400/30 text-amber-400' : 
                        trip.status === 'COMPLETED' ? 'border-emerald-500/30 text-emerald-500' : 'border-red-500/30 text-red-500'
                      }`}>{trip.status}</span>
                    </div>
                    <div className="text-white font-bold text-lg">{trip.startLocation} → {trip.endLocation}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Payload</p>
                    <p className="text-sm text-zinc-300 font-mono">{trip.cargoWeight} KG</p>
                  </div>
                  <div className="flex gap-2">
                    {trip.status === "DRAFT" && (
                      <button onClick={() => updateStatus(trip._id, "DISPATCHED")} className="bg-amber-400 text-black text-[10px] font-black px-4 py-2 rounded-lg hover:bg-amber-300 uppercase">Dispatch</button>
                    )}
                    {trip.status === "DISPATCHED" && (
                      <button onClick={() => setCompletingTrip(trip)} className="bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-lg hover:bg-emerald-400 uppercase">Mark Done</button>
                    )}
                    {(trip.status !== "COMPLETED" && trip.status !== "CANCELLED") && (
                      <button onClick={() => updateStatus(trip._id, "CANCELLED")} className="text-zinc-600 hover:text-red-400 transition-colors p-2 text-[10px] font-bold uppercase">Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DISPATCH FORM */}
        {activeTab === "create" && (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onCreateTrip)} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Select Fleet</h3>
                  {VEHICLES.map(v => (
                    <div key={v._id} onClick={() => setSelectedVehicle(v)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedVehicle?._id === v._id ? 'border-amber-400 bg-amber-400/5' : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800'}`}>
                      <p className="text-white font-bold">{v.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{v.plate} • Max {v.maxCapacity}kg</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Assign Driver</h3>
                  {DRIVERS.map(d => (
                    <div key={d._id} onClick={() => setSelectedDriver(d)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDriver?._id === d._id ? 'border-emerald-400 bg-emerald-400/5' : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800'}`}>
                      <p className="text-white font-bold">{d.name}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase">Ready</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-900 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Weight (kg)</label>
                    <input type="number" {...register("cargoWeight", { required: true })} className={`w-full bg-zinc-950 border ${isOverCapacity ? 'border-red-500' : 'border-zinc-800 focus:border-amber-400'} rounded-xl p-4 text-white outline-none transition-all`} />
                    {isOverCapacity && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase italic">⚠️ Over Capacity</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Odometer</label>
                    <input type="number" {...register("startOdometer", { required: true })} className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl p-4 text-white outline-none" />
                  </div>
                  <input type="text" {...register("startLocation", { required: true })} placeholder="Origin" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-amber-400" />
                  <input type="text" {...register("endLocation", { required: true })} placeholder="Destination" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-amber-400" />
                </div>
                <button type="submit" disabled={!selectedVehicle || !selectedDriver || isOverCapacity} className="w-full bg-amber-400 text-black font-black py-4 rounded-xl hover:bg-amber-300 disabled:opacity-20 uppercase tracking-widest text-sm shadow-xl shadow-amber-400/10 transition-all">Create Draft</button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ── COMPLETION MODAL ── */}
      {completingTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-900 w-full max-w-md p-8 rounded-3xl border border-zinc-800 shadow-2xl">
            <h3 className="text-2xl font-black text-white italic mb-2 tracking-tight">FINALIZE TRIP</h3>
            <p className="text-xs text-zinc-500 uppercase font-bold mb-6 tracking-widest">Update Final Odometer</p>
            
            <form onSubmit={finalizeCompletion} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase">
                  <span>Start Reading:</span>
                  <span className="text-white">{completingTrip.startOdometer} km</span>
                </div>
                <label className="block text-[10px] font-black text-amber-400 uppercase">Current Reading</label>
                <input 
                  name="endOdometer" 
                  type="number" 
                  required 
                  autoFocus
                  placeholder="Ex: 1250"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl p-4 text-white text-xl font-bold outline-none" 
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setCompletingTrip(null)} className="flex-1 py-4 text-zinc-500 font-bold uppercase text-[10px] hover:text-white transition-colors">Discard</button>
                <button type="submit" className="flex-[2] bg-emerald-500 text-white font-black py-4 rounded-xl hover:bg-emerald-400 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/10">Complete Trip</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}