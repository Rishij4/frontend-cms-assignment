"use client";

import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiSave, FiFileText, FiLink, FiAlignLeft, FiLoader } from "react-icons/fi";

export default function CreatePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submit = async (data) => {
    try {
      await api.post("/pages", data);

      toast.success("Page created successfully");

      router.push("/dashboard/pages");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create page"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Page</h1>
        <p className="text-sm text-gray-500 mt-1">
          Add a new page to your website.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiFileText className="text-indigo-600 w-4 h-4" />
            Title <span className="text-red-500">*</span>
          </label>

          <input
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="About Us"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          {errors.title && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiLink className="text-indigo-600 w-4 h-4" />
            Slug <span className="text-red-500">*</span>
          </label>

          <input
            {...register("slug", {
              required: "Slug is required",
            })}
            placeholder="about"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          {errors.slug && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.slug.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiAlignLeft className="text-indigo-600 w-4 h-4" />
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter page description..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          {errors.description && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-75 cursor-pointer text-sm"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin w-5 h-5" />
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Save Page
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
