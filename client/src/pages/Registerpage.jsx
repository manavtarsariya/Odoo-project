import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerRequest } from "../features/auth/authSlice";

/* ── SVG Icons ── */
const IconTruck = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const IconMail = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
  </svg>
);
const IconLock = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconUser = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconShield = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconChevron = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconEye = ({ open }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
    ) : (
      <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" /></>
    )}
  </svg>
);
const IconArrow = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Password Strength Helpers ── */
function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthConfig = [
  { label: "Weak",   bar: "w-1/4",  color: "bg-red-500",    text: "text-red-400" },
  { label: "Fair",   bar: "w-2/4",  color: "bg-amber-500",  text: "text-amber-400" },
  { label: "Good",   bar: "w-3/4",  color: "bg-blue-500",   text: "text-blue-400" },
  { label: "Strong", bar: "w-full", color: "bg-emerald-500", text: "text-emerald-400" },
];

const ROLES = ["MANAGER", "DISPATCHER", "SAFETY_OFFICER", "FINANCE"];

const ROLE_INFO = [
  { role: "Manager",           desc: "Full fleet & lifecycle control",   dot: "bg-amber-400" },
  { role: "Dispatcher",        desc: "Create trips & assign drivers",     dot: "bg-blue-400" },
  { role: "Safety Officer",    desc: "Compliance & driver monitoring",    dot: "bg-emerald-400" },
  { role: "Financial Analyst", desc: "Costs, fuel & ROI reporting",       dot: "bg-violet-400" },
];

