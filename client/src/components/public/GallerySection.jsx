export default function GallerySection({ data }) {
  const images = data.content?.images || [];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 tracking-tight">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-gray-50 h-72"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL.replace("/api", "")}${image}`}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
