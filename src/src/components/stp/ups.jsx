import React, { useState, useEffect } from 'react';
import { LineChart, AreaChart, BarChart, PieChart, Line, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';
import { Battery, AlertTriangle, Check, Clock, Thermometer, Activity, Zap, Settings, RefreshCw, Droplet, Gauge, Wind, Cpu, BarChart3, Calendar, FileText, Download, ShieldCheck, BatteryCharging, Layers, ArrowRightLeft, Server, Power, Plug } from 'lucide-react';

const UpsMonitoringDashboard = () => {
  // State for multiple UPS selection
  const [selectedUps, setSelectedUps] = useState('all');
  
  // Mock data - in a real application, this would come from an API
  const [upsData, setUpsData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [batteryHealth, setBatteryHealth] = useState([]);
  const [loadDistribution, setLoadDistribution] = useState([]);
  const [powerEvents, setPowerEvents] = useState([]);
  const [upsUnits, setUpsUnits] = useState([]);
  const [energyConsumption, setEnergyConsumption] = useState([]);
  const [batteryReplacementSchedule, setBatteryReplacementSchedule] = useState([]);

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
    // UPS units available in the system
    const mockUpsUnits = [
      { id: 'ups1', name: 'UPS Unit 1', location: 'Server Room A', capacity: '20kVA' },
      { id: 'ups2', name: 'UPS Unit 2', location: 'Data Center', capacity: '40kVA' },
      { id: 'ups3', name: 'UPS Unit 3', location: 'Network Operations Center', capacity: '30kVA' },
      { id: 'ups4', name: 'UPS Unit 4', location: 'Backup Systems Room', capacity: '15kVA' },
    ];

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
      powerFactor: 0.85 + Math.random() * 0.1,
      outputFrequency: 49.8 + Math.random() * 0.4,
      bypassSource: Math.random() > 0.8 ? 'Available' : 'Not Available',
      batteryHealthPercentage: Math.floor(80 + Math.random() * 15),
      batteryChargeMode: Math.random() > 0.7 ? 'Float' : 'Bulk',
      batteryVoltage: 48 + Math.random() * 2,
      hourlyReadings: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        load: 40 + Math.random() * 35,
        battery: 85 - (i * 0.2) + Math.random() * 10,
        temp: 30 + Math.random() * 10,
        inputVoltage: 210 + Math.random() * 15,
        outputVoltage: 220 + Math.random() * 5 - 2.5,
      })),
      dailyReadings: Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          load: 40 + Math.random() * 35,
          efficiency: 88 + Math.random() * 8,
        };
      }),
      lastMaintenance: '2025-02-20',
      nextMaintenance: '2025-05-20',
      model: 'PowerShield Elite 3000',
      serialNumber: 'PSE-3000-98765',
      firmwareVersion: 'v4.2.1',
      installationDate: '2023-06-15',
    };

    // Mock alerts specifically for UPS systems
    const mockAlerts = [
      { id: 1, equipment: 'UPS1', severity: 'low', message: 'Battery charging slower than expected', timestamp: '2025-04-11T06:30:00' },
      { id: 2, equipment: 'UPS2', severity: 'medium', message: 'AC input frequency out of range', timestamp: '2025-04-11T05:45:00' },
      { id: 3, equipment: 'UPS3', severity: 'high', message: 'Battery temperature exceeding threshold', timestamp: '2025-04-11T04:30:00' },
      { id: 4, equipment: 'UPS1', severity: 'low', message: 'Runtime recalculated based on current load', timestamp: '2025-04-10T22:45:00' },
      { id: 5, equipment: 'UPS4', severity: 'medium', message: 'Output voltage fluctuation detected', timestamp: '2025-04-10T18:20:00' },
      { id: 6, equipment: 'UPS2', severity: 'info', message: 'Battery test completed successfully', timestamp: '2025-04-10T14:15:00' },
      { id: 7, equipment: 'UPS3', severity: 'low', message: 'Bypass operation activated briefly', timestamp: '2025-04-09T11:30:00' },
    ];

    // Battery health trend data for last 12 months
    const batteryHealthData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        health: 100 - (11 - i) * 1.5 - Math.random() * 2,
      };
    });

    // Load distribution data
    const loadDistributionData = [
      { name: 'Critical Servers', value: 35 },
      { name: 'Network Infrastructure', value: 25 },
      { name: 'Storage Systems', value: 15 },
      { name: 'Security Systems', value: 10 },
      { name: 'Other Equipment', value: 15 }
    ];

    // Power events history
    const powerEventsData = [
      { id: 1, type: 'Power Outage', duration: '8 minutes', date: '2025-04-05T14:30:00', description: 'Complete power loss, UPS activated successfully' },
      { id: 2, type: 'Voltage Sag', duration: '3 minutes', date: '2025-04-03T09:45:00', description: 'Voltage dropped to 190V, stabilized by UPS' },
      { id: 3, type: 'Frequency Variation', duration: '5 minutes', date: '2025-03-28T16:20:00', description: 'Grid frequency oscillation, stabilized by UPS' },
      { id: 4, type: 'Power Surge', duration: '2 minutes', date: '2025-03-25T11:10:00', description: 'Voltage spike detected, UPS provided protection' },
      { id: 5, type: 'Planned Maintenance', duration: '45 minutes', date: '2025-03-15T08:00:00', description: 'Scheduled switchover to bypass mode for maintenance' },
    ];
    
    // Energy consumption data for last 7 days
    const energyConsumptionData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        consumption: 120 + Math.random() * 50,
      };
    });
    
    // Battery replacement schedule
    const batteryReplacementData = [
      { id: 'batt1', upsName: 'UPS Unit 1', installDate: '2023-06-15', replacementDate: '2025-06-15', status: 'Good', healthPercentage: 85 },
      { id: 'batt2', upsName: 'UPS Unit 2', installDate: '2023-04-22', replacementDate: '2025-04-22', status: 'Good', healthPercentage: 78 },
      { id: 'batt3', upsName: 'UPS Unit 3', installDate: '2024-01-10', replacementDate: '2026-01-10', status: 'Excellent', healthPercentage: 92 },
      { id: 'batt4', upsName: 'UPS Unit 4', installDate: '2022-11-05', replacementDate: '2024-11-05', status: 'Fair', healthPercentage: 65 },
    ];

    setUpsData(upsMockData);
    setAlerts(mockAlerts);
    setBatteryHealth(batteryHealthData);
    setLoadDistribution(loadDistributionData);
    setPowerEvents(powerEventsData);
    setUpsUnits(mockUpsUnits);
    setEnergyConsumption(energyConsumptionData);
    setBatteryReplacementSchedule(batteryReplacementData);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'bypass': return 'text-blue-500';
      case 'maintenance': return 'text-yellow-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIndicator = (status) => {
    const colorClass = getStatusColor(status);
    
    if (status === 'online') {
      return <div className={`flex items-center ${colorClass}`}><Check size={16} className="mr-1" /> {status}</div>;
    } else if (status === 'offline') {
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
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filterAlerts = () => {
    if (selectedUps === 'all') return alerts;
    return alerts.filter(alert => alert.equipment === selectedUps);
  };

  const getBatteryHealthStatus = (percentage) => {
    if (percentage > 90) return { text: 'Excellent', color: 'text-green-600' };
    if (percentage > 75) return { text: 'Good', color: 'text-green-500' };
    if (percentage > 60) return { text: 'Fair', color: 'text-yellow-500' };
    return { text: 'Poor', color: 'text-red-500' };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">UPS Monitoring System</h1>
            <p className="text-blue-100">Enterprise Power Backup Management Dashboard</p>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <select 
                value={selectedUps} 
                onChange={(e) => setSelectedUps(e.target.value)}
                className="bg-blue-700 text-white p-2 rounded border border-blue-600"
              >
                <option value="all">All UPS Units</option>
                <option value="UPS1">UPS Unit 1</option>
                <option value="UPS2">UPS Unit 2</option>
                <option value="UPS3">UPS Unit 3</option>
                <option value="UPS4">UPS Unit 4</option>
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
        {/* Critical Alerts Banner - Shows only if there are high severity alerts */}
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

        {/* UPS Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* UPS Status */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">UPS Status</h3>
              <Activity size={20} className="text-green-500" />
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold mb-1">
                {getStatusIndicator(upsData.status)}
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {/* Input Voltage */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Input Voltage</h3>
              <Zap size={20} className="text-yellow-500" />
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-yellow-600">
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
              <div className="text-2xl font-bold text-green-600">
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
              <div className="text-2xl font-bold text-purple-600">
                {upsData.efficiency?.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Output Frequency */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Frequency</h3>
              <Activity size={20} className="text-indigo-500" />
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-indigo-600">
                {upsData.outputFrequency?.toFixed(1)} Hz
              </div>
            </div>
          </div>

          {/* Power Factor */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Power Factor</h3>
              <Gauge size={20} className="text-blue-500" />
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-blue-600">
                {upsData.powerFactor?.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Bypass Source */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Bypass Source</h3>
              <ArrowRightLeft size={20} className="text-orange-500" />
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold" style={{ color: upsData.bypassSource === 'Available' ? '#4caf50' : '#f44336' }}>
                {upsData.bypassSource}
              </div>
            </div>
          </div>
        </div>

        {/* Battery Details Section */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <h3 className="text-gray-800 font-medium flex items-center">
              <BatteryCharging size={20} className="mr-2 text-green-500" />
              Battery Details
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Battery Health</h4>
                <div className="flex items-center mt-1">
                  <div className="text-xl font-bold" style={{ 
                    color: upsData.batteryHealthPercentage > 85 ? '#4caf50' : 
                           upsData.batteryHealthPercentage > 70 ? '#ff9800' : '#f44336' 
                  }}>
                    {upsData.batteryHealthPercentage}%
                  </div>
                  <div className="ml-2 px-2 py-1 text-xs rounded-full" style={{ 
                    backgroundColor: upsData.batteryHealthPercentage > 85 ? '#e6f4ea' : 
                                    upsData.batteryHealthPercentage > 70 ? '#fff8e1' : '#ffebee',
                    color: upsData.batteryHealthPercentage > 85 ? '#1e8e3e' : 
                           upsData.batteryHealthPercentage > 70 ? '#f57c00' : '#d32f2f' 
                  }}>
                    {getBatteryHealthStatus(upsData.batteryHealthPercentage).text}
                  </div>
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Battery Voltage</h4>
                <div className="text-xl font-bold mt-1">
                  {upsData.batteryVoltage?.toFixed(1)} V
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Charging Mode</h4>
                <div className="text-xl font-bold mt-1">
                  {upsData.batteryChargeMode}
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Last Battery Test</h4>
                <div className="text-xl font-bold mt-1">
                  {new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPS Equipment Information */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <h3 className="text-gray-800 font-medium flex items-center">
              <Server size={20} className="mr-2 text-blue-500" />
              UPS Equipment Information
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Model</h4>
                <div className="font-medium mt-1">
                  {upsData.model}
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Serial Number</h4>
                <div className="font-medium mt-1">
                  {upsData.serialNumber}
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Firmware Version</h4>
                <div className="font-medium mt-1">
                  {upsData.firmwareVersion}
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="text-sm text-gray-500">Installation Date</h4>
                <div className="font-medium mt-1">
                  {upsData.installationDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPS Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* UPS Battery Level Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4 flex items-center">
              <Battery size={18} className="mr-2 text-blue-500" />
              UPS Battery Level (24h)
            </h3>
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
            <h3 className="text-gray-700 font-medium mb-4 flex items-center">
              <Layers size={18} className="mr-2 text-purple-500" />
              Load Distribution
            </h3>
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
                    <Cell fill="#8b5cf6" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Battery Health Trend */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-700 font-medium mb-4 flex items-center">
              <Activity size={18} className="mr-2 text-green-500" />
              Battery Health Trend (12 Months)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={batteryHealth}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="health" 
                    name="Health (%)" 
                    stroke="#10b981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy Consumption Chart */}
<div className="bg-white rounded-lg shadow p-4">
  <h3 className="text-gray-700 font-medium mb-4 flex items-center">
    <Power size={18} className="mr-2 text-orange-500" />
    Energy Consumption (Last 7 Days)
  </h3>
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={energyConsumption}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar 
          dataKey="consumption" 
          name="Energy (kWh)" 
          fill="#f59e0b" 
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
</div>

{/* Alert Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
  {/* Active Alerts */}
  <div className="bg-white rounded-lg shadow lg:col-span-2">
    <div className="p-4 border-b flex justify-between items-center">
      <h3 className="text-gray-800 font-medium flex items-center">
        <AlertTriangle size={18} className="mr-2 text-red-500" />
        Active Alerts
      </h3>
      <span className="text-sm bg-red-100 text-red-800 py-1 px-3 rounded-full">{filterAlerts().length} Active</span>
    </div>
    <div className="p-4">
      <div className="overflow-auto max-h-72">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterAlerts().map((alert) => (
              <tr key={alert.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAlertSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{alert.equipment}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{alert.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* Maintenance Schedule */}
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b">
      <h3 className="text-gray-800 font-medium flex items-center">
        <Calendar size={18} className="mr-2 text-blue-500" />
        Maintenance Schedule
      </h3>
    </div>
    <div className="p-4">
      <div className="overflow-auto max-h-72">
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-3 py-2">
            <p className="text-sm text-gray-600">Last Maintenance</p>
            <p className="font-medium">{upsData.lastMaintenance}</p>
            <p className="text-xs text-gray-500 mt-1">Regular checkup and battery test</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <p className="text-sm text-gray-600">Next Scheduled Maintenance</p>
            <p className="font-medium">{upsData.nextMaintenance}</p>
            <p className="text-xs text-gray-500 mt-1">Comprehensive maintenance with load test</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-3 py-2">
            <p className="text-sm text-gray-600">Firmware Update</p>
            <p className="font-medium">2025-05-10</p>
            <p className="text-xs text-gray-500 mt-1">Critical security patch and performance improvement</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Power Events History */}
<div className="bg-white rounded-lg shadow mb-6">
  <div className="p-4 border-b flex justify-between items-center">
    <h3 className="text-gray-800 font-medium flex items-center">
      <Zap size={18} className="mr-2 text-yellow-500" />
      Power Events History
    </h3>
    <a href="#" className="text-blue-500 text-sm hover:text-blue-700">View All</a>
  </div>
  <div className="p-4">
    <div className="overflow-auto max-h-96">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {powerEvents.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {event.type === 'Power Outage' ? <Power size={16} className="mr-2 text-red-500" /> :
                   event.type === 'Voltage Sag' ? <Zap size={16} className="mr-2 text-yellow-500" /> :
                   event.type === 'Power Surge' ? <Zap size={16} className="mr-2 text-orange-500" /> :
                   event.type === 'Frequency Variation' ? <Activity size={16} className="mr-2 text-blue-500" /> :
                   <Settings size={16} className="mr-2 text-gray-500" />}
                  <div className="text-sm font-medium text-gray-900">{event.type}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{event.duration}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{event.description}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

{/* Battery Replacement Schedule */}
<div className="bg-white rounded-lg shadow mb-6">
  <div className="p-4 border-b flex justify-between items-center">
    <h3 className="text-gray-800 font-medium flex items-center">
      <BatteryCharging size={18} className="mr-2 text-green-500" />
      Battery Replacement Schedule
    </h3>
    <a href="#" className="text-blue-500 text-sm hover:text-blue-700">
      <FileText size={16} className="inline mr-1" />
      Export Report
    </a>
  </div>
  <div className="p-4">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UPS Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installation Date</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Replacement Date</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {batteryReplacementSchedule.map((battery) => {
          const today = new Date();
          const replacementDate = new Date(battery.replacementDate);
          const daysDifference = Math.floor((replacementDate - today) / (1000 * 60 * 60 * 24));
          
          let statusColor = 'text-green-500';
          if (daysDifference < 30) statusColor = 'text-red-500';
          else if (daysDifference < 90) statusColor = 'text-yellow-500';
          
          return (
            <tr key={battery.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{battery.upsName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{battery.installDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${statusColor}`}>{battery.replacementDate}</div>
                {daysDifference < 30 && 
                  <div className="text-xs text-red-500">Due soon ({daysDifference} days)</div>
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{battery.status}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${battery.healthPercentage}%`, 
                      backgroundColor: battery.healthPercentage > 80 ? '#4caf50' : 
                                    battery.healthPercentage > 60 ? '#ff9800' : '#f44336' 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{battery.healthPercentage}%</div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

{/* UPS Unit List */}
<div className="bg-white rounded-lg shadow mb-6">
  <div className="p-4 border-b">
    <h3 className="text-gray-800 font-medium flex items-center">
      <Server size={18} className="mr-2 text-blue-500" />
      UPS Units
    </h3>
  </div>
  <div className="p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {upsUnits.map((unit) => (
        <div key={unit.id} className="border rounded p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900">{unit.name}</h4>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-start">
              <div className="text-gray-500 w-24 text-sm">Location:</div>
              <div className="text-sm">{unit.location}</div>
            </div>
            <div className="flex items-start">
              <div className="text-gray-500 w-24 text-sm">Capacity:</div>
              <div className="text-sm">{unit.capacity}</div>
            </div>
            <div className="flex items-start">
              <div className="text-gray-500 w-24 text-sm">Status:</div>
              <div className="text-sm flex items-center text-green-500">
                <Check size={14} className="mr-1" /> Online
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="text-blue-500 hover:text-blue-700 text-sm font-medium mr-2">View Details</button>
            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Configure</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Additional Features Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
  {/* System Settings */}
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b">
      <h3 className="text-gray-800 font-medium flex items-center">
        <Settings size={18} className="mr-2 text-gray-600" />
        System Settings
      </h3>
    </div>
    <div className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Automatic Tests</h4>
            <p className="text-sm text-gray-500">Schedule battery tests weekly</p>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input type="checkbox" id="toggle-1" className="sr-only" defaultChecked />
            <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
            <div className="absolute w-5 h-5 bg-blue-600 rounded-full shadow -left-1 -top-0 transition"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Send alerts to administrators</p>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input type="checkbox" id="toggle-2" className="sr-only" defaultChecked />
            <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
            <div className="absolute w-5 h-5 bg-blue-600 rounded-full shadow -left-1 -top-0 transition"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">SMS Alerts</h4>
            <p className="text-sm text-gray-500">Critical alerts via SMS</p>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input type="checkbox" id="toggle-3" className="sr-only" />
            <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
            <div className="absolute w-5 h-5 bg-gray-500 rounded-full shadow -left-1 -top-0 transition"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm">
          Advanced Settings
        </button>
      </div>
    </div>
  </div>

  {/* Report Generation */}
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b">
      <h3 className="text-gray-800 font-medium flex items-center">
        <FileText size={18} className="mr-2 text-indigo-500" />
        Report Generation
      </h3>
    </div>
    <div className="p-4">
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded border">
          <div className="flex items-center">
            <Download size={16} className="text-indigo-500 mr-2" />
            <span>Monthly Performance Report</span>
          </div>
          <span className="text-gray-500 text-sm">PDF</span>
        </button>
        <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded border">
          <div className="flex items-center">
            <Download size={16} className="text-indigo-500 mr-2" />
            <span>Battery Health History</span>
          </div>
          <span className="text-gray-500 text-sm">CSV</span>
        </button>
        <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded border">
          <div className="flex items-center">
            <Download size={16} className="text-indigo-500 mr-2" />
            <span>Power Event Timeline</span>
          </div>
          <span className="text-gray-500 text-sm">Excel</span>
        </button>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded text-sm">
          Custom Report
        </button>
      </div>
    </div>
  </div>

  {/* System Health Summary */}
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b">
      <h3 className="text-gray-800 font-medium flex items-center">
        <ShieldCheck size={18} className="mr-2 text-green-500" />
        System Health Summary
      </h3>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="3"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4caf50"
              strokeWidth="3"
              strokeDasharray="85, 100"
            />
            {/* <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#333">85%</text> */}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-green-600">85%</div>
            <div className="text-sm text-gray-500">System Health</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm">Battery Systems</div>
          <div className="text-sm font-medium flex items-center text-green-500">
            <Check size={14} className="mr-1" /> Good
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Power Distribution</div>
          <div className="text-sm font-medium flex items-center text-green-500">
            <Check size={14} className="mr-1" /> Optimal
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Temperature Conditions</div>
          <div className="text-sm font-medium flex items-center text-yellow-500">
            <AlertTriangle size={14} className="mr-1" /> Attention
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Firmware Status</div>
          <div className="text-sm font-medium flex items-center text-green-500">
            <Check size={14} className="mr-1" /> Up to date
          </div>
        </div>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm">
          System Diagnostics
        </button>
      </div>
    </div>
  </div>
</div>

{/* Detailed Metrics & Configuration */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Advanced Electrical Parameters */}
  <div className="bg-white rounded-lg shadow mb-6">
    <div className="p-4 border-b">
      <h3 className="text-gray-800 font-medium flex items-center">
        <Cpu size={18} className="mr-2 text-purple-500" />
        Advanced Electrical Parameters
      </h3>
    </div>
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">Input Current</div>
          <div className="text-xl font-medium">{(upsData.inputVoltage / 240 * 10).toFixed(1)} A</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">Output Current</div>
          <div className="text-xl font-medium">{(upsData.outputVoltage / 240 * (upsData.loadPercentage/100) * 20).toFixed(1)} A</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">Inverter Temperature</div>
          <div className="text-xl font-medium">{Math.floor(upsData.temperature * 1.1)}°C</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">AC Input Power</div>
          <div className="text-xl font-medium">{Math.floor(upsData.inputVoltage * (upsData.inputVoltage / 240 * 10) * upsData.powerFactor / 1000)} kW</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">AC Output Power</div>
          <div className="text-xl font-medium">{Math.floor(upsData.outputVoltage * (upsData.outputVoltage / 240 * (upsData.loadPercentage/100) * 20) * upsData.powerFactor / 1000)} kW</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">System Losses</div>
          <div className="text-xl font-medium">{Math.floor((1 - upsData.efficiency/100) * 100) / 10} kW</div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Network Configuration */}
  <div className="bg-white rounded-lg shadow mb-6">
    <div className="p-4 border-b">
      <h3 className="text-gray-800 font-medium flex items-center">
        <Plug size={18} className="mr-2 text-blue-500" />
        Network Configuration
      </h3>
    </div>
    <div className="p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm text-gray-500">IP Address</h4>
            <div className="font-medium">192.168.1.100</div>
          </div>
          <div>
            <h4 className="text-sm text-gray-500">Protocol</h4>
            <div className="font-medium">SNMP v3, Modbus TCP</div>
          </div>
          <div>
            <h4 className="text-sm text-gray-500">MAC Address</h4>
            <div className="font-medium">00:1A:2B:3C:4D:5E</div>
          </div>
          <div>
            <h4 className="text-sm text-gray-500">Monitoring Port</h4>
            <div className="font-medium">Port 161, 502</div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm text-gray-500 mb-2">Communication Status</h4>
          <div className="flex space-x-2">
            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">SNMP: Connected</span>
            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">HTTP: Available</span>
            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">SSH: Secured</span>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
            Network Test
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Configure
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

</main>

{/* Footer */}
<footer className="bg-gray-800 text-white p-4 mt-6">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <div>
      <p className="text-sm">UPS Monitoring System v2.5.1</p>
      <p className="text-xs text-gray-400">Last updated: April 12, 2025</p>
    </div>
    <div className="mt-4 md:mt-0">
      <div className="flex space-x-4">
        <a href="#" className="text-gray-300 hover:text-white text-sm">Documentation</a>
        <a href="#" className="text-gray-300 hover:text-white text-sm">Support</a>
        <a href="#" className="text-gray-300 hover:text-white text-sm">System Status</a>
      </div>
    </div>
  </div>
</footer>

</div>
);
};

export default UpsMonitoringDashboard;