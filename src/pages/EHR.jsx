import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function EHR() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900 px-4 sm:px-6 lg:px-12 py-8 text-white">

      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 w-full max-w-5xl text-center">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">
          Summary Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">

          {/* EHR Generation */}
          <Link to="/ehr/name">
            <Card className="flex flex-col justify-center items-center h-56 sm:h-64 lg:h-72 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-400/30 backdrop-blur-lg shadow-lg transition transform hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                Generation
              </h3>
              <p className="opacity-80 text-center px-4 sm:px-6">
                Create AI-assisted health records with voice input and smart analysis.
              </p>
            </Card>
          </Link>

          {/* EHR Records */}
          <Link to="/ehr/records">
            <Card className="flex flex-col justify-center items-center h-56 sm:h-64 lg:h-72 rounded-2xl bg-gradient-to-br from-pink-600/30 to-purple-600/30 border border-pink-400/30 backdrop-blur-lg shadow-lg transition transform hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                Records
              </h3>
              <p className="opacity-80 text-center px-4 sm:px-6">
                View, review, and manage previously generated patient records securely.
              </p>
            </Card>
          </Link>

        </div>
      </div>
    </div>
  );
}
