import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Droplet, Activity, AlertCircle, Check, BarChart2, Clock, RefreshCw, Flame, Gauge, Wind, AlertTriangle, Zap, Map, Layers, Radio } from 'lucide-react';

const WTPFirePumpMonitoringDashboard = () => {
  // Mock data states for WTP
  const [waterQualityData, setWaterQualityData] = useState([]);
  const [flowRateData, setFlowRateData] = useState([]);
  const [tankLevels, setTankLevels] = useState({
    rawWaterTank: 68,
    flocculation: 72,
    clarifier: 65,
    filterBed: 80,
    chlorinationTank: 76,
    treatedWaterTank: 82
  });
  const [chemicalLevels, setChemicalLevels] = useState({
    alum: 65,
    chlorine: 48,
    polymer: 75,
    soda: 82,
    pAC: 60
  });
  const [realTimeWTPParams, setRealTimeWTPParams] = useState({
    pH: 7.4,
    turbidity: 0.8,
    chlorine: 1.2,
    tds: 320,
    temperature: 25.5,
    flow: 425.5, // m³/hr
  });

  // Mock data states for Fire Pump System
  const [firePumpStatus, setFirePumpStatus] = useState([
    { id: 'FP-101', name: 'Main Electric Fire Pump', status: 'standby', pressure: 8.2, lastTest: '2025-03-25' },
    { id: 'FP-102', name: 'Diesel Backup Pump', status: 'standby', pressure: 8.3, lastTest: '2025-03-25' },
    { id: 'JP-101', name: 'Jockey Pump 1', status: 'running', pressure: 8.5, lastTest: '2025-03-25' },
    { id: 'JP-102', name: 'Jockey Pump 2', status: 'standby', pressure: 0, lastTest: '2025-03-25' },
  ]);
  const [pressureData, setPressureData] = useState([]);
  const [firePumpEvents, setFirePumpEvents] = useState([
    { id: 1, type: 'test', pump: 'FP-101', date: '2025-03-25 09:30', duration: '30 min', result: 'passed' },
    { id: 2, type: 'test', pump: 'FP-102', date: '2025-03-25 10:15', duration: '30 min', result: 'passed' },
    { id: 3, type: 'maintenance', pump: 'JP-101', date: '2025-03-20 14:45', duration: '2 hrs', result: 'completed' },
  ]);
  const [fireZoneStatus, setFireZoneStatus] = useState([
    { id: 'Z1', name: 'Production Area', status: 'normal', devices: 24, lastChecked: '2025-04-10' },
    { id: 'Z2', name: 'Storage Facility', status: 'normal', devices: 18, lastChecked: '2025-04-10' },
    { id: 'Z3', name: 'Admin Building', status: 'normal', devices: 32, lastChecked: '2025-04-08' },
    { id: 'Z4', name: 'Chemical Storage', status: 'alarm', devices: 16, lastChecked: '2025-04-10' },
    { id: 'Z5', name: 'Laboratory', status: 'normal', devices: 12, lastChecked: '2025-04-09' },
  ]);

  // Combined alerts for both systems
  const [alerts, setAlerts] = useState([
    { id: 1, system: 'wtp', level: 'warning', message: 'Turbidity spike detected in filtered water', time: '10:15 AM', resolved: false },
    { id: 2, system: 'fire', level: 'critical', message: 'Low pressure detected in fire sprinkler system Zone 4', time: '09:45 AM', resolved: false },
    { id: 3, system: 'wtp', level: 'info', message: 'Backwash cycle completed for Filter #2', time: '08:30 AM', resolved: true },
    { id: 4, system: 'fire', level: 'warning', message: 'Battery voltage low on diesel pump controller', time: '07:15 AM', resolved: false },
    { id: 5, system: 'wtp', level: 'critical', message: 'Chlorine dosing pump fault', time: '06:50 AM', resolved: false },
  ]);

  // Power monitoring data
  const [powerStatus, setPowerStatus] = useState({
    mainPower: true,
    generatorStatus: 'standby',
    voltageL1: 398,
    voltageL2: 401,
    voltageL3: 397,
    currentL1: 85.2,
    currentL2: 82.7,
    currentL3: 84.1,
    frequency: 50.1,
    powerFactor: 0.92
  });

  // Generate random data for demonstration
  useEffect(() => {
    // Generate water quality data
    const generateWaterQualityData = () => {
      const newWaterQualityData = [];

      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;

        newWaterQualityData.push({
          time: hour,
          rawTurbidity: 15 + Math.random() * 10,
          filteredTurbidity: 0.5 + Math.random() * 0.8,
          rawPH: 7.0 + Math.random() * 0.8,
          treatedPH: 7.2 + Math.random() * 0.4,
          residualChlorine: 0.8 + Math.random() * 0.8,
        });
      }

      setWaterQualityData(newWaterQualityData);
    };

    // Generate flow rate data
    const generateFlowRateData = () => {
      const newFlowRateData = [];

      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;

        newFlowRateData.push({
          time: hour,
          rawWaterFlow: 400 + Math.random() * 100,
          treatedWaterFlow: 380 + Math.random() * 90,
          backwashFlow: i % 8 === 0 ? 120 + Math.random() * 20 : 0, // Backwash every 8 hours
        });
      }

      setFlowRateData(newFlowRateData);
    };

    // Generate pressure data for fire pump system
    const generatePressureData = () => {
      const newPressureData = [];

      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;

        // Simulate pressure drop and recovery
        let pressureFactor = 1;
        if (i === 10) pressureFactor = 0.7; // Simulate pressure drop at 10:00
        if (i === 11) pressureFactor = 0.9; // Simulating recovery

        newPressureData.push({
          time: hour,
          systemPressure: 8.2 * pressureFactor + Math.random() * 0.3,
          pumpOutletPressure: i === 10 || i === 11 ? 10.5 + Math.random() * 0.5 : 0, // Pump activates during pressure drop
        });
      }

      setPressureData(newPressureData);
    };

    generateWaterQualityData();
    generateFlowRateData();
    generatePressureData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update WTP parameters
      setRealTimeWTPParams(prev => ({
        ...prev,
        pH: +(prev.pH + (Math.random() - 0.5) * 0.1).toFixed(1),
        turbidity: +(prev.turbidity + (Math.random() - 0.5) * 0.2).toFixed(2),
        chlorine: +(prev.chlorine + (Math.random() - 0.5) * 0.1).toFixed(1),
        tds: Math.round(prev.tds + (Math.random() - 0.5) * 10),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1),
        flow: +(prev.flow + (Math.random() - 0.5) * 15).toFixed(1),
      }));

      // Update tank levels
      setTankLevels(prev => ({
        rawWaterTank: Math.min(100, Math.max(30, prev.rawWaterTank + (Math.random() - 0.5) * 5)),
        flocculation: Math.min(100, Math.max(30, prev.flocculation + (Math.random() - 0.5) * 3)),
        clarifier: Math.min(100, Math.max(30, prev.clarifier + (Math.random() - 0.5) * 4)),
        filterBed: Math.min(100, Math.max(30, prev.filterBed + (Math.random() - 0.5) * 3)),
        chlorinationTank: Math.min(100, Math.max(30, prev.chlorinationTank + (Math.random() - 0.5) * 4)),
        treatedWaterTank: Math.min(100, Math.max(30, prev.treatedWaterTank + (Math.random() - 0.5) * 6)),
      }));

      // Update chemical levels
      setChemicalLevels(prev => ({
        alum: Math.max(0, prev.alum - Math.random() * 0.3),
        chlorine: Math.max(0, prev.chlorine - Math.random() * 0.2),
        polymer: Math.max(0, prev.polymer - Math.random() * 0.1),
        soda: Math.max(0, prev.soda - Math.random() * 0.2),
        pAC: Math.max(0, prev.pAC - Math.random() * 0.15),
      }));

      // Randomly update fire pump status
      if (Math.random() > 0.97) {
        setFirePumpStatus(prev => {
          const newStatus = [...prev];
          const randomPump = Math.floor(Math.random() * newStatus.length);

          // Toggle jockey pump status occasionally
          if (newStatus[randomPump].id.startsWith('JP')) {
            newStatus[randomPump].status = newStatus[randomPump].status === 'running' ? 'standby' : 'running';
          }

          return newStatus;
        });
      }

      // Update power status
      setPowerStatus(prev => ({
        ...prev,
        voltageL1: prev.voltageL1 + (Math.random() - 0.5) * 4,
        voltageL2: prev.voltageL2 + (Math.random() - 0.5) * 4,
        voltageL3: prev.voltageL3 + (Math.random() - 0.5) * 4,
        currentL1: prev.currentL1 + (Math.random() - 0.5) * 2,
        currentL2: prev.currentL2 + (Math.random() - 0.5) * 2,
        currentL3: prev.currentL3 + (Math.random() - 0.5) * 2,
        frequency: prev.frequency + (Math.random() - 0.5) * 0.1,
        powerFactor: Math.min(1, Math.max(0.85, prev.powerFactor + (Math.random() - 0.5) * 0.02)),
      }));

      // Randomly create a new alert
      if (Math.random() > 0.95) {
        const newAlert = {
          id: Date.now(),
          system: Math.random() > 0.5 ? 'wtp' : 'fire',
          level: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'info',
          message: Math.random() > 0.5 ?
            'Pressure fluctuation in distribution system' :
            'Filter differential pressure exceeding threshold',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          resolved: false
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent alerts
      }

      // Occasionally mark alerts as resolved
      if (Math.random() > 0.9) {
        setAlerts(prev => {
          const newAlerts = [...prev];
          const unresolvedAlerts = newAlerts.filter(a => !a.resolved);

          if (unresolvedAlerts.length > 0) {
            const randomAlert = Math.floor(Math.random() * unresolvedAlerts.length);
            const alertIndex = newAlerts.findIndex(a => a.id === unresolvedAlerts[randomAlert].id);
            newAlerts[alertIndex] = { ...newAlerts[alertIndex], resolved: true };
          }

          return newAlerts;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Helper functions for styling based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'standby': return 'text-blue-500';
      case 'fault': return 'text-red-500';
      case 'alarm': return 'text-red-500';
      case 'testing': return 'text-yellow-500';
      case 'normal': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getAlertColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSystemIcon = (system) => {
    switch (system) {
      case 'wtp': return <Droplet className="h-4 w-4 mr-1" />;
      case 'fire': return <Flame className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Calculate water production metrics
  const calculatedMetrics = {
    dailyProduction: Math.round(flowRateData.reduce((acc, item) => acc + parseFloat(item.treatedWaterFlow || 0), 0) / 24),
    treatmentEfficiency: 96.8 + (Math.random() * 2).toFixed(1),
    energyUsage: (0.65 + Math.random() * 0.1).toFixed(2),
    chemicalUsage: (12.5 + Math.random() * 2).toFixed(1)
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Droplet className="h-6 w-6 mr-2" />
              <h1 className="text-2xl font-bold">WTP & Fire Pump Monitoring System</h1>
            </div>
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">REMOTE</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{new Date().toLocaleString()}</span>
            </div>
            <button className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <center className='mb-6 text-blue'><b className='mb-6'>Water Treatment Plant DashBoard</b></center>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 mb-1">WATER PRODUCTION</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{calculatedMetrics.dailyProduction}</span>
              <span className="ml-1 text-sm text-gray-500">m³/hr</span>
            </div>
            <div className="flex items-center mt-2">
              <Activity className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">↑ 3.2% from yesterday</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 mb-1">FIRE SYSTEM STATUS</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-green-500">OPERATIONAL</span>
            </div>
            <div className="flex items-center mt-2">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs">All systems normal</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 mb-1">ACTIVE ALERTS</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-red-500">{alerts.filter(a => !a.resolved).length}</span>
              <span className="ml-1 text-sm text-gray-500">unresolved</span>
            </div>
            <div className="flex items-center mt-2">
              <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">{alerts.filter(a => a.level === 'critical' && !a.resolved).length} critical alerts</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 mb-1">POWER STATUS</h2>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${powerStatus.mainPower ? 'text-green-500' : 'text-red-500'}`}>
                {powerStatus.mainPower ? 'MAIN SUPPLY' : 'GENERATOR'}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <Zap className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs">Generator: {powerStatus.generatorStatus}</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* WTP Real-time Parameters */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Water Quality Parameters
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">pH</span>
                  <p className="text-xl font-bold">{realTimeWTPParams.pH}</p>
                </div>
                <div className={`text-lg ${realTimeWTPParams.pH >= 6.5 && realTimeWTPParams.pH <= 8.5 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeWTPParams.pH >= 6.5 && realTimeWTPParams.pH <= 8.5 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Turbidity (NTU)</span>
                  <p className="text-xl font-bold">{realTimeWTPParams.turbidity}</p>
                </div>
                <div className={`text-lg ${realTimeWTPParams.turbidity <= 1.0 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeWTPParams.turbidity <= 1.0 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Chlorine (mg/L)</span>
                  <p className="text-xl font-bold">{realTimeWTPParams.chlorine}</p>
                </div>
                <div className={`text-lg ${realTimeWTPParams.chlorine >= 0.5 && realTimeWTPParams.chlorine <= 1.5 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeWTPParams.chlorine >= 0.5 && realTimeWTPParams.chlorine <= 1.5 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">TDS (ppm)</span>
                  <p className="text-xl font-bold">{realTimeWTPParams.tds}</p>
                </div>
                <div className={`text-lg ${realTimeWTPParams.tds < 500 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeWTPParams.tds < 500 ? <Check /> : <AlertCircle />}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Temperature (°C)</span>
                  <p className="text-xl font-bold">{realTimeWTPParams.temperature}</p>
                </div>
                <div className="text-lg text-green-500">
                  <Check />
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Flow (m³/hr)</span>
                  <p className="text-xl font-bold">{realTimeWTPParams.flow}</p>
                </div>
                <div className="text-lg text-green-500">
                  <Check />
                </div>
              </div>
            </div>
          </div>

          {/* Fire Pump System Status */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Flame className="h-5 w-5 mr-2 text-red-600" />
              Fire Pump System Status
            </h2>
            <div className="space-y-4">
              {firePumpStatus.map((pump) => (
                <div key={pump.id} className="border rounded p-3">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">{pump.name}</span>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pump.status)} bg-opacity-20`}>
                          {pump.status.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">Last Test: {pump.lastTest}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{pump.pressure} <span className="text-sm font-normal">bar</span></div>
                      <div className="text-xs text-gray-500">Outlet Pressure</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <div className="text-center">
                <div className="font-medium">System Pressure</div>
                <div className="text-xl font-bold text-blue-600">8.4 bar</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Jockey Run Count</div>
                <div className="text-xl font-bold text-blue-600">12 today</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Last Test Date</div>
                <div className="text-xl font-bold text-blue-600">25/03/25</div>
              </div>
            </div>
          </div>

          {/* Chemical Levels and Tank Levels */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Layers className="h-5 w-5 mr-2 text-blue-600" />
              Storage Levels
            </h2>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Water Storage Tanks</h3>
              <div className="space-y-3">
                {Object.entries(tankLevels).map(([tank, level]) => (
                  <div key={tank} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">
                        {tank.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-xs font-medium">{Math.round(level)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${level > 85 ? 'bg-green-500' : level > 40 ? 'bg-blue-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Chemical Storage</h3>
              <div className="space-y-3">
                {Object.entries(chemicalLevels).map(([chemical, level]) => (
                  <div key={chemical} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">
                        {chemical === 'pAC' ? 'PAC' : chemical.charAt(0).toUpperCase() + chemical.slice(1)}
                      </span>
                      <span className="text-xs font-medium">{Math.round(level)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${level > 60 ? 'bg-green-500' : level > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Charts & Fire System Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Water Quality Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
              Water Quality Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={waterQualityData.slice(-12)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="rawTurbidity"
                    stroke="#8884d8"
                    name="Raw Water Turbidity"
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="filteredTurbidity"
                    stroke="#82ca9d"
                    name="Filtered Water Turbidity"
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="residualChlorine"
                    stroke="#ff7300"
                    name="Residual Chlorine"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fire System Pressure Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Gauge className="h-5 w-5 mr-2 text-red-600" />
              Fire System Pressure
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pressureData.slice(-12)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 12]} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="systemPressure"
                    stroke="#ff7300"
                    fill="#ff7300"
                    fillOpacity={0.2}
                    name="System Pressure (bar)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pumpOutletPressure"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.2}
                    name="Pump Outlet Pressure (bar)"
                  />
                  {/* Reference line for minimum required pressure */}
                  <ReferenceLine y={7} stroke="red" strokeDasharray="3 3" label="Min Pressure" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Third Row - Flow, Fire Zones & Power */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Flow Rate Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Wind className="h-5 w-5 mr-2 text-blue-600" />
              Flow Rate Analysis
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={flowRateData.slice(-12)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="rawWaterFlow"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.2}
                    name="Raw Water Flow (m³/hr)"
                  />
                  <Area
                    type="monotone"
                    dataKey="treatedWaterFlow"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.2}
                    name="Treated Water Flow (m³/hr)"
                  />
                  <Area
                    type="monotone"
                    dataKey="backwashFlow"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.2}
                    name="Backwash Flow (m³/hr)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fire Zone Status */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Map className="h-5 w-5 mr-2 text-red-600" />
              Fire Zone Status
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {fireZoneStatus.map((zone) => (
                <div key={zone.id} className={`border rounded p-2 ${zone.status === 'alarm' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${zone.status === 'alarm' ? 'bg-red-500 animate-pulse' : zone.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <span className="font-medium">{zone.name}</span>
                    </div>
                    <div className="text-right text-xs">
                      <div>{zone.devices} devices</div>
                      <div className="text-gray-500">Last checked: {zone.lastChecked}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <div className="text-center">
                <div className="font-medium">Total Zones</div>
                <div className="text-xl font-bold text-blue-600">{fireZoneStatus.length}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Active Alarms</div>
                <div className="text-xl font-bold text-red-600">{fireZoneStatus.filter(z => z.status === 'alarm').length}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Total Devices</div>
                <div className="text-xl font-bold text-blue-600">{fireZoneStatus.reduce((acc, zone) => acc + zone.devices, 0)}</div>
              </div>
            </div>
          </div>

          {/* Power Monitoring */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-600" />
              Power Monitoring
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Voltage L1</div>
                  <div className="text-lg font-bold">{Math.round(powerStatus.voltageL1)} <span className="text-xs font-normal">V</span></div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Voltage L2</div>
                  <div className="text-lg font-bold">{Math.round(powerStatus.voltageL2)} <span className="text-xs font-normal">V</span></div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Voltage L3</div>
                  <div className="text-lg font-bold">{Math.round(powerStatus.voltageL3)} <span className="text-xs font-normal">V</span></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Current L1</div>
                  <div className="text-lg font-bold">{powerStatus.currentL1.toFixed(1)} <span className="text-xs font-normal">A</span></div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Current L2</div>
                  <div className="text-lg font-bold">{powerStatus.currentL2.toFixed(1)} <span className="text-xs font-normal">A</span></div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Current L3</div>
                  <div className="text-lg font-bold">{powerStatus.currentL3.toFixed(1)} <span className="text-xs font-normal">A</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Frequency</div>
                  <div className="text-lg font-bold">{powerStatus.frequency.toFixed(1)} <span className="text-xs font-normal">Hz</span></div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-500">Power Factor</div>
                  <div className="text-lg font-bold">{powerStatus.powerFactor.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center">
                  <Radio className={`h-5 w-5 mr-2 ${powerStatus.mainPower ? 'text-green-500' : 'text-red-500'}`} />
                  <span>Power Source</span>
                </div>
                <div className={`font-medium ${powerStatus.mainPower ? 'text-green-500' : 'text-yellow-500'}`}>
                  {powerStatus.mainPower ? 'Main Supply' : 'Generator'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Row - Alerts & System Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts & Notifications */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              Alerts & Notifications
            </h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 border rounded flex justify-between items-center ${getAlertColor(alert.level)}`}
                >
                  <div className="flex items-center">
                    {getSystemIcon(alert.system)}
                    <div>
                      <div className="flex items-center">
                        <span className={`px-1.5 py-0.5 text-xs rounded mr-2 ${alert.level === 'critical' ? 'bg-red-600 text-white' :
                            alert.level === 'warning' ? 'bg-yellow-600 text-white' :
                              'bg-blue-600 text-white'
                          }`}>
                          {alert.level.toUpperCase()}
                        </span>
                        <p className="font-medium">{alert.message}</p>
                      </div>
                      <p className="text-xs mt-1">{alert.time}</p>
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

          {/* System Performance & Analytics */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              System Performance
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm text-gray-500 mb-1">Treatment Efficiency</div>
                <div className="text-2xl font-bold">{calculatedMetrics.treatmentEfficiency}%</div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>↑ 1.2% from last week</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm text-gray-500 mb-1">Energy Usage</div>
                <div className="text-2xl font-bold">{calculatedMetrics.energyUsage} <span className="text-sm font-normal">kWh/m³</span></div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>↓ 3.5% from last week</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Fire Pump Test History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pump</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {firePumpEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">{event.date}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">{event.pump}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs capitalize">{event.type}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${event.result === 'passed' ? 'bg-green-100 text-green-800' :
                              event.result === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {event.result.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 p-2 rounded text-center">
                <div className="text-xs text-gray-500">Chemical Usage</div>
                <div className="text-lg font-bold">{calculatedMetrics.chemicalUsage} <span className="text-xs font-normal">kg/day</span></div>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <div className="text-xs text-gray-500">Backwash Cycles</div>
                <div className="text-lg font-bold">3 <span className="text-xs font-normal">today</span></div>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <div className="text-xs text-gray-500">Next Maintenance</div>
                <div className="text-lg font-bold">2 <span className="text-xs font-normal">days</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-4 mt-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            © 2025 WTP & Fire Pump Remote Monitoring System | Version 2.5.3
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <button className="text-sm flex items-center hover:text-white">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WTPFirePumpMonitoringDashboard;