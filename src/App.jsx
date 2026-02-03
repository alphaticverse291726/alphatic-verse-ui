import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

import Appointments from "./pages/Appointments";
import Revenue from "./pages/Revenue";
import FDAReporting from "./pages/FDAReporting";
import DoctorReview from "./components/ehr/DoctorReview";
import BookAppointments from "./pages/BookAppointments";
import NurseDashboard from "./pages/NurseDashboard";
import EHRverse from "./pages/EHRverse";
import VoiceDictation from "./pages/VoiceDictation";

// ✅ NEW ADR PAGE
import ADRPage from "./pages/ADRPage";

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

            
            

            <Route path="/appointments" element={<Appointments />} />
            <Route path="/book-appointments" element={<BookAppointments />} />
            <Route path="/nurse-dashboard" element={<NurseDashboard />} />

            <Route path="/fda-reporting" element={<FDAReporting />} />
            <Route path="/ehrverse" element={<EHRverse />} />
            <Route path="/ehrverse/summary" element={<VoiceDictation />} />

            {/* ✅ ADR MANAGEMENT PAGE */}
            <Route path="/adr" element={<ADRPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
