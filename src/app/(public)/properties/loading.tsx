import PropertySkeleton from "@/components/property/PropertySkeleton";

export default function Loading() {
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="mb-10">
                <div className="h-10 w-72 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-5 w-96 animate-pulse rounded bg-muted" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <PropertySkeleton key={index} />
                ))}
            </div>
        </section>
    );
}