import StatsCard from "@/components/dashboard/shared/StatsCard";
import { getDashboardStats } from "@/services/admin/admin";
import { Building2, FileText, Users, Wallet } from "lucide-react";

export default async function AdminDashboardPage() {
    const result = await getDashboardStats();

    const stats = result.data;
    console.log(result)

    return (
        <div className="space-y-8">
            {/* <DashboardHeading
                title="Admin Dashboard"
                description="Manage users, properties and platform activities."
            /> */}
            {/* <div>{stats.totalUsers}</div> */}
            <div>admin</div>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                />

                <StatsCard
                    title="Properties"
                    value={stats.totalProperties}
                    icon={Building2}
                />

                <StatsCard
                    title="Rental Requests"
                    value={stats.totalRentalRequests}
                    icon={FileText}
                />

                <StatsCard
                    title="Revenue"
                    value={`৳ ${Number(stats.totalRevenue).toLocaleString()}`}
                    icon={Wallet}
                />
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Available Properties"
                    value={stats.availableProperties}
                    icon={Building2}
                />

                <StatsCard
                    title="Rented Properties"
                    value={stats.rentedProperties}
                    icon={Building2}
                />

                <StatsCard
                    title="Pending Requests"
                    value={stats.pendingRequests}
                    icon={FileText}
                />

                <StatsCard
                    title="Completed Payments"
                    value={stats.totalPayments}
                    icon={Wallet}
                />
            </div>
        </div>
    );
}