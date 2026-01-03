import React, { useState } from "react";

export default function FDAReporting() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Switch to success card
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 flex items-center justify-center px-4">
      {!submitted ? (
        // Query Card
        <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-xl w-full text-white">
          <h1 className="text-2xl font-bold text-center mb-6">
            FDA / ICH ADR Report
          </h1>

          <textarea
            value={`Patient: John Doe
Age: 38
Gender: Male
Suspect Drug: Aspirin
Indication: Chest pain
Reaction: Mild nausea and dizziness
Seriousness: Non-Serious
Outcome: Recovered
Reporter: Dr. A. Smith, MD`}
            readOnly
            className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-purple-500/30 focus:border-purple-500 focus:ring focus:ring-purple-500/20 transition h-60"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition"
          >
            Submit Report
          </button>
        </div>
      ) : (
        // Success Card
        <div className="bg-green-600/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-white text-center">
          <h1 className="text-2xl font-bold mb-4">✅ Report Submitted</h1>
          <p className="text-white text-lg">
            The ADR report has been successfully submitted to the Pharmacovigilance system.
          </p>
        </div>
      )}
    </div>
  );
}
