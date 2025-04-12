import React, { useState, useEffect } from 'react';
import { BarChart3, AlertTriangle, CheckCircle, Thermometer, Wind, Gauge, Settings, RefreshCw, Droplets, Clock, Activity } from 'lucide-react';

export default function BasementVentilationDashboard() {
  // State for all fans - removing Jet Fans
  const [fans, setFans] = useState([
    { 
      id: 1, 
      name: "Fresh Air Unit 1", 
      type: "Fresh Air", 
      status: "On", 
      mode: "Remote",
      temperature: 23.5,
      humidity: 65,
      airflow: 1200,
      co2Level: 680,
      lastMaintenance: "2025-03-15",
      filterStatus: "Good",
      runHours: 546,
      alerts: [],
      consumption: 2.3
    },
    { 
      id: 2, 
      name: "Exhaust Fan 1", 
      type: "Exhaust", 
      status: "On", 
      mode: "Remote",
      temperature: 24.1,
      humidity: 68,
      airflow: 980,
      co2Level: 720,
      lastMaintenance: "2025-02-28",
      filterStatus: "Replace Soon",
      runHours: 1024,
      alerts: ["Vibration High"],
      consumption: 1.8
    },
    { 
      id: 4, 
      name: "Fresh Air Unit 2", 
      type: "Fresh Air", 
      status: "Tripped", 
      mode: "Local",
      temperature: 25.5,
      humidity: 70,
      airflow: 0,
      co2Level: 850,
      lastMaintenance: "2025-01-10",
      filterStatus: "Replace Now",
      runHours: 3120,
      alerts: ["Overheated", "Service Required"],
      consumption: 0
    },
    { 
      id: 5, 
      name: "Exhaust Fan 2", 
      type: "Exhaust", 
      status: "On", 
      mode: "Remote",
      temperature: 24.0,
      humidity: 66,
      airflow: 1050,
      co2Level: 710,
      lastMaintenance: "2025-03-10",
      filterStatus: "Good",
      runHours: 872,
      alerts: [],
      consumption: 2.1
    },
    { 
      id: 6, 
      name: "Fresh Air Unit 3", 
      type: "Fresh Air", 
      status: "Off", 
      mode: "Remote",
      temperature: 22.8,
      humidity: 60,
      airflow: 0,
      co2Level: 760,
      lastMaintenance: "2025-02-20",
      filterStatus: "Good",
      runHours: 210,
      alerts: [],
      consumption: 0
    },
    { 
      id: 7, 
      name: "Exhaust Fan 3", 
      type: "Exhaust", 
      status: "On", 
      mode: "Remote",
      temperature: 23.8,
      humidity: 67,
      airflow: 1100,
      co2Level: 700,
      lastMaintenance: "2025-02-15",
      filterStatus: "Good",
      runHours: 648,
      alerts: [],
      consumption: 2.2
    }
  ]);

  // Selected fan for detailed view
  const [selectedFan, setSelectedFan] = useState(null);
  
  // Filter states
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  
  // System status summary
  const [systemStatus, setSystemStatus] = useState({
    totalFans: 6,
    operating: 4,
    tripped: 1,
    offline: 1,
    alerts: 3,
    totalAirflow: 4330,
    totalPower: 8.4,
    avgCO2: 720
  });

  // Toggle fan status
  const toggleFanStatus = (id) => {
    setFans(fans.map(fan => {
      if (fan.id === id) {
        const newStatus = fan.status === "On" ? "Off" : "On";
        return { 
          ...fan, 
          status: newStatus,
          airflow: newStatus === "On" ? (fan.type === "Fresh Air" ? 1200 : 1000) : 0,
          consumption: newStatus === "On" ? (fan.type === "Fresh Air" ? 2.3 : 2.0) : 0
        };
      }
      return fan;
    }));
    updateSystemStatus();
  };

  // Change fan mode
  const changeFanMode = (id, mode) => {
    setFans(fans.map(fan => {
      if (fan.id === id) {
        return { ...fan, mode: mode };
      }
      return fan;
    }));
  };

  // Reset tripped status
  const resetTrippedStatus = (id) => {
    setFans(fans.map(fan => {
      if (fan.id === id && fan.status === "Tripped") {
        return { ...fan, status: "Off", alerts: [] };
      }
      return fan;
    }));
    updateSystemStatus();
  };

  // Update system status summary
  const updateSystemStatus = () => {
    const operating = fans.filter(fan => fan.status === "On").length;
    const tripped = fans.filter(fan => fan.status === "Tripped").length;
    const offline = fans.filter(fan => fan.status === "Off").length;
    const alerts = fans.reduce((count, fan) => count + fan.alerts.length, 0);
    const totalAirflow = fans.reduce((sum, fan) => sum + fan.airflow, 0);
    const totalPower = fans.reduce((sum, fan) => sum + fan.consumption, 0);
    
    // Calculate average CO2 levels - only from active fans
    const activeFans = fans.filter(fan => fan.status === "On");
    const avgCO2 = activeFans.length > 0 
      ? Math.round(activeFans.reduce((sum, fan) => sum + fan.co2Level, 0) / activeFans.length)
      : 0;
    
    setSystemStatus({
      totalFans: fans.length,
      operating,
      tripped,
      offline,
      alerts,
      totalAirflow,
      totalPower,
      avgCO2
    });
  };

  // Filter fans
  const filteredFans = fans.filter(fan => {
    if (filterType !== "All" && fan.type !== filterType) return false;
    if (filterStatus !== "All" && fan.status !== filterStatus) return false;
    return true;
  });

  // Effect to update system status when fans change
  useEffect(() => {
    updateSystemStatus();
  }, [fans]);

  // Simulate random data changes
  useEffect(() => {
    const interval = setInterval(() => {
      setFans(prevFans => prevFans.map(fan => {
        if (fan.status === "On") {
          return {
            ...fan,
            temperature: Math.round((fan.temperature + (Math.random() * 0.6 - 0.3)) * 10) / 10,
            humidity: Math.round((fan.humidity + (Math.random() * 2 - 1)) * 10) / 10,
            airflow: Math.round(fan.airflow + (Math.random() * 40 - 20)),
            co2Level: Math.round(fan.co2Level + (Math.random() * 20 - 10)),
            consumption: Math.round((fan.consumption + (Math.random() * 0.2 - 0.1)) * 10) / 10
          };
        }
        return fan;
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow mb-4">
        <h1 className="text-2xl font-bold">Basement Ventilation Control System</h1>
        <div className="text-sm mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>
      
      {/* Dashboard Layout */}
      <div className="flex flex-col md:flex-row gap-4 h-full overflow-hidden">
        {/* Left Column - Controls and Filters */}
        <div className="w-full md:w-3/12 flex flex-col gap-4">
          {/* System Status Summary */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              System Overview
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-sm text-gray-500">Total Units</div>
                <div className="text-xl font-bold">{systemStatus.totalFans}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-sm text-gray-500">Operating</div>
                <div className="text-xl font-bold text-green-600">{systemStatus.operating}</div>
              </div>
              <div className="bg-red-50 p-2 rounded">
                <div className="text-sm text-gray-500">Tripped</div>
                <div className="text-xl font-bold text-red-600">{systemStatus.tripped}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-sm text-gray-500">Offline</div>
                <div className="text-xl font-bold text-gray-600">{systemStatus.offline}</div>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <div className="text-sm text-gray-500">Alerts</div>
                <div className="text-xl font-bold text-orange-600">{systemStatus.alerts}</div>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <div className="text-sm text-gray-500">Power (kW)</div>
                <div className="text-xl font-bold text-purple-600">{systemStatus.totalPower.toFixed(1)}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="p-2 bg-blue-50 rounded">
                <div className="text-sm text-gray-500">Total Airflow (CFM)</div>
                <div className="text-xl font-bold text-blue-600">{systemStatus.totalAirflow.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <div className="text-sm text-gray-500">Avg CO₂ (ppm)</div>
                <div className="text-xl font-bold text-green-600">{systemStatus.avgCO2}</div>
              </div>
            </div>
          </div>
          
          {/* Basement Environment Status */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Basement Environment</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-2 rounded flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer size={18} className="mr-2 text-red-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-bold">23.8°C</span>
              </div>
              
              <div className="bg-blue-50 p-2 rounded flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets size={18} className="mr-2 text-blue-500" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-bold">67%</span>
              </div>
              
              <div className="bg-blue-50 p-2 rounded flex items-center justify-between">
                <div className="flex items-center">
                  <Activity size={18} className="mr-2 text-green-500" />
                  <span className="text-sm">CO₂ Level</span>
                </div>
                <span className="font-bold">720 ppm</span>
              </div>
              
              <div className="bg-blue-50 p-2 rounded flex items-center justify-between">
                <div className="flex items-center">
                  <Wind size={18} className="mr-2 text-purple-500" />
                  <span className="text-sm">Air Quality</span>
                </div>
                <span className="font-bold text-green-600">Good</span>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Filters</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Type</label>
                <select 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Fresh Air">Fresh Air Units</option>
                  <option value="Exhaust">Exhaust Fans</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                  <option value="Tripped">Tripped</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Quick Actions</h2>
            <div className="space-y-2">
              <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setFans(fans.map(fan => ({
                    ...fan, 
                    status: "On",
                    mode: "Remote",
                    airflow: fan.type === "Fresh Air" ? 1200 : 1000,
                    consumption: fan.type === "Fresh Air" ? 2.3 : 2.0
                  })));
                }}
              >
                Start All Units
              </button>
              <button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setFans(fans.map(fan => ({
                    ...fan, 
                    status: "Off",
                    airflow: 0,
                    consumption: 0
                  })));
                }}
              >
                Stop All Units
              </button>
              <button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setFans(fans.map(fan => {
                    if (fan.status === "Tripped") {
                      return { ...fan, status: "Off", alerts: [] };
                    }
                    return fan;
                  }));
                }}
              >
                Reset All Trips
              </button>
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // Set all to remote mode
                  setFans(fans.map(fan => ({ ...fan, mode: "Remote" })));
                }}
              >
                Set All Remote
              </button>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Fan List */}
        <div className="w-full md:w-5/12 flex flex-col">
          <div className="bg-white p-4 rounded-lg shadow flex-grow overflow-auto">
            <h2 className="text-lg font-bold mb-2">Ventilation Units ({filteredFans.length})</h2>
            <div className="space-y-2">
              {filteredFans.map(fan => (
                <div 
                  key={fan.id} 
                  className={`p-3 rounded-lg cursor-pointer transform transition duration-150 hover:scale-105 ${
                    selectedFan?.id === fan.id ? 'border-2 border-blue-500' : 'border border-gray-200'
                  } ${
                    fan.status === 'On' ? 'bg-green-50' : 
                    fan.status === 'Off' ? 'bg-gray-50' : 
                    'bg-red-50'
                  }`}
                  onClick={() => setSelectedFan(fan)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {fan.status === 'On' && <CheckCircle className="text-green-500 mr-2" size={18} />}
                      {fan.status === 'Off' && <CheckCircle className="text-gray-500 mr-2" size={18} />}
                      {fan.status === 'Tripped' && <AlertTriangle className="text-red-500 mr-2" size={18} />}
                      <span className="font-medium">{fan.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      fan.status === 'On' ? 'bg-green-200 text-green-800' : 
                      fan.status === 'Off' ? 'bg-gray-200 text-gray-800' : 
                      'bg-red-200 text-red-800'
                    }`}>
                      {fan.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-500">{fan.type}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      fan.mode === 'Remote' ? 'bg-blue-100 text-blue-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {fan.mode}
                    </span>
                  </div>
                  
                  {fan.status === 'On' && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center">
                        <Thermometer size={14} className="mr-1 text-orange-500" />
                        <span>{fan.temperature}°C</span>
                      </div>
                      <div className="flex items-center">
                        <Wind size={14} className="mr-1 text-blue-500" />
                        <span>{fan.airflow} CFM</span>
                      </div>
                      <div className="flex items-center">
                        <Activity size={14} className="mr-1 text-green-500" />
                        <span>{fan.co2Level} ppm</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-purple-500" />
                        <span>{fan.runHours} hrs</span>
                      </div>
                    </div>
                  )}
                  
                  {fan.alerts.length > 0 && (
                    <div className="mt-2 text-xs font-medium text-red-600 flex items-center">
                      <AlertTriangle size={14} className="mr-1" />
                      {fan.alerts.length} {fan.alerts.length === 1 ? 'Alert' : 'Alerts'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Details Panel */}
        <div className="w-full md:w-4/12 flex flex-col">
          {selectedFan ? (
            <div className="bg-white p-4 rounded-lg shadow h-full overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{selectedFan.name}</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  selectedFan.status === 'On' ? 'bg-green-200 text-green-800' : 
                  selectedFan.status === 'Off' ? 'bg-gray-200 text-gray-800' : 
                  'bg-red-200 text-red-800'
                }`}>
                  {selectedFan.status}
                </div>
              </div>
              
              {/* Fan type and controls */}
              <div className="mb-4">
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <span className="text-sm font-medium">Type: </span>
                  <span>{selectedFan.type}</span>
                </div>
                
                <div className="flex gap-2 mb-2">
                  {selectedFan.status !== "Tripped" ? (
                    <button 
                      className={`flex-1 py-2 px-4 rounded font-bold ${
                        selectedFan.status === 'On' 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      onClick={() => toggleFanStatus(selectedFan.id)}
                    >
                      {selectedFan.status === 'On' ? 'Turn Off' : 'Turn On'}
                    </button>
                  ) : (
                    <button 
                      className="flex-1 py-2 px-4 rounded font-bold bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => resetTrippedStatus(selectedFan.id)}
                    >
                      Reset Trip
                    </button>
                  )}
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Control Mode</label>
                  <div className="flex gap-2 mt-1">
                    <button 
                      className={`flex-1 py-1 px-3 rounded text-sm ${
                        selectedFan.mode === 'Local' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                      onClick={() => changeFanMode(selectedFan.id, 'Local')}
                    >
                      Local
                    </button>
                    <button 
                      className={`flex-1 py-1 px-3 rounded text-sm ${
                        selectedFan.mode === 'Remote' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                      onClick={() => changeFanMode(selectedFan.id, 'Remote')}
                    >
                      Remote
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Metrics */}
              {selectedFan.status === 'On' && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h3 className="text-md font-bold mb-2 flex items-center">
                    <Gauge className="mr-2" size={18} />
                    Live Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-xs text-gray-500">Temperature</div>
                      <div className="text-lg font-bold text-orange-600">{selectedFan.temperature}°C</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-xs text-gray-500">Humidity</div>
                      <div className="text-lg font-bold text-blue-600">{selectedFan.humidity}%</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-xs text-gray-500">Airflow</div>
                      <div className="text-lg font-bold text-green-600">{selectedFan.airflow} CFM</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-xs text-gray-500">Power</div>
                      <div className="text-lg font-bold text-purple-600">{selectedFan.consumption} kW</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-xs text-gray-500">CO₂ Level</div>
                      <div className="text-lg font-bold text-green-600">{selectedFan.co2Level} ppm</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-xs text-gray-500">Run Hours</div>
                      <div className="text-lg font-bold text-blue-600">{selectedFan.runHours}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Maintenance Info */}
              <div className="mb-4">
                <h3 className="text-md font-bold mb-2 flex items-center">
                  <Settings className="mr-2" size={18} />
                  Maintenance Info
                </h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="mb-2">
                    <span className="text-sm font-medium">Last Service: </span>
                    <span className="text-sm">{selectedFan.lastMaintenance}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Next Service: </span>
                    <span className="text-sm">
                      {new Date(new Date(selectedFan.lastMaintenance).setMonth(
                        new Date(selectedFan.lastMaintenance).getMonth() + 3
                      )).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Filter Status: </span>
                    <span className={`text-sm ${
                      selectedFan.filterStatus === 'Good' ? 'text-green-600' :
                      selectedFan.filterStatus === 'Replace Soon' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {selectedFan.filterStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Total Run Hours: </span>
                    <span className="text-sm">{selectedFan.runHours} hours</span>
                  </div>
                </div>
              </div>
              
              {/* Alerts */}
              <div>
                <h3 className="text-md font-bold mb-2 flex items-center">
                  <AlertTriangle className="mr-2" size={18} />
                  Alerts
                </h3>
                {selectedFan.alerts.length > 0 ? (
                  <div className="bg-red-50 p-3 rounded space-y-2">
                    {selectedFan.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center bg-white p-2 rounded shadow">
                        <AlertTriangle className="text-red-500 mr-2" size={16} />
                        <span className="text-sm text-red-700">{alert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 p-3 rounded">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-sm text-green-700">No active alerts</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Refresh button */}
              <div className="mt-6 flex justify-center">
                <button 
                  className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded"
                  onClick={() => {
                    // Refresh the current fan data
                    setSelectedFan(fans.find(f => f.id === selectedFan.id));
                  }}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh Data
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
              <Wind size={48} className="mx-auto mb-2 text-blue-400" />
                <p>Select a unit from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}