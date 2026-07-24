export default function CardsSection({ data }) {
  const cards = data.content?.cards || [];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}