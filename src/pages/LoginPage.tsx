import { useForm } from "react-hook-form";
import type { SafeUserRegister } from "../types";
import { useAuthStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react"; // Added Loader2 and AlertCircle
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Changed from @radix-ui to local component for styles

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }, // Destructure errors to show validation feedback
  } = useForm<SafeUserRegister>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SafeUserRegister) => {
    setIsLoading(true);
    setError("");

    try {
      const status = await login(data);
      if (!status) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-dvh flex w-full overflow-hidden bg-white">
      {/* Left Side - Form */}
      <Card className="w-full md:w-1/2 h-full flex flex-col justify-center rounded-none border-0 shadow-none">
        <div className="w-full max-w-md mx-auto px-8">
          <CardHeader className="flex flex-col text-center space-y-2 p-0 mb-8">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Login to your Lithos account
            </CardTitle>
            <CardDescription>
              Enter your email and password to log in
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {/* Global Error Alert */}
            {error && (
              <div className="mb-6 p-3 rounded-md bg-destructive/15 text-destructive text-sm flex items-center gap-2 border border-destructive/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    disabled={isLoading}
                    placeholder="email@example.com"
                    className={
                      errors.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    disabled={isLoading}
                    placeholder="Password"
                    className={
                      errors.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-slate-500 text-xs mt-2">
                  By continuing, you agree to our Terms of Service
                </p>

                <div className="flex gap-2 w-full justify-center text-center text-slate-500 text-xs">
                  <span>Don't have an account?</span>
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    to="/Register"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>

      {/* Right Side - Visual / Background */}
      <div className="hidden md:flex w-1/2 h-full bg-slate-50 items-center justify-center border-l relative overflow-hidden">
        {/* Optional: Add a subtle pattern or gradient if you don't have an image yet */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        <div className="relative z-10 p-10">
          {/* You can put a quote or a logo here */}
          <h3 className="text-xl font-medium text-slate-700">
            "Welcome back to Lithos."
          </h3>
        </div>
      </div>
    </div>
  );
}
