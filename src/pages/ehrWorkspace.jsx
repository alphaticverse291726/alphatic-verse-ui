import React, { useState, useEffect } from "react";

const patientsList = ["John Doe", "Robert", "Linna", "Tina"];

export default function EHRName() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  /* ================= Recording Timer ================= */
  useEffect(() => {
    let timer;
    if (recording) {
      timer = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [recording]);

  const startRecording = () => {
    setRecordingTime(0);
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  /* ================= MOCK CONSULTATION SUMMARY ================= */
  const consultation = {
    patient: {
      name: selectedPatient,
      id: "PT-CLINIC001-0001",
      dob: "12-May-1987",
      age: 38,
      gender: "Male",
    },
    clinic: {
      name: "Alphatic Health Clinic",
      regId: "CL-OM-45893",
    },
    physician: {
      name: "Dr. Ravi Kumar",
      regNo: "TNMC-123456",
      signature: "✔ Verified",
    },
    encounter: {
      id: "ENC-2026-01-03-0021",
      datetime: "03-Jan-2026, 2:35 PM",
      mode: "In-Person",
    },
    complaint: {
      text: "Headache for 2 days",
      snomed: "25064002",
    },
    vitals: [
      "Blood Pressure: 120/80 mmHg (Normal)",
      "Heart Rate: 72 bpm (Normal)",
      "Temperature: 36.8°C",
      "SpO₂: 99%",
    ],
    diagnosis: {
      name: "Tension Headache",
      icd10: "R51",
      confidence: "89%",
      notes:
        "No neurological deficits, vitals stable, no red-flag symptoms observed.",
    },
    prescription: [
      {
        drug: "Paracetamol",
        dose: "500 mg",
        frequency: "Twice daily",
        indication: "Headache",
      },
      {
        drug: "Aspirin",
        dose: "75 mg",
        frequency: "Once daily",
        indication: "Cardiovascular prophylaxis",
      },
    ],
    insurance: {
      cpt: "CPT 99213 – Office Visit",
      charge: "₹800",
      status: "Pending approval",
    },
  };

  const generateEHR = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowReport(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 text-white p-8">

      {/* ===== PATIENT SELECTION ===== */}
      {!selectedPatient && (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl font-bold">Select a Patient</h2>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl w-64">
            {patientsList.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPatient(p)}
                className="w-full mb-3 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== RECORDING ===== */}
      {selectedPatient && (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-semibold">
            Recording for {selectedPatient}
          </h2>

          <div className="text-6xl animate-pulse">🎤</div>

          {recording ? (
            <button
              onClick={stopRecording}
              className="bg-red-600 px-6 py-2 rounded-lg"
            >
              Stop Recording ({recordingTime}s)
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-green-600 px-6 py-2 rounded-lg"
            >
              Start Recording
            </button>
          )}

          <button
            disabled={recording || loading}
            onClick={generateEHR}
            className="bg-blue-600 px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "AI Generating EHR..." : "Generate EHR"}
          </button>
        </div>
      )}

      {/* ===== CONSULTATION SUMMARY POPUP ===== */}
      {showReport && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
CONSULTATION SUMMARY

Patient Name: {consultation.patient.name}
Patient ID: {consultation.patient.id}
Date of Birth: {consultation.patient.dob}
Age: {consultation.patient.age}
Gender: {consultation.patient.gender}

Clinic Name: {consultation.clinic.name}
Clinic Registration ID: {consultation.clinic.regId}
Treating Physician: {consultation.physician.name}
Medical Council Registration No: {consultation.physician.regNo}
Digital Signature: {consultation.physician.signature}

Encounter ID: {consultation.encounter.id}
Date & Time: {consultation.encounter.datetime}
Mode of Visit: {consultation.encounter.mode}

CHIEF COMPLAINT

{consultation.complaint.text}
(SNOMED CT: {consultation.complaint.snomed})

VITALS

{consultation.vitals.join("\n")}

CLINICAL ASSESSMENT

Diagnosis:
{consultation.diagnosis.name}
ICD-10: {consultation.diagnosis.icd10}
(Confidence: {consultation.diagnosis.confidence})

Clinical Notes:
{consultation.diagnosis.notes}

PRESCRIPTION
Drug        Dose        Frequency        Indication
{consultation.prescription
  .map(
    (p) =>
      `${p.drug.padEnd(12)}${p.dose.padEnd(12)}${p.frequency.padEnd(
        16
      )}${p.indication}`
  )
  .join("\n")}

INSURANCE CLAIM DETAILS

Procedure Code: {consultation.insurance.cpt}
Charge: {consultation.insurance.charge}
Claim Status: {consultation.insurance.status}
            </pre>

            <button
              onClick={() => setShowReport(false)}
              className="mt-6 w-full bg-gradient-to-r from-pink-600 to-purple-600 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
