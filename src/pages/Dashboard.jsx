import { useState, useEffect } from "react";
import Card from "../components/Card";
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
  Legend,
} from "recharts";

/* ================= MOCK DATA ================= */
const weeklyPatients = [
  { day: "Mon", inpatient: 22, outpatient: 30 },
  { day: "Tue", inpatient: 28, outpatient: 40 },
  { day: "Wed", inpatient: 18, outpatient: 26 },
  { day: "Thu", inpatient: 35, outpatient: 47 },
  { day: "Fri", inpatient: 32, outpatient: 41 },
  { day: "Sat", inpatient: 25, outpatient: 36 },
  { day: "Sun", inpatient: 20, outpatient: 35 },
];

const ageGroups = [
  { name: "<18 years", value: 14 },
  { name: "18–30 years", value: 34 },
  { name: "31–50 years", value: 32 },
  { name: ">50 years", value: 20 },
];

const COLORS = ["#FF2D95", "#7F3CFF", "#FF77C6", "#B084FF"];

const pendingReports = [
  { id: 1, patient: "Arun S.", tests: ["CBC", "ESR"] },
  { id: 2, patient: "Meera K.", tests: ["Lipid Profile"] },
  { id: 3, patient: "Salman H.", tests: ["MRI Brain"] },
  { id: 4, patient: "Divya R.", tests: ["HbA1c"] },
  { id: 5, patient: "Joseph T.", tests: ["CT Abdomen"] },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review lab reports", completed: false },
    { id: 2, text: "Follow-up critical patients", completed: false },
    { id: 3, text: "Update medication charts", completed: false },
    { id: 4, text: "Approve discharge summary", completed: false },
  ]);

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  useEffect(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const booked =
      JSON.parse(localStorage.getItem("bookedAppointments")) || {};
    setTodayAppointments(booked[key] || []);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white px-8 py-12">

      {/* ===== GLASS CONTAINER ===== */}
      <div className="max-w-7xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 space-y-16">

        {/* ================= HEADER ================= */}
        <div>
          <h2 className="text-5xl font-extrabold tracking-tight text-white ">
            Hi Dr.Linn👋
          </h2>
          <p className="mt-3 text-lg font-medium text-white">
            AlphaTIC Verse — Unified Medical Intelligence Platform
          </p>
        </div>

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ===== TASKS ===== */}
          <GlassCard title="Today's Tasks">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition
                    ${
                      task.completed
                        ? "border-white/60 bg-white/5 opacity-80"
                        : "border-white/20 bg-white/10 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20"
                    }`}
                >
                  <div
                    className={`flex items-center gap-3 font-semibold
                      ${
                        task.completed
                          ? "line-through text-neutral-500"
                          : "text-neutral-200 hover:text-pink-400"
                      }`}
                  >
                    <span>{task.completed ? "✔" : "◻"}</span>
                    {task.text}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* ===== APPOINTMENTS ===== */}
          <GlassCard title="Today's Appointments">
            {todayAppointments.length ? (
              <ul className="space-y-2 text-sm text-neutral-300">
                {todayAppointments.map((appt, i) => (
                  <li key={i}>
                    {appt.time
                      ? `${appt.time} — ${appt.patient}`
                      : `${appt.patient} (Time pending)`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500">
                No appointments scheduled today
              </p>
            )}
          </GlassCard>

          {/* ===== LAB REPORTS ===== */}
          <GlassCard title="Pending Lab Reports">
            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() =>
                    setExpandedReport(
                      expandedReport === report.id
                        ? null
                        : report.id
                    )
                  }
                  className="cursor-pointer rounded-xl border border-white/20 bg-white/10 p-3 transition hover:border-violet-500"
                >
                  <div className="flex justify-between font-semibold">
                    <span>📄 {report.patient}</span>
                    <span className="text-xs text-pink-400">
                      {expandedReport === report.id
                        ? "Hide"
                        : "View"}
                    </span>
                  </div>

                  {expandedReport === report.id && (
                    <ul className="mt-2 ml-5 list-disc text-sm text-neutral-400">
                      {report.tests.map((test, i) => (
                        <li key={i}>{test}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="space-y-10">
          <h3 className="text-3xl font-bold text-neutral-200">
            Weekly Patient Analytics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <GlassCard title="Inpatients vs Outpatients">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPatients}>
                    <XAxis dataKey="day" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #333",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="inpatient" fill="#FF2D95" radius={[6,6,0,0]} />
                    <Bar dataKey="outpatient" fill="#7F3CFF" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard title="Patient Age Distribution">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageGroups}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      label
                    >
                      {ageGroups.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f9efef",
                        border: "1px solid #333",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* ===== STOCK ===== */}
          <GlassCard title="Medical Stock Status">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="text-emerald-400">✔ Paracetamol</div>
              <div className="text-emerald-400">✔ Antibiotics</div>
              <div className="text-emerald-400">✔ IV Fluids</div>
              <div className="text-emerald-400">✔ Insulin</div>
              <div className="text-yellow-400">⚠ PPE Kits Low</div>
              <div className="text-yellow-400">⚠ Oxygen Masks Low</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

/* ===== GLASS CARD WRAPPER ===== */
function GlassCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      {children}
    </div>
  );
}
