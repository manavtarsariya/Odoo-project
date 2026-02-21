import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addDriverRequest, updateDriverRequest } from "../../features/driver/driverSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

// ✅ Matches backend enum exactly: ["VAN", "CAR", "RIKSHOW", "TRUCK", "OTHER"]
const CATEGORY_OPTIONS = [
  { value: "VAN", label: "Van" },
  { value: "CAR", label: "Car" },
  { value: "RIKSHOW", label: "Rikshow" },
  { value: "TRUCK", label: "Truck" },
  { value: "OTHER", label: "Other" },
];

const STATUS_OPTIONS = [
  { value: "ON_DUTY", label: "On Duty" },
  { value: "OFF_DUTY", label: "Off Duty" },
  { value: "SUSPENDED", label: "Suspended" },
];

// ── Icons ──
const IconX = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconUser = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ── Reusable Field Wrapper ──
function Field({ label, error, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-zinc-600">{hint}</p>}
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

export default function DriverModal({ setShowAdd, initialData }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isEdit = !!initialData;

  // RBAC logic
  const canEditStatus = ["SAFETY_OFFICER", "DISPATCHER"].includes(user?.role);
  const canEditSafetyScore = user?.role === "SAFETY_OFFICER";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: initialData || {
      // safetyScore: 100,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name.trim(),
        licenseNumber: data.licenseNumber.trim(),
        licenseExpiry: new Date(data.licenseExpiry).toISOString(),
        category: data.category,
        status: data.status,
        safetyScore: Number(data.safetyScore),
      };

      if (isEdit) {
        dispatch(updateDriverRequest({ id: initialData._id, data: payload }));
      } else {
        dispatch(addDriverRequest(payload));
      }
      setShowAdd(false);
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  // Today's date string for min date validation
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400">
              <IconUser />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                {isEdit ? "Update Driver" : "Add Driver"}
              </h2>
              <p className="text-xs text-zinc-500">
                {isEdit ? "Modify driver details" : "All fields are required"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAdd(false)}
            className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg p-1.5 transition-all"
          >
            <IconX />
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-7 py-6 space-y-5">

          {/* Row 1: Name + License Number */}
          <div className="grid grid-cols-2 gap-4">

            {/* name → String, required, trim */}
            <Field label="Driver Name" error={errors.name?.message}>
              <input
                type="text"
                placeholder="e.g. Alex Johnson"
                {...register("name", {
                  required: "Driver name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                  maxLength: { value: 60, message: "Max 60 characters" },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Letters and spaces only",
                  },
                })}
                className={inputCls(errors.name)}
              />
            </Field>

            {/* licenseNumber → String, required, unique, trim */}
            <Field label="License Number" error={errors.licenseNumber?.message}>
              <input
                type="text"
                placeholder="e.g. DL-2024-XYZ"
                {...register("licenseNumber", {
                  required: "License number is required",
                  minLength: { value: 4, message: "Min 4 characters" },
                  maxLength: { value: 30, message: "Max 30 characters" },
                  pattern: {
                    value: /^[A-Za-z0-9\-]+$/,
                    message: "Letters, numbers & hyphens only",
                  },
                })}
                className={inputCls(errors.licenseNumber)}
              />
            </Field>
          </div>

          {/* licenseExpiry → Date, required, must be future date */}
          <Field
            label="License Expiry Date"
            error={errors.licenseExpiry?.message}
            hint="Must be a future date"
          >
            <input
              type="date"
              min={today} // ✅ blocks past dates in date picker
              {...register("licenseExpiry", {
                required: "License expiry date is required",
                validate: (val) => {
                  const selected = new Date(val);
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  return selected > now || "Expiry date must be in the future";
                },
              })}
              className={inputCls(errors.licenseExpiry)}
            />
          </Field>

          {/* category → [String], enum, min 1 required */}
          {/* ✅ Checkboxes instead of free text — matches backend enum exactly */}
          <Field
            label="Vehicle Category"
            error={errors.category?.message}
            hint="Select at least one category"
          >
            <div className="grid grid-cols-3 gap-2">
              {CATEGORY_OPTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center gap-2.5 bg-zinc-800 border border-zinc-700 hover:border-amber-400/40 rounded-xl px-3 py-2.5 cursor-pointer transition-all group"
                >
                  <input
                    type="checkbox"
                    value={value}
                    {...register("category", {
                      required: "Select at least one category",
                      // ✅ Validate at least one is checked
                      validate: (val) =>
                        (Array.isArray(val) && val.length > 0) ||
                        "Select at least one category",
                    })}
                    className="accent-amber-400 w-3.5 h-3.5 shrink-0"
                  />
                  <span className="text-xs text-zinc-300 group-hover:text-white transition-colors font-medium">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </Field>

          {/* status and safetyScore - Visible only in Edit mode */}
          {isEdit && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Driver Status" error={errors.status?.message}>
                <select
                  disabled={!canEditStatus}
                  {...register("status", { required: "Status is required" })}
                  className={inputCls(errors.status)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Safety Score (0-100)" error={errors.safetyScore?.message}>
                <input
                  type="number"
                  disabled={!canEditSafetyScore}
                  placeholder="e.g. 100"
                  {...register("safetyScore", {
                    required: "Safety score is required",
                    min: { value: 0, message: "Min 0" },
                    max: { value: 100, message: "Max 100" },
                  })}
                  className={inputCls(errors.safetyScore)}
                />
              </Field>
            </div>
          )}

          {/* safetyScore → Number, min 0, max 100, default 100 */}
          {/* <Field
            label="Safety Score (0 – 100)"
            error={errors.safetyScore?.message}
            hint="Default is 100 for new drivers"
          >
            <input
              type="number"
              placeholder="100"
              {...register("safetyScore", {
                required: "Safety score is required",
                min: { value: 0,   message: "Minimum score is 0"   },
                max: { value: 100, message: "Maximum score is 100"  },
                validate: (v) =>
                  Number.isInteger(Number(v)) || "Must be a whole number",
              })}
              className={inputCls(errors.safetyScore)}
            />
          </Field> */}

          {/* Status info note */}
          <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3">
            <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
            <p className="text-xs text-zinc-500">
              Driver status defaults to{" "}
              <span className="text-zinc-300 font-semibold">OFF_DUTY</span> —
              Manager can activate after onboarding.
            </p>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="w-1/2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-900 text-sm font-black py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 active:translate-y-0"
            >
              {isSubmitting ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Driver" : "Add Driver")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}