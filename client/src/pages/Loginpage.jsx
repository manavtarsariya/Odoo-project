import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

/* ── tiny SVG icons ── */
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
const IconShield = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const FEATURES = [
  "Real-time fleet tracking & monitoring",
  "Driver safety scoring & compliance",
  "Automated maintenance scheduling",
  "Financial analytics & fuel reports",
];

const ROLES = [
  { label: "Manager", color: "bg-amber-400" },
  { label: "Dispatcher", color: "bg-blue-400" },
  { label: "Safety Officer", color: "bg-emerald-400" },
  { label: "Financial Analyst", color: "bg-violet-400" },
];

export default function Loginpage() {
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error,loading} = useSelector(store => store.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {

    dispatch(loginRequest(data))
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Login payload:", data);

    if(!loading && !error){
      setSubmitted(true);
      navigate("/")

    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 font-sans">

      {/* ── LEFT DECORATIVE PANEL ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-[45%] flex-col justify-between p-12 bg-zinc-900 border-r border-zinc-800 relative overflow-hidden">

        {/* glow orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-zinc-900 shrink-0">
            <IconTruck />
          </div>
          <span className="text-white font-black text-xl tracking-tight">
            Fleet<span className="text-amber-400">Flow</span>
          </span>
        </div>

        {/* Hero copy */}
        <div className="z-10 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              Fleet Management System
            </span>
            <h1 className="text-5xl font-black text-white leading-[1.08] tracking-tight">
              Command<br />Your<br /><span className="text-amber-400">Fleet.</span>
            </h1>
            <p className="mt-5 text-zinc-400 text-sm leading-relaxed max-w-xs">
              Centralized, rule-based operations hub for modern logistics teams — replacing manual logbooks forever.
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                  <IconCheck />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Role pills */}
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Access Roles</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map(({ label, color }) => (
                <span key={label} className="flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-lg">
                  <span className={`w-2 h-2 rounded-sm ${color}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stat bar */}
        <div className="grid grid-cols-3 divide-x divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden z-10">
          {[["8", "Modules"], ["4", "Roles"], ["∞", "Scale"]].map(([n, l]) => (
            <div key={l} className="bg-zinc-800/60 text-center py-4">
              <p className="text-2xl font-black text-amber-400">{n}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        {/* subtle center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-zinc-900">
              <IconTruck />
            </div>
            <span className="text-white font-black text-lg tracking-tight">
              Fleet<span className="text-amber-400">Flow</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
              FleetFlow Portal
            </p>
            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
              Welcome<br />back.
            </h2>
            <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
              Sign in to access your dashboard and manage fleet operations.
            </p>
          </div>

          {/* ── FORM ── */}
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

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
                    placeholder="you@fleetflow.io"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    className={`w-full bg-zinc-900 border ${
                      errors.email ? "border-red-500 focus:ring-red-500/20" : "border-zinc-800 focus:border-amber-400 focus:ring-amber-400/15"
                    } rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none focus:ring-4 transition-all duration-200`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <IconLock />
                  </span>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                    className={`w-full bg-zinc-900 border ${
                      errors.password ? "border-red-500 focus:ring-red-500/20" : "border-zinc-800 focus:border-amber-400 focus:ring-amber-400/15"
                    } rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-zinc-600 outline-none focus:ring-4 transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <IconEye open={showPw} />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role info hint */}
              <div className="flex items-start gap-3 bg-amber-400/5 border border-amber-400/15 rounded-xl p-4">
                <span className="text-amber-400 mt-0.5 shrink-0"><IconShield /></span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your dashboard access is determined by your assigned role.{" "}
                  <span className="text-amber-400 font-medium">Contact your manager</span> if you need role changes.
                </p>
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>Sign In to Dashboard <IconArrow /></>
                )}
              </button>

              {/* Register link */}
              <p className="text-center text-sm text-zinc-500">
                Don't have an account?{" "}
                <a href="/register" className="text-amber-400 font-semibold hover:text-amber-300 underline underline-offset-2 transition-colors">
                  Create one
                </a>
              </p>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-10">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 text-emerald-400 text-4xl">
                ✓
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Signed In!</h3>
              <p className="text-zinc-400 text-sm mb-8">Redirecting to your dashboard...</p>
              <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full animate-[grow_1.5s_ease_forwards]" style={{ width: "100%", animation: "width 1.5s ease forwards" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}