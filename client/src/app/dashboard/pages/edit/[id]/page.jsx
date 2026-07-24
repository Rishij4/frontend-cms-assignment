"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageById, updatePage } from "@/redux/pageSlice";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { 
  FiEdit3, 
  FiArrowLeft, 
  FiFileText, 
  FiLink, 
  FiAlignLeft, 
  FiSave,
  FiLoader 
} from "react-icons/fi";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentPage, loading } = useSelector((state) => state.pages);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm();

  useEffect(() => {
    dispatch(fetchPageById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPage) {
      reset(currentPage);
    }
  }, [currentPage, reset]);

  const submit = async (data) => {
    try {
      await dispatch(updatePage({ id, data })).unwrap();
      toast.success("Page updated successfully");
      router.push("/dashboard/pages");
    } catch (error) {
      toast.error(error || "Failed to update page");
    }
  };

  if (loading && !currentPage) {
    return (
      <div className="flex justify-center items-center py-32">
        <FiLoader className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/pages")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="Back to Pages"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Edit Page
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Modify page details, meta content, and route slugs.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 space-y-6"
      >
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiFileText className="text-indigo-600 w-4 h-4" />
            Page Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. Home Page"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1.5">{errors.title.message}</p>
          )}
        </div>

        {/* Slug Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiLink className="text-indigo-600 w-4 h-4" />
            URL Slug <span className="text-red-500">*</span>
          </label>
          <input
            {...register("slug", { required: "Slug is required" })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. /home"
          />
          {errors.slug && (
            <p className="text-red-500 text-xs mt-1.5">{errors.slug.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiAlignLeft className="text-indigo-600 w-4 h-4" />
            Description / Meta
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Brief page description or metadata..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-75 cursor-pointer text-sm"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin w-5 h-5" />
                Updating...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Update Page
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}