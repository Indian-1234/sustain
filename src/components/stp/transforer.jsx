import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Thermometer, AlertTriangle, Power, Zap, Droplet, RefreshCw } from 'lucide-react';

// Sample data - would be replaced with real-time data from your API
const generateData = () => {
  const now = new Date();
  const data = [];
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now - i * 30000);
    // Calculate power values
    const powerInput = Math.floor(4800 + Math.random() * 400);
    const losses = (Math.random() * 2 + 3).toFixed(1); // Losses between 3-5%
    const powerOutput = Math.floor(powerInput * (1 - losses / 100));

    data.push({
      time: time.toLocaleTimeString(),
      temperature: Math.floor(65 + Math.random() * 25),
      voltage: Math.floor(415 + Math.random() * 10),
      current: Math.floor(95 + Math.random() * 10),
      oilLevel: Math.floor(75 + Math.random() * 15),
      efficiency: Math.floor(90 + Math.random() * 8),
      powerInput: powerInput, // kVA
      powerOutput: powerOutput, // kVA
      losses: parseFloat(losses) // percentage
    });
  }
  return data;
};

// Generate alarm data
const generateAlarms = () => {
  return [
    { id: 1, timestamp: '10:45:22', severity: 'High', message: 'Temperature exceeded threshold', resolved: false },
    { id: 2, timestamp: '09:32:15', severity: 'Medium', message: 'Oil level dropping', resolved: true },
    { id: 3, timestamp: '08:17:44', severity: 'Low', message: 'Efficiency decreased by 5%', resolved: false },
    { id: 4, timestamp: '10:28:32', severity: 'Medium', message: 'Power losses above 4.5%', resolved: false },
  ];
};

const TransformerMonitoringDashboard = () => {
  const [data, setData] = useState(generateData());
  const [alarms] = useState(generateAlarms());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Function to refresh data
  const refreshData = () => {
    setData(generateData());
    setLastUpdated(new Date());
  };

  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Get latest values
  const latest = data[data.length - 1] || {};

  // Calculate health status
  const calculateHealth = () => {
    if (latest.temperature > 85 || latest.oilLevel < 80 || latest.losses > 4.8) return 'Critical';
    if (latest.temperature > 75 || latest.oilLevel < 85 || latest.losses > 4) return 'Warning';
    return 'Normal';
  };

  const health = calculateHealth();
  const healthColor = health === 'Critical' ? 'text-red-600' : health === 'Warning' ? 'text-amber-500' : 'text-green-500';

  // Calculate active alarms
  const activeAlarms = alarms.filter(alarm => !alarm.resolved).length;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Transformer Monitoring Dashboard</h1>
            <p className="text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <RefreshCw size={18} className="mr-2" /> Refresh Data
          </button>
        </div>

        {/* Status Cards - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Temperature Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Thermometer className="text-red-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Temperature</h2>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold">{latest.temperature}°C</p>
              <p className="text-gray-500 ml-2 mb-1">/ 100°C</p>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${latest.temperature}%` }}
              />
            </div>
          </div>

          {/* Voltage Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Zap className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Voltage</h2>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold">{latest.voltage}V</p>
              <p className="text-gray-500 ml-2 mb-1">nominal</p>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-gray-500 text-sm">390V</span>
              <div className="flex-grow mx-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${((latest.voltage - 415) / 9) * 100}%` }}
                />
              </div>
              <span className="text-gray-500 text-sm">430V</span>
            </div>
          </div>

          {/* Oil Level Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Droplet className="text-blue-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Oil Level</h2>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold">{latest.oilLevel}%</p>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${latest.oilLevel}%` }}
              />
            </div>
          </div>

          {/* Health Status Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Activity className="text-blue-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Health Status</h2>
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-3xl font-bold ${healthColor}`}>{health}</p>
              <div className="flex items-center">
                <AlertTriangle className={activeAlarms > 0 ? "text-red-500" : "text-gray-300"} size={20} />
                <span className="ml-1 text-sm">{activeAlarms} active alerts</span>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div className="flex justify-between">
                <span>Efficiency:</span>
                <span className="font-semibold">{latest.efficiency}%</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Load:</span>
                <span className="font-semibold">{latest.current}A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards - New Row for Power Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Power Input Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Power className="text-purple-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Power Input</h2>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold">{latest.powerInput}</p>
              <p className="text-gray-500 ml-2 mb-1">kVA</p>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${(latest.powerInput / 5500) * 100}%` }}
              />
            </div>
          </div>

          {/* Power Output Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Zap className="text-green-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Power Output</h2>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold">{latest.powerOutput}</p>
              <p className="text-gray-500 ml-2 mb-1">kVA</p>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(latest.powerOutput / 5300) * 100}%` }}
              />
            </div>
          </div>

          {/* Losses Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <AlertTriangle className="text-orange-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-black">Transformer Losses</h2>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold">{latest.losses}%</p>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-green-500 text-sm">3%</span>
              <div className="flex-grow mx-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${latest.losses > 4.5 ? 'bg-red-500' : latest.losses > 4 ? 'bg-orange-500' : 'bg-green-500'}`}
                  style={{ width: `${((latest.losses - 3) / 2) * 100}%` }}
                />
              </div>
              <span className="text-red-500 text-sm">5%</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Temperature Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4">Temperature Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  activeDot={{ r: 8 }}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Voltage and Current Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4">Electrical Parameters</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" domain={[200, 250]} />
                <YAxis yAxisId="right" orientation="right" domain={[80, 120]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="voltage"
                  stroke="#eab308"
                  yAxisId="left"
                  name="Voltage (V)"
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#3b82f6"
                  yAxisId="right"
                  name="Current (A)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Power Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Power Input/Output Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4">Power Flow</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[4500, 5500]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="powerInput"
                  stroke="#8b5cf6"
                  name="Power Input (kVA)"
                />
                <Line
                  type="monotone"
                  dataKey="powerOutput"
                  stroke="#10b981"
                  name="Power Output (kVA)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Losses Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4">Transformer Losses</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[2.5, 5.5]} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="losses"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.3}
                  name="Losses (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Oil Level and Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4">Oil Level Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="oilLevel"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                  name="Oil Level (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4">Efficiency</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  name="Efficiency (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alarms and Events Table */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            <h2 className="text-lg font-semibold text-black">Alarms & Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alarms.map((alarm) => (
                  <tr key={alarm.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alarm.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alarm.severity === 'High' ? 'bg-red-100 text-red-800' :
                          alarm.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {alarm.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alarm.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alarm.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {alarm.resolved ? 'Resolved' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
          <p>Transformer Monitoring System | Plant Operations</p>
        </div>
      </div>
    </div>
  );
};

export default TransformerMonitoringDashboard;