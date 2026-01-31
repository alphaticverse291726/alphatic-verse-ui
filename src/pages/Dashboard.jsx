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
  LineChart,
  Line,
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
  {
    id: 3,
    name: "Joseph T.",
    condition: "Severe pulpitis – unbearable pain",
    chair: "Dental Chair 3",
    priority: "High",
  },
];


const inventoryStatus = [
  { name: "Lignocaine Injection", status: "Available" },
  { name: "Amoxicillin 500mg", status: "Low Stock" },
  { name: "Ibuprofen 400mg", status: "Available" },
  { name: "Root Canal Files", status: "Low Stock" },
  { name: "Dental Gloves", status: "Available" },
  { name: "Mouth Mirrors", status: "Available" },
  { name: "Composite Filling Material", status: "Low Stock" },
];


/* ================= DASHBOARD ================= */
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
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const booked = JSON.parse(localStorage.getItem("bookedAppointments")) || {};
    setTodayAppointments(booked[key] || []);
  }, []);

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const tasksProgress = Math.round((completedTasksCount / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

      <div className="max-w-7xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-14 sm:space-y-16">

        {/* ===== HEADER ===== */}
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Hi Dr. Linn 👋
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg font-medium text-white/90">
            AlphaTIC Verse — Unified Medical Intelligence Platform
          </p>
        </div>

        {/* ===== TOP KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          <TopCard title="Tasks Remaining" value={tasks.length - completedTasksCount} icon="📝" highlight="text-pink-400" />
          <TopCard title="Today's Appointments" value={todayAppointments.length} icon="📅" highlight="text-purple-400" />
          <TopCard title="Critical Patients" value={criticalPatients.length} icon="⚠️" highlight="text-red-400" />
          <TopCard title="Low Inventory Items" value={inventoryStatus.filter(i => i.status !== "Available").length} icon="📦" highlight="text-yellow-400" />

        </div>

        {/* ===== TASK PROGRESS BAR ===== */}
        <GlassCard title="Tasks Progress">
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-pink-500 h-3 rounded-full transition-all"
              style={{ width: `${tasksProgress}%` }}
            />
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/80">{tasksProgress}% completed</p>
        </GlassCard>

        {/* ===== MAIN CARDS GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* TASKS */}
          <GlassCard title="Tasks Overview">
            <div className="space-y-3 sm:space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer rounded-xl border p-3 sm:p-4 transition
                    ${task.completed
                      ? "border-white/60 bg-white/5 opacity-80"
                      : "border-white/20 bg-white/10 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20"
                    }`}
                >
                  <div className={`flex items-center gap-3 font-bold text-sm sm:text-base
                    ${task.completed
                      ? "line-through text-neutral-500"
                      : "text-neutral-200 hover:text-pink-400"
                    }`}>
                    <span>{task.completed ? "✔" : "◻"}</span>
                    {task.text}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* APPOINTMENTS */}
          <GlassCard title="Today's Appointments">
            {todayAppointments.length ? (
              <ul className="space-y-2 text-sm text-neutral-300">
                {todayAppointments.map((appt, i) => (
                  <li key={i} className="break-words">
                    {appt.time
                      ? `${appt.time} — ${appt.patient}`
                      : `${appt.patient} (Time pending)`} 
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500">No appointments scheduled today</p>
            )}
          </GlassCard>

          {/* CRITICAL PATIENTS */}
        <GlassCard title="Dental Emergency Patients">
  {criticalPatients.map((p) => (
    <div
      key={p.id}
      className="p-3 rounded-xl bg-white/5 border border-white/20 mb-3"
    >
      <div className="flex justify-between items-center text-sm sm:text-base">
        <span className="font-semibold text-pink-400">{p.name}</span>
        <span className="text-purple-400 text-xs sm:text-sm">
          {p.chair}
        </span>
      </div>

      <p className="mt-1 text-xs sm:text-sm text-neutral-300">
        {p.condition}
      </p>

      <span
        className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold
          ${p.priority === "Critical"
            ? "bg-red-500/20 text-red-400"
            : "bg-yellow-500/20 text-yellow-400"
          }`}
      >
        {p.priority} Priority
      </span>
    </div>
  ))}
</GlassCard>


        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="space-y-8 sm:space-y-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-200">
            Weekly Patient Analytics
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            <GlassCard title="Inpatients vs Outpatients">
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPatients}>
                    <XAxis dataKey="day" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inpatient" fill="#FF2D95" radius={[6,6,0,0]} />
                    <Bar dataKey="outpatient" fill="#7F3CFF" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard title="Patient Age Distribution">
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageGroups}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {ageGroups.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* ===== INVENTORY STATUS ===== */}
          <GlassCard title="Dental Inventory Status">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {inventoryStatus.map((item, i) => (
                <div
                  key={i}
                  className={item.status === "Available" ? "text-emerald-400" : "text-yellow-400"}
                >
                  {item.status === "Available" ? "✔" : "⚠"} {item.name}
                </div>
              ))}
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
    <div className="bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-white/20 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl">
      <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ===== TOP KPI CARD COMPONENT ===== */
function TopCard({ title, value, icon, highlight }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col justify-center items-center text-center transition hover:shadow-pink-500/30`}>
      <div className={`text-2xl sm:text-3xl mb-2 ${highlight || "text-white"}`}>{icon}</div>
      <div className="text-lg sm:text-xl font-bold">{value}</div>
      <div className="text-sm sm:text-base text-white/80">{title}</div>
    </div>
  );
}
