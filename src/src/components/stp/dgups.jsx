import React, { useState, useEffect } from 'react';
import { LineChart, AreaChart, BarChart, PieChart, Line, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';
import { Battery, AlertTriangle, Check, Clock, Thermometer, Activity, Zap, Settings, RefreshCw, Droplet, Gauge, Wind, Cpu } from 'lucide-react';

const DgUpsMonitoringDashboard = () => {
  // State for equipment selection
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  
  // Mock data - in a real application, this would come from an API
  const [dgData, setDgData] = useState({});
  const [upsData, setUpsData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fuelConsumption, setFuelConsumption] = useState([]);
  const [loadDistribution, setLoadDistribution] = useState([]);

  // Generate mock data on component mount
  useEffect(() => {
    generateMockData();
    // In a real app, set up polling or websocket connection here
    const intervalId = setInterval(() => {
      generateMockData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const generateMockData = () => {
    // DG (Diesel Generator) data
    const dgMockData = {
      status: Math.random() > 0.9 ? 'Maintenance' : Math.random() > 0.1 ? 'Running' : 'Standby',
      fuelLevel: Math.floor(60 + Math.random() * 35),
      temperature: Math.floor(75 + Math.random() * 15),
      loadPercentage: Math.floor(40 + Math.random() * 45),
      runtime: Math.floor(120 + Math.random() * 60),
      oilPressure: Math.floor(40 + Math.random() * 15),
      frequency: 49.8 + Math.random() * 0.4,
      voltage: 220 + Math.random() * 10 - 5,
      currentPhases: {
        phaseA: Math.floor(80 + Math.random() * 40),
        phaseB: Math.floor(75 + Math.random() * 45),
        phaseC: Math.floor(85 + Math.random() * 35),
      },
      hourlyReadings: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        load: 40 + Math.random() * 35,
        temp: 70 + Math.random() * 20,
        fuel: 65 + Math.random() * 20 - (i * 0.5), // Slight decline to show consumption
      })),
      lastMaintenance: '2025-03-15',
      nextMaintenance: '2025-06-15',
    };

    // UPS data
    const upsMockData = {
      status: Math.random() > 0.9 ? 'Maintenance' : Math.random() > 0.1 ? 'Online' : 'Bypass',
      batteryLevel: Math.floor(75 + Math.random() * 20),
      temperature: Math.floor(32 + Math.random() * 8),
      loadPercentage: Math.floor(50 + Math.random() * 30),
      runtime: Math.floor(90 + Math.random() * 60),
      inputVoltage: 215 + Math.random() * 10,
      outputVoltage: 220 + Math.random() * 5 - 2.5,
      efficiency: 90 + Math.random() * 6,
      hourlyReadings: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        load: 40 + Math.random() * 35,
        battery: 85 - (i * 0.2) + Math.random() * 10,
        temp: 30 + Math.random() * 10,
      })),
      lastMaintenance: '2025-02-20',
      nextMaintenance: '2025-05-20',
    };

    // Mock alerts
    const mockAlerts = [
      { id: 1, equipment: 'DG', severity: 'medium', message: 'Fuel level below 70%', timestamp: '2025-04-11T08:15:00' },
      { id: 2, equipment: 'UPS', severity: 'low', message: 'Battery charging slower than expected', timestamp: '2025-04-11T06:30:00' },
      { id: 3, equipment: 'DG', severity: 'high', message: 'Temperature spike detected', timestamp: '2025-04-11T04:30:00' },
      { id: 4, equipment: 'UPS', severity: 'low', message: 'Runtime recalculated based on current load', timestamp: '2025-04-10T22:45:00' },
      { id: 5, equipment: 'DG', severity: 'medium', message: 'Oil pressure fluctuation', timestamp: '2025-04-10T18:20:00' },
    ];

    // Fuel consumption data for last 7 days
    const fuelConsumptionData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        consumption: 200 + Math.random() * 150,
      };
    });

    // Load distribution data
    const loadDistributionData = [
      { name: 'Critical Systems', value: 35 },
      { name: 'HVAC', value: 25 },
      { name: 'Lighting', value: 15 },
      { name: 'Processing', value: 25 }
    ];

    setDgData(dgMockData);
    setUpsData(upsMockData);
    setAlerts(mockAlerts);
    setFuelConsumption(fuelConsumptionData);
    setLoadDistribution(loadDistributionData);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    generateMockData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getBatteryColor = (level) => {
    if (level > 70) return '#4caf50';
    if (level > 40) return '#ff9800';
    return '#f44336';
  };

  const getStatusColor = (status, equipment) => {
    if (equipment === 'DG') {
      switch (status) {
        case 'running': return 'text-green-500';
        case 'standby': return 'text-blue-500';
        case 'maintenance': return 'text-yellow-500';
        case 'fault': return 'text-red-500';
        default: return 'text-gray-500';
      }
    } else {
      switch (status) {
        case 'online': return 'text-green-500';
        case 'bypass': return 'text-blue-500';
        case 'maintenance': return 'text-yellow-500';
        case 'offline': return 'text-red-500';
        default: return 'text-gray-500';
      }
    }
  };

  const getStatusIndicator = (status, equipment) => {
    const colorClass = getStatusColor(status, equipment);
    
    if ((equipment === 'DG' && status === 'running') ||
        (equipment === 'UPS' && status === 'online')) {
      return <div className={`flex items-center ${colorClass}`}><Check size={16} className="mr-1" /> {status}</div>;
    } else if ((equipment === 'DG' && status === 'fault') ||
               (equipment === 'UPS' && status === 'offline')) {
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

  const filterAlerts = () => {
    if (selectedEquipment === 'all') return alerts;
    return alerts.filter(alert => alert.equipment === selectedEquipment);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">DG & UPS Monitoring System</h1>
            <p className="text-blue-100">HSD Plant System Dashboard</p>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <select 
                value={selectedEquipment} 
                onChange={(e) => setSelectedEquipment(e.target.value)}
                className="bg-blue-700 text-white p-2 rounded border border-blue-600"
              >
                <option value="all">All Equipment</option>
                <option value="DG">Diesel Generator</option>
                <option value="UPS">UPS</option>
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

        {/* DG Status Section - Show if All or DG is selected */}
        {(selectedEquipment === 'all' || selectedEquipment === 'DG') && (
          <>
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Zap size={20} className="mr-2 text-yellow-500" />
              Diesel Generator Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* DG Status */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">DG Status</h3>
                  <Activity size={20} className="text-yellow-500" />
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-1">
                    {getStatusIndicator(dgData.status, 'DG')}
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
                    {dgData.oilPressure} PSI
                  </div>
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
                  <div className="text-3xl font-bold text-purple-600">
                    {dgData.frequency?.toFixed(1)} Hz
                  </div>
                </div>
              </div>

              {/* Voltage */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Voltage</h3>
                  <Zap size={20} className="text-yellow-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-yellow-600">
                    {dgData.voltage?.toFixed(1)} V
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
              </div>
            </div>

            {/* DG Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* DG Load Chart */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-700 font-medium mb-4">DG Load (24h)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dgData.hourlyReadings || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="load" 
                        name="Load (%)" 
                        stroke="#10b981" 
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
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consumption" name="Liters" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        {/* UPS Status Section - Show if All or UPS is selected */}
        {(selectedEquipment === 'all' || selectedEquipment === 'UPS') && (
          <>
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Battery size={20} className="mr-2 text-green-500" />
              UPS Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* UPS Status */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">UPS Status</h3>
                  <Activity size={20} className="text-green-500" />
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-1">
                    {getStatusIndicator(upsData.status, 'UPS')}
                  </div>
                  <div className="text-sm text-gray-500">
                    Load: {upsData.loadPercentage}%
                  </div>
                </div>
              </div>

              {/* Battery Status */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Battery Status</h3>
                  <Battery size={20} className="text-blue-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold" style={{ color: getBatteryColor(upsData.batteryLevel) }}>
                    {upsData.batteryLevel}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${upsData.batteryLevel}%`, 
                      backgroundColor: getBatteryColor(upsData.batteryLevel) 
                    }}
                  ></div>
                </div>
              </div>

              {/* UPS Temperature */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Temperature</h3>
                  <Thermometer size={20} className="text-red-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold" 
                    style={{ 
                      color: upsData.temperature > 38 ? '#f44336' : 
                             upsData.temperature > 35 ? '#ff9800' : '#4caf50' 
                    }}>
                    {upsData.temperature}°C
                  </div>
                </div>
              </div>

              {/* Runtime Remaining */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Runtime Remaining</h3>
                  <Clock size={20} className="text-blue-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-blue-600">
                    {upsData.runtime} min
                  </div>
                </div>
              </div>
            </div>

            {/* UPS Additional Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Input Voltage */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Input Voltage</h3>
                  <Zap size={20} className="text-yellow-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-yellow-600">
                    {upsData.inputVoltage?.toFixed(1)} V
                  </div>
                </div>
              </div>

              {/* Output Voltage */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Output Voltage</h3>
                  <Zap size={20} className="text-green-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-green-600">
                    {upsData.outputVoltage?.toFixed(1)} V
                  </div>
                </div>
              </div>

              {/* Efficiency */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">Efficiency</h3>
                  <Activity size={20} className="text-purple-500" />
                </div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-purple-600">
                    {upsData.efficiency?.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* UPS Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* UPS Battery Level Chart */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-700 font-medium mb-4">UPS Battery Level (24h)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={upsData.hourlyReadings || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="battery" 
                        name="Battery Level (%)" 
                        stroke="#3b82f6" 
                        fill="#93c5fd" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Load Distribution Chart */}
              <div className="bg-white rounded-lg shadow p-4">
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
              </div>
            </div>
          </>
        )}

        {/* Maintenance Schedule */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <h3 className="text-gray-800 font-medium">Maintenance Schedule</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(selectedEquipment === 'all' || selectedEquipment === 'DG') && (
                <div className="border rounded p-3">
                  <h4 className="font-medium text-gray-700 mb-2">Diesel Generator</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Last Maintenance</p>
                      <p className="font-medium">{dgData.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Maintenance</p>
                      <p className="font-medium">{dgData.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              )}
              {(selectedEquipment === 'all' || selectedEquipment === 'UPS') && (
                <div className="border rounded p-3">
                  <h4 className="font-medium text-gray-700 mb-2">UPS System</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Last Maintenance</p>
                      <p className="font-medium">{upsData.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Maintenance</p>
                      <p className="font-medium">{upsData.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-gray-800 font-medium">Recent Alerts</h3>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {filterAlerts().length} alerts
            </span>
          </div>
          <div className="p-4">
            {filterAlerts().length > 0 ? (
              <div className="space-y-3">
                {filterAlerts().map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`border rounded p-3 ${getAlertSeverityColor(alert.severity)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {alert.severity === 'high' && <AlertTriangle size={16} className="mr-2" />}
                        <p className="font-medium">{alert.message}</p>
                        </div>
                      <div className="text-xs text-gray-600">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-medium uppercase">{alert.equipment}</span>
                      <span className="text-xs capitalize">
                        {alert.severity} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No alerts found for the selected equipment.
              </div>
            )}
          </div>
        </div>

        {/* System Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* System Health Status */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4">System Health</h3>
            <div className="space-y-4">
              {(selectedEquipment === 'all' || selectedEquipment === 'DG') && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">DG Health</span>
                    <span className="text-sm text-gray-500">
                      {dgData.status === 'Running' ? 'Good' : dgData.status === 'Maintenance' ? 'Under Maintenance' : 'Standby'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-green-500" 
                      style={{ 
                        width: dgData.status === 'Running' ? '90%' : 
                               dgData.status === 'Standby' ? '70%' : '40%'
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              {(selectedEquipment === 'all' || selectedEquipment === 'UPS') && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">UPS Health</span>
                    <span className="text-sm text-gray-500">
                      {upsData.status === 'Online' ? 'Good' : upsData.status === 'Maintenance' ? 'Under Maintenance' : 'Check Required'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-green-500" 
                      style={{ 
                        width: upsData.status === 'Online' ? '90%' : 
                               upsData.status === 'Bypass' ? '60%' : '40%'
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Power Quality</span>
                  <span className="text-sm text-gray-500">Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Redundancy Status</span>
                  <span className="text-sm text-gray-500">Operational</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-blue-50 transition flex flex-col items-center justify-center">
                <Settings size={24} className="mb-2 text-blue-500" />
                <span className="text-sm font-medium">Run Diagnostics</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-blue-50 transition flex flex-col items-center justify-center">
                <Cpu size={24} className="mb-2 text-green-500" />
                <span className="text-sm font-medium">Schedule Maintenance</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-blue-50 transition flex flex-col items-center justify-center">
                <AlertTriangle size={24} className="mb-2 text-orange-500" />
                <span className="text-sm font-medium">Test Alarms</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-blue-50 transition flex flex-col items-center justify-center">
                <Wind size={24} className="mb-2 text-purple-500" />
                <span className="text-sm font-medium">Ventilation Check</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Information */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center mr-6">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Systems Operational</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Maintenance Required</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DgUpsMonitoringDashboard;