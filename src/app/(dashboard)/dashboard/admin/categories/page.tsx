import CategoriesTable from "@/components/dashboard/admin/categories/CategoriesTable";
import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
import { getCategories } from "@/services/category/catergories";


export default async function CategoriesPage() {
    const result = await getCategories();

    const categories = result.data || [];

    return (
        <div className="space-y-6">
            <DashboardHeading
                title="Categories"
                description="Manage property categories."
            />

            <CategoriesTable categories={categories} />
        </div>
    );
}