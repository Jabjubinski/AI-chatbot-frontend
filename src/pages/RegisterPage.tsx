import { useForm } from "react-hook-form";
import type { SafeUserRegister } from "../types";
import { useAuthStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/UI/CustomButton";

export default function RegisterPage() {
  const { register: userRegister } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SafeUserRegister>({
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
    const status = await userRegister(data);
    if (!status) return console.log("Something went wrong");
    console.log("Success");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1E1E1E] from-30% via-[#494835] to-70% to-[#1E1E1E] relative overflow-hidden">
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md mx-4 z-10">
        {/* Modern card with subtle backdrop blur */}
        <div className="bg-gray-950/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 p-10 relative overflow-hidden">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
                Create your account
              </h2>
              <p className="text-gray-400 text-center text-sm">
                Please enter your details to get started
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* Name fields */}
              <div className="flex gap-4">
                <div className="flex-1 group">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstname", { required: true })}
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 focus:bg-gray-900 transition-all duration-200 hover:border-gray-600/70"
                  />
                </div>
                <div className="flex-1 group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastname", { required: true })}
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 focus:bg-gray-900 transition-all duration-200 hover:border-gray-600/70"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="group">
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  {...register("email", { required: true })}
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 focus:bg-gray-900 transition-all duration-200 hover:border-gray-600/70"
                />
              </div>

              {/* Password field */}
              <div className="group">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 focus:bg-gray-900 transition-all duration-200 hover:border-gray-600/70"
                />
              </div>

              {/* Country and phone */}
              <div className="flex gap-4">
                <div className="w-2/5 group">
                  <input
                    type="text"
                    placeholder="Country"
                    {...register("country", { required: true })}
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 focus:bg-gray-900 transition-all duration-200 hover:border-gray-600/70"
                  />
                </div>
                <div className="flex-1 group">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("mobile", { required: true })}
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 focus:bg-gray-900 transition-all duration-200 hover:border-gray-600/70"
                  />
                </div>
              </div>

              {/* Submit CustomButton */}
              <CustomButton
                type="submit"
                className="w-full mt-3 h-12 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-950 active:scale-[0.99] shadow-lg shadow-white/5"
              >
                Continue
              </CustomButton>

              <p className="text-center text-gray-500 text-xs mt-2">
                By continuing, you agree to our Terms of Service
              </p>
               <span className="flex gap-2 w-full justify-center text-center text-slate-500 text-xs mt-2">
                <span>Already have an account?</span>
                <Link
                className="text-blue-400"
                to="/login">sign in</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
