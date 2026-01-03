import { useState, useEffect } from "react";

export default function BookAppointments() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [time, setTime] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  // Mock data for patients per date
  const mockAppointments = {
    "2026-1-5": [{ patient: "John Doe" }, { patient: "Maria Smith" }],
    "2026-1-12": [{ patient: "Abdul Rahman" }],
    "2026-1-18": [{ patient: "Linda George" }, { patient: "Mark Lee" }],
  };

  useEffect(() => {
    // Load initial appointments
    setAppointments(mockAppointments);
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

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
    setSelectedDate(null);
    setSelectedPatient("");
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
    setSelectedDate(null);
    setSelectedPatient("");
  };

  const assignTime = () => {
    if (!selectedPatient || !time) return alert("Select patient and time");

    // Check if time already assigned
    if (todaysAppointments.find((a) => a.time === time)) {
      return alert("Time slot already assigned for this date!");
    }

    // Update patient with time
    const updatedAppointments = todaysAppointments.map((a) =>
      a.patient === selectedPatient ? { ...a, time } : a
    );

    const updated = { ...appointments, [key]: updatedAppointments };
    setAppointments(updated);
    localStorage.setItem("bookedAppointments", JSON.stringify(updated));

    setTime("");
    setSelectedPatient("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        📅 Book Appointments
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ===== CALENDAR ===== */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="calendar-nav">‹</button>
            <h3 className="text-lg font-semibold">
              {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
            </h3>
            <button onClick={nextMonth} className="calendar-nav">›</button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm mb-3 opacity-70">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = i + 1;
              const isSelected = selectedDate === date;
              const hasAppointment = appointmentDates.includes(date);

              return (
                <div
                  key={date}
                  onClick={() => { setSelectedDate(date); setSelectedPatient(""); setTime(""); }}
                  className={`calendar-cell
                    ${isSelected ? "calendar-selected" : ""}
                    ${hasAppointment ? "calendar-appt" : ""}
                  `}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== PATIENT LIST + TIME ASSIGNMENT ===== */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <h3 className="text-xl font-semibold mb-4">
            {selectedDate
              ? `Appointments – ${selectedDate}/${month + 1}/${year}`
              : "Select a date to view patients"}
          </h3>

          {selectedDate && todaysAppointments.length > 0 ? (
            <div className="space-y-3 mb-4">
              {todaysAppointments.map((appt, idx) => (
                <div key={idx} className="bg-gray-900/70 p-3 rounded-xl flex justify-between items-center">
                  <span>{appt.patient}</span>
                  <span className="opacity-70">{appt.time || "Time not assigned"}</span>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <p className="opacity-70 mb-4">No patients booked for this date.</p>
          ) : null}

          {/* Assign Time Form */}
          {selectedDate && todaysAppointments.length > 0 && (
            <div className="flex gap-2 items-center">
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 text-white border border-purple-500/30 flex-1"
              >
                <option value="">Select Patient</option>
                {todaysAppointments
                  .filter((a) => !a.time)
                  .map((a, idx) => (
                    <option key={idx} value={a.patient}>{a.patient}</option>
                  ))}
              </select>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 text-white border border-purple-500/30"
              />
              <button
                onClick={assignTime}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
              >
                Assign Time
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== STYLES ===== */}
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
          position: relative;
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
