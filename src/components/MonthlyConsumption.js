import React from "react";

function MonthlyConsumption({data}) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">{data}</h3>
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-gray-700">
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Units</th>
            <th className="px-4 py-2">Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800">
            <td className="px-4 py-2">Energy</td>
            <td className="px-4 py-2">12,183.1 kWh</td>
            <td className="px-4 py-2">54,823.97</td>
          </tr>
          <tr className="bg-gray-700">
            <td className="px-4 py-2">Steam</td>
            <td className="px-4 py-2">3,847.3 kL</td>
            <td className="px-4 py-2">4,616.76</td>
          </tr>
          <tr className="bg-gray-800">
            <td className="px-4 py-2">Water</td>
            <td className="px-4 py-2">8,977.02</td>
            <td className="px-4 py-2">2,980.37</td>
          </tr>
          <tr className="bg-gray-700">
            <td className="px-4 py-2">Gas</td>
            <td className="px-4 py-2">7,053.38</td>
            <td className="px-4 py-2">22,570.8</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyConsumption;
