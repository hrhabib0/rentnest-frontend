
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, House } from "lucide-react";

import PropertyAmenities from "@/components/property/PropertyAmenities";
import PropertyCTA from "@/components/property/PropertyCTA";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInfo from "@/components/property/PropertyInfo";
import PropertyLandlord from "@/components/property/PropertyLandlord";
import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/services/property/properties";
import { getMe } from "@/services/auth";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function PropertyDetailsPage({ params }: Props) {
    const { id } = await params;

    const [user, result] = await Promise.all([
        getMe(),
        getPropertyById(id),
    ]);

    if (!result?.success || !result.data) {
        notFound();
    }

    const property = result.data;
    const userRole = user?.data?.role;

    return (
        <main className="min-h-screen bg-background">
            {/* Breadcrumb and page introduction */}
            <section className="border-b border-border/70 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                    >
                        <Link
                            href="/"
                            className="transition-colors hover:text-primary"
                        >
                            Home
                        </Link>

                        <ChevronRight className="size-4" />

                        <Link
                            href="/properties"
                            className="transition-colors hover:text-primary"
                        >
                            Properties
                        </Link>

                        <ChevronRight className="size-4" />

                        <span
                            aria-current="page"
                            className="max-w-[180px] truncate font-medium text-foreground sm:max-w-xs"
                        >
                            {property.title}
                        </span>
                    </nav>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                                <House className="size-4" />
                                Explore RentNest
                            </div>

                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Property details
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                Explore the property, review its amenities, and learn
                                more about the landlord before making your decision.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            className="w-fit rounded-full"
                            render={<Link href="/properties" />}
                        >
                            <ArrowLeft className="size-4" />
                            All properties
                        </Button>
                    </div>
                </div>
            </section>

            {/* Property content */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="space-y-8 sm:space-y-10">
                    <PropertyGallery
                        images={property.imageUrls}
                        title={property.title}
                    />

                    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_380px]">
                        <div className="min-w-0 space-y-8 sm:space-y-10">
                            <PropertyInfo property={property} />

                            <div className="border-t border-border/70 pt-8">
                                <PropertyAmenities amenities={property.amenities} />
                            </div>

                            <div className="border-t border-border/70 pt-8">
                                <PropertyLandlord landlord={property.landlord} />
                            </div>
                        </div>

                        <aside className="min-w-0 lg:sticky lg:top-24">
                            <PropertyCTA
                                id={property.id}
                                rent={property.monthlyRent}
                                status={property.status}
                                userRole={userRole}
                            />
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
