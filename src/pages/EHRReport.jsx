// src/pages/EHRReport.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EHRReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (location.state) {
      setPatient(location.state);
    }
  }, [location.state]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        No patient data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-5xl mx-auto bg-white text-black rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Patient Full Record</h1>

        {/* Demographics */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Demographics</h2>
          <p><b>Name:</b> {patient.patientName}</p>
          <p><b>Age:</b> {patient.age}</p>
          <p><b>Gender:</b> {patient.gender}</p>
          <p><b>Record Generated:</b> {patient.generatedAt}</p>
        </section>

        {/* Lab Values */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Lab Values</h2>
          <ul className="list-disc list-inside">
            {patient.labValues.map((lab, idx) => (
              <li key={idx}><b>{lab.test}:</b> {lab.value}</li>
            ))}
          </ul>
        </section>

        {/* Prescription */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">E-Prescription</h2>
          <ul className="list-disc list-inside">
            {patient.prescription.map((med, idx) => (
              <li key={idx}>{med}</li>
            ))}
          </ul>
        </section>

        {/* FHIR JSON */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">FHIR Data</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap overflow-x-auto max-h-96">
            {patient.fhir ? JSON.stringify(patient.fhir, null, 2) : "No FHIR data"}
          </pre>
        </section>

        {/* Back Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/ehr/records")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Back to Records
          </button>
        </div>
      </div>
    </div>
  );
}
