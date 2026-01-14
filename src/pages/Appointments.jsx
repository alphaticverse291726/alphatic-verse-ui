import { useState, useEffect } from "react";
import { ClipboardCheck, Clock, AlertTriangle } from "lucide-react";

export default function Appointments() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedAppointments, setCheckedAppointments] = useState([]);
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookedAppointments")) || {};
    setAppointments(saved);
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const appointmentDates = Object.keys(appointments)
    .filter((key) => {
      const [y, m] = key.split("-");
      return parseInt(y) === year && parseInt(m) === month + 1;
    })
    .map((key) => parseInt(key.split("-")[2]));

  const key = selectedDate ? `${year}-${month + 1}-${selectedDate}` : null;
  const todaysAppointments = key ? appointments[key] || [] : [];

  const toggleCheck = (index) => {
    setCheckedAppointments((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white px-4 sm:px-6 lg:px-12 py-10">

      {/* ===== GLASS WRAPPER ===== */}
      <div className="max-w-7xl mx-auto space-y-10">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center flex justify-center items-center gap-3">
          📅 Session Calendar
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ===== CALENDAR ===== */}
          <div className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="calendar-nav">‹</button>
              <h3 className="text-lg sm:text-xl font-semibold">
                {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
              <button onClick={nextMonth} className="calendar-nav">›</button>
            </div>

            <div className="grid grid-cols-7 text-center text-xs sm:text-sm mb-3 opacity-70">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
              {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}

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

          {/* ===== APPOINTMENTS LIST ===== */}
          <div className="glass-card">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
              {selectedDate
                ? `Appointments – ${selectedDate}/${month + 1}/${year}`
                : "Select a date to view patients"}
            </h3>

            <div className="space-y-3">
              {selectedDate && todaysAppointments.length > 0 ? (
                todaysAppointments.map((appt, idx) => {
                  const checked = checkedAppointments.includes(idx);
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                        ${checked ? "bg-pink-500/20" : "bg-white/5 hover:bg-white/10"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCheck(idx)}
                        className="accent-pink-500 w-4 h-4"
                      />
                      <span className={`transition ${checked ? "line-through opacity-50" : "opacity-90"}`}>
                        {appt.time ? `${appt.time} – ${appt.patient}` : `${appt.patient} (Time not assigned)`}
                      </span>
                    </label>
                  );
                })
              ) : selectedDate ? (
                <p className="opacity-70">No patients booked for this date.</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* ===== STATUS ===== */}
        <div className="glass-card">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">Patient Appointment Status</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatusCard icon={<ClipboardCheck className="text-green-400" />} title="Review" count="12 Patients" />
            <StatusCard icon={<Clock className="text-yellow-400" />} title="Pending" count="7 Patients" />
            <StatusCard icon={<AlertTriangle className="text-red-500" />} title="Critical" count="3 Patients" />
          </div>
        </div>
      </div>

      {/* ===== INLINE STYLES ===== */}
      <style>{`
        .glass-card {
          background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.12));
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .calendar-nav {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: 0.3s;
        }

        .calendar-nav:hover {
          background: rgba(236,72,153,0.3);
        }

        .calendar-cell {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          background: rgba(255,255,255,0.05);
          position: relative;
          transition: 0.25s;
        }

        .calendar-cell:hover {
          background: rgba(236,72,153,0.2);
        }

        .calendar-selected {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          color: white;
          font-weight: 600;
        }

        .calendar-appt::after {
          content: "";
          width: 7px;
          height: 7px;
          background: #ec4899;
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
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4 backdrop-blur transition hover:scale-105">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="opacity-70">{count}</p>
      </div>
    </div>
  );
}
