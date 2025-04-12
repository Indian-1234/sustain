'use client';
import React, { useState, useEffect } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { ArrowUp, Check, AlertTriangle, RefreshCw, Droplet, Thermometer } from 'lucide-react';
import {
  data,
  centerBackgroundPlugin,
  options,
  horizontalBarData,
  horizontalBarOptions,
  DoughnutPlugin,
  Doughnutoptions,
  Doughnutdata,
  linegraph,
  lineoptions,
  linegraphs,
  lineoption,
  users,
  comm,
} from './style.ts';

export default function GridComponent() {
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  // Auto refresh data every minute
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setRefreshTime(new Date());
        // Here you would typically fetch new data
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Function to handle manual refresh
  const handleRefresh = () => {
    setRefreshTime(new Date());
    // Here you would typically fetch new data
  };

  return (
    <div className="bg-gray-800 min-h-screen p-4">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4 bg-gray-700 p-3 rounded shadow-md">
        <h1 className="text-white text-xl font-semibold">Plant Monitoring Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Time Range:</span>
            <select 
              className="bg-gray-600 text-white text-sm rounded p-1 border border-gray-500"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Auto Refresh:</span>
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={() => setAutoRefresh(!autoRefresh)}
              className="form-checkbox h-4 w-4 bg-gray-600 border-gray-500"
            />
          </div>
          <button 
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </button>
          <div className="text-gray-300 text-xs">
            Last updated: {refreshTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Alert banner for critical notifications */}
      <div className="bg-yellow-700 text-yellow-100 p-2 mb-4 rounded flex items-center shadow-md">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span className="text-sm">Alert: Unit 1 experiencing elevated temperatures. Maintenance recommended.</span>
      </div>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Plant Control Status - 2 rows tall, 1 column wide */}
        <div className="bg-gray-700 row-span-2 sm:col-span-1 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2 flex items-center justify-between">
            <h2 className="text-white text-sm font-medium">Plant Control Status</h2>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-green-400 text-xs">Online</span>
            </div>
          </div>
          <div className="bg-gray-700 p-4 flex items-center justify-center h-64">
            <div className="w-full max-w-xs aspect-square">
              <Doughnut data={data} options={options} plugins={[centerBackgroundPlugin]} />
            </div>
          </div>
        </div>

        {/* Plant Performance */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2 flex items-center justify-between">
            <h2 className="text-white text-sm font-medium">Plant Performance</h2>
            <Thermometer className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="bg-gray-800 w-full p-3 flex flex-col items-center justify-center text-white rounded">
              <h2 className="text-3xl font-bold">3.72</h2>
              <h2 className="text-xs text-blue-400">COP</h2>
            </div>
            <div className="bg-gray-800 w-full p-3 flex flex-col items-center justify-center text-white rounded">
              <h2 className="text-3xl font-bold">0.95</h2>
              <h2 className="text-xs text-blue-400">kW/Ton</h2>
            </div>
          </div>
        </div>

        {/* Cooling Load */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2 flex items-center justify-between">
            <h2 className="text-white text-sm font-medium">Cooling Load</h2>
            <Droplet className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="bg-gray-800 w-full p-3 flex flex-col items-center justify-center text-white rounded">
              <div className="w-full bg-gray-900 h-2 rounded-full mb-1">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '29%' }}></div>
              </div>
              <h2 className="text-3xl font-bold">29%</h2>
              <h2 className="text-xs text-blue-400">Total Load Percentage</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-gray-800 p-3 flex flex-col items-center justify-center text-white rounded">
                <h2 className="text-lg font-semibold">2086.6</h2>
                <h2 className="text-xs text-blue-400">Load (kW)</h2>
              </div>
              <div className="bg-gray-800 p-3 flex flex-col items-center justify-center text-white rounded">
                <h2 className="text-lg font-semibold">7102.0</h2>
                <h2 className="text-xs text-blue-400">Capacity (kW)</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Plant Demand Distribution */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">Plant Demand Distribution</h2>
          </div>
          <div className="bg-gray-700 p-4 flex items-center justify-center h-48">
            <div className="w-full h-full">
              <Bar data={horizontalBarData} options={horizontalBarOptions} />
            </div>
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">Equipment Status</h2>
          </div>
          <div className="p-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-blue-400 bg-gray-800">
                  <tr>
                    <th className="px-2 py-1">Equipment</th>
                    <th className="px-2 py-1">Alarm Description</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.eqtype} className="border-b border-gray-800">
                      <td className="px-2 py-1">{user.eqtype}</td>
                      <td className="px-2 py-1">{user.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CHW Temperature */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">CHW Temperature</h2>
          </div>
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="bg-gray-800 w-full p-3 flex flex-col items-center justify-center text-white rounded">
              <h2 className="text-3xl font-bold">9.40°C</h2>
              <h2 className="text-xs text-blue-400">CHW Supply</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-gray-800 p-3 flex flex-col items-center justify-center text-white rounded">
                <h2 className="text-lg font-semibold">12.20°C</h2>
                <h2 className="text-xs text-blue-400">CHW Return</h2>
              </div>
              <div className="bg-gray-800 p-3 flex flex-col items-center justify-center text-white rounded">
                <h2 className="text-lg font-semibold">9.45°C</h2>
                <h2 className="text-xs text-blue-400">CHW Setpoint</h2>
              </div>
            </div>
          </div>
        </div>

        {/* CHW SP VS CHW Leaving */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">CHW SP VS CHW Leaving</h2>
          </div>
          <div className="bg-gray-700 p-4 flex items-center justify-center h-48">
            <div className="w-full max-w-xs aspect-square">
              <Doughnut data={Doughnutdata} options={Doughnutoptions} plugins={[DoughnutPlugin]} />
            </div>
          </div>
        </div>

        {/* Weather */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">Weather</h2>
          </div>
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="bg-gray-800 w-full p-3 flex flex-col items-center justify-center text-white rounded">
              <h2 className="text-3xl font-bold">25.86°C</h2>
              <h2 className="text-xs text-blue-400">Ambient Temp</h2>
            </div>
            <div className="bg-gray-800 w-full p-3 flex flex-col items-center justify-center text-white rounded">
              <h2 className="text-3xl font-bold">0.01%</h2>
              <h2 className="text-xs text-blue-400">Humidity</h2>
            </div>
          </div>
        </div>

        {/* Comm Status */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">Comm Status</h2>
          </div>
          <div className="p-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-blue-400 bg-gray-800">
                  <tr>
                    <th className="px-2 py-1">Network</th>
                    <th className="px-2 py-1">Status</th>
                    <th className="px-2 py-1">Faults</th>
                  </tr>
                </thead>
                <tbody>
                  {comm.map((com) => (
                    <tr key={com.network} className="border-b border-gray-800">
                      <td className="px-2 py-1">{com.network}</td>
                      <td className="px-2 py-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${com.status === 'Online' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                          {com.status}
                        </span>
                      </td>
                      <td className="px-2 py-1">{com.faults}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Units */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden w-full col-span-2">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">Units</h2>
          </div>
          <div className="flex items-center justify-center p-4 h-32">
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5, 6].map((unit) => {
                // Dynamic status for demonstration - in real app this would come from data
                const isRunning = [1, 5, 6].includes(unit);
                const isStandby = [2, 3, 4].includes(unit);
                
                return (
                  <div key={unit} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${isRunning ? 'bg-blue-400' : 'bg-blue-900 border-2 border-blue-400'} flex items-center justify-center`}>
                      {isRunning ? (
                        <ArrowUp className="w-5 h-5 text-blue-900" strokeWidth={2.5} />
                      ) : (
                        <Check className="w-5 h-5 text-blue-400" strokeWidth={2.5} />
                      )}
                    </div>
                    <span className="text-sm text-white font-medium mt-1">{unit}</span>
                    <span className="text-xs text-blue-400">{isRunning ? 'Running' : isStandby ? 'Standby' : 'Off'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Plant COP History - spans 2 columns */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden col-span-2">
          <div className="bg-gray-900 p-2 flex justify-between items-center">
            <h2 className="text-white text-sm font-medium">Plant COP History</h2>
            <div className="flex space-x-2">
              <button className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded hover:bg-blue-800">
                Daily
              </button>
              <button className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded hover:bg-gray-700">
                Weekly
              </button>
              <button className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded hover:bg-gray-700">
                Monthly
              </button>
            </div>
          </div>
          <div className="bg-gray-700 p-4 h-64">
            <div className="w-full h-full">
              <Line data={linegraph} options={lineoptions} />
            </div>
          </div>
        </div>

        {/* Plant Load History - spans 2 columns */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden col-span-2">
          <div className="bg-gray-900 p-2 flex justify-between items-center">
            <h2 className="text-white text-sm font-medium">Plant Load History</h2>
            <div className="flex space-x-2">
              <button className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded hover:bg-blue-800">
                Daily
              </button>
              <button className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded hover:bg-gray-700">
                Weekly
              </button>
              <button className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded hover:bg-gray-700">
                Monthly
              </button>
            </div>
          </div>
          <div className="bg-gray-700 p-4 h-64">
            <div className="w-full h-full">
              <Line data={linegraphs} options={lineoption} />
            </div>
          </div>
        </div>

        {/* System Performance Summary - spans 2 columns */}
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden col-span-2">
          <div className="bg-gray-900 p-2">
            <h2 className="text-white text-sm font-medium">System Performance Summary</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-xs text-blue-400 mb-1">Energy Consumption</div>
                <div className="text-xl font-bold text-white">127.4 MWh</div>
                <div className="text-xs text-green-400 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 rotate-180" /> 4.2% vs last period
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-xs text-blue-400 mb-1">Average Load</div>
                <div className="text-xl font-bold text-white">32.6%</div>
                <div className="text-xs text-red-400 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3" /> 2.1% vs last period
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-xs text-blue-400 mb-1">Peak Demand</div>
                <div className="text-xl font-bold text-white">4.2 MW</div>
                <div className="text-xs text-gray-400 flex items-center mt-1">
                  <span className="w-3 h-3 inline-block">—</span> No change
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with additional info */}
      <div className="mt-4 bg-gray-700 p-3 rounded shadow-md flex justify-between items-center">
        <div className="text-xs text-gray-300">
          Dashboard v2.1.3 | Data retention: 90 days
        </div>
        <div className="flex space-x-2">
          <button className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded hover:bg-gray-500">
            Export Data
          </button>
          <button className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded hover:bg-gray-500">
            System Settings
          </button>
          <button className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded hover:bg-gray-500">
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
}