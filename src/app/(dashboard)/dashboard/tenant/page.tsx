import {
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import StatsCard from "@/components/dashboard/shared/StatsCard";
import { getMyRentalRequests } from "@/services/rental/rentalRequest";
import RentalRequestTable from "@/components/rental/RentalRequestTable";


export default async function TenantDashboard() {
    const response = await getMyRentalRequests();

    const requests = response.data ?? [];

    const stats = requests.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: { pending: number; approved: number; rejected: number }, request: any) => {
            switch (request.status) {
                case "PENDING":
                    acc.pending++;
                    break;
                case "APPROVED":
                    acc.approved++;
                    break;
                case "REJECTED":
                    acc.rejected++;
                    break;
            }

            return acc;
        },
        {
            pending: 0,
            approved: 0,
            rejected: 0,
        }
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="text-muted-foreground">
                    Here&apos;s an overview of your rental requests.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <StatsCard
                    title="Pending Requests"
                    value={stats.pending}
                    icon={Clock3}
                />

                <StatsCard
                    title="Approved Requests"
                    value={stats.approved}
                    icon={CheckCircle2}
                />

                <StatsCard
                    title="Rejected Requests"
                    value={stats.rejected}
                    icon={XCircle}
                />
            </div>
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Recent Rental Requests
                </h2>

                <RentalRequestTable
                    requests={requests}
                />
            </div>
        </div>
    );
}