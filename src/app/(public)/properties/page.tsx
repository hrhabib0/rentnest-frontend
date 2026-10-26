
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    House,
    Search,
    ShieldCheck,
} from "lucide-react";

import EmptyProperty from "@/components/property/EmptyProperty";
import PropertyGrid from "@/components/property/PropertyGrid";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/services/property/properties";
import PropertiesBanner from "@/components/property/PropertiesBanner";

export default async function PropertiesPage() {
    const result = await getProperties();
    const properties = result?.data ?? [];

    return (
        <main className="min-h-screen bg-background">
            {/* Property introduction banner */}
            <PropertiesBanner properties={properties} />

            {/* Property listing */}
            <section
                id="available-properties"
                className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
            >
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                            Explore RentNest
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                            Available properties
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Find a rental that feels right for you.
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                            {properties.length}{" "}
                            {properties.length === 1 ? "property" : "properties"}
                        </span>

                        <Button
                            nativeButton={false}
                            variant="outline"
                            className="rounded-full"
                            render={<Link href="/" />}
                        >
                            Home
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>

                {properties.length > 0 ? (
                    <PropertyGrid properties={properties} />
                ) : (
                    <EmptyProperty />
                )}
            </section>
        </main>
    );
}