export default function RegisterPage() {
  const [showPw, setShowPw]   = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [done, setDone]       = useState(false);


  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const pw       = watch("password", "");
  const strength = getStrength(pw);
  const sc       = strengthConfig[strength - 1];

  const onSubmit = async (data) => {
    const { confirmPassword,terms, ...filteredData } = data;
    console.log(filteredData)
    dispatch(registerRequest(filteredData))
    // await new Promise((r) => setTimeout(r, 1400));
    // const userId = Math.random().toString(36).substr(2, 9).toUpperCase();
    // console.log("Register payload:", { userId, ...data });
    // setDone(true);
  };

  /* ── FIELD CLASSES ── */
  const inputClass = (hasError) =>
    `w-full bg-zinc-900 border ${
      hasError
        ? "border-red-500 focus:ring-red-500/20"
        : "border-zinc-800 focus:border-amber-400 focus:ring-amber-400/15"
    } rounded-xl py-3.5 text-sm text-white placeholder-zinc-600 outline-none focus:ring-4 transition-all duration-200`;

  return (
    <div className="min-h-screen flex bg-zinc-950 font-sans">

      {/* ──────── LEFT PANEL ──────── */}
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 bg-zinc-900 border-r border-zinc-800 relative overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-zinc-900">
            <IconTruck />
          </div>
          <span className="text-white font-black text-xl tracking-tight">
            Fleet<span className="text-amber-400">Flow</span>
          </span>
        </div>

        {/* Hero */}
        <div className="z-10 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              Join the team
            </span>
            <h1 className="text-[44px] font-black text-white leading-[1.05] tracking-tight">
              Built for<br />Modern<br /><span className="text-amber-400">Logistics.</span>
            </h1>
            <p className="mt-5 text-zinc-400 text-sm leading-relaxed max-w-xs">
              Create your account and get access to a centralized hub for fleet health, driver safety, and financial oversight.
            </p>
          </div>

          {/* Role cards */}
          <div className="space-y-2.5">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Available Roles</p>
            {ROLE_INFO.map(({ role, desc, dot }) => (
              <div
                key={role}
                className="flex items-center gap-4 bg-zinc-800/70 border border-zinc-700/60 rounded-xl px-4 py-3"
              >
                <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${dot}`} />
                <div>
                  <p className="text-sm text-zinc-200 font-semibold">{role}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden z-10">
          {[["8", "Modules"], ["4", "Roles"], ["∞", "Scale"]].map(([n, l]) => (
            <div key={l} className="bg-zinc-800/50 text-center py-4">
              <p className="text-2xl font-black text-amber-400">{n}</p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ──────── RIGHT FORM PANEL ──────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-14 overflow-y-auto relative">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-lg relative z-10">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-zinc-900">
              <IconTruck />
            </div>
            <span className="text-white font-black text-lg tracking-tight">
              Fleet<span className="text-amber-400">Flow</span>
            </span>
          </div>

          {!done ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
                  Create Account
                </p>
                <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                  Join<br />FleetFlow.
                </h2>
                <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                  Fill in your details to create a new account. Your role access will be configured by your manager.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                {/* Name + Role row */}
                <div className="grid grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                        <IconUser />
                      </span>
                      <input
                        type="text"
                        placeholder="Alex Johnson"
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "Min 2 characters" },
                          pattern: { value: /^[a-zA-Z\s]+$/, message: "Letters only" },
                        })}
                        className={`${inputClass(errors.name)} pl-11 pr-4`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <span>⚠</span> {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                        <IconShield />
                      </span>
                      <select
                        {...register("role", { required: "Select a role" })}
                        className={`${inputClass(errors.role)} pl-11 pr-9 appearance-none cursor-pointer`}
                      >
                        <option value="" className="bg-zinc-900">Select role...</option>
                        {ROLES.map((r) => (
                          <option key={r} value={r} className="bg-zinc-900">{r}</option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                        <IconChevron />
                      </span>
                    </div>
                    {errors.role && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <span>⚠</span> {errors.role.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                      <IconMail />
                    </span>
                    <input
                      type="email"
                      placeholder="alex@fleetflow.io"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      className={`${inputClass(errors.email)} pl-11 pr-4`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠</span> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                      <IconLock />
                    </span>
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Minimum 8 characters" },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d)/,
                          message: "Must include 1 uppercase letter & 1 number",
                        },
                      })}
                      className={`${inputClass(errors.password)} pl-11 pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <IconEye open={showPw} />
                    </button>
                  </div>

                  {/* Strength bar */}
                  {pw && (
                    <div className="mt-2.5">
                      <div className="w-full bg-zinc-800 rounded-full h-1">
                        <div className={`h-1 rounded-full transition-all duration-500 ${sc?.bar} ${sc?.color}`} />
                      </div>
                      <p className={`text-xs mt-1 font-medium ${sc?.text}`}>
                        Password strength: {sc?.label}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠</span> {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                      <IconLock />
                    </span>
                    <input
                      type={showCPw ? "text" : "password"}
                      placeholder="Repeat your password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) => val === pw || "Passwords do not match",
                      })}
                      className={`${inputClass(errors.confirmPassword)} pl-11 pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCPw((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <IconEye open={showCPw} />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠</span> {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register("terms", {
                        required: "You must accept the terms to continue",
                      })}
                      className="mt-0.5 w-4 h-4 accent-amber-400 shrink-0 cursor-pointer"
                    />
                    <span className="text-xs text-zinc-400 leading-relaxed">
                      I agree to FleetFlow's{" "}
                      <a href="#" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠</span> {errors.terms.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-900 font-black text-sm rounded-xl py-4 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/25 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Creating your account...
                    </span>
                  ) : (
                    <>Create Account <IconArrow /></>
                  )}
                </button>

                {/* Login link */}
                <p className="text-center text-sm text-zinc-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-amber-400 font-semibold hover:text-amber-300 underline underline-offset-2 transition-colors"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </>
          ) : (
            /* ── SUCCESS SCREEN ── */
            <div className="text-center py-16">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                <div className="relative w-24 h-24 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-5xl">
                  ✓
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-3">Account Created!</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                Your FleetFlow account is ready. An admin will activate your role access shortly.
              </p>
              <div className="flex flex-col items-center gap-3">
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-900 font-black text-sm rounded-xl px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/25"
                >
                  Sign In Now <IconArrow />
                </a>
                <p className="text-xs text-zinc-600">Redirecting automatically in 5 seconds...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}