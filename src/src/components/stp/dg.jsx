import React, { useState, useEffect } from 'react';
import { LineChart, AreaChart, BarChart, PieChart, Line, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';
import { AlertTriangle, Check, Clock, Thermometer, Activity, Zap, Settings, RefreshCw, Droplet, Gauge, Wind, Cpu, FileText, Calendar, ChevronRight, Shield, BarChart2, FilePieChart } from 'lucide-react';

const DgMonitoringDashboard = () => {
  // State for filters and settings
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshInterval, setRefreshInterval] = useState(60);
  const [showDataGrid, setShowDataGrid] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Mock data - in a real application, this would come from an API
  const [dgData, setDgData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fuelConsumption, setFuelConsumption] = useState([]);
  const [loadDistribution, setLoadDistribution] = useState([]);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [efficiencyData, setEfficiencyData] = useState([]);

  // Generate mock data on component mount
  useEffect(() => {
    generateMockData();
    // In a real app, set up polling or websocket connection here
    const intervalId = setInterval(() => {
      generateMockData();
    }, refreshInterval * 1000);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  const generateMockData = () => {
    // DG (Diesel Generator) data
    const dgMockData = {
      id: "DG-001",
      name: "Primary Generator",
      location: "Main Plant",
      status: Math.random() > 0.9 ? 'Maintenance' : Math.random() > 0.1 ? 'Running' : 'Standby',
      fuelLevel: Math.floor(60 + Math.random() * 35),
      temperature: Math.floor(75 + Math.random() * 15),
      loadPercentage: Math.floor(40 + Math.random() * 45),
      runtime: Math.floor(120 + Math.random() * 60),
      oilPressure: Math.floor(40 + Math.random() * 15),
      frequency: 49.8 + Math.random() * 0.4,
      voltage: 415 + Math.random() * 10 - 5,
      sec: (Math.random() * 1.5 + 2.5).toFixed(2), // Random SEC between 2.5 and 4.0
      fuelConsumptionRate: 10 + Math.random() * 5,
      efficiency: 85 + Math.random() * 10,
      currentPhases: {
        phaseA: Math.floor(80 + Math.random() * 40),
        phaseB: Math.floor(75 + Math.random() * 45),
        phaseC: Math.floor(85 + Math.random() * 35),
      },
      coolantTemp: Math.floor(65 + Math.random() * 15),
      exhaustTemp: Math.floor(380 + Math.random() * 40),
      batteryVoltage: 24 + Math.random() * 2 - 1,
      airFilterStatus: Math.random() > 0.8 ? 'Replace Soon' : 'Good',
      hourlyReadings: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        load: 40 + Math.random() * 35,
        temp: 70 + Math.random() * 20,
        fuel: 85 - (i * 0.5) + Math.random() * 5, // Slight decline to show consumption
        oilPressure: 40 + Math.random() * 10,
        frequency: 49.8 + Math.random() * 0.4,
      })),
      lastMaintenance: '2025-03-15',
      nextMaintenance: '2025-06-15',
      warrantyExpiry: '2028-12-31',
      installedDate: '2023-05-10',
      model: 'PowerGen X5000',
      manufacturer: 'GenTech Industries',
      fuelType: 'Diesel',
      capacity: '500 kVA',
    };

    // Mock alerts
    const mockAlerts = [
      { id: 1, severity: 'medium', message: 'Fuel level below 70%', timestamp: '2025-04-11T08:15:00' },
      { id: 2, severity: 'low', message: 'Oil level needs checking', timestamp: '2025-04-11T09:30:00' },
      { id: 3, severity: 'high', message: 'Temperature spike detected', timestamp: '2025-04-11T04:30:00' },
      { id: 4, severity: 'low', message: 'Runtime threshold approaching for maintenance', timestamp: '2025-04-10T22:45:00' },
      { id: 5, severity: 'medium', message: 'Oil pressure fluctuation', timestamp: '2025-04-10T18:20:00' },
    ];

    // Fuel consumption data for last 7 days
    const fuelConsumptionData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        consumption: 200 + Math.random() * 150,
        cost: (200 + Math.random() * 150) * 1.2,
      };
    });

    // Load distribution data
    const loadDistributionData = [
      { name: 'Critical Systems', value: 35 },
      { name: 'HVAC', value: 25 },
      { name: 'Lighting', value: 15 },
      { name: 'Processing', value: 25 }
    ];

    // Maintenance history
    const maintenanceHistoryData = [
      { id: 1, date: '2025-03-15', type: 'Routine', description: 'Oil change, filter replacement', technician: 'John Smith', status: 'Completed' },
      { id: 2, date: '2025-01-10', type: 'Emergency', description: 'Fuel pump repair', technician: 'Alex Johnson', status: 'Completed' },
      { id: 3, date: '2024-11-23', type: 'Preventive', description: 'Coolant system inspection', technician: 'Sarah Williams', status: 'Completed' },
      { id: 4, date: '2024-09-05', type: 'Routine', description: 'Oil change, belt inspection', technician: 'John Smith', status: 'Completed' },
      { id: 5, date: '2024-06-20', type: 'Major', description: 'Annual overhaul', technician: 'Technical Team', status: 'Completed' },
    ];

    // Efficiency data over time
    const efficiencyHistoryData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        efficiency: 80 + Math.random() * 15,
        target: 90,
      };
    });

    setDgData(dgMockData);
    setAlerts(mockAlerts);
    setFuelConsumption(fuelConsumptionData);
    setLoadDistribution(loadDistributionData);
    setMaintenanceHistory(maintenanceHistoryData);
    setEfficiencyData(efficiencyHistoryData);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    generateMockData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'standby': return 'text-blue-500';
      case 'maintenance': return 'text-yellow-500';
      case 'fault': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIndicator = (status) => {
    const colorClass = getStatusColor(status);
    
    if (status === 'running') {
      return <div className={`flex items-center ${colorClass}`}><Check size={16} className="mr-1" /> {status}</div>;
    } else if (status === 'fault') {
      return <div className={`flex items-center ${colorClass}`}><AlertTriangle size={16} className="mr-1" /> {status}</div>;
    } else {
      return <div className={`flex items-center ${colorClass}`}><Settings size={16} className="mr-1" /> {status}</div>;
    }
  };

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const calculateRemainingHours = () => {
    return Math.floor(500 - (dgData.runtime || 0) % 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Diesel Generator Monitoring System</h1>
            <p className="text-blue-100">HSD Plant System Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-blue-700 text-white p-2 rounded border border-blue-600"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <div>
              <select 
                value={refreshInterval} 
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="bg-blue-700 text-white p-2 rounded border border-blue-600"
              >
                <option value="30">Refresh: 30s</option>
                <option value="60">Refresh: 1m</option>
                <option value="300">Refresh: 5m</option>
                <option value="600">Refresh: 10m</option>
              </select>
            </div>
            <button 
              onClick={handleRefresh} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
              disabled={refreshing}
            >
              <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto p-4">
        {/* Equipment Info Banner */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-800">{dgData.name} ({dgData.id})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 mt-2">
              <div>
                <span className="text-gray-500 text-sm">Model:</span>
                <span className="ml-2 font-medium">{dgData.model}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Manufacturer:</span>
                <span className="ml-2 font-medium">{dgData.manufacturer}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Capacity:</span>
                <span className="ml-2 font-medium">{dgData.capacity}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Location:</span>
                <span className="ml-2 font-medium">{dgData.location}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Installed:</span>
                <span className="ml-2 font-medium">{dgData.installedDate}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Warranty:</span>
                <span className="ml-2 font-medium">{dgData.warrantyExpiry}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Fuel Type:</span>
                <span className="ml-2 font-medium">{dgData.fuelType}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Next Service:</span>
                <span className="ml-2 font-medium">{dgData.nextMaintenance}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="text-center px-6 py-4 border-r">
              <div className={`text-xl font-bold ${getStatusColor(dgData.status)}`}>
                {dgData.status}
              </div>
              <div className="text-sm text-gray-500">Current Status</div>
            </div>
            <div className="text-center px-6 py-4">
              <div className="text-xl font-bold text-blue-600">
                {calculateRemainingHours()} hrs
              </div>
              <div className="text-sm text-gray-500">Until Next Service</div>
            </div>
          </div>
        </div>

        {/* Alerts Banner - Shows only if there are high severity alerts */}
        {alerts.some(alert => alert.severity === 'high') && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
            <div className="flex items-center">
              <AlertTriangle size={24} className="mr-2" />
              <p className="font-bold">Critical Alert:</p>
              <p className="ml-2">
                {alerts.find(alert => alert.severity === 'high').message}
              </p>
            </div>
          </div>
        )}

        {/* Primary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* DG Status */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Status</h3>
              <Activity size={20} className="text-blue-500" />
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold mb-1">
                {getStatusIndicator(dgData.status || 'Unknown')}
              </div>
              <div className="text-sm text-gray-500">
                Load: {dgData.loadPercentage}%
              </div>
            </div>
          </div>

          {/* Fuel Level */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Fuel Level</h3>
              <Droplet size={20} className="text-blue-500" />
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold" style={{ 
                color: dgData.fuelLevel > 70 ? '#4caf50' : 
                       dgData.fuelLevel > 30 ? '#ff9800' : '#f44336' 
              }}>
                {dgData.fuelLevel}%
              </div>
              <div className="text-sm text-gray-500 ml-2">
                (~{Math.round(dgData.fuelLevel * 10)} L)
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${dgData.fuelLevel}%`, 
                  backgroundColor: dgData.fuelLevel > 70 ? '#4caf50' : 
                                  dgData.fuelLevel > 30 ? '#ff9800' : '#f44336'
                }}
              ></div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Consumption rate: {dgData.fuelConsumptionRate?.toFixed(1)} L/hr
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Temperature</h3>
              <Thermometer size={20} className="text-red-500" />
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold" 
                style={{ 
                  color: dgData.temperature > 85 ? '#f44336' : 
                         dgData.temperature > 80 ? '#ff9800' : '#4caf50' 
                }}>
                {dgData.temperature}°C
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="text-gray-500">Coolant: </span>
                <span className={dgData.coolantTemp > 75 ? 'text-red-500' : 'text-green-500'}>{dgData.coolantTemp}°C</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Exhaust: </span>
                <span className={dgData.exhaustTemp > 400 ? 'text-red-500' : 'text-green-500'}>{dgData.exhaustTemp}°C</span>
              </div>
            </div>
          </div>
{/* KW Produced */}
<div className="bg-white rounded-lg shadow p-4">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-gray-700 font-medium">KW Produced</h3>
    <Zap size={20} className="text-yellow-500" />
  </div>
  <div className="flex items-end">
    <div className="text-3xl font-bold text-blue-600">
      {(dgData.loadPercentage * 5).toFixed(1)} kW
    </div>
  </div>
  <div className="text-sm text-gray-500 mt-2">
    {dgData.loadPercentage}% of capacity
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
    <div 
      className="h-2.5 rounded-full bg-blue-500" 
      style={{ width: `${dgData.loadPercentage}%` }}
    ></div>
  </div>
</div>

{/* KW Produced */}
<div className="bg-white rounded-lg shadow p-4">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-gray-700 font-medium">KW Produced</h3>
    <Zap size={20} className="text-yellow-500" />
  </div>
  <div className="flex items-end">
    <div className="text-3xl font-bold text-blue-600">
      {(dgData.loadPercentage * 5).toFixed(1)} kW
    </div>
  </div>
  <div className="text-sm text-gray-500 mt-2">
    {dgData.loadPercentage}% of capacity
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
    <div 
      className="h-2.5 rounded-full bg-blue-500" 
      style={{ width: `${dgData.loadPercentage}%` }}
    ></div>
  </div>
</div>

{/* Specific Energy Consumption */}
<div className="bg-white rounded-lg shadow p-4">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-gray-700 font-medium">SEC</h3>
    <Gauge size={20} className="text-green-500" />
  </div>
  <div className="flex items-end">
    <div className="text-3xl font-bold" style={{ 
      color: dgData.sec > 4 ? '#f44336' : 
             dgData.sec > 3.5 ? '#ff9800' : '#4caf50' 
    }}>
      {dgData.sec || 3} kW/L
    </div>
  </div>
  <div className="text-sm text-gray-500 mt-2">
    Target: 3.5 kW/L
  </div>
  <div className="flex justify-between text-xs text-gray-500 mt-1">
    <span>Poor</span>
    <span>Good</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
    <div 
      className="h-2.5 rounded-full" 
      style={{ 
        width: `${(5 - (dgData.sec || 3)) / 2 * 100}%`, 
        backgroundColor: dgData.sec > 4 ? '#f44336' : 
                         dgData.sec > 3.5 ? '#ff9800' : '#4caf50'
      }}
    ></div>
  </div>
</div>

{/* Flow Rate */}
<div className="bg-white rounded-lg shadow p-4">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-gray-700 font-medium">Flow Rate</h3>
    <Wind size={20} className="text-blue-500" />
  </div>
  <div className="flex items-end">
    <div className="text-3xl font-bold text-blue-600">
      {dgData.flowRate || 25} L/min
    </div>
  </div>
  <div className="text-sm text-gray-500 mt-2">
    Normal range: 20-30 L/min
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
    <div 
      className="h-2.5 rounded-full bg-blue-500" 
      style={{ 
        width: `${((dgData.flowRate || 25) / 40) * 100}%`
      }}
    ></div>
  </div>
</div>
          {/* Oil Pressure */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Oil Pressure</h3>
              <Gauge size={20} className="text-blue-500" />
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold" 
                style={{ 
                  color: dgData.oilPressure < 30 ? '#f44336' : 
                         dgData.oilPressure < 35 ? '#ff9800' : '#4caf50' 
                }}>
                {dgData.oilPressure} Kg/cm2
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Recommended range: 35-55 Kg/cm2
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${(dgData.oilPressure / 60) * 100}%`, 
                  backgroundColor: dgData.oilPressure < 30 ? '#f44336' : 
                                   dgData.oilPressure < 35 ? '#ff9800' : '#4caf50'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* DG Additional Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Frequency */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Frequency</h3>
              <Activity size={20} className="text-purple-500" />
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold" 
                style={{ 
                  color: dgData.frequency < 49.5 || dgData.frequency > 50.5 ? '#f44336' : 
                         dgData.frequency < 49.7 || dgData.frequency > 50.3 ? '#ff9800' : '#4caf50' 
                }}>
                {dgData.frequency?.toFixed(1)} Hz
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Nominal: 50.0 Hz ± 0.5 Hz
            </div>
          </div>

          {/* Voltage */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Voltage</h3>
              <Zap size={20} className="text-yellow-500" />
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold"
                style={{ 
                  color: dgData.voltage < 210 || dgData.voltage > 230 ? '#f44336' : 
                         dgData.voltage < 215 || dgData.voltage > 225 ? '#ff9800' : '#4caf50' 
                }}>
                {dgData.voltage?.toFixed(1)} V
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <div>
                <span className="text-gray-500">Phase A: </span>
                <span>{dgData.currentPhases?.phaseA} A</span>
              </div>
              <div>
                <span className="text-gray-500">Phase B: </span>
                <span>{dgData.currentPhases?.phaseB} A</span>
              </div>
              <div>
                <span className="text-gray-500">Phase C: </span>
                <span>{dgData.currentPhases?.phaseC} A</span>
              </div>
            </div>
          </div>

          {/* Runtime Hours */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Runtime</h3>
              <Clock size={20} className="text-green-500" />
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-green-600">
                {dgData.runtime} hrs
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Service interval: 500 hrs ({calculateRemainingHours()} hrs remaining)
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div 
                className="h-2.5 rounded-full bg-green-500" 
                style={{ 
                  width: `${(dgData.runtime % 500) / 500 * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* DG Load Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4">DG Load & Temperature Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dgData.hourlyReadings || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[40, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="load" 
                    name="Load (%)" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="temp" 
                    name="Temperature (°C)" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fuel Consumption Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4">Fuel Consumption (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fuelConsumption}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="consumption" name="Liters" fill="#3b82f6" />
                  <Bar yAxisId="right" dataKey="cost" name="Cost ($)" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Advanced Metrics */}
        <div className="w-full gap-6 mb-6">
          {/* Efficiency Trends */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4">Efficiency Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={efficiencyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    name="Actual Efficiency (%)" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    name="Target Efficiency (%)" 
                    stroke="#94a3b8" 
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Load Distribution Chart */}
          {/* <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4">Load Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loadDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div> */}
        </div>

        {/* Maintenance History */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-gray-800 font-medium">Maintenance History</h3>
            <button className="text-blue-500 text-sm flex items-center">
              View Full History <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintenanceHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.type === 'Emergency' ? 'bg-red-100 text-red-800' :
                          item.type === 'Major' ? 'bg-purple-100 text-purple-800' :
                          item.type === 'Routine' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.technician}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-gray-800 font-medium">Active Alerts</h3>
            <button className="text-blue-500 text-sm flex items-center">
              View All Alerts <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            {alerts.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No active alerts
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <li key={alert.id} className="py-3">
                    <div className="flex items-start">
                      <div className={`px-2 py-1 rounded text-xs font-medium mr-3 ${getAlertSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                        <p className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-gray-800 font-medium">DG Reports</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition flex items-center"
              onClick={() => setSelectedReport('efficiency')}
            >
              <Gauge size={24} className="text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Efficiency Report</h4>
                <p className="text-sm text-gray-500">Analyze DG efficiency metrics</p>
              </div>
            </div>
            <div 
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition flex items-center"
              onClick={() => setSelectedReport('fuel')}
            >
              <BarChart2 size={24} className="text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Fuel Consumption</h4>
                <p className="text-sm text-gray-500">Track and analyze fuel usage</p>
              </div>
            </div>
            <div 
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition flex items-center"
              onClick={() => setSelectedReport('maintenance')}
            >
              <Settings size={24} className="text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Maintenance Schedule</h4>
                <p className="text-sm text-gray-500">View upcoming maintenance</p>
              </div>
            </div>
            <div 
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition flex items-center"
              onClick={() => setSelectedReport('alarm')}
            >
              <AlertTriangle size={24} className="text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Alarm History</h4>
                <p className="text-sm text-gray-500">Review historical alarms and alerts</p>
              </div>
            </div>
            <div 
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition flex items-center"
              onClick={() => setSelectedReport('performance')}
            >
              <FilePieChart size={24} className="text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Performance Analysis</h4>
                <p className="text-sm text-gray-500">Comprehensive performance report</p>
              </div>
            </div>
            <div 
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition flex items-center"
              onClick={() => setSelectedReport('export')}
            >
              <FileText size={24} className="text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Export Data</h4>
                <p className="text-sm text-gray-500">Download records in CSV format</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {selectedReport === 'efficiency' && 'Efficiency Report'}
                  {selectedReport === 'fuel' && 'Fuel Consumption Report'}
                  {selectedReport === 'maintenance' && 'Maintenance Schedule Report'}
                  {selectedReport === 'alarm' && 'Alarm History Report'}
                  {selectedReport === 'performance' && 'Performance Analysis Report'}
                  {selectedReport === 'export' && 'Export Data'}
                </h3>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  This is a placeholder for the {selectedReport} report content.
                  In a real implementation, this would show detailed report information.
                </p>
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => setSelectedReport(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">Diesel Generator Monitoring System v1.0.2</p>
              <p className="text-xs text-gray-400">© 2025 HSD Plant Systems</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white text-sm">Documentation</button>
              <button className="text-gray-300 hover:text-white text-sm">Support</button>
              <button className="text-gray-300 hover:text-white text-sm flex items-center">
                <Settings size={16} className="mr-1" /> Settings
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DgMonitoringDashboard;