import React from "react";
import logo from '../assets/img/logo_2.png';
export default function welcome() {
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

          <a href="/signup" className="bg-orange-500 rounded-[30px] text-gray-800 hover:text-white px-[95px] py-[13px] hover:bg-orange-600">
            Register
          </a> 
      
          <p className="text-gray-600 mb-4 mt-[20px] mb-[20px]">or</p>

          <a href="/signin" className="ring-gray-500 ring-2 rounded-[30px] text-gray-800 hover:text-white px-[105px] py-[13px] hover:bg-gray-800">
            Login
          </a>

          <p className="text-xs text-gray-600 mt-6">
            By creating an account, I accept Mongkol’s
            <br />
            <a href="/" className="text-orange-500 hover:underline">
              Terms of Service
            </a>{" "}
            and
            <a href="/" className="text-blue-500 hover:underline">
              {" "}Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}