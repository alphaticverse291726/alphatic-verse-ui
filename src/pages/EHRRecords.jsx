import React, { useState } from "react";

export default function EHRRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const patients = [
    {
      id: "dent-001",
      patientId: "DEN-PT-2026-001",
      name: "Rohit Sharma",
      dob: "17-Aug-1994",
      age: 31,
      gender: "Male",

      clinic: {
        name: "SmileCraft Dental Care",
        regId: "TN-DENT-45872",
      },

      dentist: {
        name: "Dr. Ananya Rao, BDS, MDS",
        regNo: "DCI/KA/2015/32456",
        signature: "Digitally Signed",
      },

      encounter: {
        id: "DEN-ENC-10021",
        datetime: "28-Jan-2026, 11:15 AM",
        mode: "OPD",
      },

      complaint: {
        text: "Severe pain in lower right molar region",
        snomed: "27355003",
      },

      vitals: [
        "BP: 124/82 mmHg",
        "Pulse: 76 bpm",
        "Temperature: 98.4°F",
        "SpO₂: 99%",
      ],

      exam: {
        findings:
          "Deep caries in tooth 46 with gingival inflammation and tenderness on percussion",
      },

      diagnosis: {
        name: "Chronic Apical Periodontitis",
        icd10: "K04.5",
        confidence: "High",
        notes:
          "Radiographic evidence of periapical radiolucency. Root canal treatment advised.",
      },

      prescription: [
        {
          drug: "Amoxicillin",
          dose: "500 mg",
          frequency: "TID x 5 days",
          indication: "Dental infection",
        },
        {
          drug: "Ibuprofen",
          dose: "400 mg",
          frequency: "SOS",
          indication: "Pain",
        },
      ],

      procedureDate: "30-Jan-2026",

      insurance: {
        cdt: "D3310 – Root Canal (Molar)",
        linkedDx: "K04.5",
        charge: "₹8,500",
        necessity:
          "Procedure required to eliminate infection and preserve natural tooth.",
        status: "Approved",
      },

      audit: [
        "Record Created: 28-Jan-2026 11:20 – Dr. Ananya Rao",
        "AI Coding Completed: 28-Jan-2026 11:21",
        "Dentist Approval: 28-Jan-2026 11:22",
      ],
    },

    {
      id: "dent-002",
      patientId: "DEN-PT-2026-002",
      name: "Meera Iyer",
      dob: "03-Mar-1989",
      age: 36,
      gender: "Female",

      clinic: {
        name: "SmileCraft Dental Care",
        regId: "TN-DENT-45872",
      },

      dentist: {
        name: "Dr. Ananya Rao, BDS, MDS",
        regNo: "DCI/KA/2015/32456",
        signature: "Digitally Signed",
      },

      encounter: {
        id: "DEN-ENC-10022",
        datetime: "29-Jan-2026, 10:10 AM",
        mode: "OPD",
      },

      complaint: {
        text: "Bleeding gums and bad breath",
        snomed: "309585006",
      },

      vitals: [
        "BP: 118/76 mmHg",
        "Pulse: 74 bpm",
        "Temperature: 98.1°F",
        "SpO₂: 99%",
      ],

      exam: {
        findings:
          "Generalized gingival inflammation with bleeding on probing",
      },

      diagnosis: {
        name: "Chronic Gingivitis",
        icd10: "K05.1",
        confidence: "Moderate",
        notes:
          "Poor oral hygiene noted. Scaling and root planing advised.",
      },

      prescription: [
        {
          drug: "Chlorhexidine Mouthwash",
          dose: "0.12%",
          frequency: "BD x 7 days",
          indication: "Plaque control",
        },
      ],

      procedureDate: "29-Jan-2026",

      insurance: {
        cdt: "D1110 – Scaling",
        linkedDx: "K05.1",
        charge: "₹2,000",
        necessity:
          "Removal of plaque and calculus to reduce inflammation.",
        status: "Pending",
      },

      audit: [
        "Record Created: 29-Jan-2026 10:15 – Dr. Ananya Rao",
        "AI Validation: 29-Jan-2026 10:16",
      ],
    },

    {
      id: "dent-003",
      patientId: "DEN-PT-2026-003",
      name: "Arjun Patel",
      dob: "22-Nov-2001",
      age: 24,
      gender: "Male",

      clinic: {
        name: "SmileCraft Dental Care",
        regId: "TN-DENT-45872",
      },

      dentist: {
        name: "Dr. Ananya Rao, BDS, MDS",
        regNo: "DCI/KA/2015/32456",
        signature: "Digitally Signed",
      },

      encounter: {
        id: "DEN-ENC-10023",
        datetime: "30-Jan-2026, 4:40 PM",
        mode: "Emergency",
      },

      complaint: {
        text: "Broken upper front tooth after fall",
        snomed: "282772001",
      },

      vitals: [
        "BP: 122/80 mmHg",
        "Pulse: 82 bpm",
        "Temperature: 98.6°F",
        "SpO₂: 98%",
      ],

      exam: {
        findings:
          "Ellis Class II fracture involving tooth 11",
      },

      diagnosis: {
        name: "Enamel-Dentin Fracture",
        icd10: "S02.5",
        confidence: "High",
        notes:
          "Composite restoration recommended immediately.",
      },

      prescription: [],

      procedureDate: "30-Jan-2026",

      insurance: {
        cdt: "D2330 – Composite Restoration",
        linkedDx: "S02.5",
        charge: "₹3,500",
        necessity:
          "Restoration required to prevent sensitivity and infection.",
        status: "Approved",
      },

      audit: [
        "Emergency Record Created: 30-Jan-2026 16:45",
        "Dentist Approval: 30-Jan-2026 16:47",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Dental EHR Records</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {patients.map((p) => (
          <div
            key={p.id}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p>Age: {p.age}</p>
            <p>Gender: {p.gender}</p>
            <p>Date: {p.encounter.datetime}</p>

            <button
              onClick={() => setSelectedRecord(p)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
            >
              View Dental Record
            </button>
          </div>
        ))}
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
{`DENTAL CONSULTATION SUMMARY

Patient Name: ${selectedRecord.name}
Patient ID: ${selectedRecord.patientId}
DOB: ${selectedRecord.dob}
Age: ${selectedRecord.age}
Gender: ${selectedRecord.gender}

Clinic: ${selectedRecord.clinic.name}
Dentist: ${selectedRecord.dentist.name}
Registration No: ${selectedRecord.dentist.regNo}

Encounter ID: ${selectedRecord.encounter.id}
Date & Time: ${selectedRecord.encounter.datetime}
Mode: ${selectedRecord.encounter.mode}

Chief Complaint:
${selectedRecord.complaint.text}

Clinical Findings:
${selectedRecord.exam.findings}

Diagnosis:
${selectedRecord.diagnosis.name}
ICD-10: ${selectedRecord.diagnosis.icd10}
Confidence: ${selectedRecord.diagnosis.confidence}

Notes:
${selectedRecord.diagnosis.notes}

Procedure Date: ${selectedRecord.procedureDate}

Insurance:
${selectedRecord.insurance.cdt}
Charge: ${selectedRecord.insurance.charge}
Status: ${selectedRecord.insurance.status}

Audit Trail:
${selectedRecord.audit.join("\n")}
`}
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
