import { useState } from "react";
import toast from "react-hot-toast";

export default function Drivermodal({ drivers, setDrivers, setShowAdd }) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const name = form.get("name")?.trim();
    const licenseNumber = form.get("licenseNumber")?.trim();
    const licenseExpiry = form.get("licenseExpiry");
    const category = form.get("category")?.trim();
    const safetyScore = form.get("safetyScore");

    let newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!licenseNumber) newErrors.licenseNumber = "License number is required";
    if (!licenseExpiry) newErrors.licenseExpiry = "License expiry date is required";
    if (!category) newErrors.category = "Category is required";
    if (!safetyScore || safetyScore < 0 || safetyScore > 100)
      newErrors.safetyScore = "Safety score must be between 0 and 100";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors");
      return;
    }

    const newDriver = {
      _id: Date.now().toString(),
      name,
      licenseNumber,
      licenseExpiry,
      status: "ON_DUTY",
      category: category.split(",").map((c) => c.trim()),
      safetyScore: Number(safetyScore),
    };

    setDrivers([...drivers, newDriver]);
    toast.success("Driver added successfully ✅");
    setShowAdd(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-6">
          Add Driver
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Driver Name</label>
            <input
              name="name"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter driver name"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* License Number */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">License Number</label>
            <input
              name="licenseNumber"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter license number"
            />
            {errors.licenseNumber && (
              <p className="text-red-400 text-xs mt-1">{errors.licenseNumber}</p>
            )}
          </div>

          {/* Expiry */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">License Expiry</label>
            <input
              type="date"
              name="licenseExpiry"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.licenseExpiry && (
              <p className="text-red-400 text-xs mt-1">{errors.licenseExpiry}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Category (comma separated)
            </label>
            <input
              name="category"
              placeholder="CAR, VAN"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          {/* Safety Score */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Safety Score (0 - 100)
            </label>
            <input
              type="number"
              name="safetyScore"
              placeholder="Enter safety score"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.safetyScore && (
              <p className="text-red-400 text-xs mt-1">{errors.safetyScore}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="w-1/2 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-amber-400 hover:bg-amber-300 text-zinc-900 font-bold py-3 rounded-xl transition"
            >
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}