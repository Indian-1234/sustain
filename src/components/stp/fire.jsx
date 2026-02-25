import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Droplet, Thermometer, Gauge, Bell, Clock, Activity, AlertTriangle } from 'lucide-react';

// Mock data for demonstration
const generateMockData = () => {
  const now = new Date();
  const data = [];
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now - i * 60000);
    data.push({
      time: time.toLocaleTimeString(),
      pressure: Math.floor(Math.random() * 30) + 70, // 70-100 PSI
      flowRate: Math.floor(Math.random() * 15) + 35, // 35-50 GPM
      temperature: parseFloat((((Math.floor(Math.random() * 10) + 75) - 32) * 5 / 9).toFixed(1)), // ~23.9°C to ~29.4°C
      batteryLevel: Math.floor(Math.random() * 20) + 80, // 80-100%
    });
  }
  return data;
};

// System status
const initialAlerts = [
  { id: 1, time: '08:45:12', message: 'Pressure drop detected', severity: 'warning' },
  { id: 2, time: '07:30:05', message: 'Weekly test completed successfully', severity: 'info' },
  { id: 3, time: '06:15:30', message: 'Battery backup checked', severity: 'info' }
];

const FirePumpMonitoring = () => {
  const [pumpData, setPumpData] = useState(generateMockData());
  const [pumpStatus, setPumpStatus] = useState('Standby');
  const [systemHealth] = useState(98);
  const [lastMaintenance] = useState('2025-01-15');
  const [nextMaintenanceDue] = useState('2025-04-15');
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    let interval;

    if (isSimulating) {
      interval = setInterval(() => {
        const newData = [...pumpData];
        newData.shift();

        const now = new Date();
        const newPoint = {
          time: now.toLocaleTimeString(),
          pressure: Math.floor(Math.random() * 30) + 70,
          flowRate: Math.floor(Math.random() * 15) + 35,
          temperature: Math.floor(Math.random() * 10) + 75,
          batteryLevel: Math.max(newData[newData.length - 1].batteryLevel - 0.1, 80),
        };

        newData.push(newPoint);
        setPumpData(newData);

        // Randomly change pump status for demo
        if (Math.random() > 0.95) {
          setPumpStatus(pumpStatus === 'Standby' ? 'Running' : 'Standby');

          // Add alert when status changes
          const newAlert = {
            id: Date.now(),
            time: now.toLocaleTimeString(),
            message: `Pump ${pumpStatus === 'Standby' ? 'activated' : 'returned to standby'}`,
            severity: 'info'
          };
          setAlerts([newAlert, ...alerts.slice(0, 9)]);
        }

        // Random alert
        if (Math.random() > 0.98) {
          const newAlert = {
            id: Date.now(),
            time: now.toLocaleTimeString(),
            message: 'Pressure fluctuation detected',
            severity: 'warning'
          };
          setAlerts([newAlert, ...alerts.slice(0, 9)]);
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [pumpData, pumpStatus, alerts, isSimulating]);

  const handleSimulateToggle = () => {
    setIsSimulating(!isSimulating);
  };

  const handleTestAlarm = () => {
    const now = new Date();
    const newAlert = {
      id: Date.now(),
      time: now.toLocaleTimeString(),
      message: 'Alarm test triggered manually',
      severity: 'critical'
    };
    setAlerts([newAlert, ...alerts.slice(0, 9)]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fire Pump System Remote Monitoring</h1>
          <div className="flex items-center gap-4">
            <button
              className={`px-4 py-2 rounded-md text-sm ${isSimulating ? 'bg-red-500' : 'bg-green-500'}`}
              onClick={handleSimulateToggle}
            >
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {new Date().toLocaleString()}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Left column - Status Widgets */}
          <div className="space-y-4">
            {/* System Status */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-4">System Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Pump Status</div>
                  <div className={`text-lg font-bold flex items-center ${pumpStatus === 'Running' ? 'text-green-500' : 'text-blue-500'}`}>
                    <Activity size={20} className="mr-1" />
                    {pumpStatus}
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">System Health</div>
                  <div className="text-lg font-bold text-green-500">{systemHealth}</div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Last Maintenance</div>
                  <div className="text-lg font-medium">{lastMaintenance}</div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Next Due</div>
                  <div className="text-lg font-medium">{nextMaintenanceDue}</div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-4">Key Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Pressure</div>
                  <div className="text-xl font-bold flex items-center">
                    <Gauge size={20} className="mr-1 text-blue-500" />
                    {pumpData[pumpData.length - 1].pressure} PSI
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Flow Rate</div>
                  <div className="text-xl font-bold flex items-center">
                    <Droplet size={20} className="mr-1 text-blue-500" />
                    {pumpData[pumpData.length - 1].flowRate} GPM
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Temperature</div>
                  <div className="text-xl font-bold flex items-center">
                    <Thermometer size={20} className="mr-1 text-red-500" />
                    {pumpData[pumpData.length - 1].temperature}°C
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Battery</div>
                  <div className="text-xl font-bold flex items-center">
                    <Battery size={20} className="mr-1 text-green-500" />
                    {pumpData[pumpData.length - 1].batteryLevel}%
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-4">Controls</h2>
              <div className="space-y-2">
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium flex items-center justify-center"
                  onClick={handleTestAlarm}
                >
                  <Bell size={16} className="mr-2" />
                  Test Alarm
                </button>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md font-medium">
                  Run Diagnostics
                </button>
                <button className="w-full bg-gray-500 text-white py-2 rounded-md font-medium">
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Center column - Charts */}
          <div className="space-y-4">
            {/* Pressure Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-2">Pressure Trend (PSI)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pumpData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[60, 110]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="pressure" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Flow Rate Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-2">Flow Rate Trend (GPM)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pumpData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[30, 60]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="flowRate" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Temperature Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-2">Temperature Trend (°F)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pumpData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[70, 90]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right column - Alerts and System Info */}
          <div className="space-y-4">
            {/* Alerts */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-black">Alerts & Notifications</h2>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {alerts.filter(a => a.severity === 'critical').length} Critical
                </span>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-md flex items-start ${alert.severity === 'critical' ? 'bg-red-100' :
                        alert.severity === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}
                  >
                    <div className="mr-2 mt-0.5">
                      {alert.severity === 'critical' ? (
                        <AlertTriangle size={18} className="text-red-500" />
                      ) : alert.severity === 'warning' ? (
                        <AlertTriangle size={18} className="text-yellow-500" />
                      ) : (
                        <Bell size={18} className="text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-xs text-gray-500">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-4">System Information</h2>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Model</td>
                    <td className="py-2 font-medium">FP-5000 Series</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Location</td>
                    <td className="py-2 font-medium">Building A, Room 103</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Installation Date</td>
                    <td className="py-2 font-medium">2023-06-15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Last Inspection</td>
                    <td className="py-2 font-medium">2025-03-15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Certification</td>
                    <td className="py-2 font-medium">UL Listed, FM Approved</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Backup Power</td>
                    <td className="py-2 font-medium">Yes (24hr capacity)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Connected Devices */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-black mb-4">Connected Devices</h2>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Primary Pump</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Jockey Pump</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Pressure Sensor</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Flow Meter</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Backup Generator</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Standby</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="bg-gray-200 p-3 rounded-b-lg mt-4 text-center text-gray-600 text-sm">
          Fire Pump Monitoring System v1.0 | Last Updated: April 12, 2025
        </footer>
      </div>
    </div>
  );
};

export default FirePumpMonitoring;