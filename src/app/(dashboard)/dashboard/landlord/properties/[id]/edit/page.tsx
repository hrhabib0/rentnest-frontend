import PropertyForm from "@/components/property/PropertyForm";
import { getCategories } from "@/services/category/catergories";
import { getPropertyById } from "@/services/property/properties";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditPropertyPage({
    params,
}: Props) {
    const { id } = await params;

    const [propertyRes, categoryRes] =
        await Promise.all([
            getPropertyById(id),
            getCategories(),
        ]);

    if (!propertyRes.success) {
        notFound();
    }

    return (
        <div className="space-y-8">
            {/* <DashboardHeading
                title="Edit Property"
                description="Update your property information."
            /> */}

            <PropertyForm
                mode="edit"
                property={propertyRes.data}
                categories={categoryRes.data}
            />
        </div>
    );
}