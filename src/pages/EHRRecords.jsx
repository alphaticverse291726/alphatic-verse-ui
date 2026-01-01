import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EHRRecords() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ehrRecords")) || [];
    setRecords(stored);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">EHR Records</h1>

      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white/5 border border-purple-500/30 rounded-xl p-5 shadow-lg"
            >
              <p className="font-semibold">{record.patient.name}</p>
              <p className="text-sm opacity-80">
                {record.patient.patientId}
              </p>
              <p className="text-sm mt-2">
                <b>Diagnosis:</b> {record.diagnosis}
              </p>
              <p className="text-xs opacity-70 mt-1">
                {record.date}
              </p>

              <button
                onClick={() =>
                  navigate("/ehr/report", { state: record })
                }
                className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
              >
                View Full Record
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
