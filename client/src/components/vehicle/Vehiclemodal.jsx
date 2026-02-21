import { useForm } from "react-hook-form";

const STATUS_OPTIONS = ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"];

export default function Vehiclemodal({ setOpen, addVehicle }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    addVehicle({
      ...data,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-8 relative">

        <h2 className="text-2xl font-black text-white mb-6">
          Add Vehicle
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            placeholder="Manager Name"
            {...register("managerId", { required: true })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            placeholder="Model"
            {...register("model", { required: true })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            placeholder="License Plate"
            {...register("licensePlate", { required: true })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            type="number"
            placeholder="Max Capacity (kg)"
            {...register("maxCapacity", { required: true })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            type="number"
            placeholder="Odometer (km)"
            {...register("odometer", { required: true })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <select
            {...register("status")}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

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