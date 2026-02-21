import React from 'react'

const Vehicletable = ({ vehicles }) => {
 return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm text-left text-zinc-300">
        <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4">Model</th>
            <th className="px-6 py-4">Plate</th>
            <th className="px-6 py-4">Capacity</th>
            <th className="px-6 py-4">Odometer</th>
            <th className="px-6 py-4">Status</th>
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
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      v.status === "AVAILABLE"
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicletable