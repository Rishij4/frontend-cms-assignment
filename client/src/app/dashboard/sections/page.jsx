"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections, deleteSection } from "@/redux/sectionSlice";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FiLayers, FiPlus, FiEdit2, FiTrash2, FiLoader } from "react-icons/fi";

export default function SectionsPage() {
  const dispatch = useDispatch();

  const { sections, loading } = useSelector(
    (state) => state.sections
  );

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this section?"
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteSection(id)).unwrap();
      toast.success("Section deleted successfully");
    } catch (err) {
      toast.error(err || "Failed to delete section");
    }
  };

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
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
            Sections
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage, arrange, and organize structural components across your pages.
          </p>
        </div>

        <Link
          href="/dashboard/sections/create"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm text-sm"
        >
          <FiPlus className="w-5 h-5" />
          Add Section
        </Link>
      </div>

      {/* Table Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Page</th>
                <th className="py-4 px-6">Order</th>
                <th className="py-4 px-6">Visible</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {sections.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-500">
                    <FiLayers className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p className="font-medium text-gray-900">No sections found</p>
                    <p className="text-xs text-gray-400 mt-1">Get started by creating a new section.</p>
                  </td>
                </tr>
              ) : (
                sections.map((section) => (
                  <tr
                    key={section._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <FiLayers className="w-4 h-4" />
                      </div>
                      {section.title}
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 uppercase">
                        {section.type}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-gray-600">{section.page?.title || "—"}</td>

                    <td className="py-4 px-6 font-mono text-xs text-gray-500">#{section.order}</td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          section.isVisible
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : "bg-gray-100 text-gray-600 border border-gray-200/50"
                        }`}
                      >
                        {section.isVisible ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/dashboard/sections/edit/${section._id}`}
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Section"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(section._id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Section"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}