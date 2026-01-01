import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

/* ================= MOCK DATA ================= */

// Revenue Trend
const revenueTrend = [
  { date: "W1", revenue: 3000 },
  { date: "W2", revenue: 5200 },
  { date: "W3", revenue: 6800 },
  { date: "W4", revenue: 10000 },
];

// Payment Status
const paymentStatus = [
  { status: "Paid", amount: 200 },
  { status: "Pending", amount: 160 },
  { status: "Unpaid", amount: 120 },
];

export default function Revenue() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1120] text-white p-8 gap-8">

      {/* ================= HEADER ================= */}
      <h2 className="text-4xl font-bold">Revenue</h2>

      

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= PAYMENT STATUS ================= */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-purple-500/20 shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Payment Status Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={paymentStatus}
              layout="vertical"
              margin={{ left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" stroke="#cbd5e1" />
              <YAxis
                dataKey="status"
                type="category"
                stroke="#cbd5e1"
              />
              <Tooltip
                formatter={(value) => [`Rs ${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="amount"
                fill="#8b5cf6"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>Rs 160</span>
            <span>Rs 200</span>
          </div>
        </div>

        {/* ================= REVENUE TREND ================= */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-pink-500/20 shadow-md relative">
          <h3 className="text-xl font-semibold mb-4">
            Revenue Trend Analysis
          </h3>

          {/* Growth Indicator */}
          <div className="absolute top-6 right-6 text-green-400 font-semibold">
            ↑ 12% this month
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#cbd5e1" />
              <YAxis
                stroke="#cbd5e1"
                ticks={[3000, 5000, 10000]}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`Rs ${value}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
