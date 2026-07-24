"use client";

import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiSave } from "react-icons/fi";

export default function CreatePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Page</h1>
        <p className="text-gray-500 mt-2">
          Add a new page to your website.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>

          <input
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="About Us"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Slug
          </label>

          <input
            {...register("slug", {
              required: "Slug is required",
            })}
            placeholder="about"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">
              {errors.slug.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter page description..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
          >
            <FiSave />
            Save Page
          </button>
        </div>
      </form>
    </div>
  );
}
