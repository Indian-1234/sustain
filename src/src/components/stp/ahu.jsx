import { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Fan, 
  Droplets, 
  Power, 
  ToggleLeft,
  ToggleRight,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

// Mock data for AHUs
const initialAHUs = [
  {
    id: 1,
    name: 'AHU-01',
    status: 'running',
    temperature: 22.5,
    setpoint: 23.0,
    humidity: 45,
    fanSpeed: 75,
    damperPosition: 65,
    filterStatus: 'clean',
    alarms: [],
    powerConsumption: 12.4
  },
  {
    id: 2,
    name: 'AHU-02',
    status: 'running',
    temperature: 24.1,
    setpoint: 24.0,
    humidity: 50,
    fanSpeed: 80,
    damperPosition: 70,
    filterStatus: 'needs maintenance',
    alarms: ['Filter pressure drop high'],
    powerConsumption: 14.2
  }
];

const AHUMonitoringDashboard = () => {
  const [ahus, setAhus] = useState(initialAHUs);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Toggle AHU status
  const toggleStatus = (id) => {
    setAhus(ahus.map(ahu => {
      if (ahu.id === id) {
        return {
          ...ahu,
          status: ahu.status === 'running' ? 'stopped' : 'running'
        };
      }
      return ahu;
    }));
  };
  
  // Change setpoint
  const changeSetpoint = (id, value) => {
    setAhus(ahus.map(ahu => {
      if (ahu.id === id) {
        return {
          ...ahu,
          setpoint: parseFloat((ahu.setpoint + value).toFixed(1))
        };
      }
      return ahu;
    }));
  };
  
  // Change fan speed
  const changeFanSpeed = (id, value) => {
    setAhus(ahus.map(ahu => {
      if (ahu.id === id) {
        const newSpeed = Math.min(Math.max(ahu.fanSpeed + value, 0), 100);
        return {
          ...ahu,
          fanSpeed: newSpeed
        };
      }
      return ahu;
    }));
  };
  
  // Change damper position
  const changeDamperPosition = (id, value) => {
    setAhus(ahus.map(ahu => {
      if (ahu.id === id) {
        const newPosition = Math.min(Math.max(ahu.damperPosition + value, 0), 100);
        return {
          ...ahu,
          damperPosition: newPosition
        };
      }
      return ahu;
    }));
  };
  
  // Reset filter status
  const resetFilter = (id) => {
    setAhus(ahus.map(ahu => {
      if (ahu.id === id) {
        return {
          ...ahu,
          filterStatus: 'clean',
          alarms: ahu.alarms.filter(alarm => !alarm.includes('filter'))
        };
      }
      return ahu;
    }));
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">AHU Monitoring and Controls Dashboard</h1>
          <div className="flex items-center text-gray-600">
            <Clock className="mr-2" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ahus.map(ahu => (
          <div key={ahu.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`p-4 flex justify-between items-center ${ahu.status === 'running' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              <h2 className="text-xl font-semibold text-black text-black">{ahu.name}</h2>
              <div className="flex items-center">
                <span className="mr-2">{ahu.status === 'running' ? 'Running' : 'Stopped'}</span>
                <button 
                  onClick={() => toggleStatus(ahu.id)}
                  className="p-1 rounded bg-white text-gray-800"
                >
                  {ahu.status === 'running' ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
            </div>
            
            {/* Alarms */}
            {ahu.alarms.length > 0 && (
              <div className="bg-red-100 p-3 border-l-4 border-red-500">
                <div className="flex">
                  <AlertTriangle className="text-red-500 mr-2" />
                  <div>
                    <p className="font-semibold text-black text-red-800">Active Alarms:</p>
                    <ul className="text-red-700">
                      {ahu.alarms.map((alarm, index) => (
                        <li key={index}>{alarm}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 grid grid-cols-2 gap-4">
              {/* Temperature */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Thermometer className="text-blue-500 mr-2" />
                  <h3 className="font-semibold text-black text-black">Temperature</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{ahu.temperature}°C</p>
                    <p className="text-sm text-gray-500">Setpoint: {ahu.setpoint}°C</p>
                  </div>
                  <div className="flex flex-col">
                    <button 
                      onClick={() => changeSetpoint(ahu.id, 0.5)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded mb-1"
                    >
                      <ArrowUpCircle size={20} />
                    </button>
                    <button 
                      onClick={() => changeSetpoint(ahu.id, -0.5)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <ArrowDownCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Humidity */}
              <div className="bg-cyan-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplets className="text-cyan-500 mr-2" />
                  <h3 className="font-semibold text-black ">Humidity</h3>
                </div>
                <p className="text-2xl font-bold">{ahu.humidity}%</p>
              </div>
              
              {/* Fan Speed */}
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Fan className="text-purple-500 mr-2" />
                  <h3 className="font-semibold text-black">Fan Speed</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{ahu.fanSpeed}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${ahu.fanSpeed}%` }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button 
                      onClick={() => changeFanSpeed(ahu.id, 5)}
                      className="p-1 text-purple-600 hover:bg-purple-100 rounded mb-1"
                    >
                      <ArrowUpCircle size={20} />
                    </button>
                    <button 
                      onClick={() => changeFanSpeed(ahu.id, -5)}
                      className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                    >
                      <ArrowDownCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Damper Position */}
              <div className="bg-amber-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="mr-2 text-amber-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M3 15h18" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black">Damper Position</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{ahu.damperPosition}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${ahu.damperPosition}%` }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button 
                      onClick={() => changeDamperPosition(ahu.id, 5)}
                      className="p-1 text-amber-600 hover:bg-amber-100 rounded mb-1"
                    >
                      <ArrowUpCircle size={20} />
                    </button>
                    <button 
                      onClick={() => changeDamperPosition(ahu.id, -5)}
                      className="p-1 text-amber-600 hover:bg-amber-100 rounded"
                    >
                      <ArrowDownCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Filter Status */}
              <div className={`p-3 rounded-lg ${ahu.filterStatus === 'clean' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <div className="flex items-center mb-2">
                  <div className={`mr-2 ${ahu.filterStatus === 'clean' ? 'text-green-500' : 'text-yellow-500'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 8H2" />
                      <path d="M6 16h.01" />
                      <path d="M10 16h.01" />
                      <path d="M14 16h.01" />
                      <path d="M18 16h.01" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black">Filter Status</h3>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`font-semibold text-black ${ahu.filterStatus === 'clean' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {ahu.filterStatus.charAt(0).toUpperCase() + ahu.filterStatus.slice(1)}
                  </p>
                  {ahu.filterStatus !== 'clean' && (
                    <button 
                      onClick={() => resetFilter(ahu.id)}
                      className="px-2 py-1 bg-yellow-200 text-yellow-800 text-sm rounded hover:bg-yellow-300"
                    >
                      Reset After Service
                    </button>
                  )}
                </div>
              </div>
              
              {/* Power Consumption */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Power className="text-gray-600 mr-2" />
                  <h3 className="font-semibold text-black">Power Consumption</h3>
                </div>
                <p className="text-2xl font-bold">{ahu.powerConsumption} kW</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AHUMonitoringDashboard;