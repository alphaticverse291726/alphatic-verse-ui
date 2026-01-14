import { useState, useRef } from "react";
import BookAppointments from "./BookAppointments";
import { UploadCloud, CreditCard, CheckCircle } from "lucide-react";

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const invoiceRef = useRef();

  // ===== DATA =====
  const patients = [
    { name: "John Doe", fee: 500 },
    { name: "Maria Smith", fee: 650 },
    { name: "Abdul Rahman", fee: 400 },
    { name: "Linda George", fee: 700 },
  ];

  const prescriptions = {
    "John Doe": [
      { drug: "Metformin 500mg", dose: "1-0-1", days: 30 },
      { drug: "Atorvastatin 10mg", dose: "0-0-1", days: 30 },
    ],
    "Maria Smith": [
      { drug: "Amlodipine 5mg", dose: "1-0-0", days: 30 },
    ],
    "Abdul Rahman": [
      { drug: "Pantoprazole 40mg", dose: "1-0-0", days: 14 },
    ],
    "Linda George": [
      { drug: "Levothyroxine 50mcg", dose: "1-0-0", days: 60 },
    ],
  };

  // ===== STATES =====
  const [selectedPatient, setSelectedPatient] = useState("");
  const [abnormalValues, setAbnormalValues] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const currentPatient = patients.find(p => p.name === selectedPatient);

  // ===== LAB PARSER =====
  const handleFiles = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    setAbnormalValues(parseAbnormalValues(text));
  };

  const parseAbnormalValues = (text) => {
    const results = [];
    text.split("\n").forEach(line => {
      const l = line.toLowerCase();
      const m = line.match(/([\d.]+)/);
      if (!m) return;
      const v = parseFloat(m[1]);

      if (l.includes("glucose") && v > 140) results.push(line);
      if (l.includes("hba1c") && v > 5.6) results.push(line);
      if (l.includes("cholesterol") && v > 200) results.push(line);
    });
    return results;
  };

  // ===== PAYMENT =====
  const confirmPayment = () => {
    if (!selectedPatient || !paymentMode) {
      alert("Select patient and payment mode");
      return;
    }
    setInvoiceId(`INV-${Date.now()}`);
    setPaymentDone(true);
  };

  const resetPayment = () => {
    setPaymentDone(false);
    setPaymentMode("");
    setInvoiceId("");
  };

  const printInvoice = () => {
    const content = invoiceRef.current.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-10">

      {/* ===== TABS ===== */}
      <div className="flex gap-4 border-b border-white/10 mb-10">
        {["appointments", "labReports", "payments"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-t-xl font-semibold
              ${activeTab === tab
                ? "bg-white/10 border border-white/20 text-pink-400"
                : "text-white/60 hover:text-white"
              }`}
          >
            {tab === "appointments" ? "Appointments" :
             tab === "labReports" ? "Lab Reports" : "Payments"}
          </button>
        ))}
      </div>

      <div className="rounded-3xl p-8 bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl">

        {/* ===== APPOINTMENTS ===== */}
        {activeTab === "appointments" && <BookAppointments />}

        {/* ===== LAB REPORTS ===== */}
        {activeTab === "labReports" && (
          <div className="max-w-lg mx-auto space-y-8 py-10">

            <select
              value={selectedPatient}
              onChange={e => setSelectedPatient(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/40 border border-white/30"
            >
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>

            <div className={`relative p-12 text-center rounded-3xl border-2 border-dashed
              ${selectedPatient ? "border-pink-400" : "opacity-50"}`}>
              <UploadCloud className="mx-auto text-pink-400 mb-4" size={48} />
              <p>Upload Lab Report</p>
              <input
                type="file"
                disabled={!selectedPatient}
                onChange={handleFiles}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {abnormalValues.length > 0 && (
              <div className="p-6 bg-white/5 border border-purple-400 rounded-xl">
                <h3 className="font-bold mb-2">🚨 Abnormal Values</h3>
                <ul className="list-disc ml-5">
                  {abnormalValues.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ===== PAYMENTS ===== */}
        {activeTab === "payments" && (
          <div className="max-w-xl mx-auto space-y-6">

            {!paymentDone ? (
              <>
                <select
                  value={selectedPatient}
                  onChange={e => setSelectedPatient(e.target.value)}
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/30"
                >
                  <option value="">Select Patient</option>
                  {patients.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>

                {currentPatient && (
                  <p className="text-green-400 font-bold">
                    Consultation Fee: ₹{currentPatient.fee}
                  </p>
                )}

                <select
                  value={paymentMode}
                  onChange={e => setPaymentMode(e.target.value)}
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/30"
                >
                  <option value="">Payment Mode</option>
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>

                {paymentMode === "upi" && (
                  <div className="text-center">
                    <CreditCard className="mx-auto text-green-400 mb-2" />
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=clinic@upi"
                      className="mx-auto rounded"
                      alt="UPI QR"
                    />
                  </div>
                )}

                <button
                  onClick={confirmPayment}
                  className="w-full py-3 bg-green-500 rounded-xl font-bold"
                >
                  Confirm Payment
                </button>
              </>
            ) : (
              <div className="space-y-6">

                <div className="bg-green-500/20 p-6 rounded-xl text-center">
                  <CheckCircle className="mx-auto mb-2 text-green-400" size={36} />
                  Payment Successful
                </div>

                {/* ===== INVOICE + E-PRESCRIPTION ===== */}
                <div ref={invoiceRef} className="bg-white text-black p-8 rounded-xl">

                  <h1 className="text-2xl font-bold text-center">Sunrise Clinic</h1>
                  <p className="text-center mb-6 text-sm">
                    {new Date().toLocaleString()}
                  </p>

                  <p><strong>Invoice ID:</strong> {invoiceId}</p>
                  <p><strong>Patient:</strong> {selectedPatient}</p>

                  <table className="w-full mt-4 border border-gray-400">
                    <tbody>
                      <tr>
                        <td className="border px-3 py-2">Medical Charges</td>
                        <td className="border px-3 py-2 text-right">₹{currentPatient.fee}</td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">Tax (5%)</td>
                        <td className="border px-3 py-2 text-right">
                          ₹{(currentPatient.fee * 0.05).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2 font-bold">Total</td>
                        <td className="border px-3 py-2 text-right font-bold">
                          ₹{(currentPatient.fee * 1.05).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* ===== E-PRESCRIPTION TABLE ===== */}
                  <h3 className="text-2xl font-bold mt-8 mb-4 text-center border-b-2 border-gray-300 pb-2">
                    E-Prescription
                  </h3>

                  <table className="w-full border-collapse border border-gray-400 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2 text-left">Medicine</th>
                        <th className="border px-4 py-2 text-center">Dosage</th>
                        <th className="border px-4 py-2 text-center">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptions[selectedPatient]?.map((m, i) => (
                        <tr key={i} className="even:bg-gray-50">
                          <td className="border px-4 py-2">{m.drug}</td>
                          <td className="border px-4 py-2 text-center font-medium">{m.dose}</td>
                          <td className="border px-4 py-2 text-center">{m.days} days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="mt-4 text-sm italic">
                    This is a digitally generated prescription. No signature required.
                  </p>
                </div>

                <button onClick={printInvoice} className="bg-pink-600 px-6 py-2 rounded">
                  Print / Download
                </button>

                <button onClick={resetPayment} className="px-6 py-2 bg-white/10 rounded">
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
