"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { toast } from "react-hot-toast";
import { FiUpload, FiTrash2, FiImage, FiLoader } from "react-icons/fi";

export default function MediaPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadImages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/media");
      setImages(res.data.data);
    } catch (err) {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      await api.post("/media/upload", formData);
      toast.success("Image uploaded successfully");
      loadImages();
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await api.delete(`/media/${id}`);
      toast.success("Image deleted");
      loadImages();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Media Library
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and upload your website assets and images.
          </p>
        </div>

        {/* Custom Upload Button */}
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={uploadImage}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm cursor-pointer ${
              uploading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <>
                <FiLoader className="animate-spin w-5 h-5" />
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="w-5 h-5" />
                Upload Image
              </>
            )}
          </label>
        </div>
      </div>

      {/* Content Section */}
      {loading && images.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <FiLoader className="animate-spin w-8 h-8 text-indigo-600" />
        </div>
      ) : images.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <FiImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No images found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading your first image.</p>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-100 h-48">
                <img
  src={`${process.env.NEXT_PUBLIC_API_URL.replace("/api", "")}${img.url}`}
  alt="Media asset"
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>
              </div>

              <button
                onClick={() => deleteImage(img._id)}
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-xl transition-colors text-sm"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
