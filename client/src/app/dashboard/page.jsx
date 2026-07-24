import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        <StatCard title="Total Pages" value="5" />
        <StatCard title="Published Pages" value="4" />
        <StatCard title="Total Sections" value="18" />
      </div>
    </>
  );
}