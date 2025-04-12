import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, Droplet, ThermometerSun, Filter, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// Simulated data for the dashboard
const generateSensorData = (min, max, count = 24) => {
  return Array.from({ length: count }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }));
};

// Mock alert data
const alerts = [
  { id: 1, level: 'high', message: 'High turbidity in filter 3', time: '09:45', status: 'active' },
  { id: 2, level: 'medium', message: 'pH level deviation in basin 2', time: '08:30', status: 'active' },
  { id: 3, level: 'low', message: 'Scheduled maintenance for pump 4', time: '12:00', status: 'pending' },
  { id: 4, level: 'high', message: 'Chlorine level above threshold', time: '07:15', status: 'resolved' }
];

// Treatment process stages
const stages = [
  { name: 'Intake', value: 100, color: '#8884d8' },
  { name: 'Coagulation', value: 95, color: '#83a6ed' },
  { name: 'Sedimentation', value: 90, color: '#8dd1e1' },
  { name: 'Filtration', value: 88, color: '#82ca9d' },
  { name: 'Disinfection', value: 85, color: '#ffc658' },
  { name: 'Storage', value: 80, color: '#a4de6c' }
];

// Quality parameters status
const qualityParameters = [
  { name: 'pH Level', value: 7.2, min: 6.5, max: 8.5, unit: 'pH' },
  { name: 'Chlorine', value: 1.8, min: 0.5, max: 2.0, unit: 'mg/L' },
  { name: 'Turbidity', value: 0.4, min: 0, max: 1.0, unit: 'NTU' },
  { name: 'Dissolved Oxygen', value: 6.5, min: 5.0, max: 8.0, unit: 'mg/L' },
  { name: 'TDS', value: 175, min: 0, max: 500, unit: 'mg/L' }
];

// Equipment status
const equipmentStatus = [
  { id: 1, name: 'Primary Pump', status: 'operational', runtime: '876 hrs', nextMaintenance: '24 days' },
  { id: 2, name: 'Secondary Pump', status: 'operational', runtime: '512 hrs', nextMaintenance: '48 days' },
  { id: 3, name: 'Filter Bank 1', status: 'maintenance', runtime: '1200 hrs', nextMaintenance: '0 days' },
  { id: 4, name: 'Chlorine Injector', status: 'operational', runtime: '336 hrs', nextMaintenance: '64 days' }
];

// Treatment statistics
const treatmentStats = [
  { name: 'Today', treated: 850000, raw: 900000 },
  { name: 'Yesterday', treated: 825000, raw: 870000 },
  { name: 'Saturday', treated: 780000, raw: 820000 },
  { name: 'Friday', treated: 840000, raw: 890000 },
  { name: 'Thursday', treated: 860000, raw: 910000 },
  { name: 'Wednesday', treated: 830000, raw: 875000 },
  { name: 'Tuesday', treated: 845000, raw: 895000 }
];

export default function WaterTreatmentDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [turbidityData] = useState(generateSensorData(0.1, 1.0));
  const [phData] = useState(generateSensorData(6.5, 8.0));
  const [temperatureData] = useState(generateSensorData(15, 25));
  const [flowRateData] = useState(generateSensorData(800, 950));
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format the current time
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Water Treatment Plant Monitoring</h1>
            <p className="text-blue-100">Real-time dashboard for plant operations</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold flex items-center justify-end">
              <Clock className="mr-2" size={24} />
              {formattedTime}
            </div>
            <div className="text-sm text-blue-100">{formattedDate}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Process Overview */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Treatment Process Flow</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stages}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Water Quality Parameters */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Water Quality Parameters</h2>
          <div className="space-y-4">
            {qualityParameters.map((param) => {
              const percentage = ((param.value - param.min) / (param.max - param.min)) * 100;
              let statusColor = 'bg-green-500';
              if (param.value < param.min || param.value > param.max) {
                statusColor = 'bg-red-500';
              } else if (param.value > (param.max * 0.9) || param.value < (param.min * 1.1)) {
                statusColor = 'bg-yellow-500';
              }
              
              return (
                <div key={param.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{param.name}</span>
                    <span className="text-gray-600">
                      {param.value} {param.unit} 
                      <span className="text-xs text-gray-500 ml-1">
                        (Range: {param.min}-{param.max})
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${statusColor} h-2 rounded-full`} 
                      style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            Alerts & Notifications
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map((alert) => {
              let alertClass = "border-l-4 p-3 text-sm";
              let icon = <AlertCircle size={16} className="mr-2" />;
              
              if (alert.status === 'resolved') {
                alertClass += " border-green-500 bg-green-50";
                icon = <CheckCircle size={16} className="mr-2 text-green-500" />;
              } else if (alert.level === 'high') {
                alertClass += " border-red-500 bg-red-50";
                icon = <AlertTriangle size={16} className="mr-2 text-red-500" />;
              } else if (alert.level === 'medium') {
                alertClass += " border-yellow-500 bg-yellow-50";
                icon = <AlertCircle size={16} className="mr-2 text-yellow-500" />;
              } else {
                alertClass += " border-blue-500 bg-blue-50";
                icon = <AlertCircle size={16} className="mr-2 text-blue-500" />;
              }
              
              return (
                <div key={alert.id} className={alertClass}>
                  <div className="flex items-start">
                    {icon}
                    <div>
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {alert.time} • {alert.status === 'active' ? 'Active' : 
                                      alert.status === 'pending' ? 'Pending' : 'Resolved'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Turbidity Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
            <Droplet className="mr-2" size={20} />
            Turbidity Levels (24h)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turbidityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pH Levels Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
            <Filter className="mr-2" size={20} />
            pH Levels (24h)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={phData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[6, 9]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
            <ThermometerSun className="mr-2" size={20} />
            Water Temperature (24h)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Equipment Status</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runtime</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipmentStatus.map((equipment) => (
                  <tr key={equipment.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{equipment.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        equipment.status === 'operational' ? 'bg-green-100 text-green-800' : 
                        equipment.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {equipment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{equipment.runtime}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{equipment.nextMaintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Water Treatment Statistics */}
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
            <Activity className="mr-2" size={20} />
            Water Treatment Statistics (Last 7 Days)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treatmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="raw" name="Raw Water (Gallons)" fill="#3b82f6" />
                <Bar dataKey="treated" name="Treated Water (Gallons)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Flow Rate */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Current Flow Rate (GPM)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flowRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[700, 1000]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-center text-gray-500 text-sm">
        <p>© 2025 Water Treatment Plant Monitoring System | Last updated: {formattedTime}</p>
      </footer>
    </div>
  );
}