import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const patientsList = ["Robert", "Linna", "Tina", "Rina"];

export default function EHRName() {
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState("");
  const [prescription, setPrescription] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  /* ================= MOCK EHR (CONSULTATION FORMAT) ================= */
  const mockEHR = {
    patientId: "PT-CLINIC001-0001",
    age: 38,
    gender: "Male",
    date: "03-Jan-2026, 2:35 PM",

    complaint: "Headache for 2 days",

    vitals: {
      bp: "120/80 mmHg",
      hr: "72 bpm",
    },

    diagnosis: {
      code: "R51",
      text: "Tension Headache",
      confidence: 89,
    },

    prescription: [
      { drug: "Paracetamol 500mg", dose: "Twice daily for 5 days", adr: 5 },
      { drug: "Aspirin 75mg", dose: "Once daily (continue)", adr: 22 },
    ],

    claim: {
      code: "CPT 99213",
      description: "Office Visit",
      amount: "₹800",
      status: "Pending approval",
    },
  };

  /* ================= MOCK LAB REPORTS / MEDICAL / MEDICATION ================= */
  /* ================= MOCK LAB REPORTS ================= */
const mockLabReports = [
  { test: "CBC", date: "02-Jan-2026", result: "Normal" },
  { test: "Blood Glucose", date: "02-Jan-2026", result: "110 mg/dL" },
  { test: "Lipid Profile", date: "02-Jan-2026", result: "Borderline High" },
];

/* ================= MOCK PAST MEDICAL HISTORY ================= */
const mockMedicalHistory = [
  { condition: "Hypertension", status: "Controlled" },
  { condition: "Type 2 Diabetes", status: "Monitoring" },
  { condition: "Seasonal Allergies", status: "Intermittent" },
];

/* ================= MOCK MEDICATIONS ================= */
const mockMedications = [
  { drug: "Paracetamol", dose: "500mg", frequency: "Twice daily" },
  { drug: "Aspirin", dose: "75mg", frequency: "Once daily" },
  { drug: "Metformin", dose: "500mg", frequency: "Twice daily" },
];


  /* ================= ACTIONS ================= */
  const startRecording = () => {
    setRecording(true);
    setTimeout(() => {
      setAudioBlob(new Blob(["mock-audio"], { type: "audio/webm" }));
    }, 1500);
  };

  const stopRecording = () => setRecording(false);

  const handleGenerateEHR = () => {
    if (!audioBlob) {
      alert("Please record audio first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowReport(true);
      localStorage.setItem("latestEHR", JSON.stringify(mockEHR));
    }, 2000);
  };

  const goToADR = () => navigate("/fda-reporting");

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-8">

      {/* MAIN GLASS CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 space-y-10">

        {/* PATIENT SELECT */}
        {!selectedPatient && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Select a Patient
            </h2>

            <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 w-64">
              {patientsList.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPatient(p)}
                  className="w-full mb-3 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 font-semibold"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RECORDING + SIDE CARDS */}
        {selectedPatient && (
          <>
            <div className="flex flex-col md:flex-row gap-8">

              {/* ================= RECORDING PANEL ================= */}
<div className="flex-1 bg-white/15 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-8 relative flex flex-col items-center justify-center space-y-6">

  {/* CHANGE PATIENT BUTTON */}
  <button
    onClick={() => setSelectedPatient("")}
    className="absolute top-4 left-4 text-sm bg-white/20 px-4 py-2 rounded-lg"
  >
    Change Patient
  </button>

  {/* MIC ICON */}
  <div className="text-8xl animate-pulse mb-2 text-center">
    🎙️
  </div>

  {/* MOCK RECORDING WAVEFORM */}
  {recording && (
    <div className="flex items-end justify-center gap-1 h-12 mb-4">
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="bg-green-400 w-1 rounded-sm animate-wave"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></span>
      ))}
    </div>
  )}

  <p className="opacity-80 text-lg text-center">
    Recording for <b>{selectedPatient}</b>
  </p>

  {/* RECORD BUTTONS */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
    {!recording ? (
      <button
        className="bg-green-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
        onClick={startRecording}
      >
        Start Recording
      </button>
    ) : (
      <button
        className="bg-red-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
        onClick={stopRecording}
      >
        Stop Recording
      </button>
    )}

    <button
      onClick={handleGenerateEHR}
      disabled={!audioBlob || recording}
      className="bg-blue-600 px-8 py-4 rounded-xl text-lg font-semibold disabled:opacity-50 shadow-lg"
    >
      {loading ? "AI Generating..." : "Generate EHR"}
    </button>
  </div>

  {/* ================= WAVE ANIMATION STYLE ================= */}
  <style>{`
    @keyframes wave {
      0%, 100% { height: 25%; }
      50% { height: 100%; }
    }
    .animate-wave {
      animation: wave 1s infinite ease-in-out;
    }
  `}</style>
</div>



              {/* SIDE PANELS */}
              <div className="flex-1 flex flex-col gap-6">

                {/* Lab Reports */}
                <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Lab Reports</h3>
                  {mockLabReports.map((report, idx) => (
                    <div key={idx} className="mb-2 text-sm opacity-80">
                      <strong>{report.test}</strong> ({report.date})<br />
                      Result: {report.result}<br />
                      Status: <span className={report.status === "Normal" ? "text-green-400" : "text-yellow-400"}>{report.status}</span>
                    </div>
                  ))}
                </div>

                {/* Past Medical */}
                <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Past Medical History</h3>
                  {mockMedicalHistory.map((item, idx) => (
                    <div key={idx} className="mb-2 text-sm opacity-80">
                      <strong>{item.condition}</strong> (Diagnosed: {item.diagnosed})<br />
                      Status: {item.status}
                    </div>
                  ))}
                </div>

                {/* Medication */}
                <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Medication</h3>
                  {mockMedications.map((med, idx) => (
                    <div key={idx} className="mb-2 text-sm opacity-80">
                      <strong>{med.drug}</strong> – {med.dose}, {med.frequency} (Start: {med.startDate})<br />
                      Indication: {med.indication}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* PRESCRIPTION INPUT */}
            <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">
                E-Prescription for {selectedPatient}
              </h3>
              <textarea
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="w-full bg-black/40 border border-pink-500/40 rounded-lg p-3 h-24"
                placeholder="Type prescription here..."
              />
            </div>
          </>
        )}
      </div>

      {/* ================= EHR POPUP ================= */}
      {showReport && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto scroll-smooth">

            <pre className="whitespace-pre-wrap text-sm leading-relaxed">

<h2>CONSULTATION SUMMARY</h2>

Patient Name: {selectedPatient}<br />
Patient ID: PT-CLINIC001-0001<br />
Age: 38<br />
Gender: Male<br />

Clinic Name: Alphatic Health Clinic<br />
Clinic Registration ID: CL-OM-45893<br />
Treating Physician: Dr. Ravi Kumar<br />
Medical Council Registration No: TNMC-123456<br />
Digital Signature: ✔ Verified<br />

Encounter ID: ENC-2026-01-03-0021<br />
Date & Time: 03-Jan-2026, 2:35 PM<br />
Mode of Visit: In-Person<br />

<br />
<h3>CHIEF COMPLAINT</h3>
Headache for 2 days<br />

<br />
<h3>VITALS</h3>
✓ Blood Pressure: 120/80 mmHg<br />
✓ Heart Rate: 72 bpm<br />
✓ Temperature: 36.8°C<br />
✓ SpO₂: 99%<br />

<br />
<h3>CLINICAL ASSESSMENT</h3>
Diagnosis: Tension Headache<br />
ICD-10: R51<br />
Confidence: 89%<br />

<br />
<h3>PRESCRIPTION</h3>
{mockMedications.map((med, idx) => (
  <div key={idx}>
    {med.drug} - {med.dose}, {med.frequency} (Indication: {med.indication})
  </div>
))}

</pre>

            <button
              onClick={goToADR}
              className="mt-6 w-full bg-gradient-to-r from-pink-600 to-purple-600 py-3 rounded-xl font-semibold"
            >
              Proceed to ADR Reporting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
