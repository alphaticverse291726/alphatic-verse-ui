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

const COLORS = ["#ff2d95", "#7f3cff", "#ff77c6", "#b084ff"];

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review lab reports", completed: false },
    { id: 2, text: "Follow-up critical patients", completed: false },
    { id: 3, text: "Update medication charts", completed: false },
    { id: 4, text: "Approve discharge summary", completed: false },
  ]);

  const [todayAppointments, setTodayAppointments] = useState([]);

  // Toggle task completed state
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    // Get today's date
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // Load booked appointments from localStorage
    const booked = JSON.parse(localStorage.getItem("bookedAppointments")) || {};

    setTodayAppointments(booked[key] || []);
  }, []);

  return (
    <div className="space-y-14">
      {/* ===== HEADER ===== */}
      <div>
        <h2 className="text-4xl font-bold">Hi Dr. Linn!</h2>
        <p className="mt-3 text-base opacity-85">
          Welcome to AlphaTIC Verse — your unified medical intelligence platform
        </p>
      </div>

      {/* ===== TOP CARDS ===== */}
      <div className="grid grid-cols-3 gap-6">
        {/* Interactive To-Do List */}
        <Card title="To-Do List">
          <ul className="space-y-3 text-sm">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`cursor-pointer select-none ${
                  task.completed ? "line-through opacity-50" : ""
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "✔ " : "◻ "} {task.text}
              </li>
            ))}
          </ul>
        </Card>

        {/* Today’s Appointments */}
        <Card title="Today’s Appointments">
          {todayAppointments.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm opacity-85">
              {todayAppointments.map((appt, idx) => (
                <li key={idx}>
                  {appt.time ? `${appt.time} — ${appt.patient}` : `${appt.patient} (Time not assigned)`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-70">No appointments scheduled for today.</p>
          )}
        </Card>

        {/* Pending Lab Reports */}
        <Card title="Pending Lab Reports">
          <ul className="space-y-3 text-sm">
            <li><b>Arun S.</b> — CBC, ESR</li>
            <li><b>Meera K.</b> — Lipid Profile</li>
            <li><b>Salman H.</b> — MRI Brain</li>
            <li><b>Divya R.</b> — HbA1c</li>
            <li><b>Joseph T.</b> — CT Abdomen</li>
          </ul>
        </Card>
      </div>

      {/* ===== WEEKLY REPORT ===== */}
      <div className="space-y-8">
        <h3 className="text-3xl font-semibold">Weekly Patient Analytics</h3>

        <div className="grid grid-cols-2 gap-6">
          {/* DOUBLE BAR GRAPH */}
          <Card title="Inpatients vs Outpatients (Weekly)">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPatients}>
                  <XAxis dataKey="day" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333", color: "#fff" }}
                  />
                  <Legend />
                  <Bar dataKey="inpatient" name="Inpatients" fill="#ff2d95" radius={[6,6,0,0]} />
                  <Bar dataKey="outpatient" name="Outpatients" fill="#7f3cff" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* PIE CHART */}
          <Card title="Patient Age Group Distribution">
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
                    {ageGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333", color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* MEDICAL STOCKING */}
        <Card title="Medical Stocking Status">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>✔ Paracetamol</div>
            <div>✔ Antibiotics</div>
            <div>✔ IV Fluids</div>
            <div>✔ Insulin</div>
            <div className="text-yellow-400">⚠ Low — PPE Kits</div>
            <div className="text-yellow-400">⚠ Low — Oxygen Masks</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
