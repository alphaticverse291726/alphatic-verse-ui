import { useState, useEffect } from "react";

export default function BookAppointments() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [time, setTime] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const mockAppointments = {
    "2026-1-5": [{ patient: "John Doe" }, { patient: "Maria Smith" }, { patient: "Ali Hassan" }],
    "2026-1-12": [{ patient: "Abdul Rahman" }, { patient: "Chen Wei" }, { patient: "Ana Silva" }],
    "2026-1-18": [{ patient: "Linda George" }, { patient: "Mark Lee" }, { patient: "Fatima Khan" }],
    "2026-1-16": [{ patient: "Sophia Brown" }, { patient: "James Wilson" }, { patient: "Emma Davis" }, { patient: "Olivia Garcia" }], 
  };

  useEffect(() => {
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
    if (!selectedPatient || !time) {
      alert("Select patient and time");
      return;
    }

    if (todaysAppointments.find((a) => a.time === time)) {
      alert("Time slot already assigned for this date!");
      return;
    }

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
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        Book Appointments
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CALENDAR */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl">
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
              const hasAppointment = appointmentDates.includes(date);

              return (
                <div
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedPatient("");
                    setTime("");
                  }}
                  className={`calendar-cell
                    ${isSelected ? "calendar-selected" : ""}
                    ${hasAppointment ? "calendar-appt" : ""}`}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>

        {/* PATIENT LIST */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">
            {selectedDate
              ? `Appointments – ${selectedDate}/${month + 1}/${year}`
              : "Select a date to view patients"}
          </h3>

          {selectedDate && todaysAppointments.length > 0 ? (
            <div className="space-y-3 mb-4">
              {todaysAppointments.map((appt, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex justify-between"
                >
                  <span>{appt.patient}</span>
                  <span className="opacity-70">
                    {appt.time || "Time not assigned"}
                  </span>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <p className="opacity-70 mb-4">No patients booked for this date.</p>
          ) : null}

          {selectedDate && todaysAppointments.length > 0 && (
            <div className="flex gap-2 items-center">
              <select
  value={selectedPatient}
  onChange={(e) => setSelectedPatient(e.target.value)}
  className="p-3 rounded-lg bg-black/30 text-white flex-1 border border-purple-400/50 backdrop-blur-md appearance-none"
>
  <option value="" className="bg-black text-white">Select Patient</option>
  {todaysAppointments
    .filter((a) => !a.time)
    .map((a, idx) => (
      <option key={idx} value={a.patient} className="bg-black text-white">
        {a.patient}
      </option>
    ))}
</select>

<input
  type="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="p-3 rounded-lg bg-black/30 text-white border border-purple-400/50 backdrop-blur-md appearance-none"
/>


              <button
                onClick={assignTime}
                className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Assign
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .calendar-nav {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
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
        }
        .calendar-selected {
          background: linear-gradient(135deg,#ec4899,#8b5cf6);
          font-weight: 600;
        }
        .calendar-appt::after {
          content: "";
          width: 6px;
          height: 6px;
          background: #ec4899;
          border-radius: 50%;
          position: absolute;
          bottom: 6px;
        }
      `}</style>
    </div>
  );
}
