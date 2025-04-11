import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Droplet, Thermometer, Activity, AlertCircle, Check, BarChart2, Clock, Settings, Filter, RefreshCw } from 'lucide-react';

const STPMonitoringDashboard = () => {
  // Mock data - in a real app, you would fetch this from an API
  const [influentData, setInfluentData] = useState([]);
  const [effluentData, setEffluentData] = useState([]);
  const [tankLevels, setTankLevels] = useState({
    aerationTank: 75,
    primaryClarifier: 60,
    secondaryClarifier: 55,
    sludgeHoldingTank: 68,
    chlorinationTank: 82
  });
  const [realTimeParams, setRealTimeParams] = useState({
    pH: 7.2,
    do: 5.8,
    bod: 22,
    cod: 85,
    tss: 35,
    temperature: 24.5,
    flow: 125.5, // m³/hr
  });
  const [alerts, setAlerts] = useState([
    { id: 1, level: 'warning', message: 'DO level below threshold in Aeration Tank 2', time: '10:15 AM', resolved: false },
    { id: 2, level: 'critical', message: 'Pump P-102 abnormal vibration detected', time: '09:45 AM', resolved: false },
    { id: 3, level: 'info', message: 'Daily maintenance completed', time: '08:30 AM', resolved: true },
  ]);
  const [equipmentStatus, setEquipmentStatus] = useState([
    { id: 'PUMP-101', name: 'Influent Pump 1', status: 'running', runtime: '342 hrs' },
    { id: 'PUMP-102', name: 'Influent Pump 2', status: 'fault', runtime: '298 hrs' },
    { id: 'BLW-101', name: 'Aeration Blower 1', status: 'running', runtime: '542 hrs' },
    { id: 'BLW-102', name: 'Aeration Blower 2', status: 'standby', runtime: '485 hrs' },
    { id: 'PUMP-201', name: 'RAS Pump', status: 'running', runtime: '310 hrs' },
    { id: 'MIXX-101', name: 'Chemical Mixer', status: 'running', runtime: '215 hrs' },
  ]);

  // Generate random data for demonstration
  useEffect(() => {
    // Generate influent/effluent data
    const generateData = () => {
      const newInfluentData = [];
      const newEffluentData = [];
      
      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        
        // Influent values higher than effluent (treatment reduces values)
        newInfluentData.push({
          time: hour,
          bod: 180 + Math.random() * 40,
          cod: 320 + Math.random() * 60,
          tss: 240 + Math.random() * 50,
          flow: 120 + Math.random() * 30,
        });
        
        // Effluent values (treated water - lower values)
        newEffluentData.push({
          time: hour,
          bod: 15 + Math.random() * 10,
          cod: 75 + Math.random() * 20,
          tss: 25 + Math.random() * 15,
          flow: 115 + Math.random() * 25,
        });
      }
      
      setInfluentData(newInfluentData);
      setEffluentData(newEffluentData);
    };
    
    generateData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeParams(prev => ({
        ...prev,
        pH: +(prev.pH + (Math.random() - 0.5) * 0.2).toFixed(1),
        do: +(prev.do + (Math.random() - 0.5) * 0.3).toFixed(1),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1),
        flow: +(prev.flow + (Math.random() - 0.5) * 5).toFixed(1),
      }));
      
      // Random tank level changes
      setTankLevels(prev => ({
        aerationTank: Math.min(100, Math.max(30, prev.aerationTank + (Math.random() - 0.5) * 5)),
        primaryClarifier: Math.min(100, Math.max(30, prev.primaryClarifier + (Math.random() - 0.5) * 4)),
        secondaryClarifier: Math.min(100, Math.max(30, prev.secondaryClarifier + (Math.random() - 0.5) * 3)),
        sludgeHoldingTank: Math.min(100, Math.max(30, prev.sludgeHoldingTank + (Math.random() - 0.5) * 6)),
        chlorinationTank: Math.min(100, Math.max(30, prev.chlorinationTank + (Math.random() - 0.5) * 2)),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Helper to determine status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'running': return 'text-green-500';
      case 'standby': return 'text-blue-500';
      case 'fault': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getAlertColor = (level) => {
    switch(level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Calculate treatment efficiency
  const calculateEfficiency = () => {
    if (influentData.length === 0 || effluentData.length === 0) return { bod: 0, cod: 0, tss: 0 };
    
    const latestInfluent = influentData[influentData.length - 1];
    const latestEffluent = effluentData[effluentData.length - 1];
    
    return {
      bod: (((latestInfluent.bod - latestEffluent.bod) / latestInfluent.bod) * 100).toFixed(1),
      cod: (((latestInfluent.cod - latestEffluent.cod) / latestInfluent.cod) * 100).toFixed(1),
      tss: (((latestInfluent.tss - latestEffluent.tss) / latestInfluent.tss) * 100).toFixed(1),
    };
  };

  const efficiency = calculateEfficiency();
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">STP Monitoring System</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{new Date().toLocaleString()}</span>
            </div>
            <button className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-6">
        <center className='mb-6 text-blue'><b className='mb-2 text-blue'>STP MONITORING DASHBOARD</b></center>
        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Real-time Parameters */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black flex items-center text-black">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Real-time Parameters
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">pH</span>
                  <p className="text-xl font-bold">{realTimeParams.pH}</p>
                </div>
                <div className={`text-lg ${realTimeParams.pH >= 6.5 && realTimeParams.pH <= 8.5 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeParams.pH >= 6.5 && realTimeParams.pH <= 8.5 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">DO (mg/L)</span>
                  <p className="text-xl font-bold">{realTimeParams.do}</p>
                </div>
                <div className={`text-lg ${realTimeParams.do >= 4 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeParams.do >= 4 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">BOD (mg/L)</span>
                  <p className="text-xl font-bold">{realTimeParams.bod}</p>
                </div>
                <div className={`text-lg ${realTimeParams.bod <= 30 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeParams.bod <= 30 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">COD (mg/L)</span>
                  <p className="text-xl font-bold">{realTimeParams.cod}</p>
                </div>
                <div className={`text-lg ${realTimeParams.cod <= 100 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeParams.cod <= 100 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">TSS (mg/L)</span>
                  <p className="text-xl font-bold">{realTimeParams.tss}</p>
                </div>
                <div className={`text-lg ${realTimeParams.tss <= 50 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeParams.tss <= 50 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Flow (m³/hr)</span>
                  <p className="text-xl font-bold">{realTimeParams.flow}</p>
                </div>
                <div className="text-lg text-green-500">
                  <Check />
                </div>
              </div>
            </div>
          </div>

          {/* Tank Levels */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black flex items-center">
              <Droplet className="h-5 w-5 mr-2 text-blue-600" />
              Tank Levels
            </h2>
            <div className="space-y-4">
              {Object.entries(tankLevels).map(([tank, level]) => (
                <div key={tank} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      {tank.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-sm font-medium">{Math.round(level)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        level > 85 ? 'bg-red-500' : level > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment Efficiency */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Treatment Efficiency
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'BOD Removal', value: parseFloat(efficiency.bod) },
                      { name: 'COD Removal', value: parseFloat(efficiency.cod) },
                      { name: 'TSS Removal', value: parseFloat(efficiency.tss) },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[0, 1, 2].map(index => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">BOD Removal</p>
                <p className="text-xl font-bold text-blue-600">{efficiency.bod}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">COD Removal</p>
                <p className="text-xl font-bold text-green-600">{efficiency.cod}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">TSS Removal</p>
                <p className="text-xl font-bold text-yellow-600">{efficiency.tss}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Influent & Effluent BOD/COD Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
              BOD/COD Monitoring
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...influentData.slice(-12), ...effluentData.slice(-12)].sort((a, b) => {
                    const timeA = a.time.split(':')[0];
                    const timeB = b.time.split(':')[0];
                    return timeA - timeB;
                  })}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bod" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }}
                    name="BOD (Influent)"
                    connectNulls
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cod" 
                    stroke="#82ca9d"
                    name="COD (Influent)"
                    connectNulls
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Equipment Status */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-600" />
              Equipment Status
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runtime</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {equipmentStatus.map((equipment) => (
                    <tr key={equipment.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{equipment.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                          {equipment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{equipment.runtime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 gap-6">
          {/* Alerts & Notifications */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
              Alerts & Notifications
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 border rounded flex justify-between items-center ${getAlertColor(alert.level)}`}
                >
                  <div className="flex items-center">
                    {alert.level === 'critical' && <AlertCircle className="h-5 w-5 mr-2 text-red-600" />}
                    {alert.level === 'warning' && <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />}
                    {alert.level === 'info' && <Check className="h-5 w-5 mr-2 text-blue-600" />}
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-xs">{alert.time}</p>
                    </div>
                  </div>
                  <div>
                    {alert.resolved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    ) : (
                      <button className="text-sm bg-white text-blue-600 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50">
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STPMonitoringDashboard;