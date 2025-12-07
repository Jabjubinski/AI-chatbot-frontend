import { useForm } from "react-hook-form";
import type { SafeUserRegister } from "../types";
import { useAuthStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription, // Added for consistency
  CardHeader, // Added for consistency
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Using Shadcn Label

export default function RegisterPage() {
  const { register: userRegister } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SafeUserRegister>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
      country: "",
    },
  });

  const onSubmit = async (data: SafeUserRegister) => {
    setIsLoading(true);
    setGlobalError("");

    try {
      const status = await userRegister(data);
      if (!status) {
        setGlobalError("Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }
      navigate("/login");
    } catch (err) {
      setGlobalError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-dvh flex w-full overflow-hidden bg-white">
      {/* Left Side - Form */}
      <Card className="w-full md:w-1/2 h-full flex flex-col justify-center rounded-none border-0 shadow-none overflow-y-auto">
        <div className="w-full max-w-md mx-auto px-8 py-8">
          <CardHeader className="flex flex-col text-center space-y-2 p-0 mb-8">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create your account
            </CardTitle>
            <CardDescription>
              Enter your details below to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {/* Global Error Alert */}
            {globalError && (
              <div className="mb-6 p-3 rounded-md bg-destructive/15 text-destructive text-sm flex items-center gap-2 border border-destructive/20">
                <AlertCircle className="w-4 h-4" />
                <span>{globalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Row 1: Names */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="John"
                    disabled={isLoading}
                    className={
                      errors.firstname
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("firstname", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstname && (
                    <span className="text-xs text-red-500">
                      {errors.firstname.message}
                    </span>
                  )}
                </div>
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Doe"
                    disabled={isLoading}
                    className={
                      errors.lastname
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("lastname", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastname && (
                    <span className="text-xs text-red-500">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  disabled={isLoading}
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

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  disabled={isLoading}
                  className={
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Row 2: Location/Contact */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/5 grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Country"
                    disabled={isLoading}
                    className={
                      errors.country
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("country", {
                      required: "Country is required",
                    })}
                  />
                  {errors.country && (
                    <span className="text-xs text-red-500">
                      {errors.country.message}
                    </span>
                  )}
                </div>
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="mobile">Phone Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    disabled={isLoading}
                    className={
                      errors.mobile
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("mobile", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.mobile && (
                    <span className="text-xs text-red-500">
                      {errors.mobile.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-6 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-slate-500 text-xs mt-2">
                  By continuing, you agree to our Terms of Service
                </p>

                <div className="flex gap-2 w-full justify-center text-center text-slate-500 text-xs">
                  <span>Already have an account?</span>
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    to="/login"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>

      {/* Right Side - Visual / Background */}
      <div className="hidden md:flex w-1/2 h-full bg-slate-50 items-center justify-center border-l relative overflow-hidden">
        {/* Optional Gradient or Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        <div className="relative z-10 p-10 text-center">
          <h3 className="text-xl font-medium text-slate-700">
            "Join the Lithos community."
          </h3>
        </div>
      </div>
    </div>
  );
}
