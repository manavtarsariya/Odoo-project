import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDriversRequest, deleteDriverRequest, updateDriverStatusRequest, updateSafetyScoreRequest } from "../features/driver/driverSlice";
import Drivermodal from "../components/driver/Drivermodal";

const STATUS_OPTIONS = ["ON_DUTY", "OFF_DUTY", "SUSPENDED"];

const SafetyScoreCell = ({ driverId, initialValue, onSave, canEdit }) => {
  const [value, setValue] = useState(initialValue || 0);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(driverId, value);
    setIsDirty(false);
  };

  if (!canEdit) {
    return <span>{initialValue || 0}%</span>;
  }

  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <input
          type="number"
          value={value}
          min="0"
          max="100"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          className={`w-16 bg-zinc-950 border ${isDirty ? 'border-amber-400' : 'border-zinc-800'} focus:border-amber-400 rounded-lg px-2 py-1 text-center outline-none transition`}
        />
        {isDirty && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        )}
      </div>
      <span className="text-zinc-500 text-xs">%</span>
      {isDirty && (
        <button
          onClick={handleSave}
          className="bg-amber-400 text-black p-1 rounded-md hover:bg-amber-300 transition shadow-lg shadow-amber-400/20"
          title="Save to database"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default function Driverpage() {
  const dispatch = useDispatch();
  const { drivers, loading } = useSelector((state) => state.driver);
  const { user } = useSelector((state) => state.auth);
  const [showAdd, setShowAdd] = useState(false);
  const [editDriver, setEditDriver] = useState(null);

  const canEditStatus = ["MANAGER", "SAFETY_OFFICER", "DISPATCHER"].includes(user?.role);
  const canEditSafetyScore = ["MANAGER", "SAFETY_OFFICER"].includes(user?.role);

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

  const handleSafetyScoreChange = (id, safetyScore) => {
    const score = parseInt(safetyScore, 10);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      dispatch(updateSafetyScoreRequest({ id, safetyScore: score }));
    }
  };

  if (loading && (!drivers || drivers.length === 0)) {
    return <div className="text-white">Loading drivers...</div>;
  }

  return (
    <div className="flex flex-col flex-1 w-full text-white">
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
            {!drivers || drivers.length === 0 ? (
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

                  <td className="p-4 font-semibold text-white">
                    <SafetyScoreCell
                      driverId={d._id}
                      initialValue={d.safetyScore}
                      canEdit={canEditSafetyScore}
                      onSave={handleSafetyScoreChange}
                    />
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
