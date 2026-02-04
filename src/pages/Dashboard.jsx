import { useState, useEffect } from "react";
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

const criticalPatients = [
  {
    id: 1,
    name: "Arun S.",
    condition: "Acute dental abscess with facial swelling",
    chair: "Dental Chair 2",
    priority: "High",
  },
  {
    id: 2,
    name: "Meera K.",
    condition: "Post-extraction bleeding (uncontrolled)",
    chair: "Dental Chair 1",
    priority: "Critical",
  },
];

const inventoryStatus = [
  { name: "Lignocaine Injection", status: "Available" },
  { name: "Amoxicillin 500mg", status: "Low Stock" },
  { name: "Ibuprofen 400mg", status: "Available" },
  { name: "Root Canal Files", status: "Low Stock" },
];

/* ================= DASHBOARD ================= */
export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review lab reports", completed: false },
    { id: 2, text: "Follow-up critical patients", completed: false },
    { id: 3, text: "Update medication charts", completed: false },
  ]);

  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const booked = JSON.parse(localStorage.getItem("bookedAppointments")) || {};
    setTodayAppointments(booked[key] || []);
  }, []);

  const completed = tasks.filter(t => t.completed).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white px-3 sm:px-6 py-6 sm:py-10">

      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 sm:p-8 space-y-10">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold">Hi Dr. Linn 👋</h2>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            AlphaTIC Verse — Unified Medical Intelligence Platform
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <TopCard title="Tasks Left" value={tasks.length - completed} icon="📝" />
          <TopCard title="Appointments" value={todayAppointments.length} icon="📅" />
          <TopCard title="Critical" value={criticalPatients.length} icon="⚠️" />
          <TopCard title="Low Stock" value={inventoryStatus.filter(i => i.status !== "Available").length} icon="📦" />
        </div>

        {/* TASK PROGRESS */}
        <GlassCard title="Task Progress">
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-pink-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs mt-2 text-white/70">{progress}% completed</p>
        </GlassCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* TASKS */}
          <GlassCard title="Tasks">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() =>
                  setTasks(prev =>
                    prev.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
                className={`p-3 rounded-xl border mb-2 cursor-pointer text-sm
                  ${task.completed
                    ? "bg-white/5 border-white/30 line-through text-white/40"
                    : "bg-white/10 border-white/20 hover:border-pink-400"}
                `}
              >
                {task.text}
              </div>
            ))}
          </GlassCard>

          {/* APPOINTMENTS */}
          <GlassCard title="Today's Appointments">
            {todayAppointments.length ? (
              todayAppointments.map((a, i) => (
                <div key={i} className="mb-2 text-sm">
                  <div className="font-semibold text-pink-400">
                    {a.time} — {a.patientName}
                  </div>
                  <div className="text-xs text-white/60">
                    {a.age} yrs • {a.gender}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/50">No appointments today</p>
            )}
          </GlassCard>

          {/* CRITICAL */}
          <GlassCard title="Dental Emergencies">
            {criticalPatients.map(p => (
              <div key={p.id} className="mb-3 text-sm">
                <div className="font-semibold text-pink-400">{p.name}</div>
                <p className="text-xs text-white/70">{p.condition}</p>
                <span className={`text-xs ${
                  p.priority === "Critical" ? "text-red-400" : "text-yellow-400"
                }`}>
                  {p.priority} Priority
                </span>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard title="Inpatients vs Outpatients">
            <div className="h-56 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPatients}>
                  <XAxis dataKey="day" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Bar dataKey="inpatient" fill="#FF2D95" />
                  <Bar dataKey="outpatient" fill="#7F3CFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard title="Age Distribution">
            <div className="h-56 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ageGroups} dataKey="value" outerRadius={80}>
                    {ageGroups.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* INVENTORY */}
        <GlassCard title="Inventory Status">
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            {inventoryStatus.map((i, idx) => (
              <div key={idx} className={i.status === "Available" ? "text-emerald-400" : "text-yellow-400"}>
                {i.status === "Available" ? "✔" : "⚠"} {i.name}
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}

/* ================= SHARED COMPONENTS ================= */

function GlassCard({ title, children }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-xl">
      <h4 className="font-semibold mb-3 text-sm sm:text-base">{title}</h4>
      {children}
    </div>
  );
}

function TopCard({ title, value, icon }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs sm:text-sm text-white/70">{title}</div>
    </div>
  );
}
