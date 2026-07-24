import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function ContactSection({ data }) {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
        {data.title}
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl mx-auto space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiMapPin className="w-5 h-5 mt-0.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Address
            </h4>
            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
              {data.content?.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiMail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Email
            </h4>
            <a 
              href={`mailto:${data.content?.email}`}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
            >
              {data.content?.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiPhone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Phone
            </h4>
            <a 
              href={`tel:${data.content?.phone}`}
              className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors"
            >
              {data.content?.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}