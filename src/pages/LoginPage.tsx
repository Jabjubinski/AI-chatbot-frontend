import { useForm } from "react-hook-form";
import type { SafeUserRegister } from "../types";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import CustomButton from "../components/UI/CustomButton";

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm<SafeUserRegister>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SafeUserRegister) => {
    setIsLoading(true);
    setError("");
    const status = await login(data);
    if (!status) {
      setError("Invalid credentials");
      setIsLoading(false);
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-md mx-4 z-10">
        {/* Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/60 p-10 relative overflow-hidden">
          {/* Top border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent mb-2 text-center tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-400 text-center text-sm">
                Sign in to your account to continue
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* Email field */}
              <div className="group">
                <input
                  type="email"
                  placeholder="email@example.com"
                  {...register("email", { required: true })}
                  className={clsx(
                    "w-full bg-slate-800/50 border border-slate-700/50 rounded-xl h-12 px-4 text-slate-100 placeholder:text-slate-500",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:bg-slate-800/70",
                    "transition-all duration-200 hover:border-slate-600/70"
                  )}
                />
              </div>

              {/* Password field */}
              <div className="group">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className={clsx(
                    "w-full bg-slate-800/50 border border-slate-700/50 rounded-xl h-12 px-4 text-slate-100 placeholder:text-slate-500",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:bg-slate-800/70",
                    "transition-all duration-200 hover:border-slate-600/70"
                  )}
                />
              </div>

              {/* Submit CustomButton */}
              <CustomButton
                type="submit"
                disabled={isLoading}
                className={clsx(
                  "w-full mt-3 h-12 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                  isLoading
                    ? "bg-slate-700/50 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
                )}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </CustomButton>

              <p className="text-center text-slate-500 text-xs mt-2">
                By continuing, you agree to our Terms of Service
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
