import { useState, useEffect } from "react";

export default function BookAppointments() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});

  // FORM STATES
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bookedAppointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const key = selectedDate ? `${year}-${month + 1}-${selectedDate}` : null;
  const todaysAppointments = key ? appointments[key] || [] : [];

  const appointmentDates = Object.keys(appointments)
    .filter((k) => {
      const [y, m] = k.split("-");
      return parseInt(y) === year && parseInt(m) === month + 1;
    })
    .map((k) => parseInt(k.split("-")[2]));

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

  const addAppointment = () => {
    if (!patientName || !age || !gender || !time) {
      alert("Please fill all fields");
      return;
    }

    if (todaysAppointments.find((a) => a.time === time)) {
      alert("This time slot is already booked!");
      return;
    }

    const newAppointment = {
      patientName,
      age,
      gender,
      time,
    };

    const updated = {
      ...appointments,
      [key]: [...todaysAppointments, newAppointment],
    };

    setAppointments(updated);
    localStorage.setItem("bookedAppointments", JSON.stringify(updated));

    // Reset form
    setPatientName("");
    setAge("");
    setGender("");
    setTime("");
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
                  onClick={() => setSelectedDate(date)}
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

        {/* APPOINTMENT FORM */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">
            {selectedDate
              ? `Book Appointment – ${selectedDate}/${month + 1}/${year}`
              : "Select a date from calendar"}
          </h3>

          {selectedDate && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input"
                />
              </div>

              <button
                onClick={addAppointment}
                className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Add Appointment
              </button>

              {todaysAppointments.length > 0 && (
                <div className="mt-6 space-y-2">
                  {todaysAppointments.map((a, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/10 border border-white/20 flex justify-between"
                    >
                      <span>{a.patientName} ({a.gender}, {a.age})</span>
                      <span className="opacity-70">{a.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
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
        .input {
          padding: 12px;
          border-radius: 12px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(168,85,247,0.5);
          color: white;
        }
      `}</style>
    </div>
  );
}
