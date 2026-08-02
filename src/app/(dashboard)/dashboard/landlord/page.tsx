import StatsGrid from "@/components/dashboard/landlord/StatsGrid";
import { getDashboardStatistics } from "@/services/landlord/getDashboardStats";
import { notFound } from "next/navigation";
import { toast } from "sonner";


export default async function LandlordDashboardPage() {
    const response = await getDashboardStatistics();

    if (!response.success) {
        notFound();
    }
    const stats = response.data;
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="text-muted-foreground">
                    Here&apos;s an overview of your properties.
                </p>
            </div>
            <StatsGrid stats={stats} />
        </div>
    );
}