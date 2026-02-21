import { useState, useMemo } from "react";

import Vehiclemodal from "../components/vehicle/VehicleModal"
import Vehicletable from "../components/vehicle/Vehicletable";
import { fetchVehiclesRequest, deleteVehicleRequest } from "../features/vehicle/vehicleSlice";

const STATUS_OPTIONS = ["ALL", "AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"];

export default function Vehiclepage() {
  const [isOpen, setIsOpen] = useState(false);

  const [vehicles, setVehicles] = useState([
    {
      _id: "1",
      managerId: "John Doe",
      model: "Volvo FH16",
      licensePlate: "AP09AB1234",
      maxCapacity: 20000,
      odometer: 125000,
      status: "AVAILABLE",
      createdAt: "2026-02-01",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [open, setOpen] = useState(false);

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteVehicleRequest(id));
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.licensePlate.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "ALL" || v.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [vehicles, search, statusFilter]);

  return (
    <div className="flex bg-zinc-950 min-h-screen">

    

      {/* Main Section */}
      <div className="flex flex-col flex-1 w-full">

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-black text-white">
              Vehicle Registry
            </h1>

            <button
              onClick={() => {
                setEditingVehicle(null);
                setOpen(true);
              }}
              className="bg-amber-400 hover:bg-amber-300 text-zinc-900 font-bold px-5 py-2 rounded-xl transition-all"
            >
              + Add Vehicle
            </button>
          </div>

          {/* Search + Filter */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by model or plate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:border-amber-400 outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <Vehicletable
            vehicles={filteredVehicles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </main>

       
      </div>

      {/* Modal */}
      {open && (
        <Vehiclemodal
          setOpen={setOpen}
          initialData={editingVehicle}
        />
      )}
    </div>
  );
}