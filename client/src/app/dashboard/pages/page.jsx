"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages, deletePage } from "@/redux/pageSlice";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { 
  FiFileText, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiLoader 
} from "react-icons/fi";

export default function PagesPage() {
  const dispatch = useDispatch();

  const { pages, loading } = useSelector(
    (state) => state.pages
  );

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <FiLoader className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pages
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your website structure, routes, and publishing status.
          </p>
        </div>

        <Link
          href="/dashboard/pages/create"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm text-sm"
        >
          <FiPlus className="w-5 h-5" />
          Add Page
        </Link>
      </div>

      {/* Table Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {pages.length > 0 ? (
                pages.map((page) => (
                  <tr key={page._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <FiFileText className="w-4 h-4" />
                      </div>
                      {page.title}
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-mono text-xs">{page.slug}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          page.isPublished
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : "bg-amber-50 text-amber-700 border border-amber-200/50"
                        }`}
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/dashboard/pages/edit/${page._id}`}
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Page"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Page"
                          onClick={async () => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this page?"
                            );

                            if (!confirmDelete) return;

                            try {
                              await dispatch(deletePage(page._id)).unwrap();
                              toast.success("Page deleted successfully");
                            } catch (error) {
                              toast.error(error || "Failed to delete page");
                            }
                          }}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p className="font-medium text-gray-900">No pages found</p>
                    <p className="text-xs text-gray-400 mt-1">Get started by creating a new page.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}