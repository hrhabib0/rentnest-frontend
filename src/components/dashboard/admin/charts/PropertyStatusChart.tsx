
"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type StatusCount = {
    status: string;
    count: number;
};

type PropertyStatusChartProps = {
    data: StatusCount[];
};

const statusColors: Record<string, string> = {
    AVAILABLE: "#356B4A",
    RENTED: "#789B7D",
    UNAVAILABLE: "#C49A52",
};

export default function PropertyStatusChart({
    data,
}: PropertyStatusChartProps) {
    const chartData = ["AVAILABLE", "RENTED", "UNAVAILABLE"].map(
        (status) => ({
            status,
            count: data.find((item) => item.status === status)?.count ?? 0,
        }),
    );

    return (
        <section className="rounded-2xl border border-[#E7E5DC] bg-[#FFFEFA] p-5 shadow-sm">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#24382D]">
                    Property Status
                </h2>
                <p className="mt-1 text-sm text-[#777D74]">
                    Current property availability
                </p>
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 8, right: 12, left: -16, bottom: 4 }}
                    >
                        <CartesianGrid
                            stroke="#E7E5DC"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="status"
                            tick={{ fill: "#777D74", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{ fill: "#777D74", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#FFFEFA",
                                border: "1px solid #E7E5DC",
                                borderRadius: 12,
                            }}
                            formatter={(value) => [value, "Properties"]}
                        />

                        <Bar dataKey="count" name="Properties" radius={[6, 6, 0, 0]}>
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.status}
                                    fill={statusColors[entry.status]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
