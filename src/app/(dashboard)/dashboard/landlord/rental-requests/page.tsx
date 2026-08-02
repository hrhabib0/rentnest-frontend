import RentalRequestsTable from "@/components/dashboard/landlord/RentalRequestTable";
import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
import { getReceivedRentalRequests } from "@/services/rental/rentalRequest";


export default async function RentalRequestsPage() {

    const response = await getReceivedRentalRequests();

    if (!response.success) {
        return (
            <div className="rounded-lg border p-6 text-center">
                <p className="text-muted-foreground">
                    {response.message}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <DashboardHeading
                title="Rental Request"
                description="Manage your all rental request of your properties."
            />
            <RentalRequestsTable
                requests={response.data}
            />
        </div>
    );
}