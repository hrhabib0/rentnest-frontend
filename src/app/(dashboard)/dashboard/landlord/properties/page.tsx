import PropertyTable from "@/components/dashboard/landlord/PropertyTable";
// import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import { getMyProperties } from "@/services/property/properties";


export default async function MyPropertiesPage() {
    const response = await getMyProperties();
    console.log(response)

    if (!response.success) {
        return (
            <div className="rounded-xl border p-8 text-center">
                {response.message}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* <DashboardHeader
            /> */}

            <PropertyTable
                properties={response.data}
            />
            <div>My property page</div>
        </div>
    );
}