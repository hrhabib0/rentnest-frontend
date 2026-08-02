import StatsCard from "@/components/dashboard/shared/StatsCard";
import {
    Building2,
    Home,
    Clock3,
    CheckCircle2,
} from "lucide-react";

type Props = {
    stats: {
        totalProperties: number;
        availableProperties: number;
        pendingRequests: number;
        approvedRequests: number;
    };
};

export default function StatsGrid({ stats }: Props) {
    const cards = [
        {
            title: "Total Properties",
            value: stats.totalProperties,
            icon: Building2,
        },
        {
            title: "Available",
            value: stats.availableProperties,
            icon: Home,
        },
        {
            title: "Pending Requests",
            value: stats.pendingRequests,
            icon: Clock3,
        },
        {
            title: "Approved Requests",
            value: stats.approvedRequests,
            icon: CheckCircle2,
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <StatsCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                />
            ))}
        </div>
    );
}