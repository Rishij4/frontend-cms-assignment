import { FiHelpCircle } from "react-icons/fi";

export default function FAQSection({ data }) {
  const content = data.content || {};

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
        {data.title || "Frequently Asked Questions"}
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <FiHelpCircle className="w-5 h-5 mt-0.5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {content.question}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {content.answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}