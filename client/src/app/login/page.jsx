"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAdmin } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {  
  FiGrid, 
  FiLoader 
} from "react-icons/fi";
import { useEffect } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.replace("/dashboard");
  }
}, [router]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginAdmin(data));

    if (loginAdmin.fulfilled.match(result)) {
      toast.success("Login Successful");
      router.push("/dashboard");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-1">
            <FiGrid className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            CMS Admin
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400 flex items-center pointer-events-none">
              </span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="admin@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all block"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400 flex items-center pointer-events-none">
              </span>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all block"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-sm disabled:opacity-75 cursor-pointer text-sm mt-2"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin w-5 h-5" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}