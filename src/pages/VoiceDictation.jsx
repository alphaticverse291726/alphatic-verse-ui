import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, StopCircle, ArrowRight, FileText, ArrowLeft } from "lucide-react";

/* ------------------------
  Questions & Mock Transcripts
------------------------- */
const questions = [
  "Please describe the type and nature of the pain.",
  "How long has the patient been experiencing this pain?",
  "Is there any radiation or referral of the pain?",
  "Please record the final diagnosis and clinical impression.",
];

const mockTranscripts = [
  "Patient reports sharp, intermittent pain localized to the lower left molar region.",
  "Pain has been present for the past three days.",
  "Pain radiates toward the left ear and mandibular region.",
  "Deep dental caries involving tooth 36 with pulpal involvement. Root canal therapy advised.",
];

export default function ClinicalWorkflow() {
  const navigate = useNavigate();

  const [step, setStep] = useState("questionnaire");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [showTranscriptPopup, setShowTranscriptPopup] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const [painAssessment, setPainAssessment] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");

  const [ePrescription, setEPrescription] = useState([
    { drug: "Amoxicillin", dose: "500 mg", frequency: "Three times daily", duration: "5 days" },
    { drug: "Ibuprofen", dose: "400 mg", frequency: "Three times daily", duration: "3 days" },
  ]);

  /* ------------------------
    Voice Recording (Mock)
  ------------------------- */
  const startRecording = () => setIsRecording(true);

  const stopRecording = () => {
    setIsRecording(false);
    setCurrentTranscript(mockTranscripts[currentQuestion]);
    setShowTranscriptPopup(true);
  };

  const confirmTranscript = () => {
    setShowTranscriptPopup(false);

    if (currentQuestion < questions.length - 1) {
      setPainAssessment([...painAssessment, currentTranscript]);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setDiagnosis(currentTranscript);
      setStep("prescription");
    }
  };

  const updateMedication = (index, field, value) => {
    const updated = [...ePrescription];
    updated[index][field] = value;
    setEPrescription(updated);
  };

  const addMedication = () => {
    setEPrescription([
      ...ePrescription,
      { drug: "", dose: "", frequency: "", duration: "" },
    ]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#120015] via-[#1a062b] to-[#060008] text-white flex items-center justify-center p-4">

      {/* ==========================
        QUESTIONNAIRE
      ========================== */}
      {step === "questionnaire" && (
        <div className="max-w-md w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 flex flex-col items-center gap-6">
          <div
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-6 rounded-full cursor-pointer ${
              isRecording
                ? "bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"
                : "bg-gradient-to-r from-purple-400 to-pink-400"
            }`}
          >
            {isRecording ? <StopCircle size={36} /> : <Mic size={36} />}
          </div>

          <h2 className="text-lg font-bold text-center">
            {isRecording ? "Recording…" : questions[currentQuestion]}
          </h2>

          <p className="text-sm text-white/70 text-center">
            Tap the microphone to record
          </p>
        </div>
      )}

      {/* ==========================
        TRANSCRIPT POPUP
      ========================== */}
      {showTranscriptPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="max-w-md w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
            <h3 className="font-bold text-pink-300 mb-2">
              Transcription Preview
            </h3>

            <textarea
              value={currentTranscript}
              onChange={(e) => setCurrentTranscript(e.target.value)}
              className="w-full min-h-[120px] p-3 rounded bg-white/20 text-white"
            />

            <button
              onClick={confirmTranscript}
              className="mt-4 w-full py-3 rounded bg-gradient-to-r from-pink-400 to-purple-400 text-black font-bold flex items-center justify-center gap-2"
            >
              Confirm & Continue <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ==========================
        E-PRESCRIPTION
      ========================== */}
      {step === "prescription" && (
        <div className="max-w-lg w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-pink-300">E-Prescription</h2>

          {ePrescription.map((med, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input value={med.drug} onChange={(e) => updateMedication(i,"drug",e.target.value)} placeholder="Drug" className="p-2 rounded bg-white/20" />
              <input value={med.dose} onChange={(e) => updateMedication(i,"dose",e.target.value)} placeholder="Dose" className="p-2 rounded bg-white/20" />
              <input value={med.frequency} onChange={(e) => updateMedication(i,"frequency",e.target.value)} placeholder="Frequency" className="p-2 rounded bg-white/20" />
              <input value={med.duration} onChange={(e) => updateMedication(i,"duration",e.target.value)} placeholder="Duration" className="p-2 rounded bg-white/20" />
            </div>
          ))}

          <button onClick={addMedication} className="py-2 rounded bg-white/20">
            + Add Medication
          </button>

          <button
            onClick={() => setStep("review")}
            className="py-3 rounded bg-gradient-to-r from-pink-400 to-purple-400 text-black font-bold"
          >
            Review & Generate Document
          </button>
        </div>
      )}

      {/* ==========================
        FINAL CLINICAL DOCUMENT
      ========================== */}
      {step === "review" && (
        <div className="max-w-4xl w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 space-y-6">
          <h1 className="text-2xl font-bold text-pink-300 flex items-center gap-2">
            <FileText /> Clinical Encounter Document
          </h1>

          <section>
            <h3 className="font-semibold text-pink-200">Chief Complaint</h3>
            <p>{painAssessment[0]}</p>
          </section>

          <section>
            <h3 className="font-semibold text-pink-200">History of Present Illness</h3>
            <ul className="list-disc pl-6">
              {painAssessment.slice(1).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-pink-200">Clinical Diagnosis</h3>
            <p>{diagnosis}</p>
          </section>

          <section>
            <h3 className="font-semibold text-pink-200">Treatment & Prescription</h3>
            <ul className="list-disc pl-6">
              {ePrescription.map((med, i) => (
                <li key={i}>
                  {med.drug} — {med.dose}, {med.frequency}, for {med.duration}
                </li>
              ))}
            </ul>
          </section>

          {/* ===== BACK TO EHR VERSE ===== */}
          <div className="pt-6 border-t border-white/20 flex justify-between items-center">
            <p className="text-sm text-white/60">
              Generated on {new Date().toLocaleString()}
            </p>

            <button
              onClick={() => navigate("/ehrverse")}
              className="flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30"
            >
              <ArrowLeft size={16} />
              Back to EHR Verse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
