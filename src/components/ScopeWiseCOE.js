import React from "react";

function ScopeWiseCOE({co2}) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">{co2}</h3>
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-gray-700">
          <tr>
            <th className="px-4 py-2">Scope</th>
            <th className="px-4 py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800">
            <td className="px-4 py-2">Scope 1</td>
            <td className="px-4 py-2">-</td>
          </tr>
          <tr className="bg-gray-700">
            <td className="px-4 py-2">Scope 2</td>
            <td className="px-4 py-2">-</td>
          </tr>
          <tr className="bg-gray-800">
            <td className="px-4 py-2">Scope 3</td>
            <td className="px-4 py-2">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ScopeWiseCOE;
