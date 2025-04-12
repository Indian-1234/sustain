import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplet, Activity, Check, X, BarChart2, TrendingUp, ThermometerSun } from 'lucide-react';

export default function WTPMonitoringDashboard() {
  const [waterQualityData, setWaterQualityData] = useState([]);
  const [treatmentStatus, setTreatmentStatus] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate fetching data
  useEffect(() => {
    // Simulate water quality data
    const generateWaterQualityData = () => {
      const newData = [];
      for (let i = 0; i < 24; i++) {
        newData.push({
          time: `${i}:00`,
          pH: (Math.random() * 1.5 + 6.5).toFixed(1),
          turbidity: (Math.random() * 2).toFixed(2),
          chlorine: (Math.random() * 1.8 + 0.2).toFixed(2),
          temperature: (Math.random() * 5 + 18).toFixed(1),
        });
      }
      setWaterQualityData(newData);
    };

    // Simulate treatment status
    const generateTreatmentStatus = () => {
      setTreatmentStatus({
        flocculation: Math.random() > 0.1 ? 'Normal' : 'Warning',
        sedimentation: Math.random() > 0.1 ? 'Normal' : 'Warning',
        filtration: Math.random() > 0.1 ? 'Normal' : 'Warning',
        disinfection: Math.random() > 0.1 ? 'Normal' : 'Warning',
        flowRate: (Math.random() * 200 + 800).toFixed(0),
        pressurePsi: (Math.random() * 10 + 55).toFixed(1),
        reservoirLevel: (Math.random() * 15 + 75).toFixed(1)
      });
    };

    // Simulate alerts
    const generateAlerts = () => {
      const possibleAlerts = [
        { id: 1, type: 'Low Chlorine', level: 'Warning', timestamp: new Date().toLocaleTimeString() },
        { id: 2, type: 'High Turbidity', level: 'Critical', timestamp: new Date().toLocaleTimeString() },
        { id: 3, type: 'Pump Pressure Drop', level: 'Warning', timestamp: new Date().toLocaleTimeString() },
        { id: 4, type: 'pH Out of Range', level: 'Warning', timestamp: new Date().toLocaleTimeString() },
        { id: 5, type: 'Filter Backwash Required', level: 'Info', timestamp: new Date().toLocaleTimeString() }
      ];
      
      // Randomly select 0-3 alerts
      const numberOfAlerts = Math.floor(Math.random() * 3);
      const selectedAlerts = [];
      
      for (let i = 0; i < numberOfAlerts; i++) {
        const randomIndex = Math.floor(Math.random() * possibleAlerts.length);
        selectedAlerts.push(possibleAlerts[randomIndex]);
        possibleAlerts.splice(randomIndex, 1);
      }
      
      setAlerts(selectedAlerts);
    };

    // Update time
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Initial data load
    generateWaterQualityData();
    generateTreatmentStatus();
    generateAlerts();

    // Set interval for updating data
    const interval = setInterval(() => {
      generateWaterQualityData();
      generateTreatmentStatus();
      generateAlerts();
      updateTime();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Last 6 hours of data for charts
  const chartData = waterQualityData.slice(-6);

  return (
    <div className="bg-gray-100 p-6 h-screen overflow-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Water Treatment Plant Monitoring</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Dashboard Overview</p>
          <p className="text-gray-600">{currentTime.toLocaleString()}</p>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Water Quality Parameters */}
        <div className="bg-white rounded-lg shadow-md p-4 col-span-1 lg:col-span-2">
          <div className="flex items-center mb-4">
            <Droplet className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Water Quality Parameters</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="pH" stroke="#8884d8" name="pH" />
                <Line yAxisId="left" type="monotone" dataKey="turbidity" stroke="#82ca9d" name="Turbidity (NTU)" />
                <Line yAxisId="right" type="monotone" dataKey="chlorine" stroke="#ff7300" name="Chlorine (mg/L)" />
                <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ff0000" name="Temp (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Treatment Process Status */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <Activity className="text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">Treatment Process Status</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(treatmentStatus).slice(0, 4).map(([process, status]) => (
              <div key={process} className="flex justify-between items-center">
                <span className="capitalize">{process}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {status === 'Normal' ? <Check className="inline w-4 h-4 mr-1" /> : <AlertTriangle className="inline w-4 h-4 mr-1" />}
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Flow & Pressure Metrics */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">Flow & Pressure Metrics</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-3 bg-blue-50">
              <p className="text-gray-500 text-sm">Flow Rate</p>
              <p className="text-2xl font-bold">{treatmentStatus.flowRate} <span className="text-sm font-normal">GPM</span></p>
            </div>
            <div className="border rounded-lg p-3 bg-purple-50">
              <p className="text-gray-500 text-sm">System Pressure</p>
              <p className="text-2xl font-bold">{treatmentStatus.pressurePsi} <span className="text-sm font-normal">PSI</span></p>
            </div>
            <div className="border rounded-lg p-3 bg-green-50">
              <p className="text-gray-500 text-sm">Reservoir Level</p>
              <p className="text-2xl font-bold">{treatmentStatus.reservoirLevel}% <span className="text-sm font-normal">Capacity</span></p>
            </div>
          </div>
        </div>

        {/* Parameter Distribution */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <BarChart2 className="text-indigo-500 mr-2" />
            <h2 className="text-xl font-semibold">Parameter Distribution</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-4)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pH" fill="#8884d8" />
                <Bar dataKey="turbidity" fill="#82ca9d" />
                <Bar dataKey="chlorine" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-lg shadow-md p-4 col-span-1 lg:col-span-2">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" />
            <h2 className="text-xl font-semibold">Alerts & Notifications</h2>
          </div>
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded-lg flex items-center ${
                  alert.level === 'Critical' ? 'bg-red-100 text-red-800' : 
                  alert.level === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.level === 'Critical' ? <X className="w-5 h-5 mr-2" /> : 
                   alert.level === 'Warning' ? <AlertTriangle className="w-5 h-5 mr-2" /> : 
                   <Droplet className="w-5 h-5 mr-2" />}
                  <div>
                    <p className="font-medium">{alert.type}</p>
                    <p className="text-sm">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Check className="mx-auto w-10 h-10 text-green-500 mb-2" />
              <p className="text-gray-600">No active alerts at this time</p>
            </div>
          )}
        </div>

        {/* Temperature Trends */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <ThermometerSun className="text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Temperature Trends</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}