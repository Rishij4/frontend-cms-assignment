"use client";

import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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

    toast.success("Page Created");

    router.push("/dashboard/pages");
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to create page"
    );
  }
};

  return (

    <form
      onSubmit={handleSubmit(submit)}
      className="bg-white p-8 rounded shadow space-y-5"
    >

      <input
  {...register("title", {
    required: "Title is required",
  })}
  className="border w-full p-3 rounded-lg"
/>

{errors.title && (
  <p className="text-red-500 text-sm mt-1">
    {errors.title.message}
  </p>
)}

      <input
  {...register("slug", {
    required: "Slug is required",
  })}
  className="border w-full p-3 rounded-lg"
/>

{errors.slug && (
  <p className="text-red-500 text-sm mt-1">
    {errors.slug.message}
  </p>
)}

      <textarea
  {...register("description", {
    required: "Description is required",
  })}
  className="border w-full p-3 rounded-lg"
/>

{errors.description && (
  <p className="text-red-500 text-sm mt-1">
    {errors.description.message}
  </p>
)}

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Save
      </button>

    </form>

  );

}