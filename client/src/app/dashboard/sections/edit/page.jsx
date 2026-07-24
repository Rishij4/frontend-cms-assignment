"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { 
  FiLayers, 
  FiLayout, 
  FiArrowLeft,
  FiSave,
  FiLoader 
} from "react-icons/fi";

import {
  fetchSectionById,
  updateSection,
} from "@/redux/sectionSlice";

import { fetchPages } from "@/redux/pageSlice";

export default function EditSection() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [sectionType, setSectionType] = useState("hero");

  const { currentSection, loading } = useSelector(
    (state) => state.sections
  );

  const { pages } = useSelector(
    (state) => state.pages
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchSectionById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentSection) {
      setSectionType(currentSection.type || "hero");
      reset({
        page: currentSection.page?._id || currentSection.page,
        title: currentSection.title,
        type: currentSection.type,
        order: currentSection.order,
        isVisible: currentSection.isVisible,
        heading: currentSection.content?.heading || "",
        subHeading: currentSection.content?.subHeading || "",
        buttonText: currentSection.content?.buttonText || "",
        buttonLink: currentSection.content?.buttonLink || "",
      });
    }
  }, [currentSection, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateSection({
          id,
          data: {
            page: data.page,
            title: data.title,
            type: data.type,
            order: Number(data.order),
            isVisible: data.isVisible,
            content: {
              heading: data.heading,
              subHeading: data.subHeading,
              buttonText: data.buttonText,
              buttonLink: data.buttonLink,
            },
          },
        })
      ).unwrap();

      toast.success("Section Updated");
      router.push("/dashboard/sections");
    } catch (err) {
      toast.error(err || "Update Failed");
    }
  };

  if (loading && !currentSection) {
    return (
      <div className="flex justify-center items-center py-32">
        <FiLoader className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/sections")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
            title="Back to Sections"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
              Edit Section
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Modify structural layout components and content for this section.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* General Settings Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiLayout className="text-indigo-600" />
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Page Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Page <span className="text-red-500">*</span>
              </label>
              <select
                {...register("page", {
                  required: "Please select a page",
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              >
                {pages.map((page) => (
                  <option
                    key={page._id}
                    value={page._id}
                  >
                    {page.title}
                  </option>
                ))}
              </select>
              {errors.page && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.page.message}
                </p>
              )}
            </div>

            {/* Section Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", {
                  required: "Section title is required",
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Section Title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Configuration Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiLayers className="text-indigo-600" />
            Content Configuration (HERO)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <input
                {...register("heading", {
                  required: sectionType === "hero" ? "Heading is required" : false,
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Heading"
              />
              {errors.heading && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.heading.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Heading
              </label>
              <input
                {...register("subHeading", {
                  required: sectionType === "hero" ? "Sub Heading is required" : false,
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Sub Heading"
              />
              {errors.subHeading && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.subHeading.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  {...register("buttonText", {
                    required: sectionType === "hero" ? "Button Text is required" : false,
                  })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="Button Text"
                />
                {errors.buttonText && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.buttonText.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  {...register("buttonLink", {
                    required: sectionType === "hero" ? "Button Link is required" : false,
                  })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="Button Link"
                />
                {errors.buttonLink && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.buttonLink.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-75 cursor-pointer text-sm"
          >
            {isSubmitting || loading ? (
              <>
                <FiLoader className="animate-spin w-5 h-5" />
                Updating...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Update Section
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}