import { useLocation, useNavigate } from "react-router-dom";

export default function DoctorReview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div>No EHR data available</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Doctor Review</h1>

      <pre className="bg-white text-black p-4 rounded max-h-[70vh] overflow-auto">
        {JSON.stringify(state.fhir, null, 2)}
      </pre>

      <button
        onClick={() => navigate("/ehr/report", { state })}
        className="mt-6 bg-green-600 px-6 py-2 rounded"
      >
        Confirm & Proceed
      </button>
    </div>
  );
}
