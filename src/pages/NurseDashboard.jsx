import { useState } from "react";
import BookAppointments from "./BookAppointments";
import { UploadCloud } from "lucide-react";

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [abnormalValues, setAbnormalValues] = useState([]);

  // Handle file upload
  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);

    // Process the first file (mock AI reading)
    const file = files[0];
    const text = await file.text();
    const abnormal = parseAbnormalValues(text);
    setAbnormalValues(abnormal);
  };

  // Mock AI parser to extract only abnormal values
  const parseAbnormalValues = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const results = [];

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase();

      // Blood Pressure
      if (lowerLine.includes("blood pressure")) {
        const bpMatch = line.match(/(\d+)\/(\d+)/);
        if (bpMatch) {
          const systolic = parseInt(bpMatch[1]);
          const diastolic = parseInt(bpMatch[2]);
          if (systolic > 130 || diastolic > 80) {
            results.push("Blood Pressure: " + bpMatch[0] + " mmHg");
          }
        }
        return;
      }

      // Extract numeric value
      const match = line.match(/([\d.]+)\s*(mg\/dL|%|mmHg)?/i);
      if (!match) return;
      const value = parseFloat(match[1]);

      if (lowerLine.includes("glucose") && value > 140) {
        results.push(line.split("|")[0].trim() + ": " + match[0].trim());
      } else if (lowerLine.includes("hba1c") && value > 5.6) {
        results.push(line.split("|")[0].trim() + ": " + match[0].trim());
      } else if (lowerLine.includes("cholesterol") && !lowerLine.includes("hdl") && value > 200) {
        results.push(line.split("|")[0].trim() + ": " + match[0].trim());
      } else if (lowerLine.includes("ldl") && value > 100) {
        results.push(line.split("|")[0].trim() + ": " + match[0].trim());
      } else if (lowerLine.includes("hdl") && value < 40) {
        results.push(line.split("|")[0].trim() + ": " + match[0].trim());
      } else if (lowerLine.includes("triglycerides") && value > 150) {
        results.push(line.split("|")[0].trim() + ": " + match[0].trim());
      }
    });

    return results;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* ===== HEADER TABS ===== */}
      <div className="flex items-center gap-4 border-b border-white/20 mb-6">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-4 py-2 font-semibold rounded-t-lg transition ${
            activeTab === "appointments"
              ? "bg-purple-600 text-white"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          Appointments
        </button>

        <button
          onClick={() => setActiveTab("labReports")}
          className={`px-4 py-2 font-semibold rounded-t-lg transition ${
            activeTab === "labReports"
              ? "bg-purple-600 text-white"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          Lab Reports
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur min-h-[60vh]">
        {activeTab === "appointments" && <BookAppointments />}

        {activeTab === "labReports" && (
          <div className="flex flex-col items-center justify-center space-y-6 py-20">
            {/* Card-like Upload Section */}
            <div className="flex flex-col items-center justify-center w-full max-w-md border-2 border-dashed border-purple-500 rounded-xl p-10 hover:bg-white/5 transition cursor-pointer relative">
              <UploadCloud className="w-12 h-12 text-purple-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Drag & Drop Lab Reports
              </h2>
              <p className="text-sm opacity-70 text-center mb-4">
                Upload PDFs or text files for patient lab records
              </p>
              <input
                type="file"
                multiple
                onChange={handleFiles}
                className="opacity-0 absolute w-full h-full cursor-pointer"
              />
            </div>

            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="w-full max-w-md bg-white/10 p-4 rounded-lg space-y-2">
                <h3 className="text-lg font-semibold">Uploaded Files:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {uploadedFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display Abnormal Values */}
            {abnormalValues.length > 0 && (
              <div className="w-full max-w-md bg-purple-600/20 border border-purple-500 p-6 rounded-xl space-y-2">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">
                  Abnormal Lab Values:
                </h3>
                <ul className="list-disc ml-5 text-purple-100 space-y-1">
                  {abnormalValues.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
