import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import EHR from "./pages/EHR";
import EHRWorkspace from "./pages/ehrWorkspace";
import EHRName from "./pages/EHRName";
import EHRReport from "./pages/EHRReport";
import EHRRecords from "./pages/EHRRecords";
import Appointments from "./pages/Appointments";
import Revenue from "./pages/Revenue";
import FDAReporting from "./pages/FDAReporting";
import DoctorReview from "./components/ehr/DoctorReview";
import BookAppointments from "./pages/BookAppointments";
import NurseDashboard from "./pages/NurseDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-black">
        <Sidebar />

        <main className="ml-64 flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/revenue" element={<Revenue />} />

            <Route path="/ehr" element={<EHR />} />
            <Route path="/ehr/name" element={<EHRName />} />
            <Route path="/ehr/workspace" element={<EHRWorkspace />} />
            <Route path="/ehr/report" element={<EHRReport />} />
            <Route path="/ehr/records" element={<EHRRecords />} />

            <Route path="/appointments" element={<Appointments />} />
            <Route path="/fda-reporting" element={<FDAReporting />} />
            <Route path="/ehr/review" element={<DoctorReview />} />
            <Route path="/nurse-dashboard" element={<NurseDashboard />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
