import React from "react";
import logo from '../assets/img/logo.png';
export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b2526]">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="bg-white rounded-full p-8">
          <img
            src={logo} // Replace with the actual logo path
            alt="Mongkol Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Card */}
        <div className="bg-gray-100 p-8 rounded-xl w-80 text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Welcome to MONGKOL!
          </h2>

          <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-full mb-4 hover:bg-orange-600">
            Register
          </button>

          <p className="text-gray-600 mb-4">or</p>

          <button className="w-full bg-white text-black font-bold py-3 rounded-full border hover:bg-gray-200">
            Login
          </button>

          <p className="text-xs text-gray-600 mt-6">
            By creating an account, I accept Mongkol’s
            <br />
            <a href="#" className="text-orange-500 hover:underline">
              Terms of Service
            </a>{" "}
            and
            <a href="#" className="text-blue-500 hover:underline">
              {" "}Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}