import React, { useState } from "react";

export default function ADRPage() {
  const [view, setView] = useState("");

  /* ================= INPUT COMPONENTS ================= */

  const Field = ({ label, placeholder, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm opacity-80 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full p-3 rounded-lg
          bg-black/40 border border-purple-500/40
          text-white placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-pink-500
        "
      />
    </div>
  );

  const TextArea = ({ label, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm opacity-80 mb-1">{label}</label>
      <textarea
        rows={3}
        placeholder={placeholder}
        className="
          w-full p-3 rounded-lg
          bg-black/40 border border-purple-500/40
          text-white placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-pink-500
        "
      />
    </div>
  );

  /* ================= MOCK ADR REPORTS ================= */

  const adrReports = [
    { patient: "John Doe", drug: "Aspirin 75 mg", reaction: "GI Bleed", risk: 22 },
    { patient: "Linna", drug: "Paracetamol 500 mg", reaction: "Skin Rash", risk: 8 },
  ];

  const riskStyle = (risk) => {
    if (risk > 20) return "bg-red-600/30 border-red-500 text-red-300";
    if (risk > 10) return "bg-yellow-600/30 border-yellow-400 text-yellow-300";
    return "bg-green-600/20 border-green-500 text-green-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 px-6 py-12 text-white flex items-center justify-center">

      {/* ================= HOME ================= */}
      {!view && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-4xl w-full text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-10">ADR Management</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() => setView("reporting")}
              className="cursor-pointer rounded-2xl p-8 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-400/30 hover:scale-105 transition"
            >
              <h3 className="text-2xl font-semibold mb-3">ADR Reporting</h3>
              <p className="opacity-80">
                Regulatory-ready ADR & pharmacovigilance reporting
              </p>
            </div>

            <div
              onClick={() => setView("reports")}
              className="cursor-pointer rounded-2xl p-8 bg-gradient-to-br from-pink-600/30 to-purple-600/30 border border-pink-400/30 hover:scale-105 transition"
            >
              <h3 className="text-2xl font-semibold mb-3">ADR Reports</h3>
              <p className="opacity-80">AI-flagged ADR cases</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADR REPORTING ================= */}
      {view === "reporting" && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-4xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">

          <h2 className="text-3xl font-bold mb-6 text-center">
            ADVERSE DRUG REACTION (AUTO-DETECTED BY AI)
          </h2>

          {/* Calendar included */}
          <Field label="Follow-up Date" type="date" />

          <Field label="Patient Reported Symptom" placeholder="Black stools" />
          <Field label="SNOMED CT" placeholder="62315008" />
          <Field label="Suspected Drug" placeholder="Aspirin" />
          <TextArea label="Reaction" placeholder="Gastrointestinal bleeding" />
          <Field label="Seriousness" placeholder="Serious" />
          <Field label="Outcome" placeholder="Not recovered" />
          <Field label="Causality Assessment" placeholder="Probable" />
          <Field label="Reviewed and Confirmed by" placeholder="Dr. Ravi Kumar" />

          <h2 className="text-3xl font-bold mt-10 mb-6 text-center">
            PHARMACOVIGILANCE CASE (ICH-E2B READY)
          </h2>

          <Field label="PV Case ID" placeholder="PV-CLINIC001-00045" />
          <Field label="Patient Age" placeholder="38" />
          <Field label="Sex" placeholder="Male" />
          <TextArea
            label="Reaction Term (MedDRA)"
            placeholder="Gastrointestinal haemorrhage"
          />
          <Field label="Suspect Drug" placeholder="Aspirin 75 mg" />
          <Field label="Therapy Start Date" type="date" />
          <Field label="Reaction Onset" type="date" />
          <Field label="Outcome" placeholder="Ongoing" />
          <Field label="Reporter" placeholder="Dr. Ravi Kumar" />
          <Field label="Country of Occurrence" placeholder="Oman" />

          <div className="flex justify-between mt-8">
            <button
              onClick={() => alert("ADR Submitted Successfully")}
              className="bg-pink-600 px-6 py-3 rounded-xl font-semibold"
            >
              Submit ADR
            </button>

            <button
              onClick={() => setView("")}
              className="bg-gray-700 px-6 py-3 rounded-xl"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* ================= ADR REPORTS ================= */}
      {view === "reports" && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-5xl w-full shadow-2xl">

          <h2 className="text-3xl font-bold mb-8 text-center">
            ADR Reports (AI-Flagged)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {adrReports.map((adr, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border ${riskStyle(adr.risk)}`}
              >
                <h4 className="text-lg font-bold">{adr.patient}</h4>
                <p>Drug: {adr.drug}</p>
                <p>Reaction: {adr.reaction}</p>
                <p className="mt-3 font-bold">ADR Risk: {adr.risk}%</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setView("")}
              className="bg-purple-600 px-6 py-3 rounded-xl font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
