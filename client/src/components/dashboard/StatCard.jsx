export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between transition-all hover:shadow-md">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h3>

      <p className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
        {value}
      </p>
    </div>
  );
}