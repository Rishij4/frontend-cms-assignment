"use client";

import { FiBell, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully");

    router.replace("/login");
  };

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-xs">
      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition"
        >
          <FiBell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="ml-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}