import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

/* ── UI Icons ── */
const IconWrench = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>;
const IconHistory = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

/* ── Static Mock Data ── */
const MOCK_VEHICLES = [
  { _id: "v1", name: "TATA Heavy", plate: "GJ-01-AX-1234", status: "AVAILABLE" },
  { _id: "v2", name: "Mahindra Bolero", plate: "GJ-05-BK-5678", status: "AVAILABLE" },
];

export default function MaintenanceLogs() {
  const [activeTab, setActiveTab] = useState("logs"); // 'logs' or 'create'
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [serviceLogs, setServiceLogs] = useState([
    { _id: "321", vehicleId: { name: "TATA", plate: "GJ-01-AX" }, description: "Engine Issue", cost: 10000, date: "2026-02-20", status: "New" }
  ]);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  // ── HANDLERS ──

  // Corresponds to POST /api/service-logs
  const onSubmitLog = async (data) => {
    // 1. Find the vehicle to get its name/plate for the UI
    const vehicle = vehicles.find(v => v._id === data.vehicleId);
    
    // 2. Mocking createServiceLog backend logic
    const newLog = {
      _id: Math.floor(Math.random() * 1000).toString(),
      vehicleId: { name: vehicle.name, plate: vehicle.plate },
      description: data.description,
      cost: Number(data.cost),
      date: new Date().toISOString().split('T')[0],
      status: "New"
    };

    // 3. Apply "Auto-Hide" Rule: Mark vehicle as IN_SHOP
    setServiceLogs([newLog, ...serviceLogs]);
    setVehicles(prev => prev.map(v => 
      v._id === data.vehicleId ? { ...v, status: "IN_SHOP" } : v
    ));
    
    alert(`Success: ${vehicle.name} is now marked "In Shop"`);
    setActiveTab("logs");
    reset();
  };

  // Corresponds to PATCH /api/vehicles/:vehicleId/available
  const handleRelease = (vehicleId) => {
    setVehicles(prev => prev.map(v => 
      v._id === vehicleId ? { ...v, status: "AVAILABLE" } : v
    ));
    alert("Vehicle released and available for new trips.");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 p-6 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Maintenance & Service Logs</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-1">Status: Fleet Flow Digital Health Record</p>
          </div>

          <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
            <button 
              onClick={() => setActiveTab("logs")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === "logs" ? "bg-amber-400 text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <IconHistory /> VIEW LOGS
            </button>
            <button 
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === "create" ? "bg-amber-400 text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <IconWrench /> NEW SERVICE ENTRY
            </button>
          </div>
        </div>

        {/* ── WORKSHOP VIEW: Vehicles currently IN_SHOP ── */}
        {activeTab === "logs" && vehicles.some(v => v.status === "IN_SHOP") && (
          <div className="mb-8 p-6 bg-amber-400/5 border border-amber-400/20 rounded-3xl">
            <h3 className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">Vehicles Currently in Shop (Auto-Hidden from Dispatcher)</h3>
            <div className="flex flex-wrap gap-4">
              {vehicles.filter(v => v.status === "IN_SHOP").map(v => (
                <div key={v._id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
                  <div>
                    <p className="text-white font-bold text-sm">{v.name}</p>
                    <p className="text-[10px] text-zinc-500">{v.plate}</p>
                  </div>
                  <button 
                    onClick={() => handleRelease(v._id)}
                    className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                    title="Release to Fleet"
                  >
                    <IconCheck />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 1: SERVICE LOGS TABLE ── */}
        {activeTab === "logs" && (
          <div className="bg-[#141414] border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500">Log ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500">Vehicle</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500">Issue/Service</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500">Cost</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {serviceLogs.map(log => (
                  <tr key={log._id} className="hover:bg-zinc-800/20 transition-all group">
                    <td className="px-6 py-5 text-xs text-zinc-600 font-mono">#{log._id}</td>
                    <td className="px-6 py-5 font-bold text-white text-sm">{log.vehicleId.name}</td>
                    <td className="px-6 py-5 text-sm text-zinc-400 italic">{log.description}</td>
                    <td className="px-6 py-5 text-xs text-zinc-500">{log.date}</td>
                    <td className="px-6 py-5 text-sm font-black text-amber-400">₹{log.cost.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className="bg-zinc-800 text-zinc-400 text-[9px] font-black px-2 py-1 rounded uppercase">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── TAB 2: CREATE NEW ENTRY ── */}
        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmitLog)} className="bg-[#141414] p-8 rounded-3xl border border-zinc-900 shadow-2xl space-y-6">
              <div className="space-y-4">
                <h3 className="text-white font-black italic text-xl uppercase tracking-tight">Create Service Log</h3>
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Entering a log entry will mark the vehicle "In Shop"</p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Select Vehicle</label>
                <select 
                  {...register("vehicleId", { required: true })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-amber-400 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Choose an available truck...</option>
                  {vehicles.filter(v => v.status === "AVAILABLE").map(v => (
                    <option key={v._id} value={v._id}>{v.name} ({v.plate})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Service Description</label>
                  <input type="text" {...register("description", { required: true })} placeholder="e.g. Oil Change" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-amber-400 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Service Cost (₹)</label>
                  <input type="number" {...register("cost", { required: true })} placeholder="1500" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-amber-400 outline-none font-mono" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setActiveTab("logs")} className="flex-1 py-4 text-xs font-black text-zinc-500 uppercase hover:text-white transition-all">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-amber-400 text-black font-black py-4 rounded-xl hover:bg-amber-300 transition-all uppercase text-xs tracking-widest shadow-xl shadow-amber-400/10"
                >
                  Create Entry & Update Status
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}