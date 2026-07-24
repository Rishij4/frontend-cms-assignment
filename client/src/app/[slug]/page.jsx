import SectionRenderer from "@/components/public/SectionRenderer";
import PageNotFound from "@/components/public/PageNotFound";

export default async function PublicPage({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/${slug}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!result.success) {
    return <PageNotFound />;
  }

  const page = result.data;
  const sections = page.sections || [];

  return (
    <main>
      {sections.length > 0 ? (
        sections.map((section) => (
          <SectionRenderer
            key={section._id}
            section={section}
          />
        ))
      ) : (
        <div className="text-center py-20 text-gray-500 text-xl">
          No sections available for this page.
        </div>
      )}
    </main>
  );
}