import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function EHR() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900 px-6 text-white">

      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 w-full max-w-5xl text-center">

        <h2 className="text-4xl font-bold mb-12">
          Summary Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* EHR Generation */}
          <Link to="/ehr/name">
            <Card className="flex flex-col justify-center items-center h-64 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-400/30 backdrop-blur-lg shadow-lg transition transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3">
                Generation
              </h3>
              <p className="opacity-80 text-center px-6">
                Create AI-assisted health records
                with voice input and smart analysis.
              </p>
            </Card>
          </Link>

          {/* EHR Records */}
          <Link to="/ehr/records">
            <Card className="flex flex-col justify-center items-center h-64 rounded-2xl bg-gradient-to-br from-pink-600/30 to-purple-600/30 border border-pink-400/30 backdrop-blur-lg shadow-lg transition transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3">
                Records
              </h3>
              <p className="opacity-80 text-center px-6">
                View, review, and manage previously generated
                patient records securely.
              </p>
            </Card>
          </Link>

        </div>
      </div>
    </div>
  );
}
