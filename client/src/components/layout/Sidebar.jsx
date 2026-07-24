"use client";

import Link from "next/link";
import { 
  FiGrid, 
  FiFileText, 
  FiLayers, 
  FiImage 
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col justify-between border-r border-slate-800">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-sm">
            <FiGrid className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            CMS Admin
          </h2>
        </div>

        <nav className="space-y-1.5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <FiGrid className="w-4 h-4 text-slate-400" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/pages"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <FiFileText className="w-4 h-4 text-slate-400" />
            Pages
          </Link>

          <Link
            href="/dashboard/sections"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <FiLayers className="w-4 h-4 text-slate-400" />
            Sections
          </Link>

          <Link
            href="/dashboard/media"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <FiImage className="w-4 h-4 text-slate-400" />
            Media
          </Link>
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-800/80 px-2">
        <p className="text-xs text-slate-500 font-medium">
          v1.0.0 • CMS Dashboard
        </p>
      </div>
    </aside>
  );
}