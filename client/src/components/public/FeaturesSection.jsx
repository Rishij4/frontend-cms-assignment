import { FiCheckCircle } from "react-icons/fi";

export default function FeaturesSection({ data }) {
  const features = data.content?.features || [];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center group"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-5 group-hover:scale-110 transition-transform">
              <FiCheckCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              {feature}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}