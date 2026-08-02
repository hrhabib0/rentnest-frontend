import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
import RentalRequestTable from "@/components/rental/RentalRequestTable";
import { getMyRentalRequests } from "@/services/rental/rentalRequest";



export default async function MyRequestsPage() {
    const response = await getMyRentalRequests();

    const requests = response.data ?? [];

    return (
        <div className="space-y-8">
            <DashboardHeading
                title="My Rental Requests"
                description="Track the status of all your rental requests."
            />

            {requests.length === 0 ? (
                <div className="font-bold text-red-600 text-center">You have no request right now</div>
            ) : (
                <RentalRequestTable requests={requests} />
            )}
        </div>
    );
}