import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/* ================= MOCK DATA ================= */

const kpis = [
  { label: "Avg Wait Time", value: "12 min", color: "text-green-400" },
  { label: "Patients / Day", value: "26", color: "text-cyan-400" },
  { label: "Revenue / Day", value: "₹6,200", color: "text-pink-400" },
  { label: "CSAT", value: "4.6 / 5", color: "text-purple-400" },
];

const patientTrend = [
  { day: "Mon", patients: 22 },
  { day: "Tue", patients: 28 },
  { day: "Wed", patients: 14 },
  { day: "Thu", patients: 30 },
  { day: "Fri", patients: 26 },
];

const revenueVsWait = [
  { day: "Mon", wait: 10, revenue: 6200 },
  { day: "Tue", wait: 14, revenue: 5800 },
  { day: "Wed", wait: 20, revenue: 3900 },
  { day: "Thu", wait: 18, revenue: 4200 },
  { day: "Fri", wait: 12, revenue: 6100 },
];

const patientFunnel = [
  { stage: "Scheduled", value: 40 },
  { stage: "Checked-in", value: 32 },
  { stage: "Consulted", value: 26 },
  { stage: "Follow-up", value: 18 },
];

const agePyramid = [
  { age: "60+", male: -8, female: 10 },
  { age: "40–60", male: -14, female: 16 },
  { age: "20–40", male: -18, female: 20 },
];

const diagnosisMix = [
  { name: "Diabetes", value: 30 },
  { name: "Hypertension", value: 25 },
  { name: "Respiratory", value: 20 },
  { name: "Others", value: 25 },
];

const aiOpportunities = [
  { area: "Reduce Wait Time", score: 90 },
  { area: "Improve Follow-ups", score: 75 },
  { area: "Staff Scheduling", score: 65 },
  { area: "Pricing Strategy", score: 40 },
];

const aiTasksInitial = [
  {
    id: 1,
    title: "Reduce average wait time below 10 minutes",
    reason: "Revenue drops sharply when wait time exceeds 15 minutes.",
    impact: "High",
    category: "Operational",
    status: "pending",
  },
  {
    id: 2,
    title: "Improve post-consultation follow-ups",
    reason: "Patient funnel shows a 30% drop after consultation.",
    impact: "High",
    category: "Quality",
    status: "pending",
  },
  {
    id: 3,
    title: "Optimize mid-week staffing",
    reason: "Patient volume drops significantly on Wednesdays.",
    impact: "Medium",
    category: "Operational",
    status: "pending",
  },
  {
    id: 4,
    title: "Introduce chronic care packages",
    reason:
      "High 40–60 age group with diabetes and hypertension trends.",
    impact: "Medium",
    category: "Financial",
    status: "pending",
  },
];

const COLORS = ["#ec4899", "#8b5cf6", "#22d3ee", "#10b981"];

/* ================= GLASS STYLE (FIXED VISIBILITY) ================= */

const glass =
  "relative bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg";

/* ================= AI TASK PANEL ================= */

function AITaskPanel() {
  const [tasks, setTasks] = useState(aiTasksInitial);

  const updateStatus = (id, status) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const impactColor = impact =>
    impact === "High"
      ? "text-red-400"
      : impact === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className={`${glass} p-6`}>
      <h3 className="text-xl font-semibold mb-4">
        🤖 AI Strategy Tasks to Focus On
      </h3>

      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-4 rounded-xl bg-white/5 border border-white/20"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-300 mt-1">
                  {task.reason}
                </p>

                <div className="flex gap-4 mt-2 text-sm">
                  <span className={`font-semibold ${impactColor(task.impact)}`}>
                    Impact: {task.impact}
                  </span>
                  <span className="text-gray-300">
                    Category: {task.category}
                  </span>
                  <span className="text-gray-300">
                    Status: {task.status}
                  </span>
                </div>
              </div>

              {task.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(task.id, "done")}
                    className="px-3 py-1 text-sm rounded bg-green-600 hover:bg-green-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(task.id, "snoozed")}
                    className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20"
                  >
                    Snooze
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= MAIN ================= */

export default function DoctorBusinessIntelligence() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/80 to-pink-950/80 text-white p-8 space-y-10">

      <div>
        <h2 className="text-4xl font-bold">
          AI Business Intelligence · Doctor View
        </h2>
        <p className="text-gray-400">
          Dr. A · General Medicine · Strategy Dashboard
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {kpis.map(k => (
          <div key={k.label} className={`${glass} p-5`}>
            <p className="text-sm text-gray-300">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className={`${glass} p-6`}>
          <h3 className="font-semibold mb-4">Daily Patient Load</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={patientTrend}>
              <CartesianGrid stroke="#ffffff22" />
              <XAxis dataKey="day" stroke="#e5e7eb" />
              <YAxis stroke="#e5e7eb" />
              <Tooltip />
              <Line dataKey="patients" stroke="#22d3ee" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${glass} p-6`}>
          <h3 className="font-semibold mb-4">
            Revenue vs Wait Time Correlation
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueVsWait}>
              <CartesianGrid stroke="#ffffff22" />
              <XAxis dataKey="day" stroke="#e5e7eb" />
              <YAxis yAxisId="left" stroke="#e5e7eb" />
              <YAxis yAxisId="right" orientation="right" stroke="#e5e7eb" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" dataKey="revenue" stroke="#ec4899" strokeWidth={3} />
              <Line yAxisId="right" dataKey="wait" stroke="#8b5cf6" strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className={`${glass} p-6`}>
          <h3 className="font-semibold mb-4">Patient Funnel</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={patientFunnel}>
              <CartesianGrid stroke="#ffffff22" />
              <XAxis dataKey="stage" stroke="#e5e7eb" />
              <YAxis stroke="#e5e7eb" />
              <Tooltip />
              <Bar dataKey="value" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${glass} p-6`}>
          <h3 className="font-semibold mb-4">Diagnosis Mix</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={diagnosisMix}
                dataKey="value"
                innerRadius={55}
                outerRadius={95}
              >
                {diagnosisMix.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`${glass} p-6`}>
          <h3 className="font-semibold mb-4">Age–Gender Pyramid</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart layout="vertical" data={agePyramid}>
              <CartesianGrid stroke="#ffffff22" />
              <XAxis type="number" stroke="#e5e7eb" />
              <YAxis type="category" dataKey="age" stroke="#e5e7eb" />
              <Tooltip />
              <Bar dataKey="male" fill="#8b5cf6" />
              <Bar dataKey="female" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${glass} p-6`}>
        <h3 className="font-semibold mb-4">
          AI Strategy Opportunity Score
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={aiOpportunities} layout="vertical">
            <CartesianGrid stroke="#ffffff22" />
            <XAxis type="number" stroke="#e5e7eb" />
            <YAxis type="category" dataKey="area" stroke="#e5e7eb" />
            <Tooltip />
            <Bar dataKey="score" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <AITaskPanel />
    </div>
  );
}
