import RentalRequestTable from "@/components/rental/RentalRequestTable";
import { getMyRentalRequests } from "@/services/rental/rentalRequest";



export default async function MyRequestsPage() {
    const response = await getMyRentalRequests();

    const requests = response.data ?? [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    My Rental Requests
                </h1>

                <p className="text-muted-foreground">
                    Track the status of all your rental requests.
                </p>
            </div>

            {requests.length === 0 ? (
                <div className="font-bold text-red-600 text-center">You have no request right now</div>
            ) : (
                <RentalRequestTable requests={requests} />
            )}
        </div>
    );
}