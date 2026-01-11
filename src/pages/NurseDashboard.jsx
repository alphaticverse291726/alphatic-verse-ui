import { useState, useRef } from "react";
import BookAppointments from "./BookAppointments";
import { UploadCloud, CreditCard, CheckCircle } from "lucide-react";

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");

  // ===== LAB REPORT STATES =====
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [abnormalValues, setAbnormalValues] = useState([]);

  // ===== PAYMENT STATES =====
  const [selectedPatient, setSelectedPatient] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const invoiceRef = useRef();

  const patients = [
    { name: "John Doe", fee: 500 },
    { name: "Maria Smith", fee: 650 },
    { name: "Abdul Rahman", fee: 400 },
    { name: "Linda George", fee: 700 },
  ];

  const currentPatient = patients.find(p => p.name === selectedPatient);

  // ===== LAB PARSER =====
  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);

    const text = await files[0].text();
    setAbnormalValues(parseAbnormalValues(text));
  };

  const parseAbnormalValues = (text) => {
    const lines = text.split("\n");
    const results = [];

    lines.forEach(line => {
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

  // ===== PAYMENT HANDLER =====
  const confirmPayment = () => {
    if (!selectedPatient || !paymentMode) {
      alert("Please select patient and payment mode");
      return;
    }
    setInvoiceId(`INV-${Date.now()}`);
    setPaymentDone(true);
  };

  const resetPayment = () => {
    setSelectedPatient("");
    setPaymentMode("");
    setPaymentDone(false);
    setInvoiceId("");
  };

  const printInvoice = () => {
    if (!invoiceRef.current) return;
    const printContent = invoiceRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // reset dashboard after print
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-10">

      {/* ===== TABS ===== */}
      <div className="flex gap-4 border-b border-white/10 mb-10">
        {["appointments", "labReports", "payments"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-t-xl font-semibold transition
              ${activeTab === tab
                ? "bg-white/10 backdrop-blur-xl border border-white/20 text-pink-400"
                : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
          >
            {tab === "appointments"
              ? "Appointments"
              : tab === "labReports"
              ? "Lab Reports"
              : "Payments"}
          </button>
        ))}
      </div>

      {/* ===== BODY ===== */}
      <div className="relative rounded-3xl p-8 min-h-[65vh]
        bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl">

        {/* ===== APPOINTMENTS ===== */}
        {activeTab === "appointments" && (
          <div className="p-6">
            <BookAppointments />
          </div>
        )}

        {/* ===== LAB REPORTS ===== */}
        {activeTab === "labReports" && (
          <div className="flex flex-col items-center space-y-10 py-16">

            <p className="text-lg text-white/80 mb-4">
              Please upload the lab report to read
            </p>

            <div className="relative w-full max-w-lg rounded-3xl p-12 text-center
              bg-white/5 backdrop-blur-2xl border-2 border-dashed border-pink-400/60">

              <UploadCloud className="w-14 h-14 mx-auto text-pink-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Upload Lab Reports</h2>

              <input
                type="file"
                onChange={handleFiles}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {abnormalValues.length > 0 && (
              <div className="w-full max-w-lg rounded-2xl p-6
                bg-white/5 backdrop-blur-xl border border-purple-400/40">

                <h3 className="text-xl font-bold mb-3 text-purple-300">
                  🚨 Abnormal Lab Values
                </h3>

                <ul className="list-disc ml-6 space-y-2">
                  {abnormalValues.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ===== PAYMENTS ===== */}
        {activeTab === "payments" && (
          <div className="max-w-xl mx-auto space-y-8">

            <h2 className="text-3xl font-bold text-center
              bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Payment Collection
            </h2>

            {!paymentDone ? (
              <>
                {/* Patient */}
                <select
                  value={selectedPatient}
                  onChange={e => setSelectedPatient(e.target.value)}
                  className="w-full p-4 rounded-xl bg-transparent text-white
                    border border-white/30 backdrop-blur-md"
                >
                  <option value="" className="bg-black">Select Patient</option>
                  {patients.map(p => (
                    <option key={p.name} value={p.name} className="bg-black">
                      {p.name}
                    </option>
                  ))}
                </select>

                {currentPatient && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/20">
                    Consultation Fee:
                    <span className="text-green-400 font-bold ml-2">
                      ₹{currentPatient.fee}
                    </span>
                  </div>
                )}

                {/* Payment Mode */}
                <select
                  value={paymentMode}
                  onChange={e => setPaymentMode(e.target.value)}
                  className="w-full p-4 rounded-xl bg-transparent text-white
                    border border-white/30 backdrop-blur-md"
                >
                  <option value="" className="bg-black">Select Payment Mode</option>
                  <option value="upi" className="bg-black">UPI</option>
                  <option value="cash" className="bg-black">Cash</option>
                  <option value="card" className="bg-black">Card</option>
                </select>

                {paymentMode === "upi" && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-green-400/40 text-center">
                    <CreditCard className="mx-auto text-green-400 mb-3" />
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=clinic@upi"
                      className="mx-auto rounded-xl"
                      alt="UPI QR"
                    />
                    <p className="mt-2 text-sm">UPI ID: clinic@upi</p>
                  </div>
                )}

                <button
                  onClick={confirmPayment}
                  className="w-full py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-green-500 to-emerald-600
                    hover:from-green-400 hover:to-emerald-500">
                  Confirm Payment
                </button>
              </>
            ) : (
              /* ===== SUCCESS + INVOICE ===== */
              <div className="space-y-6">

                <div className="p-6 rounded-2xl bg-green-500/20 border border-green-400/40 text-center">
                  <CheckCircle className="mx-auto mb-2 text-green-400" size={40} />
                  <h3 className="text-xl font-bold">Payment Successful</h3>
                  <p className="text-white/80">
                    Data has been reported to the Vigilatory Base System
                  </p>
                </div>

                <div ref={invoiceRef} className="p-6 rounded-3xl bg-white/5 border border-white/20 text-black bg-white print:bg-white print:text-black">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Sunrise Clinic</h1>
                    <p>Dr. Priya Sharma, MBBS</p>
                    <p>{new Date().toLocaleString()}</p>
                    <hr className="my-4" />
                  </div>

                  <p><strong>Invoice ID:</strong> {invoiceId}</p>
                  <p><strong>Patient:</strong> {selectedPatient}</p>

                  <div className="mt-4">
                    <table className="w-full border border-gray-300 text-left">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">Description</th>
                          <th className="border px-2 py-1">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-2 py-1">Medical Charges</td>
                          <td className="border px-2 py-1">{currentPatient?.fee}</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">Tax (5%)</td>
                          <td className="border px-2 py-1">{(currentPatient?.fee * 0.05).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1 font-bold">Total</td>
                          <td className="border px-2 py-1 font-bold">{(currentPatient?.fee * 1.05).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-center mt-6">
                    <p>Payment Mode: {paymentMode.toUpperCase()}</p>
                    <p>Thank you for visiting Sunrise Clinic!</p>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={printInvoice}
                      className="px-6 py-2 rounded-lg bg-pink-600 print:hidden">
                      Download / Print
                    </button>
                    <button
                      onClick={resetPayment}
                      className="px-6 py-2 rounded-lg bg-white/10 print:hidden">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
