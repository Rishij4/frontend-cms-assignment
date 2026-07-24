export default function RichTextSection({ data }) {
  const content = data.content || {};

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        {data.title}
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-base leading-relaxed text-gray-600 whitespace-pre-wrap">
        {content.body}
      </div>
    </section>
  );
}