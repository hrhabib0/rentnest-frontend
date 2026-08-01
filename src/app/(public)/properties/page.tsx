import EmptyProperty from "@/components/property/EmptyProperty";
import PropertyGrid from "@/components/property/PropertyGrid";
import { getProperties } from "@/services/properties";

export default async function PropertiesPage() {
    const result = await getProperties();
    const properties = result?.data ?? [];
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold">
                    Browse Rental Properties
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Discover apartments, villas and homes that
                    match your lifestyle.
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Available Properties
                </h2>

                <span className="text-sm text-muted-foreground">
                    {properties.length} Properties
                </span>
            </div>

            {properties.length > 0 ? (
                <PropertyGrid properties={properties} />
            ) : (
                <EmptyProperty />
            )}
        </section>
    );
}