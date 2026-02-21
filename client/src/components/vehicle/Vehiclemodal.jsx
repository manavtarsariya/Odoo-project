import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const STATUS_OPTIONS = ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"];

export default function Vehiclemodal({ setOpen, addVehicle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      addVehicle({
        ...data,
        maxCapacity: Number(data.maxCapacity),
        odometer: Number(data.odometer),
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });

      toast.success("Vehicle added successfully 🚛");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onError = () => {
    toast.error("Please fix the form errors");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-8 relative">

        <h2 className="text-2xl font-black text-white mb-6">
          Add Vehicle
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4"
        >

          {/* Manager Name */}
          <div>
            <input
              placeholder="Manager Name"
              {...register("managerId", {
                required: "Manager name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
            {errors.managerId && (
              <p className="text-red-400 text-sm mt-1">
                {errors.managerId.message}
              </p>
            )}
          </div>

          {/* Model */}
          <div>
            <input
              placeholder="Model"
              {...register("model", {
                required: "Model is required",
              })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
            {errors.model && (
              <p className="text-red-400 text-sm mt-1">
                {errors.model.message}
              </p>
            )}
          </div>

          {/* License Plate */}
          <div>
            <input
              placeholder="License Plate"
              {...register("licensePlate", {
                required: "License plate is required",
                pattern: {
                  value: /^[A-Z0-9-]+$/i,
                  message: "Invalid plate format",
                },
              })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
            {errors.licensePlate && (
              <p className="text-red-400 text-sm mt-1">
                {errors.licensePlate.message}
              </p>
            )}
          </div>

          {/* Max Capacity */}
          <div>
            <input
              type="number"
              placeholder="Max Capacity (kg)"
              {...register("maxCapacity", {
                required: "Capacity is required",
                min: {
                  value: 1,
                  message: "Capacity must be greater than 0",
                },
              })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
            {errors.maxCapacity && (
              <p className="text-red-400 text-sm mt-1">
                {errors.maxCapacity.message}
              </p>
            )}
          </div>

          {/* Odometer */}
          <div>
            <input
              type="number"
              placeholder="Odometer (km)"
              {...register("odometer", {
                required: "Odometer reading is required",
                min: {
                  value: 0,
                  message: "Odometer cannot be negative",
                },
              })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
            {errors.odometer && (
              <p className="text-red-400 text-sm mt-1">
                {errors.odometer.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <select
              {...register("status", {
                required: "Status is required",
              })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-zinc-700 rounded-xl text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-amber-400 text-zinc-900 font-bold rounded-xl hover:bg-amber-300"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}