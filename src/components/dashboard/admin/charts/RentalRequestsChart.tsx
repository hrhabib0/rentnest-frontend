
"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyRequest = {
  month: string;
  count: number;
};

type RentalRequestsChartProps = {
  data: MonthlyRequest[];
};

export default function RentalRequestsChart({
  data,
}: RentalRequestsChartProps) {
  return (
    <section className="rounded-2xl border border-[#E7E5DC] bg-[#FFFEFA] p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#24382D]">
          Rental Requests
        </h2>
        <p className="mt-1 text-sm text-[#777D74]">
          Monthly requests over the last six months
        </p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: -16, bottom: 4 }}
          >
            <CartesianGrid
              stroke="#E7E5DC"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#777D74", fontSize: 12 }}
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
              formatter={(value) => [value, "Requests"]}
            />

            <Line
              type="monotone"
              dataKey="count"
              name="Requests"
              stroke="#356B4A"
              strokeWidth={3}
              dot={{ r: 4, fill: "#356B4A" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
