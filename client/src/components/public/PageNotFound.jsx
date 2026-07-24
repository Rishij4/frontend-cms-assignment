"use client";

import { useRouter } from "next/navigation";

export default function PageNotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-red-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>

        <button
          onClick={() => router.back()}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}