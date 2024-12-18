import React from 'react';
import boiler from '../assets/boiler.png'
import { FaBalanceScale, FaTachometerAlt, FaWeight } from 'react-icons/fa';

const AssetDashboard = () => {
  return (
    <div className="flex-1 ml-24 p-6 overflow-y-auto text-white">
      <div className="grid grid-cols-12 gap-4 p-6">
        {/* Left Panel - Asset Details */}
        <div className="col-span-4 bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center max-h-[500px] border border-gray-500">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-100">Asset Details</h2>
          
          <div className="flex items-center justify-center mb-4 border border-gray-600 rounded-lg overflow-hidden">
            <div className="w-60 h-40 flex items-center justify-center bg-gray-800">
              <img src={boiler} alt="boiler" className="object-cover w-full h-full" />
            </div>
          </div>

          <ul className="text-sm space-y-2 w-full">
            <li className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Make</span>
              <span className="text-gray-100">Thermax</span>
            </li>
            <li className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Capacity</span>
              <span className="text-gray-100">10 TPH</span>
            </li>
            <li className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Working Pressure</span>
              <span className="text-gray-100">10.54 bar</span>
            </li>
            <li className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Design Temperature</span>
              <span className="text-gray-100">254°C</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="font-medium text-gray-300">Fuel</span>
              <span className="text-gray-100">Coal</span>
            </li>
          </ul>
        </div>

        {/* Middle Panel - Live Data */}
        <div className="col-span-5 bg-gray-800 p-4 rounded-lg shadow-md flex flex-col max-h-[500px] border border-gray-500 overflow-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">Live Data</h2>

          {/* Efficiency */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-300">Efficiency - Direct</p>
            <div className="h-12 bg-gray-600 flex items-center justify-center rounded-lg mt-2">
              <span className="text-gray-400 text-lg">-- %</span>
            </div>
          </div>

          {/* GHG Emission */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-300">GHG emission against target</p>
            <div className="h-12 bg-gray-600 flex items-center justify-center rounded-lg mt-2">
              <span className="text-gray-400 text-lg">-- kgCO2e</span>
            </div>
          </div>

          {/* Other Data */}
          <div className="grid grid-cols-2 gap-4 text-sm overflow-auto">
  {/* Left Side: Data List */}
  <ul className="text-sm space-y-2 w-full max-h-[250px] pr-4 overflow-auto border-r border-gray-600">
    <li className="flex justify-between border-b border-gray-600 py-1">
      <span className="font-medium text-gray-300">Make</span>
      <span className="text-gray-100">Thermax</span>
    </li>
    <li className="flex justify-between border-b border-gray-600 py-1">
      <span className="font-medium text-gray-300">Capacity</span>
      <span className="text-gray-100">10 TPH</span>
    </li>
    <li className="flex justify-between border-b border-gray-600 py-1">
      <span className="font-medium text-gray-300">Working Pressure</span>
      <span className="text-gray-100">10.54 bar</span>
    </li>
    <li className="flex justify-between border-b border-gray-600 py-1">
      <span className="font-medium text-gray-300">Design Temperature</span>
      <span className="text-gray-100">254°C</span>
    </li>
    <li className="flex justify-between py-1">
      <span className="font-medium text-gray-300">Fuel</span>
      <span className="text-gray-100">Coal</span>
    </li>
  </ul>
  
  {/* Right Side: Metrics */}
  <div className="space-y-4 overflow-auto max-h-[250px] pl-4">
    <div className="border border-gray-600 p-2 rounded-lg flex items-center">
      <FaBalanceScale className="text-blue-500 mr-2" size={20} />
      <div>
        <p className="text-gray-400">S/F ratio</p>
        <p className="font-medium text-blue-300">NaN %</p>
      </div>
    </div>
    <div className="border border-gray-600 p-2 rounded-lg flex items-center">
      <FaTachometerAlt className="text-green-500 mr-2" size={20} />
      <div>
        <p className="text-gray-400">Pressure</p>
        <p className="font-medium text-green-300">NaN Bar</p>
      </div>
    </div>
    <div className="border border-gray-600 p-2 rounded-lg flex items-center">
      <FaWeight className="text-red-500 mr-2" size={20} />
      <div>
        <p className="text-gray-400">Load %</p>
        <p className="font-medium text-red-300">NaN %</p>
      </div>
    </div>
  </div>
</div>
        </div>

        {/* Right Panel - Insights and Alerts */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Insights */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md flex-1 max-h-[500px] border border-gray-500">
            <h2 className="text-lg font-semibold mb-2 text-gray-100">Insights</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">0</p>
              <p className="text-sm text-gray-400">
                Open critical insights in last 16 days
              </p>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md flex-1 max-h-[500px] border border-gray-500">
            <h2 className="text-lg font-semibold mb-2 text-gray-100">Alerts</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-300">-</p>
              <p className="text-sm text-gray-400">
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