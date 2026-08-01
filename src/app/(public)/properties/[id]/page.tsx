import { notFound } from "next/navigation";

import PropertyAmenities from "@/components/property/PropertyAmenities";
import PropertyCTA from "@/components/property/PropertyCTA";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInfo from "@/components/property/PropertyInfo";
import PropertyLandlord from "@/components/property/PropertyLandlord";
import { getPropertyById } from "@/services/properties";



type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function PropertyDetailsPage({
    params,
}: Props) {
    const { id } = await params;

    const result = await getPropertyById(id);

    if (!result?.success || !result.data) {
        notFound();
    }

    const property = result.data;

    return (
        <section className="container mx-auto space-y-10 px-4 py-10">
            <PropertyGallery
                images={property.imageUrls}
                title={property.title}
            />

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="space-y-10 lg:col-span-2">
                    <PropertyInfo property={property} />

                    <PropertyAmenities
                        amenities={property.amenities}
                    />

                    <PropertyLandlord
                        landlord={property.landlord}
                    />
                </div>

                <PropertyCTA
                    id={property.id}
                    rent={property.monthlyRent}
                    status={property.status}
                />
            </div>
        </section>
    );
}