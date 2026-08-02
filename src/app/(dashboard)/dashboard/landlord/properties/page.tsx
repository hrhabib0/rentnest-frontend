import PropertyTable from "@/components/dashboard/landlord/PropertyTable";
import { Button } from "@/components/ui/button";
// import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import { getMyProperties } from "@/services/property/properties";
import Link from "next/link";


export default async function MyPropertiesPage() {
    const response = await getMyProperties();


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
            <div className="flex justify-between">
                <div>My property page</div>
                <Button>
                    <Link href="/dashboard/landlord/properties/create">
                        Add Property
                    </Link>
                </Button>
            </div>
            <PropertyTable
                properties={response.data}
            />

        </div>
    );
}