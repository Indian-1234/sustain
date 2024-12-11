import React from "react";

function EnergyConsumptionCostCard() {
  return (
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Energy Consumption Cost</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-info-circle"></i>
        </button>
      </div>

      {/* Cost Value */}
      <div className="text-center mb-6">
        <p className="text-gray-500">Total Cost</p>
        <p className="text-2xl font-bold text-blue-600">₹ 150.7k</p>
      </div>

      {/* Total and Live Values */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Value */}
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
          <p className="text-lg font-bold text-green-600">32,061 kWh</p>
        </div>

        {/* Live Value */}
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Live Value</h3>
          <p className="text-lg font-bold text-red-600">3,522.86 kW</p>
        </div>
      </div>
    </div>
  );
}

export default EnergyConsumptionCostCard;
