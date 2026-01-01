import { useState } from "react";

const EHRGenerator = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ehrResult, setEhrResult] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleGenerateEHR = async () => {
    if (!audioFile) return alert("Please upload an audio file.");

    setLoading(true);
    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const res = await fetch("http://localhost:5000/api/generate-ehr", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setEhrResult(data);
      console.log("FHIR EHR:", data.fhir);
    } catch (err) {
      console.error("Error generating EHR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>EHR Generator</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleGenerateEHR} disabled={loading}>
        {loading ? "Processing..." : "Generate EHR"}
      </button>

      {ehrResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>Transcript:</h3>
          <pre>{ehrResult.transcript}</pre>
          <h3>FHIR JSON:</h3>
          <pre>{JSON.stringify(ehrResult.fhir, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EHRGenerator;
