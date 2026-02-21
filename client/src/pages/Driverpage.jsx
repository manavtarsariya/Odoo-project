import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDriversRequest, deleteDriverRequest, updateDriverStatusRequest } from "../features/driver/driverSlice";
import Drivermodal from "../components/driver/Drivermodal";

const STATUS_OPTIONS = ["ON_DUTY", "OFF_DUTY", "SUSPENDED"];

export default function Driverpage() {
  const dispatch = useDispatch();
  const { drivers, loading } = useSelector((state) => state.driver);
  const { user } = useSelector((state) => state.auth);
  const [showAdd, setShowAdd] = useState(false);
  const [editDriver, setEditDriver] = useState(null);

  const canEditStatus = ["SAFETY_OFFICER", "DISPATCHER"].includes(user?.role);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      dispatch(deleteDriverRequest(id));
    }
  };

  /* ---------------- STATUS UPDATE ---------------- */
  const handleStatusChange = (id, status) => {
    dispatch(updateDriverStatusRequest({ id, status }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Driver List
        </h1>

        <button
          onClick={() => {
            setEditDriver(null);
            setShowAdd(true);
          }}
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
                      disabled={!canEditStatus}
                      onChange={(e) =>
                        handleStatusChange(d._id, e.target.value)
                      }
                      className={`bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${!canEditStatus ? "opacity-60 cursor-not-allowed" : ""}`}
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
                      onClick={() => {
                        setEditDriver(d);
                        setShowAdd(true);
                      }}
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

      {/* DRIVER MODAL (Add/Edit) */}
      {showAdd && (
        <Drivermodal
          setShowAdd={setShowAdd}
          initialData={editDriver}
        />
      )}
    </div>
  );
}