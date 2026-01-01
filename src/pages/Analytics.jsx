import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

/* ================= MOCK DATA ================= */

const satisfactionTrend = [
  { month: "Jan", rate: 65 },
  { month: "Feb", rate: 70 },
  { month: "Mar", rate: 75 },
  { month: "Apr", rate: 82 },
  { month: "May", rate: 88 },
];

const weeklyPatients = [
  { day: "Mon", inpatient: 40, outpatient: 65 },
  { day: "Tue", inpatient: 55, outpatient: 70 },
  { day: "Wed", inpatient: 50, outpatient: 60 },
  { day: "Thu", inpatient: 60, outpatient: 80 },
  { day: "Fri", inpatient: 45, outpatient: 75 },
];

const ageGroupData = [
  { name: "18–30", value: 35 },
  { name: "30–40", value: 40 },
  { name: "60+", value: 25 },
];

const monthlyTrend = [
  { week: "W1", patients: 180 },
  { week: "W2", patients: 210 },
  { week: "W3", patients: 195 },
  { week: "W4", patients: 230 },
];

const COLORS = ["#ec4899", "#8b5cf6", "#22d3ee"];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("Patient Statistics");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1120] text-white p-8 gap-8">

      {/* ================= HEADER ================= */}
      <h2 className="text-4xl font-bold">Clinic Analytics</h2>

      {/* ================= MENU ================= */}
      <div className="bg-[#111827] border border-purple-500/30 rounded-2xl p-4">
        <div className="flex flex-wrap gap-4 justify-center">

          <button
            onClick={() => setActiveTab("Patient Statistics")}
            className={`px-6 py-2 rounded-full font-semibold transition
              ${
                activeTab === "Patient Statistics"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            Patient Statistics
          </button>

          <button
            onClick={() => navigate("/analytics/revenue")}
            className="px-6 py-2 rounded-full font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Revenue
          </button>

        </div>
      </div>

      {/* ================= PATIENT STATISTICS ================= */}
      {activeTab === "Patient Statistics" && (
        <div className="flex flex-col gap-10">

          {/* ===== KPI CARD ===== */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-pink-500/20">
            <h3 className="text-2xl font-semibold mb-6">Patient Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-400">Satisfactory Rate</p>
                <p className="text-3xl font-bold text-pink-400">88%</p>
              </div>

              <div className="bg-black/40 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-400">Avg. Time</p>
                <p className="text-3xl font-bold text-purple-400">18 min</p>
              </div>

              <div className="bg-black/40 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-400">Return Rate</p>
                <p className="text-3xl font-bold text-cyan-400">62%</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={satisfactionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#ec4899"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ===== ANALYTICS GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-[#111827] rounded-xl p-6 border border-pink-500/20">
              <h3 className="text-xl font-semibold mb-4">
                In-Patient vs Out-Patient
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={weeklyPatients}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="day" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inpatient" fill="#ec4899" radius={[6,6,0,0]} />
                  <Bar dataKey="outpatient" fill="#8b5cf6" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-4">
                Age Group Distribution
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={ageGroupData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={95}
                  >
                    {ageGroupData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 border border-purple-500/20 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">
                Monthly Patient Trend
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="week" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#22d3ee"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===== TASKS (BOTTOM) ===== */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold mb-4">
              Tasks to focus:
            </h3>

            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((task) => (
                <div key={task} className="flex items-center gap-4">
                  <div className="w-5 h-5 border border-gray-400 rounded-sm" />
                  <div className="flex-1 h-[2px] bg-gray-600/40" />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
