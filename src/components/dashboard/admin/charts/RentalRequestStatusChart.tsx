
"use client";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

type StatusCount = {
    status: string;
    count: number;
};

type RentalRequestStatusChartProps = {
    data: StatusCount[];
};

const statusColors: Record<string, string> = {
    PENDING: "#C49A52",
    APPROVED: "#356B4A",
    REJECTED: "#C75C5C",
    CANCELLED: "#8B8F97",
    COMPLETED: "#789B7D",
};

const statuses = [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED",
];

export default function RentalRequestStatusChart({
    data,
}: RentalRequestStatusChartProps) {
    const chartData = statuses.map((status) => ({
        status,
        count: data.find((item) => item.status === status)?.count ?? 0,
    }));

    return (
        <section className="rounded-2xl border border-[#E7E5DC] bg-[#FFFEFA] p-5 shadow-sm">
            <div className="mb-2">
                <h2 className="text-lg font-semibold text-[#24382D]">
                    Request Status
                </h2>
                <p className="mt-1 text-sm text-[#777D74]">
                    Distribution of rental requests
                </p>
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={3}
                            stroke="none"
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.status}
                                    fill={statusColors[entry.status]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: "#FFFEFA",
                                border: "1px solid #E7E5DC",
                                borderRadius: 12,
                            }}
                            formatter={(value, _name, item) => [
                                value,
                                item.payload.status,
                            ]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {chartData.map((item) => (
                    <div key={item.status} className="flex items-center gap-2">
                        <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: statusColors[item.status] }}
                        />
                        <span className="text-xs text-[#777D74]">
                            {item.status} ({item.count})
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
