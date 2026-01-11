import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VigiBaseADRSubmission() {
  const navigate = useNavigate();

  const [reviewAccepted, setReviewAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ================= EDITABLE ADR / PV DATA =================
  const [form, setForm] = useState({
    caseId: "PV-CLINIC001-00045",
    country: "Oman",

    patientInitials: "J.D.",
    age: 38,
    sex: "Male",

    reporter: "Dr. Ravi Kumar",
    reporterReg: "TNMC-123456",
    institution: "Alphatic Health Clinic",

    reactionTerm: "Gastrointestinal haemorrhage",
    symptom: "Black stools",
    onsetDate: "2026-01-05",
    seriousness: "Serious",
    outcome: "Not recovered",

    suspectDrug: "Aspirin",
    strength: "75 mg",
    indication: "Cardiovascular prophylaxis",
    therapyStart: "2026-01-01",

    causality: "Probable / Likely",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!reviewAccepted) {
      alert("Physician review confirmation is mandatory.");
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    navigate("/ehr"); // 🔁 Select Patient page route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 flex items-center justify-center px-4 text-white">

      {/* ================= FORM ================= */}
      {!submitted ? (
        <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-3xl w-full">

          <h1 className="text-2xl font-bold text-center mb-6">
            WHO–UMC / VigiBase ADR Submission
          </h1>

          <div className="space-y-4 text-sm">

            <h3 className="font-semibold text-purple-300">Patient</h3>
            <input name="patientInitials" value={form.patientInitials} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="age" value={form.age} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="sex" value={form.sex} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />

            <h3 className="font-semibold text-purple-300">Reaction</h3>
            <input name="reactionTerm" value={form.reactionTerm} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="symptom" value={form.symptom} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input type="date" name="onsetDate" value={form.onsetDate} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="seriousness" value={form.seriousness} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="outcome" value={form.outcome} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />

            <h3 className="font-semibold text-purple-300">Suspect Drug</h3>
            <input name="suspectDrug" value={form.suspectDrug} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="strength" value={form.strength} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input name="indication" value={form.indication} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
            <input type="date" name="therapyStart" value={form.therapyStart} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />

            <h3 className="font-semibold text-purple-300">Causality</h3>
            <input name="causality" value={form.causality} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border" />
          </div>

          <label className="flex items-center gap-2 mt-6 text-sm">
            <input
              type="checkbox"
              checked={reviewAccepted}
              onChange={(e) => setReviewAccepted(e.target.checked)}
              className="accent-purple-500"
            />
            I have reviewed, edited, and confirm this ADR report
          </label>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
          >
            Submit to VigiBase
          </button>
        </div>
      ) : (
        /* ================= SUCCESS ================= */
        <div className="bg-green-600/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">

          <h1 className="text-2xl font-bold mb-4">✅ Submission Successful</h1>

          <p className="text-white text-lg mb-6">
            The ADR data has been successfully reported to the
            <strong> VigiBase pharmacovigilance system</strong>.
          </p>

          <button
            onClick={handleClose}
            className="w-full bg-white text-green-700 py-3 rounded-xl font-semibold hover:bg-gray-100"
          >
            Close & Return to Select Patient
          </button>
        </div>
      )}
    </div>
  );
}
