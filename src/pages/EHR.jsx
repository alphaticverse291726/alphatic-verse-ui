import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function EHR() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans p-8 space-y-12">
      <h2 className="text-4xl font-bold mb-6 text-center">EHR Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* EHR Generation Card */}
        <Link to="/ehr/name" className="w-full">
          <Card className="ehr-card flex flex-col justify-center items-center h-64">
            <h3 className="text-2xl font-semibold mb-3">EHR Generation</h3>
            <p className="opacity-80 text-center px-6">
              Click to create new patient electronic health records.
            </p>
          </Card>
        </Link>

        {/* EHR Records Card */}
        <Link to="/ehr/records" className="w-full">
          <Card className="ehr-card flex flex-col justify-center items-center h-64">
            <h3 className="text-2xl font-semibold mb-3">EHR Records</h3>
            <p className="opacity-80 text-center px-6">
              Click to view and manage past patient records.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
