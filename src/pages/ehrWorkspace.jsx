import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const patientsList = ["Robert", "Linna", "Tina", "Rina"];

// ✅ Codespaces backend URL
const BACKEND_URL = "https://didactic-dollop-4j5jgp497vrpcj4g7-8001.app.github.dev";
;

export default function EHRName() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [prescription, setPrescription] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // ================= Patient Selection =================
  const handlePatientSelect = (name) => setSelectedPatient(name);

  // ================= Prescription =================
  const handlePrescriptionChange = (e) => setPrescription(e.target.value);
  const handlePrescriptionSave = () => {
    alert(`Prescription saved for ${selectedPatient}:\n${prescription}`);
    setPrescription("");
  };

  // ================= Audio Recording =================
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // ✅ IMPORTANT FIX (Codespaces / Chrome)
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

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

  // ================= Generate EHR =================
  const handleGenerateEHR = async () => {
    if (!audioBlob) {
      alert("Please record audio first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch(`${BACKEND_URL}/api/generate-ehr`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      const ehrData = {
        ...data,
        patientName: selectedPatient,
        prescription: prescription || "No medication entered",
      };

      const existing =
        JSON.parse(localStorage.getItem("ehrRecords")) || [];

      localStorage.setItem(
        "ehrRecords",
        JSON.stringify([...existing, ehrData])
      );

      navigate("/ehr/report", { state: ehrData });
    } catch (err) {
      console.error(err);
      alert("Failed to generate EHR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-8 gap-8">
      {!selectedPatient && (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl font-bold text-center">Select a Patient</h2>
          <p className="text-gray-300 text-lg">
            Choose a patient to start generating EHR
          </p>

          <div className="bg-gray-800 border border-purple-500/40 rounded-2xl shadow-lg p-6 mt-4 w-64">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Patient List
            </h3>
            <div className="flex flex-col gap-3">
              {patientsList.map((patient) => (
                <button
                  key={patient}
                  onClick={() => handlePatientSelect(patient)}
                  className="bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 text-left"
                >
                  {patient}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPatient && (
        <>
          <div className="flex flex-col md:flex-row gap-8 flex-1">
            <div className="relative flex-1 flex flex-col justify-center items-center bg-gray-800 border border-pink-500/40 rounded-2xl p-8 shadow-lg">
              <button
                onClick={() => setSelectedPatient("")}
                className="absolute top-4 left-4 bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"
              >
                Change Patient
              </button>

              <div className="text-pink-500 text-6xl mb-4 animate-pulse">🎤</div>

              <p className="text-lg opacity-80 mb-6 text-center">
                Click to record EHR for{" "}
                <span className="font-semibold">{selectedPatient}</span>
              </p>

              {!recording ? (
                <button
                  onClick={startRecording}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg mb-4"
                >
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg mb-4"
                >
                  Stop Recording
                </button>
              )}

              {audioBlob && (
                <audio
                  controls
                  src={URL.createObjectURL(audioBlob)}
                  className="mb-4"
                />
              )}

              <button
                onClick={handleGenerateEHR}
                disabled={loading || !audioBlob}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Generating EHR..." : "Generate EHR"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
