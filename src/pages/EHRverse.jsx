import { useState } from "react";
import {
  Play,
  FileText,
  History,
  Activity,
  User,
  ClipboardList,
  FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =======================
   MOCK DATA
======================= */

const todayPatients = [
  {
    id: 1,
    name: "Ramesh Kumar",
    age: 42,
    gender: "Male",
    reason: "Severe tooth pain – lower left molar",
    time: "10:30 AM",
  },
  {
    id: 2,
    name: "Anita Sharma",
    age: 29,
    gender: "Female",
    reason: "Routine dental check-up",
    time: "11:15 AM",
  },
];

const clinicalRecords = [
  {
    patientName: "Rohit Sharma",
    patientId: "DEN-PT-2026-001",
    dob: "17-Aug-1994",
    age: 31,
    gender: "Male",
    clinic: "SmileCraft Dental Care",
    dentist: "Dr. Ananya Rao, BDS, MDS",
    registrationNo: "DCI/KA/2015/32456",
    encounterId: "DEN-ENC-10021",
    dateTime: "28-Jan-2026, 11:15 AM",
    mode: "OPD",
    chiefComplaint: "Severe pain in lower right molar region",
    clinicalFindings:
      "Deep caries in tooth 46 with gingival inflammation and tenderness on percussion",
    diagnosis: {
      name: "Chronic Apical Periodontitis",
      icd10: "K04.5",
      confidence: "High",
    },
    notes:
      "Radiographic evidence of periapical radiolucency. Root canal treatment advised.",
  },
  {
    patientName: "Meena Rao",
    patientId: "DEN-PT-2026-002",
    dob: "02-May-1988",
    age: 37,
    gender: "Female",
    clinic: "SmileCraft Dental Care",
    dentist: "Dr. Ananya Rao, BDS, MDS",
    registrationNo: "DCI/KA/2015/32456",
    encounterId: "DEN-ENC-10034",
    dateTime: "24-Jan-2026, 10:10 AM",
    mode: "OPD",
    chiefComplaint: "Bleeding gums and bad breath",
    clinicalFindings:
      "Generalized gingival inflammation with pocket depths of 4–5 mm",
    diagnosis: {
      name: "Chronic Generalized Gingivitis",
      icd10: "K05.1",
      confidence: "Moderate",
    },
    notes: "Oral hygiene instructions given. Full mouth scaling planned.",
  },
  {
    patientName: "Suresh Patel",
    patientId: "DEN-PT-2026-003",
    dob: "11-Nov-1975",
    age: 50,
    gender: "Male",
    clinic: "SmileCraft Dental Care",
    dentist: "Dr. Ananya Rao, BDS, MDS",
    registrationNo: "DCI/KA/2015/32456",
    encounterId: "DEN-ENC-10041",
    dateTime: "22-Jan-2026, 01:40 PM",
    mode: "OPD",
    chiefComplaint: "Sensitivity and pain on biting – upper right tooth",
    clinicalFindings:
      "Cracked cusp on tooth 16 with dentinal exposure",
    diagnosis: {
      name: "Cracked Tooth Syndrome",
      icd10: "K03.81",
      confidence: "High",
    },
    notes:
      "Crown placement advised. Temporary restoration placed.",
  },
];

const labReports = [
  { test: "OPG Radiograph", finding: "Impacted 38" },
  { test: "IOPA (46)", finding: "Periapical radiolucency" },
];

const pastMedicalHistory = [
  { condition: "Type II Diabetes Mellitus", note: "Metformin 500 mg" },
  { condition: "Hypertension", note: "Amlodipine 5 mg" },
];

const oralExamination = [
  { area: "Tooth 46", finding: "Deep caries", plan: "RCT advised" },
  { area: "Gingiva", finding: "Inflamed", plan: "Scaling advised" },
];

/* =======================
   MAIN COMPONENT
======================= */

export default function EHRverse() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="min-h-screen w-full relative overflow-hidden text-white">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-[#050006]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.28),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.30),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.10),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 p-6 md:p-8">

        {/* MODE SELECTION */}
        {!mode && (
          <div className="flex flex-col items-center justify-center gap-8 min-h-[70vh]">
            <h1 className="text-3xl font-extrabold text-[#f5d0fe]">
              EHR Verse
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModeCard
                icon={<ClipboardList size={26} />}
                title="Generate Clinical Summary"
                description="Create new AI-assisted clinical documentation"
                onClick={() => setMode("generate")}
              />
              <ModeCard
                icon={<FolderOpen size={26} />}
                title="View Clinical Records"
                description="Access previously completed patient records"
                onClick={() => setMode("records")}
              />
            </div>
          </div>
        )}

        {/* PATIENT SELECTION */}
        {mode === "generate" && !selectedPatient && (
          <>
            <h2 className="text-xl font-extrabold mb-6 text-[#f5d0fe]">
              Patients for Today
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {todayPatients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className="rounded-2xl p-5 text-left bg-white/10 backdrop-blur border border-white/15 hover:scale-[1.02]"
                >
                  <h3 className="font-extrabold text-pink-300">{p.name}</h3>
                  <p className="text-sm text-white/70">
                    {p.age} yrs • {p.gender}
                  </p>
                  <p className="text-sm mt-2 text-white/70">{p.reason}</p>
                  <span className="text-xs text-[#e9d5ff] mt-2 inline-block">
                    Appointment: {p.time}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* GENERATE WORKFLOW */}
        {mode === "generate" && selectedPatient && (
          <div className="space-y-10">
            <PatientHeader
              patient={selectedPatient}
              onBack={() => setSelectedPatient(null)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard title="Lab Reports" icon={<FileText size={18} />}>
                {labReports.map((i, idx) => (
                  <DataRow key={idx} title={i.test} subtitle={i.finding} />
                ))}
              </GlassCard>

              <GlassCard title="Past Medical History" icon={<History size={18} />}>
                {pastMedicalHistory.map((i, idx) => (
                  <DataRow
                    key={idx}
                    title={i.condition}
                    subtitle={i.note}
                  />
                ))}
              </GlassCard>

              <GlassCard title="Oral Examination" icon={<Activity size={18} />}>
                {oralExamination.map((i, idx) => (
                  <DataRow
                    key={idx}
                    title={i.area}
                    subtitle={i.finding}
                    tag={i.plan}
                  />
                ))}
              </GlassCard>
            </div>

            <div className="flex justify-center">
              <ProceedCard onClick={() => navigate("/ehrverse/summary")} />
            </div>
          </div>
        )}

        {/* RECORDS */}
        {mode === "records" && (
          <>
            <h2 className="text-xl font-extrabold mb-6 text-[#f5d0fe]">
              Clinical Records
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clinicalRecords.map((rec, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPatient(rec)}
                  className="cursor-pointer rounded-2xl p-5 bg-white/10 backdrop-blur border border-white/15"
                >
                  <h3 className="font-extrabold text-pink-300">
                    {rec.patientName}
                  </h3>
                  <p className="text-sm text-white/70">{rec.dateTime}</p>
                  <p className="mt-2 text-sm">
                    <strong>Diagnosis:</strong> {rec.diagnosis.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {mode === "records" && selectedPatient?.patientId && (
          <ClinicalDocument
            record={selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )}

      </div>
    </div>
  );
}

/* =======================
   UI COMPONENTS
======================= */

function ModeCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:scale-[1.03]"
    >
      <div className="text-pink-300 mb-2">{icon}</div>
      <h3 className="font-extrabold text-lg">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </button>
  );
}

function PatientHeader({ patient, onBack }) {
  return (
    <div className="flex justify-between p-4 rounded-xl bg-white/10 border border-white/15">
      <div>
        <h3 className="font-extrabold text-pink-300">{patient.name}</h3>
        <p className="text-sm text-white/70">
          {patient.age} yrs • {patient.gender} • {patient.reason}
        </p>
      </div>
      <button onClick={onBack} className="text-xs text-white/60">
        Change Patient
      </button>
    </div>
  );
}

function GlassCard({ title, icon, children }) {
  return (
    <div className="rounded-2xl p-5 bg-white/10 border border-white/15">
      <div className="flex gap-2 mb-4 text-[#e9d5ff]">
        {icon}
        <h3 className="font-extrabold">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ProceedCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[360px] h-[180px] rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-4 shadow-[0_0_40px_rgba(160,90,200,0.25)]"
    >
      <div className="p-6 rounded-full bg-gradient-to-br from-[#c084fc] to-[#ec4899]">
        <Play size={26} className="text-black" />
      </div>
      <h3 className="font-extrabold text-xl">Proceed for Summary</h3>
    </button>
  );
}

function DataRow({ title, subtitle, tag }) {
  return (
    <div className="border-b border-white/15 pb-2">
      <p className="font-bold">{title}</p>
      <p className="text-sm text-white/70">{subtitle}</p>
      {tag && <span className="text-xs text-[#f5d0fe]">{tag}</span>}
    </div>
  );
}

function ClinicalDocument({ record, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="max-w-3xl w-full p-6 bg-[#120015] rounded-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-extrabold text-pink-300 mb-4">
          Dental Consultation Summary
        </h2>

        <DocSection title="Patient Details">
          <DocRow label="Patient Name" value={record.patientName} />
          <DocRow label="Patient ID" value={record.patientId} />
          <DocRow label="DOB" value={record.dob} />
          <DocRow label="Age" value={record.age} />
          <DocRow label="Gender" value={record.gender} />
        </DocSection>

        <DocSection title="Clinic & Dentist">
          <DocRow label="Clinic" value={record.clinic} />
          <DocRow label="Dentist" value={record.dentist} />
          <DocRow label="Registration No" value={record.registrationNo} />
        </DocSection>

        <DocSection title="Diagnosis">
          <p className="font-semibold">{record.diagnosis.name}</p>
          <p className="text-sm">Confidence: {record.diagnosis.confidence}</p>
        </DocSection>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-white/60 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function DocSection({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="font-extrabold text-[#e9d5ff] mb-2">{title}</h3>
      {children}
    </div>
  );
}

function DocRow({ label, value }) {
  return (
    <p className="text-sm">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
