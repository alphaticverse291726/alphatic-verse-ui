// src/pages/EHRRecords.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EHRRecords() {
  const navigate = useNavigate();

  // Mock patient records
  const patients = [
    {
      id: "patient-001",
      patientName: "John Doe",
      age: 38,
      gender: "Male",
      generatedAt: "2026-01-03 14:35",
      labValues: [
        { test: "Blood Pressure", value: "120/80 mmHg" },
        { test: "Heart Rate", value: "72 bpm" },
      ],
      prescription: [
        "Paracetamol 500mg – twice daily for 5 days",
        "Aspirin 75mg – once daily",
      ],
      fhir: {
        resourceType: "Bundle",
        type: "collection",
        entry: [
          { resource: { resourceType: "Patient", id: "patient-001", name: [{ use: "official", family: "Doe", given: ["John"] }], gender: "male", birthDate: "1988-05-14" } },
          { resource: { resourceType: "Observation", id: "obs-001", code: { text: "Blood Pressure" }, valueString: "120/80 mmHg" } },
        ],
      },
    },
    {
      id: "patient-002",
      patientName: "Jane Smith",
      age: 33,
      gender: "Female",
      generatedAt: "2026-01-02 10:20",
      labValues: [
        { test: "Temperature", value: "37.2°C" },
      ],
      prescription: [
        "Ibuprofen 400mg – three times daily for 5 days",
        "Drink plenty of water",
      ],
      fhir: {
        resourceType: "Bundle",
        type: "collection",
        entry: [
          { resource: { resourceType: "Patient", id: "patient-002", name: [{ use: "official", family: "Smith", given: ["Jane"] }], gender: "female", birthDate: "1992-11-22" } },
          { resource: { resourceType: "Observation", id: "obs-002", code: { text: "Temperature" }, valueString: "37.2°C" } },
        ],
      },
    },
    {
      id: "patient-003",
      patientName: "Robert Johnson",
      age: 40,
      gender: "Male",
      generatedAt: "2026-01-01 09:45",
      labValues: [
        { test: "Oxygen Saturation", value: "95%" },
      ],
      prescription: [
        "Albuterol inhaler as needed",
        "Monitor breathing during activity",
      ],
      fhir: {
        resourceType: "Bundle",
        type: "collection",
        entry: [
          { resource: { resourceType: "Patient", id: "patient-003", name: [{ use: "official", family: "Johnson", given: ["Robert"] }], gender: "male", birthDate: "1985-07-08" } },
          { resource: { resourceType: "Observation", id: "obs-003", code: { text: "Oxygen Saturation" }, valueString: "95%" } },
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-3xl font-bold text-white mb-8">EHR Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-gray-900 text-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{patient.patientName}</h2>
            <p><b>Age:</b> {patient.age}</p>
            <p><b>Gender:</b> {patient.gender}</p>
            <p><b>Generated:</b> {patient.generatedAt}</p>
            <button
              onClick={() => navigate("/ehr/report", { state: patient })}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
            >
              View Full Record
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
