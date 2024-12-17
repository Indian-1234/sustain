import React from "react";

const AssetDashboard = () => {
  return (
    <div className="flex-1 ml-24 p-6 overflow-y-auto  text-white"> {/* Dashboard background */}

      <div className="grid grid-cols-12 gap-4 p-6">
        {/* Left Panel - Asset Details */}
        <div className="col-span-4 bg-gray-700 p-4 rounded-lg shadow-md flex flex-col max-h-[500px]">
          <h2 className="text-lg font-semibold mb-4">Asset Details</h2>
          <div className="flex items-center justify-center mb-4">
            {/* Placeholder for Asset Image */}
            <div className="w-40 h-40 bg-gray-600 rounded-lg"></div>
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between">
              <span className="font-medium">Make</span>
              <span>Thermax</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Capacity</span>
              <span>10 TPH</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Working Pressure</span>
              <span>10.54 bar</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Design Temperature</span>
              <span>254°C</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Fuel</span>
              <span>Coal</span>
            </li>
          </ul>
        </div>

        {/* Middle Panel - Live Data */}
        <div className="col-span-5 bg-gray-700 p-4 rounded-lg shadow-md flex flex-col max-h-[500px]">
          <h2 className="text-lg font-semibold mb-4">Live Data</h2>
          {/* Efficiency */}
          <div className="mb-6">
            <p className="text-sm font-medium">Efficiency - Direct</p>
            <div className="h-12 bg-gray-600 flex items-center justify-center rounded-lg mt-2">
              <span className="text-gray-300 text-lg">-- %</span>
            </div>
          </div>
          {/* GHG Emission */}
          <div className="mb-6">
            <p className="text-sm font-medium">GHG emission against target</p>
            <div className="h-12 bg-gray-600 flex items-center justify-center rounded-lg mt-2">
              <span className="text-gray-300 text-lg">-- kgCO2e</span>
            </div>
          </div>
          {/* Other Data */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>S/F ratio</p>
              <p className="font-medium">NaN %</p>
            </div>
            <div>
              <p>Pressure</p>
              <p className="font-medium">NaN Bar</p>
            </div>
            <div>
              <p>Load %</p>
              <p className="font-medium">NaN %</p>
            </div>
            <div>
              <p>Steam Flow</p>
              <p className="font-medium">NaN Kg/hr</p>
            </div>
            <div>
              <p>Fuel Consumption</p>
              <p className="font-medium">NaN</p>
            </div>
            <div>
              <p>Stack Temperature</p>
              <p className="font-medium">NaN °C</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Insights and Alerts */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Insights */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-1 max-h-[500px]">
            <h2 className="text-lg font-semibold mb-2">Insights</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">0</p>
              <p className="text-sm text-gray-300">
                Open critical insights in last 16 days
              </p>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-1 max-h-[500px]">
            <h2 className="text-lg font-semibold mb-2">Alerts</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-300">-</p>
              <p className="text-sm text-gray-300">
                Open critical alerts in last 16 days
              </p>
            </div>
            {/* Placeholder for graph */}
            <div className="h-16 bg-gray-600 rounded-lg mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDashboard;
