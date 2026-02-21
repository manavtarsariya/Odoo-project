import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripsRequest, createTripRequest, updateTripStatusRequest } from "../features/trip/tripSlice";
import { fetchVehiclesRequest } from "../features/vehicle/vehicleSlice";
import { fetchDriversRequest } from "../features/driver/driverSlice";

/* ── UI Icons ── */
const IconTruck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10 17h4V5H2v12h3m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m9 0h1V12l-5-5h-3v10h1m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0" /></svg>;
const IconPlus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 4v16m8-8H4" /></svg>;
const IconList = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7" /></svg>;

export default function TripManager() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("feed");

  const { trips, loading: tripLoading } = useSelector((state) => state.trip);
  const { vehicles } = useSelector((state) => state.vehicle);
  const { drivers } = useSelector((state) => state.driver);

  useEffect(() => {
    dispatch(fetchTripsRequest());
    dispatch(fetchVehiclesRequest());
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  // Modal & Selection State
  const [completingTrip, setCompletingTrip] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const cargoWeight = watch("cargoWeight", 0);
  const isOverCapacity = selectedVehicle && cargoWeight > selectedVehicle.maxCapacity;

  // ── Handlers ──
  const onCreateTrip = (data) => {
    const payload = {
      ...data,
      vehicleId: selectedVehicle._id,
      driverId: selectedDriver._id,
      cargoWeight: Number(data.cargoWeight),
      startOdometer: Number(data.startOdometer),
      status: "DRAFT",
    };
    dispatch(createTripRequest(payload));
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

    dispatch(updateTripStatusRequest({ id: completingTrip._id, status: "COMPLETED", endOdometer: endOdo }));
    setCompletingTrip(null);
  };

  const updateStatus = (id, nextStatus) => {
    dispatch(updateTripStatusRequest({ id, status: nextStatus }));
  };

  return (
    <div className="flex flex-col flex-1 w-full text-zinc-300">

      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">
          Dispatch Command
        </h2>
        <div className="flex bg-zinc-900 p-1 rounded-xl shadow-inner border border-zinc-800">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "feed" ? "bg-zinc-800 text-amber-400 shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <IconList /> LIVE FEED
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "create" ? "bg-zinc-800 text-amber-400 shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <IconPlus /> NEW TRIP
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* TAB 1: COMMAND CENTER */}
        {activeTab === "feed" && (
          <div className="grid grid-cols-1 gap-4">
            {trips.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/40 border border-zinc-900 rounded-2xl border-dashed">
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No Active Trips Found</p>
              </div>
            ) : (
              trips.map(trip => (
                <div key={trip._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex flex-wrap md:flex-nowrap items-center gap-8 group hover:border-zinc-700 transition-all shadow-lg hover:shadow-amber-400/5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{trip._id?.slice(-6)}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${trip.status === 'DRAFT' ? 'border-zinc-700 text-zinc-500' :
                        trip.status === 'DISPATCHED' ? 'border-amber-400/30 text-amber-400' :
                          trip.status === 'COMPLETED' ? 'border-emerald-500/30 text-emerald-500' : 'border-red-500/30 text-red-500'
                        }`}>{trip.status}</span>
                    </div>
                    <div className="text-white font-bold text-lg">{trip.startLocation} → {trip.endLocation}</div>
                    <div className="flex gap-4 mt-2 text-[10px] uppercase font-bold text-zinc-500">
                      <span>Vehicle: {trip.vehicleId?.model || 'N/A'}</span>
                      <span>Driver: {trip.driverId?.name || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Payload</p>
                    <p className="text-sm text-zinc-300 font-mono">{trip.cargoWeight} KG</p>
                  </div>
                  <div className="flex gap-2">
                    {trip.status === "DRAFT" && (
                      <button onClick={() => updateStatus(trip._id, "DISPATCHED")} className="bg-amber-400 text-black text-[10px] font-black px-4 py-2 rounded-lg hover:bg-amber-300 uppercase shadow-lg shadow-amber-400/20">Dispatch</button>
                    )}
                    {trip.status === "DISPATCHED" && (
                      <button onClick={() => setCompletingTrip(trip)} className="bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-lg hover:bg-emerald-400 uppercase shadow-lg shadow-emerald-500/20">Mark Done</button>
                    )}
                    {(trip.status !== "COMPLETED" && trip.status !== "CANCELLED") && (
                      <button onClick={() => updateStatus(trip._id, "CANCELLED")} className="text-zinc-600 hover:text-red-400 transition-colors p-2 text-[10px] font-bold uppercase">Cancel</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: DISPATCH FORM */}
        {activeTab === "create" && (
          <div className="max-w-4xl">
            <form onSubmit={handleSubmit(onCreateTrip)} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span> Select Fleet
                  </h3>
                  <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {vehicles.filter(v => v.status === "AVAILABLE").map(v => (
                      <div key={v._id} onClick={() => setSelectedVehicle(v)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedVehicle?._id === v._id ? 'border-amber-400 bg-amber-400/5' : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800'}`}>
                        <p className="text-white font-bold">{v.model}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{v.licensePlate} • Max {v.maxCapacity}kg</p>
                      </div>
                    ))}
                    {vehicles.filter(v => v.status === "AVAILABLE").length === 0 && (
                      <div className="p-8 border border-zinc-800 border-dashed rounded-xl text-center text-xs text-zinc-600 italic">No available vehicles</div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span> Assign Driver
                  </h3>
                  <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {drivers.filter(d => d.status === "ON_DUTY").map(d => (
                      <div key={d._id} onClick={() => setSelectedDriver(d)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDriver?._id === d._id ? 'border-emerald-400 bg-emerald-400/5' : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800'}`}>
                        <p className="text-white font-bold">{d.name}</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase">Ready</p>
                      </div>
                    ))}
                    {drivers.filter(d => d.status === "ON_DUTY").length === 0 && (
                      <div className="p-8 border border-zinc-800 border-dashed rounded-xl text-center text-xs text-zinc-600 italic">No available drivers</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Weight (kg)</label>
                    <input type="number" {...register("cargoWeight", { required: true })} className={`w-full bg-zinc-950 border ${isOverCapacity ? 'border-red-500 ring-2 ring-red-500/10' : 'border-zinc-800 focus:border-amber-400'} rounded-xl p-4 text-white outline-none transition-all font-mono`} />
                    {isOverCapacity && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase italic">⚠️ Over Capacity</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Start Odometer</label>
                    <input type="number" {...register("startOdometer", { required: true })} className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl p-4 text-white outline-none font-mono" placeholder={selectedVehicle ? `Last: ${selectedVehicle.odometer}` : "Reading"} />
                  </div>
                  <div className="relative">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Origin</label>
                    <input type="text" {...register("startLocation", { required: true })} placeholder="Location A" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-amber-400" />
                  </div>
                  <div className="relative">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2">Destination</label>
                    <input type="text" {...register("endLocation", { required: true })} placeholder="Location B" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-amber-400" />
                  </div>
                </div>
                <button type="submit" disabled={!selectedVehicle || !selectedDriver || isOverCapacity} className="w-full bg-amber-400 text-black font-black py-4 rounded-xl hover:bg-amber-300 disabled:opacity-20 uppercase tracking-widest text-sm shadow-xl shadow-amber-400/20 transition-all active:scale-[0.98]">Create Trip Draft</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ── COMPLETION MODAL ── */}
      {completingTrip && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-zinc-900 w-full max-w-md p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-emerald-500"></div>
            <h3 className="text-2xl font-black text-white italic mb-2 tracking-tight">FINALIZE TRIP</h3>
            <p className="text-xs text-zinc-500 uppercase font-bold mb-6 tracking-widest">Update Final Odometer Reading</p>

            <form onSubmit={finalizeCompletion} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-xl border border-zinc-800 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase">Start Odo</span>
                    <span className="text-white font-bold">{completingTrip.startOdometer} km</span>
                  </div>
                  <div className="w-px h-6 bg-zinc-800"></div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase">Route</span>
                    <span className="text-zinc-400 text-[10px] font-bold uppercase">{completingTrip.startLocation?.slice(0, 10)}...</span>
                  </div>
                </div>
                <label className="block text-[10px] font-black text-amber-400 uppercase mb-2">End Reading</label>
                <input
                  name="endOdometer"
                  type="number"
                  required
                  autoFocus
                  placeholder="Ex: 1250"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl p-4 text-white text-3xl font-black outline-none shadow-inner"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setCompletingTrip(null)} className="flex-1 py-4 text-zinc-500 font-bold uppercase text-[10px] hover:text-white transition-colors border border-zinc-800 rounded-xl">Discard</button>
                <button type="submit" className="flex-[2] bg-emerald-500 text-white font-black py-4 rounded-xl hover:bg-emerald-400 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20 active:scale-[0.98]">Complete Trip</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
