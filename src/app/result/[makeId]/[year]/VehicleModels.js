export async function VehicleModels({ makeId, year }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(
    `${apiUrl}vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle models.");
  }

  const data = await response.json();
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {data.Results[0].Make_Name} Models for {year}
      </h1>
      <ul className="list-disc  space-y-2 text-gray-700">
        {data.Results.map((model) => (
          <li
            key={model.Model_ID}
            className="p-2 bg-gray-50 rounded-lg shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 list-none"
          >
            {model.Model_Name}
          </li>
        ))}
      </ul>
    </>
  );
}
