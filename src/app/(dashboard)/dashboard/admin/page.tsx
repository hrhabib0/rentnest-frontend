import PropertyStatusChart from "@/components/dashboard/admin/charts/PropertyStatusChart";
import RentalRequestsChart from "@/components/dashboard/admin/charts/RentalRequestsChart";
import RentalRequestStatusChart from "@/components/dashboard/admin/charts/RentalRequestStatusChart";
import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
import StatsCard from "@/components/dashboard/shared/StatsCard";
import { getDashboardStats } from "@/services/admin/admin";

import {
    Building2,
    CheckCircle2,
    FileText,
    House,
    Users,
    Wallet,
    Clock3,
    KeyRound,
} from "lucide-react";

export default async function AdminDashboardPage() {
    const result = await getDashboardStats();
    const stats = result.data;

    const totalRevenue = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(Number(stats.totalRevenue) || 0);

    return (
        <div className="space-y-8 pb-8">
            <DashboardHeading
                title="Admin Dashboard"
                description="Monitor platform performance, property listings, rental requests, and payment activity."
            />

            {/* Charts */}
            <section>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <RentalRequestsChart
                        data={stats.rentalRequestsByMonth}
                    />

                    <PropertyStatusChart
                        data={stats.propertyStatusBreakdown}
                    />

                    <div className="xl:col-span-2">
                        <RentalRequestStatusChart
                            data={stats.rentalRequestStatusBreakdown}
                        />
                    </div>
                </div>
            </section>
            {/* Platform overview */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <House className="size-4" aria-hidden="true" />
                    </div>

                    <div>
                        <h2 className="font-semibold tracking-tight text-foreground">
                            Platform Overview
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            A summary of your rental platform.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatsCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={Users}
                        description="Registered platform users"
                        tone="blue"
                    />

                    <StatsCard
                        title="Total Properties"
                        value={stats.totalProperties}
                        icon={Building2}
                        description="Properties listed on RentNest"
                        tone="green"
                    />

                    <StatsCard
                        title="Rental Requests"
                        value={stats.totalRentalRequests}
                        icon={FileText}
                        description="All rental requests"
                        tone="violet"
                    />

                    <StatsCard
                        title="Total Revenue"
                        value={totalRevenue}
                        icon={Wallet}
                        description="Recorded platform revenue"
                        tone="amber"
                    />
                </div>
            </section>

            {/* Operational statistics */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <KeyRound className="size-4" aria-hidden="true" />
                    </div>

                    <div>
                        <h2 className="font-semibold tracking-tight text-foreground">
                            Property & Payment Operations
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Current property availability and transaction progress.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatsCard
                        title="Available Properties"
                        value={stats.availableProperties}
                        icon={House}
                        description="Currently available for rent"
                        tone="green"
                    />

                    <StatsCard
                        title="Rented Properties"
                        value={stats.rentedProperties}
                        icon={KeyRound}
                        description="Properties marked as rented"
                        tone="blue"
                    />

                    <StatsCard
                        title="Pending Requests"
                        value={stats.pendingRequests}
                        icon={Clock3}
                        description="Requests awaiting a decision"
                        tone="amber"
                    />

                    <StatsCard
                        title="Completed Payments"
                        value={stats.totalPayments}
                        icon={CheckCircle2}
                        description="Recorded completed payments"
                        tone="violet"
                    />
                </div>
            </section>
        </div>
    );
}