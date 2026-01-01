// src/pages/EHRReport.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EHRReport() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No EHR data available
      </div>
    );
  }

  const {
    patientName,
    transcript,
    prescription,
    fhir,
    generatedAt,
  } = state;

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-5xl mx-auto bg-white text-black rounded-xl p-8 space-y-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Electronic Health Record
        </h1>

        {/* Patient Info */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Patient Information</h2>
          <p><b>Name:</b> {patientName}</p>
          <p><b>Record Generated:</b> {generatedAt || "N/A"}</p>
        </section>

        {/* Transcript */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Transcript</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
            {transcript || "No transcript available"}
          </pre>
        </section>

        {/* Prescription */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Prescription</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
            {prescription || "No prescription entered"}
          </pre>
        </section>

        {/* FHIR JSON */}
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">FHIR JSON</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap overflow-x-auto max-h-96">
            {fhir ? JSON.stringify(fhir, null, 2) : "No FHIR data available"}
          </pre>
        </section>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
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
