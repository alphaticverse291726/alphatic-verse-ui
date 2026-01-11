import React, { useState } from "react";

export default function EHRRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

const patients = [
  {
    id: "patient-001",
    patientId: "PT-CLINIC001-0001",
    name: "John Doe",
    dob: "12-May-1987",
    age: 38,
    gender: "Male",

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

    therapyStart: "01-Jan-2026",

    insurance: {
      cpt: "CPT 99213 – Office Visit",
      linkedDx: "R51 – Tension Headache",
      charge: "₹800",
      necessity:
        "Neurological evaluation and vital-sign monitoring performed for acute headache.",
      status: "Pending approval",
    },

    adr: {
      followUp: "05-Jan-2026",
      symptom: "Black stools",
      snomed: "62315008",
      suspectDrug: "Aspirin",
      reaction: "Gastrointestinal bleeding",
      seriousness: "Serious",
      outcome: "Not recovered",
      causality: "Probable",
      reviewedBy: "Dr. Ravi Kumar",
    },

    pv: {
      caseId: "PV-CLINIC001-00045",
      age: 38,
      sex: "Male",
      meddra: "Gastrointestinal haemorrhage",
      drug: "Aspirin 75 mg",
      therapyStart: "01-Jan-2026",
      onset: "05-Jan-2026",
      outcome: "Ongoing",
      reporter: "Dr. Ravi Kumar",
      country: "Oman",
    },

    audit: [
      "Record Created: 03-Jan-2026, 14:36 – Dr. Ravi Kumar",
      "AI Coding & Validation: 03-Jan-2026, 14:37 – Alphatic AI Engine",
      "Physician Approval: 03-Jan-2026, 14:38 – Dr. Ravi Kumar",
    ],
  },
];


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 p-10 text-white">

      <h1 className="text-3xl font-bold mb-8">EHR Records</h1>

      {/* ===== RECORD CARDS (UNCHANGED) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((p) => (
          <div
            key={p.id}
            className="
  bg-gradient-to-br from-white/10 via-purple-500/10 to-pink-500/10
  backdrop-blur-xl
  border border-white/20
  rounded-xl p-6
  shadow-lg shadow-pink-500/10
  hover:shadow-pink-500/30
  transition
"

          >
            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
            <p><b>Age:</b> {p.age}</p>
            <p><b>Gender:</b> {p.gender}</p>
            <p><b>Date:</b> {p.date}</p>

            <button
              onClick={() => setSelectedRecord(p)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
            >
              View Full Record
            </button>
          </div>
        ))}
      </div>

      {/* ===== CONSULTATION SUMMARY POPUP (FORMAT FIXED) ===== */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div
  className="
    bg-gradient-to-br from-white/10 via-purple-500/10 to-pink-500/10
    backdrop-blur-2xl
    border border-white/20
    rounded-2xl
    p-8
    max-w-4xl w-full
    max-h-[90vh] overflow-y-auto
    shadow-2xl shadow-purple-500/20
  "
>


            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-white">
<h1>CONSULTATION SUMMARY</h1>

Patient Name: {selectedRecord.name}<br></br>
Patient ID: {selectedRecord.patientId}<br></br>
Date of Birth: {selectedRecord.dob}<br></br>
Age: {selectedRecord.age}<br></br>
Gender: {selectedRecord.gender}<br></br>

Clinic Name: {selectedRecord.clinic?.name}<br></br>
Clinic Registration ID: {selectedRecord.clinic?.regId}<br></br>
Treating Physician: {selectedRecord.physician?.name}<br></br>
Medical Council Registration No: {selectedRecord.physician?.regNo}<br></br>
Digital Signature: {selectedRecord.physician?.signature}<br></br>

Encounter ID: {selectedRecord.encounter?.id}<br></br>
Date & Time: {selectedRecord.encounter?.datetime}<br></br>
Mode of Visit: {selectedRecord.encounter?.mode}<br></br>

<br></br>
CHIEF COMPLAINT<br></br>

{selectedRecord.complaint?.text}
(SNOMED CT: {selectedRecord.complaint?.snomed})<br></br>

<br></br>
VITALS<br></br>

{selectedRecord.vitals?.map((v) => `✓ ${v}`).join("\n")}<br></br>

<br></br>
CLINICAL ASSESSMENT<br></br>

Diagnosis:
{selectedRecord.diagnosis?.name}<br></br>
ICD-10: {selectedRecord.diagnosis?.icd10}
(Confidence: {selectedRecord.diagnosis?.confidence})<br></br>
<br></br>
CLINICAL NOTES:<br></br>
{selectedRecord.diagnosis?.notes}<br></br>

<br></br>
PRESCRIPTION<br></br>
Drug        Dose        Frequency        Indication<br></br>
{selectedRecord.prescription
  ?.map(
    (p) =>
      `${p.drug.padEnd(12)}${p.dose.padEnd(12)}${p.frequency.padEnd(
        16
      )}${p.indication}`
  )
  .join("\n")}<br></br>

<br></br>
Therapy Start Date: {selectedRecord.therapyStart}<br></br>

<br></br>
INSURANCE CLAIM DETAILS<br></br>

Procedure Code: {selectedRecord.insurance?.cpt}<br></br>
Linked Diagnosis: {selectedRecord.insurance?.linkedDx}<br></br>
Charge: {selectedRecord.insurance?.charge}<br></br>

Medical Necessity:
{selectedRecord.insurance?.necessity}<br></br>

Claim Status: {selectedRecord.insurance?.status}<br></br>

<br></br>
ADVERSE DRUG REACTION (AUTO-DETECTED BY AI)<br></br>

Follow-up Date: {selectedRecord.adr?.followUp}<br></br>
Patient Reported Symptom: {selectedRecord.adr?.symptom}<br></br>
SNOMED CT: {selectedRecord.adr?.snomed}<br></br>

Suspected Drug: {selectedRecord.adr?.suspectDrug}<br></br>
Reaction: {selectedRecord.adr?.reaction}<br></br>
Seriousness: {selectedRecord.adr?.seriousness}<br></br>
Outcome: {selectedRecord.adr?.outcome}<br></br>
Causality Assessment: {selectedRecord.adr?.causality}<br></br>

Reviewed and Confirmed by: {selectedRecord.adr?.reviewedBy}<br></br>

<br></br>
PHARMACOVIGILANCE CASE (ICH-E2B READY)<br></br>

PV Case ID: {selectedRecord.pv?.caseId}<br></br>
Patient Age: {selectedRecord.pv?.age}<br></br>
Sex: {selectedRecord.pv?.sex}<br></br>
Reaction Term (MedDRA): {selectedRecord.pv?.meddra}<br></br>
Suspect Drug: {selectedRecord.pv?.drug}<br></br>
Therapy Start Date: {selectedRecord.pv?.therapyStart}<br></br>
Reaction Onset: {selectedRecord.pv?.onset}<br></br>
Outcome: {selectedRecord.pv?.outcome}<br></br>
Reporter: {selectedRecord.pv?.reporter}<br></br>
Country of Occurrence: {selectedRecord.pv?.country}<br></br>

<br></br>
AUDIT TRAIL<br></br>

{selectedRecord.audit?.join("\n")}
</pre>


            <button
              onClick={() => setSelectedRecord(null)}
              className="
  mt-4 w-full
  bg-gradient-to-r from-pink-500 to-purple-600
  hover:from-pink-600 hover:to-purple-700
  py-2 rounded
  shadow-md shadow-pink-500/30
"

            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
