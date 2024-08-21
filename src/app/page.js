"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedModelYear, setSelectedModelYear] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchVehicleTypes() {
      const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
      const data = await response.json();
      setVehicleTypes(data.Results);
    }
    fetchVehicleTypes();
  }, []);

  const isNextEnabled = selectedVehicleType && selectedModelYear;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-gray-900">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">
        Vehicle Branding App
      </h1>
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          Select Your Vehicle
        </h2>
        <div className="mb-5">
          <label className="block text-gray-600 mb-2 text-lg font-medium">
            Vehicle Type
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            value={selectedVehicleType}
            onChange={(e) => setSelectedVehicleType(e.target.value)}
          >
            <option value="">Select a vehicle type</option>
            {vehicleTypes.map((type) => (
              <option key={type.MakeId} value={type.MakeId}>
                {type.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-gray-600 mb-2 text-lg font-medium">
            Model Year
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            value={selectedModelYear}
            onChange={(e) => setSelectedModelYear(e.target.value)}
          >
            <option value="">Select a model year</option>
            {Array.from({ length: currentYear - 2014 }, (_, i) => (
              <option key={i + 2015} value={i + 2015}>
                {i + 2015}
              </option>
            ))}
          </select>
        </div>
        <Link href={`/result/${selectedVehicleType}/${selectedModelYear}`}>
          <button
            className={`w-full p-3 mt-6 text-lg font-semibold rounded-lg transition duration-300 ease-in-out ${
              isNextEnabled
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isNextEnabled}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
