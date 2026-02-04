import React, { useState } from "react";

export default function ADRPage() {
  const [view, setView] = useState("");

  /* ================= INPUT COMPONENTS ================= */
  const Field = ({ label, placeholder, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm sm:text-base opacity-80 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full p-3 sm:p-4 rounded-lg
          bg-black/40 border border-purple-500/40
          text-white placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-pink-500
          transition
        "
      />
    </div>
  );

  const TextArea = ({ label, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm sm:text-base opacity-80 mb-1">
        {label}
      </label>
      <textarea
        rows={3}
        placeholder={placeholder}
        className="
          w-full p-3 sm:p-4 rounded-lg
          bg-black/40 border border-purple-500/40
          text-white placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-pink-500
          transition
        "
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 px-4 sm:px-6 lg:px-12 py-10 flex justify-center items-start sm:items-center text-white">

      {/* ================= HOME ================= */}
      {!view && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 max-w-3xl w-full text-center shadow-2xl space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            ADR Management
          </h2>

          <div
            onClick={() => setView("reporting")}
            className="cursor-pointer rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-400/30 hover:scale-105 transition"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              ADR Reporting
            </h3>
            <p className="opacity-80 text-sm sm:text-base">
              Regulatory-ready adverse drug reaction & pharmacovigilance reporting
            </p>
          </div>
        </div>
      )}

      {/* ================= ADR REPORTING ================= */}
      {view === "reporting" && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 max-w-4xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            ADVERSE DRUG REACTION (AUTO-DETECTED BY AI)
          </h2>

          <Field label="Follow-up Date" type="date" />
          <Field label="Patient Reported Symptom" placeholder="Black stools" />
          <Field label="SNOMED CT" placeholder="62315008" />
          <Field label="Suspected Drug" placeholder="Aspirin" />
          <TextArea
            label="Reaction"
            placeholder="Gastrointestinal bleeding"
          />
          <Field label="Seriousness" placeholder="Serious" />
          <Field label="Outcome" placeholder="Not recovered" />
          <Field
            label="Causality Assessment"
            placeholder="Probable"
          />
          <Field
            label="Reviewed and Confirmed by"
            placeholder="Dr. Ravi Kumar"
          />

          <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-6 text-center">
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

          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
            <button
              onClick={() => alert("ADR Submitted Successfully")}
              className="bg-pink-600 px-6 py-3 rounded-xl font-semibold w-full sm:w-auto"
            >
              Submit ADR
            </button>

            <button
              onClick={() => setView("")}
              className="bg-gray-700 px-6 py-3 rounded-xl w-full sm:w-auto"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
