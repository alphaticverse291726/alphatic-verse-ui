import { useState } from "react";
import {
  ClipboardCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";

/* ===== MOCK APPOINTMENTS ===== */
const appointmentMap = {
  "2025-12": [3, 7, 12, 18, 24, 30],
  "2026-1": [3, 7, 12, 18, 24],
};

const todayAppointments = [
  "10:00 AM – John Doe",
  "11:30 AM – Maria Smith",
  "01:00 PM – Abdul Rahman",
  "03:45 PM – Linda George",
];

export default function Appointments() {
  const [month, setMonth] = useState(11); // December
  const [year, setYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(30);
  const [checkedAppointments, setCheckedAppointments] = useState([]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const key = `${year}-${month + 1}`;
  const appointmentDates = appointmentMap[key] || [];

  const toggleCheck = (index) => {
    setCheckedAppointments((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        📅 Session Calendar
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= CALENDAR ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="calendar-nav">‹</button>

            <h3 className="text-lg font-semibold">
              {new Date(year, month).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>

            <button onClick={nextMonth} className="calendar-nav">›</button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm mb-3 opacity-70">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i} />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = i + 1;
              const isSelected = selectedDate === date;
              const hasAppt = appointmentDates.includes(date);

              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`calendar-cell
                    ${isSelected ? "calendar-selected" : ""}
                    ${hasAppt ? "calendar-appt" : ""}
                  `}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= TODAY'S APPOINTMENTS ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardCheck className="text-pink-500" />
            Appointments – {selectedDate}/{month+1}/{year}
          </h3>

          <div className="space-y-3">
            {todayAppointments.map((item, idx) => {
              const checked = checkedAppointments.includes(idx);

              return (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                    ${checked ? "bg-white/10" : "bg-white/5 hover:bg-white/10"}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(idx)}
                    className="accent-pink-500 w-4 h-4"
                  />

                  <span
                    className={`transition ${
                      checked
                        ? "line-through opacity-50"
                        : "opacity-90"
                    }`}
                  >
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= STATUS ================= */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur mt-8">
        <h3 className="text-xl font-semibold mb-6">
          Patient Appointment Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            icon={<ClipboardCheck className="text-green-400" />}
            title="Review"
            count="12 Patients"
          />
          <StatusCard
            icon={<Clock className="text-yellow-400" />}
            title="Pending"
            count="7 Patients"
          />
          <StatusCard
            icon={<AlertTriangle className="text-red-500" />}
            title="Critical"
            count="3 Patients"
          />
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .calendar-nav {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .calendar-nav:hover {
          background: rgba(255,255,255,0.15);
        }
        .calendar-cell {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          cursor: pointer;
          background: rgba(255,255,255,0.03);
        }
        .calendar-cell:hover {
          background: rgba(255,255,255,0.15);
        }
        .calendar-selected {
          background: #e11d48;
          color: white;
          font-weight: 600;
        }
        .calendar-appt::after {
          content: "";
          width: 6px;
          height: 6px;
          background: #e11d48;
          border-radius: 50%;
          position: absolute;
          bottom: 6px;
        }
      `}</style>
    </div>
  );
}

function StatusCard({ icon, title, count }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="opacity-70">{count}</p>
      </div>
    </div>
  );
}
