import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const patientsList = ["Robert", "Linna", "Tina", "Rina"];

// 🔑 BACKEND BASE URL
const BACKEND_URL =
  "https://didactic-dollop-4j5jgp497vrpcj4g7-8001.app.github.dev";

export default function EHRWorkspace() {
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState("");
  const [prescription, setPrescription] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // ================= Patient =================
  const handlePatientSelect = (name) => setSelectedPatient(name);

  // ================= Prescription =================
  const handlePrescriptionChange = (e) =>
    setPrescription(e.target.value);

  const handlePrescriptionSave = () => {
    alert(`Prescription saved for ${selectedPatient}`);
    setPrescription("");
  };

  // ================= Audio Recording =================
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) =>
      audioChunksRef.current.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      setAudioBlob(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // ================= Generate EHR (FHIR) =================
  const handleGenerateEHR = async () => {
    if (!audioBlob) {
      alert("Please record audio first.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ TRANSCRIBE AUDIO (Whisper)
      const formData = new FormData();
      formData.append("file", audioBlob);

      const transcribeRes = await fetch(
        `${BACKEND_URL}/api/transcribe`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!transcribeRes.ok) {
        throw new Error("Transcription failed");
      }

      const { transcript } = await transcribeRes.json();

      // 2️⃣ GENERATE FHIR EHR
      const fhirRes = await fetch(
        `${BACKEND_URL}/api/generate-fhir`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript }),
        }
      );

      if (!fhirRes.ok) {
        throw new Error("FHIR generation failed");
      }

      const fhirData = await fhirRes.json();

      // 3️⃣ ATTACH METADATA
      const ehrData = {
        ...fhirData,
        patientName: selectedPatient,
        prescription: prescription || "No medication entered",
      };

      // 4️⃣ SAVE LOCALLY
      const existing =
        JSON.parse(localStorage.getItem("ehrRecords")) || [];

      localStorage.setItem(
        "ehrRecords",
        JSON.stringify([...existing, ehrData])
      );

      navigate("/ehr/report", { state: ehrData });
    } catch (err) {
      console.error(err);
      alert("Error generating EHR");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-8 gap-8">
      {!selectedPatient && (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl font-bold">Select a Patient</h2>

          <div className="bg-gray-800 rounded-xl p-6 w-64">
            {patientsList.map((patient) => (
              <button
                key={patient}
                onClick={() => handlePatientSelect(patient)}
                className="w-full bg-pink-600 hover:bg-pink-500 py-3 mb-3 rounded-lg"
              >
                {patient}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPatient && (
        <>
          <div className="flex gap-8">
            <div className="flex-1 bg-gray-800 rounded-xl p-8 text-center">
              <button
                onClick={() => setSelectedPatient("")}
                className="mb-4 bg-purple-600 px-4 py-2 rounded-lg"
              >
                Change Patient
              </button>

              <div className="text-6xl mb-4">🎤</div>

              {!recording ? (
                <button
                  onClick={startRecording}
                  className="bg-green-600 px-6 py-2 rounded-lg mb-4"
                >
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-600 px-6 py-2 rounded-lg mb-4"
                >
                  Stop Recording
                </button>
              )}

              {audioBlob && (
                <audio
                  controls
                  src={URL.createObjectURL(audioBlob)}
                  className="mx-auto mb-4"
                />
              )}

              <button
                onClick={handleGenerateEHR}
                disabled={loading}
                className="bg-blue-600 px-6 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate EHR"}
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl mb-2">
              E-Prescription for {selectedPatient}
            </h3>

            <textarea
              value={prescription}
              onChange={handlePrescriptionChange}
              className="w-full bg-gray-900 p-3 rounded-lg mb-4"
              placeholder="Type prescription..."
            />

            <button
              onClick={handlePrescriptionSave}
              className="bg-pink-500 px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}
