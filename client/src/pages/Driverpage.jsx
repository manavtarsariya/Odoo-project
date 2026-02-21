import { useState } from "react";
import toast from "react-hot-toast";
import Drivermodal from "../components/driver/Drivermodal";
import Editdrivermodal from "../components/driver/Editdrivermodal";

const STATUS_OPTIONS = ["ON_DUTY", "OFF_DUTY", "SUSPENDED"];

export default function Driverpage() {
  const [drivers, setDrivers] = useState([
    {
      _id: "1",
      name: "John Doe",
      licenseNumber: "DL-12345678",
      licenseExpiry: "2027-12-31",
      status: "ON_DUTY",
      category: ["CAR", "VAN"],
      safetyScore: 95,
    },
    {
      _id: "2",
      name: "Alex Smith",
      licenseNumber: "DL-87654321",
      licenseExpiry: "2026-08-15",
      status: "OFF_DUTY",
      category: ["TRUCK"],
      safetyScore: 88,
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [editDriver, setEditDriver] = useState(null);

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    if (!id) return;

    const exists = drivers.find((d) => d._id === id);
    if (!exists) {
      toast.error("Driver not found");
      return;
    }

    setDrivers((prev) => prev.filter((d) => d._id !== id));
    toast.success("Driver deleted successfully");
  };

  /* ---------------- STATUS UPDATE ---------------- */
  const handleStatusChange = (id, status) => {
    if (!STATUS_OPTIONS.includes(status)) {
      toast.error("Invalid status type");
      return;
    }

    setDrivers((prev) =>
      prev.map((d) =>
        d._id === id ? { ...d, status } : d
      )
    );

    toast.success("Status updated");
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Driver List
        </h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-amber-400 hover:bg-amber-300 text-black px-5 py-2 rounded-xl font-bold transition"
        >
          + Add Driver
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 uppercase text-xs tracking-wider text-zinc-400">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">License</th>
              <th className="p-4">Status</th>
              <th className="p-4">Category</th>
              <th className="p-4">Safety</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-zinc-500">
                  No drivers available
                </td>
              </tr>
            ) : (
              drivers.map((d) => (
                <tr
                  key={d._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                >
                  <td className="p-4 font-medium">{d.name}</td>

                  <td className="p-4 text-zinc-400">
                    {d.licenseNumber}
                  </td>

                  <td className="p-4">
                    <select
                      value={d.status}
                      onChange={(e) =>
                        handleStatusChange(d._id, e.target.value)
                      }
                      className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-4 text-zinc-400">
                    {Array.isArray(d.category)
                      ? d.category.join(", ")
                      : "N/A"}
                  </td>

                  <td className="p-4 font-semibold">
                    {typeof d.safetyScore === "number"
                      ? `${d.safetyScore}%`
                      : "0%"}
                  </td>

                  <td className="p-4 text-center space-x-4">
                    <button
                      onClick={() => setEditDriver(d)}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(d._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <Drivermodal
          drivers={drivers}
          setDrivers={setDrivers}
          setShowAdd={setShowAdd}
        />
      )}

      {/* EDIT MODAL */}
      {editDriver && (
        <Editdrivermodal
          driver={editDriver}
          drivers={drivers}
          setDrivers={setDrivers}
          setEditDriver={setEditDriver}
        />
      )}
    </div>
  );
}