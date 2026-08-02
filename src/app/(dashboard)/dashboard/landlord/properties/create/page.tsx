// import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
import PropertyForm from "@/components/property/PropertyForm";
import { getCategories } from "@/services/category/catergories";



export default async function CreatePropertyPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-8">
            {/* <DashboardHeading
                title="Create Property"
                description="Add a new property for rent."
            /> */}

            <PropertyForm
                mode="create"
                categories={categories.data}
            />
        </div>
    );
}