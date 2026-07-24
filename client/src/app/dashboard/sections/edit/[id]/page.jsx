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
      setSectionType(currentSection.type);

      reset({
        page:
          currentSection.page?._id ||
          currentSection.page,

        title: currentSection.title,
        type: currentSection.type,
        order: currentSection.order,
        isVisible: currentSection.isVisible,

        heading:
          currentSection.content?.heading || "",

        subHeading:
          currentSection.content?.subHeading || "",

        buttonText:
          currentSection.content?.buttonText || "",

        buttonLink:
          currentSection.content?.buttonLink || "",
        image:
          currentSection.content?.image || "",
        body:
          currentSection.content?.body || "",
        question: currentSection.content?.question || "",
        answer: currentSection.content?.answer || "",
        image1: currentSection.content?.images?.[0] || "",
        image2: currentSection.content?.images?.[1] || "",
        image3: currentSection.content?.images?.[2] || "",
        card1Title:
          currentSection.content?.cards?.[0]?.title || "",

        card1Description:
          currentSection.content?.cards?.[0]?.description || "",

        card2Title:
          currentSection.content?.cards?.[1]?.title || "",

        card2Description:
          currentSection.content?.cards?.[1]?.description || "",

        card3Title:
          currentSection.content?.cards?.[2]?.title || "",

        card3Description:
          currentSection.content?.cards?.[2]?.description || "",
        feature1: currentSection.content?.features?.[0] || "",
        feature2: currentSection.content?.features?.[1] || "",
        feature3: currentSection.content?.features?.[2] || "",

        address: currentSection.content?.address || "",
        email: currentSection.content?.email || "",
        phone: currentSection.content?.phone || "",
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

            content:
              data.type === "hero"
                ? {
                    heading: data.heading,
                    subHeading: data.subHeading,
                    buttonText: data.buttonText,
                    buttonLink: data.buttonLink,
                    image: data.image,
                  }

                : data.type === "richtext"
                ? {
                    body: data.body,
                  }

                : data.type === "faq"
                ? {
                    question: data.question,
                    answer: data.answer,
                  }

                : data.type === "gallery"
                ? {
                    images: [
                      data.image1,
                      data.image2,
                      data.image3,
                    ].filter(Boolean),
                  }

                : data.type === "cards"
                ? {
                    cards: [
                      {
                        title: data.card1Title,
                        description: data.card1Description,
                      },
                      {
                        title: data.card2Title,
                        description: data.card2Description,
                      },
                      {
                        title: data.card3Title,
                        description: data.card3Description,
                      },
                    ].filter(card => card.title),
                  }

                : data.type === "features"
                ? {
                    features: [
                      data.feature1,
                      data.feature2,
                      data.feature3,
                    ].filter(Boolean),
                  }

                : data.type === "contact"
                ? {
                    address: data.address,
                    email: data.email,
                    phone: data.phone,
                  }

                : {},
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
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          {/* Section Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("type")}
              onChange={(e) =>
                setSectionType(e.target.value)
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
            >
              <option value="hero">Hero</option>
              <option value="richtext">Rich Text</option>
              <option value="faq">FAQ</option>
              <option value="gallery">Gallery</option>
              <option value="cards">Cards</option>
              <option value="features">Features</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>

        {/* Dynamic Content Configuration Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiLayers className="text-indigo-600" />
            Content Configuration ({sectionType.toUpperCase()})
          </h2>

          {sectionType === "hero" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                <input
                  {...register("heading", {
                    required: sectionType === "hero" ? "Heading is required" : false,
                  })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                {errors.heading && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.heading.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub Heading</label>
                <input
                  {...register("subHeading", {
                    required: sectionType === "hero" ? "Sub Heading is required" : false,
                  })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                {errors.subHeading && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.subHeading.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <input
                    {...register("buttonText", {
                      required: sectionType === "hero" ? "Button Text is required" : false,
                    })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  />
                  {errors.buttonText && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.buttonText.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <input
                    {...register("buttonLink", {
                      required: sectionType === "hero" ? "Button Link is required" : false,
                    })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  />
                  {errors.buttonLink && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.buttonLink.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                <input
                  {...register("image", {
                    required: sectionType === "hero" ? "Hero image is required" : false,
                  })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="/uploads/example.jpg"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {sectionType === "richtext" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                {...register("body", {
                  required: sectionType === "richtext" ? "Content is required" : false,
                })}
                rows={8}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Write your content..."
              />
              {errors.body && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.body.message}
                </p>
              )}
            </div>
          )}

          {sectionType === "faq" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <input
                  {...register("question", {
                    required: sectionType === "faq" ? "Question is required" : false,
                  })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                {errors.question && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.question.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                <textarea
                  {...register("answer", {
                    required: sectionType === "faq" ? "Answer is required" : false,
                  })}
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                {errors.answer && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.answer.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {sectionType === "gallery" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image 1 URL</label>
                <input 
                  {...register("image1", {
                    required: sectionType === "gallery" ? "Image 1 is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.image1 && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.image1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image 2 URL</label>
                <input 
                  {...register("image2", {
                    required: sectionType === "gallery" ? "Image 2 is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.image2 && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.image2.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image 3 URL</label>
                <input 
                  {...register("image3", {
                    required: sectionType === "gallery" ? "Image 3 is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.image3 && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.image3.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {sectionType === "cards" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Card 1</h3>
                <div>
                  <input 
                    {...register("card1Title", {
                      required: sectionType === "cards" ? "Card 1 title is required" : false,
                    })} 
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                  />
                  {errors.card1Title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.card1Title.message}
                    </p>
                  )}
                </div>
                <div>
                  <textarea {...register("card1Description")} rows={3} className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Card 2</h3>
                <div>
                  <input 
                    {...register("card2Title", {
                      required: sectionType === "cards" ? "Card 2 title is required" : false,
                    })} 
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                  />
                  {errors.card2Title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.card2Title.message}
                    </p>
                  )}
                </div>
                <div>
                  <textarea {...register("card2Description")} rows={3} className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Card 3</h3>
                <div>
                  <input 
                    {...register("card3Title", {
                      required: sectionType === "cards" ? "Card 3 title is required" : false,
                    })} 
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                  />
                  {errors.card3Title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.card3Title.message}
                    </p>
                  )}
                </div>
                <div>
                  <textarea {...register("card3Description")} rows={3} className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {sectionType === "features" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature 1</label>
                <input 
                  {...register("feature1", {
                    required: sectionType === "features" ? "Feature 1 is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.feature1 && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.feature1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature 2</label>
                <input 
                  {...register("feature2", {
                    required: sectionType === "features" ? "Feature 2 is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.feature2 && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.feature2.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature 3</label>
                <input 
                  {...register("feature3", {
                    required: sectionType === "features" ? "Feature 3 is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.feature3 && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.feature3.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {sectionType === "contact" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  {...register("address", {
                    required: sectionType === "contact" ? "Address is required" : false,
                  })} 
                  rows={3} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  {...register("email", {
                    required: sectionType === "contact" ? "Email is required" : false,
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  {...register("phone", {
                    required: sectionType === "contact" ? "Phone number is required" : false,
                  })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Publish Settings Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Publish Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                {...register("order", {
                  required: "Display order is required",
                  min: {
                    value: 1,
                    message: "Display order must be at least 1",
                  },
                  valueAsNumber: true,
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />
              {errors.order && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.order.message}
                </p>
              )}
            </div>

            <div className="flex items-center h-full pt-6">
              <label className="relative flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("isVisible")}
                  className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">Visible on live site</span>
              </label>
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