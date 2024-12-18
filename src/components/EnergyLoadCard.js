import React from 'react';

function EnergyLoadCard() {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-500">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          Portfolio Energy Load
        </h2>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-info-circle"></i>
        </button>
      </div>

      {/* Average Value */}
      <div className="text-center mb-6">
        <p className="text-gray-500">Average value</p>
        <p className="text-2xl font-bold text-blue-600">5,158.2 kW</p>
      </div>

      {/* Max and Min Values */}
      <div className="grid grid-cols-2 gap-4">
        {/* Max Value */}
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Max</h3>
          <p className="text-lg font-bold text-green-600">7,266.16 kW</p>
          <p className="text-xs text-gray-500">Dec 01, 2024 06:00</p>
        </div>

        {/* Min Value */}
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Min</h3>
          <p className="text-lg font-bold text-red-600">2,456.48 kW</p>
          <p className="text-xs text-gray-500">Dec 01, 2024 02:45</p>
        </div>
      </div>
    </div>
  );
}

export default EnergyLoadCard;
