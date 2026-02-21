import React, { useState } from 'react'

const Vehicletable = ({ vehicles, onEdit, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden pb-15">
      <table className="w-full text-sm text-left text-zinc-300">
        <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4">Model</th>
            <th className="px-6 py-4">Plate</th>
            <th className="px-6 py-4">Capacity</th>
            <th className="px-6 py-4">Odometer</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-10 text-zinc-500"
              >
                No vehicles found.
              </td>
            </tr>
          ) : (
            vehicles.map((v) => (
              <tr
                key={v._id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
              >
                <td className="px-6 py-4 text-white font-semibold">
                  {v.model}
                </td>
                <td className="px-6 py-4">
                  {v.licensePlate}
                </td>
                <td className="px-6 py-4">
                  {v.maxCapacity} kg
                </td>
                <td className="px-6 py-4">
                  {v.odometer} km
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${v.status === "AVAILABLE"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : v.status === "ON_TRIP"
                        ? "bg-blue-500/15 text-blue-400"
                        : v.status === "IN_SHOP"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button
                    onClick={() => toggleMenu(v._id)}
                    className="text-zinc-500 hover:text-white transition-colors p-1"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {openMenuId === v._id && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenMenuId(null)}
                      />
                      <div className="absolute right-6 top-10 w-32 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <button
                          onClick={() => {
                            onEdit(v);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this vehicle?")) {
                              onDelete(v._id);
                            }
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-zinc-800/50 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicletable