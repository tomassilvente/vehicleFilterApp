import React, { Suspense } from "react";
import { VehicleModels } from "./VehicleModels";

export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 text-gray-900">
      <div className="bg-white p-10 rounded-lg shadow-lg my-8 w-full max-w-lg border border-gray-200">
        <Suspense
          fallback={
            <div className="text-gray-700">Loading vehicle models...</div>
          }
        >
          <VehicleModels makeId={makeId} year={year} />
        </Suspense>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const years = Array.from(
    { length: new Date().getFullYear() - 2014 },
    (_, i) => i + 2015,
  );
  const makeIds = ["440", "441", "442"];

  return makeIds.flatMap((makeId) =>
    years.map((year) => ({
      makeId,
      year: year.toString(),
    })),
  );
}
