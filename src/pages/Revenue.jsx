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
    <div
      className="flex flex-col min-h-screen text-white p-8 gap-8
      bg-gradient-to-br from-black via-purple-950 to-black"
    >
      {/* ================= HEADER ================= */}
      <h2
        className="text-4xl font-bold
        bg-gradient-to-r from-pink-400 to-purple-400
        bg-clip-text text-transparent"
      >
        Revenue
      </h2>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= PAYMENT STATUS ================= */}
        <div
          className="relative rounded-3xl p-6
          bg-white/5 backdrop-blur-2xl
          border border-purple-400/30
          shadow-2xl"
        >
          {/* Glass highlight */}
          <div className="absolute inset-0 rounded-3xl
            bg-gradient-to-br from-pink-500/10 to-purple-600/10
            pointer-events-none" />

          <h3 className="relative z-10 text-xl font-semibold mb-4">
            Payment Status Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={paymentStatus}
              layout="vertical"
              margin={{ left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis type="number" stroke="#e5e7eb" />
              <YAxis
                dataKey="status"
                type="category"
                stroke="#e5e7eb"
              />
              <Tooltip
                formatter={(value) => [`Rs ${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="amount"
                fill="#8b5cf6"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="relative z-10 flex justify-between mt-4 text-sm text-white/60">
            <span>Rs 160</span>
            <span>Rs 200</span>
          </div>
        </div>

        {/* ================= REVENUE TREND ================= */}
        <div
          className="relative rounded-3xl p-6
          bg-white/5 backdrop-blur-2xl
          border border-pink-400/30
          shadow-2xl"
        >
          {/* Glass highlight */}
          <div className="absolute inset-0 rounded-3xl
            bg-gradient-to-br from-purple-500/10 to-pink-500/10
            pointer-events-none" />

          <h3 className="relative z-10 text-xl font-semibold mb-4">
            Revenue Trend Analysis
          </h3>

          {/* Growth Indicator */}
          <div className="relative z-10 absolute top-6 right-6 text-green-400 font-semibold">
            ↑ 12% this month
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis dataKey="date" stroke="#e5e7eb" />
              <YAxis
                stroke="#e5e7eb"
                ticks={[3000, 5000, 10000]}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`Rs ${value}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
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
