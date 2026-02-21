import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addVehicleRequest, updateVehicleRequest } from "../../features/vehicle/vehicleSlice";
import { useEffect } from "react";

// ✅ Matches backend: enum ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"]
const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "ON_TRIP", label: "On Trip" },
  { value: "IN_SHOP", label: "In Shop" },
  { value: "RETIRED", label: "Retired" },
];

// ── Icons ──
const IconX = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconTruck = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const IconChevron = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── Reusable Field Wrapper ──
function Field({ label, error, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-zinc-600">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Input class helper ──
const inputCls = (hasError) =>
  `w-full bg-zinc-800 border ${hasError
    ? "border-red-500 focus:ring-red-500/20"
    : "border-zinc-700 focus:border-amber-400 focus:ring-amber-400/15"
  } rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:ring-4 transition-all duration-200`;

export default function VehicleModal({ setOpen, initialData }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isEdit = !!initialData;

  const canEditCosts = ["MANAGER", "FINANCE"].includes(user?.role);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: initialData || {
      status: "AVAILABLE",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    // ✅ Shape exactly matches backend vehicleSchema fields
    // managerId is injected by backend from req.user (JWT) — NOT from form
    const payload = {
      name: data.name.trim(),           // String, required
      model: data.model.trim(),          // String, required
      licensePlate: data.licensePlate.trim().toUpperCase(), // String, unique, uppercase
      maxCapacity: Number(data.maxCapacity),   // Number, required
      odometer: Number(data.odometer),      // Number, default 0
      status: data.status,                // Enum, default AVAILABLE
      acquisitionCost: Number(data.acquisitionCost || 0), // Added for ROI
    };

    if (isEdit) {
      dispatch(updateVehicleRequest({ id: initialData._id, data: payload }));
    } else {
      dispatch(addVehicleRequest(payload));
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl relative">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400">
              <IconTruck />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                {isEdit ? "Update Vehicle" : "Add Vehicle"}
              </h2>
              <p className="text-xs text-zinc-500">
                {isEdit ? "Modify vehicle details" : "All fields are required"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg p-1.5 transition-all"
          >
            <IconX />
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-7 py-6 space-y-5">

          {/* Row 1: Vehicle Name + Model */}
          <div className="grid grid-cols-2 gap-4">

            {/* name → matches backend: name: String, required, trim */}
            <Field label="Vehicle Name" error={errors.name?.message}>
              <input
                type="text"
                placeholder="e.g. Van-05"
                {...register("name", {
                  required: "Vehicle name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                  maxLength: { value: 50, message: "Max 50 characters" },
                  pattern: {
                    value: /^[a-zA-Z0-9\s\-]+$/,
                    message: "Letters, numbers & hyphens only",
                  },
                })}
                className={inputCls(errors.name)}
              />
            </Field>

            {/* model → matches backend: model: String, required, trim */}
            <Field label="Model" error={errors.model?.message}>
              <input
                type="text"
                placeholder="e.g. Toyota HiAce"
                {...register("model", {
                  required: "Model is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                  maxLength: { value: 60, message: "Max 60 characters" },
                  pattern: {
                    value: /^[a-zA-Z0-9\s\-]+$/,
                    message: "Letters, numbers & hyphens only",
                  },
                })}
                className={inputCls(errors.model)}
              />
            </Field>
          </div>

          {/* licensePlate → matches backend: String, unique, uppercase, trim */}
          <Field
            label="License Plate"
            error={errors.licensePlate?.message}
            hint="Will be saved in uppercase automatically"
          >
            <input
              type="text"
              placeholder="e.g. KA-01-AB-1234"
              {...register("licensePlate", {
                required: "License plate is required",
                minLength: { value: 4, message: "Min 4 characters" },
                maxLength: { value: 20, message: "Max 20 characters" },
                pattern: {
                  value: /^[A-Za-z0-9\-]+$/,
                  message: "Letters, numbers & hyphens only (no spaces)",
                },
              })}
              className={`${inputCls(errors.licensePlate)} uppercase`}
            />
          </Field>

          {/* Row 2: Max Capacity + Odometer */}
          <div className="grid grid-cols-2 gap-4">

            {/* maxCapacity → matches backend: Number, required */}
            <Field label="Max Capacity (kg)" error={errors.maxCapacity?.message}>
              <input
                type="number"
                placeholder="e.g. 1000"
                {...register("maxCapacity", {
                  required: "Max capacity is required",
                  min: { value: 1, message: "Must be at least 1 kg" },
                  max: { value: 100000, message: "Exceeds max limit" },
                  validate: (v) =>
                    Number.isInteger(Number(v)) || "Must be a whole number",
                })}
                className={inputCls(errors.maxCapacity)}
              />
            </Field>

            {/* odometer → matches backend: Number, default 0 */}
            <Field
              label="Odometer (km)"
              error={errors.odometer?.message}
              hint="Enter 0 for new vehicles"
            >
              <input
                type="number"
                placeholder="e.g. 0"
                defaultValue={0}
                {...register("odometer", {
                  required: "Odometer reading is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 10000000, message: "Value too high" },
                  validate: (v) =>
                    Number.isInteger(Number(v)) || "Must be a whole number",
                })}
                className={inputCls(errors.odometer)}
              />
            </Field>
          </div>

          {/* status → matches backend: enum ["AVAILABLE","ON_TRIP","IN_SHOP","RETIRED"], default "AVAILABLE" */}
          <Field label="Status" error={errors.status?.message}>
            <div className="relative">
              <select
                {...register("status", {
                  required: "Status is required",
                  validate: (v) =>
                    ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"].includes(v) ||
                    "Invalid status value",
                })}
                className={`${inputCls(errors.status)} appearance-none pr-10 cursor-pointer`}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value} className="bg-zinc-900">
                    {label}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <IconChevron />
              </span>
            </div>
          </Field>

          {/* acquisitionCost → Number, required for ROI */}
          {canEditCosts && (
            <Field label="Acquisition Cost ($)" error={errors.acquisitionCost?.message}>
              <input
                type="number"
                placeholder="e.g. 50000"
                {...register("acquisitionCost", {
                  required: "Acquisition cost is required",
                  min: { value: 0, message: "Min 0" },
                })}
                className={inputCls(errors.acquisitionCost)}
              />
            </Field>
          )}

          {/* managerId note */}
          <p className="text-xs text-zinc-600 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-2.5">
            🔐 <span className="text-zinc-500">Manager ID</span> is automatically linked from your session — no input needed.
          </p>

          {/* ── Actions ── */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-900 text-sm font-black rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 active:translate-y-0"
            >
              {isSubmitting ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Vehicle" : "Add Vehicle")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}