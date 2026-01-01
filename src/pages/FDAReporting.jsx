import React, { useState } from "react";

export default function FDAReporting() {
  const [form, setForm] = useState({
    patientInitials: "",
    age: "",
    gender: "",
    suspectDrug: "",
    indication: "",
    reaction: "",
    seriousness: "",
    outcome: "",
    reporter: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const pvReports = JSON.parse(localStorage.getItem("pvReports")) || [];
    localStorage.setItem(
      "pvReports",
      JSON.stringify([...pvReports, { ...form, date: new Date().toISOString() }])
    );
    alert("ADR submitted to Pharmacovigilance system");
  };

  // Common input classes
  const inputClass =
    "w-full p-3 rounded-lg bg-black text-white placeholder-gray-400 border border-purple-500/30";

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">
        FDA / ICH Adverse Drug Reaction Report
      </h1>

      <div className="max-w-3xl bg-white/5 rounded-xl p-6 grid gap-4">
        <input
          name="patientInitials"
          placeholder="Patient Initials"
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className={inputClass}
        />

        <select
          name="gender"
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="suspectDrug"
          placeholder="Suspect Drug"
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="indication"
          placeholder="Indication"
          onChange={handleChange}
          className={inputClass}
        />

        <textarea
          name="reaction"
          placeholder="Adverse Reaction Description"
          onChange={handleChange}
          className={`${inputClass} h-24`}
        />

        <select
          name="seriousness"
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seriousness</option>
          <option>Non-Serious</option>
          <option>Hospitalization</option>
          <option>Life Threatening</option>
          <option>Death</option>
        </select>

        <input
          name="outcome"
          placeholder="Outcome"
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="reporter"
          placeholder="Reporter Name & Qualification"
          onChange={handleChange}
          className={inputClass}
        />

        <button
          onClick={handleSubmit}
          className="bg-pink-500 hover:bg-pink-600 py-2 rounded-lg font-semibold"
        >
          Submit ADR Report
        </button>
      </div>
    </div>
  );
}
