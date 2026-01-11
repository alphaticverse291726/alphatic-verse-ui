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

              {/* RECORDING PANEL */}
              <div className="flex-1 bg-white/15 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-8 flex flex-col items-center justify-center relative">
                <button
                  onClick={() => setSelectedPatient("")}
                  className="absolute top-4 left-4 text-sm bg-white/20 px-4 py-2 rounded-lg"
                >
                  Change Patient
                </button>

                <div className="text-6xl animate-pulse mb-4">🎤</div>
                <p className="opacity-80 mb-6">
                  Recording for <b>{selectedPatient}</b>
                </p>

                {!recording ? (
                  <button onClick={startRecording} className="bg-green-600 px-6 py-2 rounded-lg mb-3">
                    Start Recording
                  </button>
                ) : (
                  <button onClick={stopRecording} className="bg-red-600 px-6 py-2 rounded-lg mb-3">
                    Stop Recording
                  </button>
                )}

                <button
                  onClick={handleGenerateEHR}
                  disabled={loading || !audioBlob}
                  className="bg-blue-600 px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "AI Generating EHR..." : "Generate EHR"}
                </button>
              </div>

              {/* SIDE PANELS (RESTORED) */}
              <div className="flex-1 flex flex-col gap-6">
                {["Lab Report", "Past Medical", "Medication"].map((title) => (
                  <div
                    key={title}
                    className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="opacity-70 text-sm">Mock data available</p>
                  </div>
                ))}
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

Patient Name: John Doe<br></br>
Patient ID: PT-CLINIC001-0001<br></br>
Date of Birth: 12-May-1987<br></br>
Age: 38<br></br>
Gender: Male<br></br>

Clinic Name: Alphatic Health Clinic<br></br>
Clinic Registration ID: CL-OM-45893<br></br>
Treating Physician: Dr. Ravi Kumar<br></br>
Medical Council Registration No: TNMC-123456<br></br>
Digital Signature: ✔ Verified<br></br>

Encounter ID: ENC-2026-01-03-0021<br></br>
Date & Time: 03-Jan-2026, 2:35 PM<br></br>
Mode of Visit: In-Person<br></br>

<br></br>
<h3>CHIEF COMPLAINT</h3>
Headache for 2 days<br></br>
(SNOMED CT: 25064002)<br></br>

<br></br>
<h3>VITALS</h3>
✓ Blood Pressure: 120/80 mmHg (Normal)<br></br>
✓ Heart Rate: 72 bpm (Normal)<br></br>
✓ Temperature: 36.8°C<br></br>
✓ SpO₂: 99%<br></br>

<br></br>
<h3>CLINICAL ASSESSMENT</h3>
Diagnosis: Tension Headache<br></br>
ICD-10: R51<br></br>
(Confidence: 89%)<br></br>

<br></br>
<h3>CLINICAL NOTES:</h3>
No neurological deficits, vitals stable, no red-flag symptoms observed.<br></br>

<br></br>
<h3>PRESCRIPTION</h3>
Drug&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dose&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Frequency&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indication<br></br>
Paracetamol&nbsp;&nbsp;500 mg&nbsp;&nbsp;&nbsp;&nbsp;Twice daily&nbsp;&nbsp;&nbsp;&nbsp;Headache<br></br>
Aspirin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;75 mg&nbsp;&nbsp;&nbsp;&nbsp;Once daily&nbsp;&nbsp;&nbsp;&nbsp;Cardiovascular prophylaxis<br></br>

<br></br>
Therapy Start Date: 01-Jan-2026<br></br>

<br></br>
<h3>INSURANCE CLAIM DETAILS</h3>
Procedure Code: CPT 99213 – Office Visit<br></br>
Linked Diagnosis: R51 – Tension Headache<br></br>
Charge: ₹800<br></br>
Medical Necessity: Neurological evaluation and vital-sign monitoring performed for acute headache.<br></br>
Claim Status: Pending approval<br></br>

<br></br>
<h3>ADVERSE DRUG REACTION (AUTO-DETECTED BY AI)</h3>
Follow-up Date: 05-Jan-2026<br></br>
Patient Reported Symptom: Black stools<br></br>
SNOMED CT: 62315008<br></br>
Suspected Drug: Aspirin<br></br>
Reaction: Gastrointestinal bleeding<br></br>
Seriousness: Serious<br></br>
Outcome: Not recovered<br></br>
Causality Assessment: Probable<br></br>
Reviewed and Confirmed by: Dr. Ravi Kumar<br></br>

<br></br>
<h3>PHARMACOVIGILANCE CASE (ICH-E2B READY)</h3>
PV Case ID: PV-CLINIC001-00045<br></br>
Patient Age: 38<br></br>
Sex: Male<br></br>
Reaction Term (MedDRA): Gastrointestinal haemorrhage<br></br>
Suspect Drug: Aspirin 75 mg<br></br>
Therapy Start Date: 01-Jan-2026<br></br>
Reaction Onset: 05-Jan-2026<br></br>
Outcome: Ongoing<br></br>
Reporter: Dr. Ravi Kumar<br></br>
Country of Occurrence: Oman<br></br>

<br></br>
<h3>AUDIT TRAIL</h3>
Record Created: 03-Jan-2026, 14:36 – Dr. Ravi Kumar<br></br>
AI Coding & Validation: 03-Jan-2026, 14:37 – Alphatic AI Engine<br></br>
Physician Approval: 03-Jan-2026, 14:38 – Dr. Ravi Kumar<br></br>

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
