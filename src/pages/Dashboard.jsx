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
    <div className="space-y-16">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
          Hi Dr. Linn
        </h2>
        <p className="mt-3 text-lg font-medium text-neutral-400">
          AlphaTIC Verse — Unified Medical Intelligence Platform
        </p>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-3 gap-8">
        {/* ===== TODAY'S TASKS ===== */}
        <Card title="Today's Tasks">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`group cursor-pointer rounded-xl border p-4 transition-all duration-300
                  ${
                    task.completed
                      ? "border-neutral-700 bg-neutral-900/60 opacity-60"
                      : "border-neutral-700 bg-neutral-900 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
                  }
                `}
              >
                <div
                  className={`flex items-center gap-3 font-semibold transition-all duration-300
                    ${
                      task.completed
                        ? "line-through text-neutral-500"
                        : "text-neutral-200 group-hover:text-violet-400 group-hover:text-lg"
                    }
                  `}
                >
                  <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                    {task.completed ? "✔" : "◻"}
                  </span>
                  {task.text}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ===== APPOINTMENTS ===== */}
        <Card title="Today's Appointments">
          {todayAppointments.length ? (
            <ul className="space-y-2 text-sm font-medium text-neutral-300">
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
        </Card>

        {/* ===== LAB REPORTS ===== */}
        <Card title="Pending Lab Reports">
          <div className="space-y-3">
            {pendingReports.map((report) => (
              <div
                key={report.id}
                onClick={() =>
                  setExpandedReport(
                    expandedReport === report.id ? null : report.id
                  )
                }
                className="cursor-pointer rounded-xl border border-neutral-700 p-3 transition hover:border-violet-500 hover:bg-neutral-800"
              >
                <div className="flex justify-between font-semibold text-neutral-200">
                  <span>📄 {report.patient}</span>
                  <span className="text-xs text-violet-400">
                    {expandedReport === report.id ? "Hide" : "View"}
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
        </Card>
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold tracking-tight text-neutral-200">
          Weekly Patient Analytics
        </h3>

        <div className="grid grid-cols-2 gap-8">
          <Card title="Inpatients vs Outpatients">
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
                  <Bar
                    dataKey="inpatient"
                    fill="#FF2D95"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="outpatient"
                    fill="#7F3CFF"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Patient Age Distribution">
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
                      backgroundColor: "#111",
                      border: "1px solid #333",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* ===== STOCK ===== */}
        <Card title="Medical Stock Status">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium">
            <div className="text-emerald-400">✔ Paracetamol</div>
            <div className="text-emerald-400">✔ Antibiotics</div>
            <div className="text-emerald-400">✔ IV Fluids</div>
            <div className="text-emerald-400">✔ Insulin</div>
            <div className="text-yellow-400">⚠ PPE Kits Low</div>
            <div className="text-yellow-400">⚠ Oxygen Masks Low</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
