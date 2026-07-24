export default function HeroSection({ data }) {
  const content = data.content || {};

  return (
    <section className="relative h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      {content.image && (
        <img
          src={`http://localhost:5000${content.image}`}
          alt={content.heading || "Hero Image"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
          {content.heading}
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-200 font-normal max-w-2xl leading-relaxed">
          {content.subHeading}
        </p>

        {content.buttonText && (
          <a
            href={content.buttonLink || "#"}
            className="mt-10 inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}