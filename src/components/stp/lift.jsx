import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import {
  ArrowUp, ArrowDown, AlertCircle, Clock,
  Users, Activity, Battery, CheckCircle,
  XCircle, ArrowUpDown
} from 'lucide-react';
import { FaTools } from 'react-icons/fa';
// Mock data for our lift monitoring system
const generateMockData = () => {
  return {
    lifts: [
      {
        id: 'L1',
        name: 'Main Lobby Lift',
        currentFloor: Math.floor(Math.random() * 20),
        direction: ['up', 'down', 'idle'][Math.floor(Math.random() * 3)],
        status: ['operational', 'maintenance', 'error'][Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 2) + 1],
        capacity: Math.floor(Math.random() * 8) + 4, // 4-12 people
        loadPercentage: Math.floor(Math.random() * 100),
        doorCycles: 3450 + Math.floor(Math.random() * 100),
        lastMaintenance: '2025-03-15',
        nextMaintenance: '2025-05-15'
      },
      {
        id: 'L2',
        name: 'East Wing Lift',
        currentFloor: Math.floor(Math.random() * 15),
        direction: ['up', 'down', 'idle'][Math.floor(Math.random() * 3)],
        status: ['operational', 'maintenance', 'error'][Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 2) + 1],
        capacity: Math.floor(Math.random() * 8) + 4, // 4-12 people
        loadPercentage: Math.floor(Math.random() * 100),
        doorCycles: 2780 + Math.floor(Math.random() * 100),
        lastMaintenance: '2025-02-28',
        nextMaintenance: '2025-04-28'
      },
      {
        id: 'L3',
        name: 'Freight Lift',
        currentFloor: Math.floor(Math.random() * 10),
        direction: ['up', 'down', 'idle'][Math.floor(Math.random() * 3)],
        status: ['operational', 'maintenance', 'error'][Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 2) + 1],
        capacity: Math.floor(Math.random() * 10) + 15, // 15-25 people (freight)
        loadPercentage: Math.floor(Math.random() * 100),
        doorCycles: 1980 + Math.floor(Math.random() * 100),
        lastMaintenance: '2025-03-20',
        nextMaintenance: '2025-05-20'
      },
      {
        id: 'L4',
        name: 'West Wing Lift',
        currentFloor: Math.floor(Math.random() * 18),
        direction: ['up', 'down', 'idle'][Math.floor(Math.random() * 3)],
        status: ['operational', 'maintenance', 'error'][Math.floor(Math.random() * 10) < 9 ? 0 : Math.floor(Math.random() * 2) + 1],
        capacity: Math.floor(Math.random() * 8) + 4, // 4-12 people
        loadPercentage: Math.floor(Math.random() * 100),
        doorCycles: 3120 + Math.floor(Math.random() * 100),
        lastMaintenance: '2025-03-05',
        nextMaintenance: '2025-05-05'
      },
    ],
    systemStats: {
      totalLifts: 4,
      operationalLifts: 0, // to be calculated
      maintenanceLifts: 0, // to be calculated
      errorLifts: 0, // to be calculated
      averageTripsDaily: 215,
      peakUsageHour: '8:00 AM',
      powerConsumption: Math.floor(Math.random() * 50) + 200 // 200-250 kWh
    },
    alarms: [
      { id: 1, liftId: 'L2', type: 'Door Sensor Fault', time: '09:23:45', resolved: false },
      { id: 2, liftId: 'L3', type: 'Overload Warning', time: '10:12:30', resolved: true },
      { id: 3, liftId: 'L1', type: 'Communication Error', time: '11:45:12', resolved: false }
    ]
  };
};

// Historical trip data for charts
const generateHistoricalData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      trips: Math.floor(Math.random() * 20) + (i >= 8 && i <= 18 ? 15 : 5), // More trips during work hours
      waitTime: Math.floor(Math.random() * 60) + (i >= 8 && i <= 18 ? 30 : 15), // Longer waits during peak
      powerUsage: Math.floor(Math.random() * 15) + (i >= 8 && i <= 18 ? 12 : 6), // More power during work hours
    });
  }
  return data;
};

// Weekly maintenance data
const weeklyMaintenanceData = [
  { name: 'Week 1', inspections: 4, repairs: 1 },
  { name: 'Week 2', inspections: 3, repairs: 2 },
  { name: 'Week 3', inspections: 5, repairs: 0 },
  { name: 'Week 4', inspections: 2, repairs: 3 }
];

const LiftStatusCard = ({ lift }) => {
  let statusText = "Operational";
  let statusIcon = <CheckCircle size={16} />;

  if (lift.status === "maintenance") {
    statusText = "Maintenance";
    statusIcon = <FaTools size={16} />;
  } else if (lift.status === "error") {
    statusText = "Error";
    statusIcon = <XCircle size={16} />;
  }

  let directionIcon = null;
  if (lift.direction === "up") {
    directionIcon = <ArrowUp size={20} className="text-green-600" />;
  } else if (lift.direction === "down") {
    directionIcon = <ArrowDown size={20} className="text-blue-600" />;
  } else {
    directionIcon = <ArrowUpDown size={20} className="text-gray-600" />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-black">{lift.name}</h3>
        <div className={`flex items-center px-2 py-1 rounded-full ${lift.status === "operational" ? "bg-green-100 text-green-800" : lift.status === "maintenance" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
          {statusIcon}
          <span className="ml-1 text-xs font-semibold ">{statusText}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            {directionIcon}
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-500">Current Floor</div>
            <div className="font-bold">{lift.currentFloor}</div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-purple-100 p-2 rounded-full text-purple-600">
            <Users size={20} />
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-500">Load</div>
            <div className="font-bold">{lift.loadPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600">
            <Activity size={20} />
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-500">Door Cycles</div>
            <div className="font-bold">{lift.doorCycles}</div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-teal-100 p-2 rounded-full text-teal-600">
            <Clock size={20} />
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-500">Next Maintenance</div>
            <div className="font-bold text-sm">{lift.nextMaintenance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusWidget = ({ title, count, icon, color }) => {
  return (
    <div className="flex items-center p-3">
      <div className={`${color} p-2 rounded-full`}>
        {icon}
      </div>
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-xl font-bold">{count}</div>
      </div>
    </div>
  );
};

export default function LiftMonitoringSystem() {
  const [data, setData] = useState(() => {
    const initialData = generateMockData();
    // Calculate the status counts
    initialData.systemStats.operationalLifts = initialData.lifts.filter(lift => lift.status === 'operational').length;
    initialData.systemStats.maintenanceLifts = initialData.lifts.filter(lift => lift.status === 'maintenance').length;
    initialData.systemStats.errorLifts = initialData.lifts.filter(lift => lift.status === 'error').length;
    return initialData;
  });
  const [historicalData] = useState(generateHistoricalData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  // Status colors for pie chart
  const COLORS = ['#4caf50', '#ff9800', '#f44336'];

  // Update data every 5 seconds to simulate real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      // Calculate the status counts
      newData.systemStats.operationalLifts = newData.lifts.filter(lift => lift.status === 'operational').length;
      newData.systemStats.maintenanceLifts = newData.lifts.filter(lift => lift.status === 'maintenance').length;
      newData.systemStats.errorLifts = newData.lifts.filter(lift => lift.status === 'error').length;

      setData(newData);
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Prepare status data for pie chart
  const statusData = [
    { name: 'Operational', value: data.systemStats.operationalLifts },
    { name: 'Maintenance', value: data.systemStats.maintenanceLifts },
    { name: 'Error', value: data.systemStats.errorLifts }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowUpDown size={28} className="mr-2" />
            <h1 className="text-2xl font-bold">Lift Monitoring System</h1>
          </div>
          <div className="text-sm">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex">
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'maintenance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'alarms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('alarms')}
          >
            Alarms
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4">
        {activeTab === 'overview' && (
          <div>
            {/* System Overview */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-lg font-medium text-black mb-4">System Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <StatusWidget
                  title="Total Lifts"
                  count={data.systemStats.totalLifts}
                  icon={<ArrowUpDown size={20} className="text-blue-500" />}
                  color="bg-blue-100 text-blue-500"
                />
                <StatusWidget
                  title="Operational"
                  count={data.systemStats.operationalLifts}
                  icon={<CheckCircle size={20} className="text-green-500" />}
                  color="bg-green-100 text-green-500"
                />
                <StatusWidget
                  title="Maintenance"
                  count={data.systemStats.maintenanceLifts}
                  icon={<FaTools size={20} className="text-yellow-500" />}
                  color="bg-yellow-100 text-yellow-500"
                />
                <StatusWidget
                  title="Error"
                  count={data.systemStats.errorLifts}
                  icon={<AlertCircle size={20} className="text-red-500" />}
                  color="bg-red-100 text-red-500"
                />
              </div>
            </div>

            {/* Lift Status Cards */}
            <h2 className="text-lg font-medium text-black mb-2">Lift Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {data.lifts.map(lift => (
                <LiftStatusCard key={lift.id} lift={lift} />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-medium text-black mb-3">Daily Trips</h3>
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                    <ArrowUpDown size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">{data.systemStats.averageTripsDaily}</div>
                    <div className="text-sm text-gray-500">trips per day</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-medium text-black mb-3">Peak Usage</h3>
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <Clock size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">{data.systemStats.peakUsageHour}</div>
                    <div className="text-sm text-gray-500">busiest hour</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-medium text-black mb-3">Power Consumption</h3>
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Battery size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">{data.systemStats.powerConsumption}</div>
                    <div className="text-sm text-gray-500">kWh daily</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Hourly Trips Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Hourly Trips</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="trips" fill="#3b82f6" name="Trips" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Wait Time Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Average Wait Time (seconds)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="waitTime"
                      stroke="#f59e0b"
                      name="Wait Time"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Power Usage Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Hourly Power Usage (kWh)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="powerUsage"
                      stroke="#10b981"
                      name="Power Usage"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Status Distribution */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Lift Status Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-1 gap-4">
            {/* Maintenance Schedule */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 border-b">
                <h2 className="text-lg font-medium text-black">Maintenance Schedule</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lift ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Door Cycles</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.lifts.map(lift => (
                      <tr key={lift.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{lift.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black ">{lift.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{lift.lastMaintenance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{lift.nextMaintenance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{lift.doorCycles}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lift.status === "operational" ? "bg-green-100 text-green-800" :
                            lift.status === "maintenance" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                            {lift.status.charAt(0).toUpperCase() + lift.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Maintenance Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Monthly Maintenance Activity</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyMaintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inspections" fill="#3b82f6" name="Inspections" />
                    <Bar dataKey="repairs" fill="#ef4444" name="Repairs" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Maintenance Tips */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Maintenance Tips</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <div className="ml-2">
                    <h4 className="font-medium">Door Sensor Calibration</h4>
                    <p className="text-sm text-gray-600">Calibrate door sensors monthly to prevent false obstruction readings.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <div className="ml-2">
                    <h4 className="font-medium">Cable Inspection</h4>
                    <p className="text-sm text-gray-600">Inspect cables every 3 months for signs of wear or damage.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <div className="ml-2">
                    <h4 className="font-medium">Emergency Systems</h4>
                    <p className="text-sm text-gray-600">Test emergency phones, alarms and backup power systems bi-weekly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alarms' && (
          <div className="grid grid-cols-1 gap-4">
            {/* Current Alarms */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium text-black">Active Alarms</h2>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  {data.alarms.filter(a => !a.resolved).length} Active
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lift</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.alarms.map(alarm => (
                      <tr key={alarm.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{alarm.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{alarm.liftId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{alarm.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{alarm.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alarm.resolved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                            {alarm.resolved ? "Resolved" : "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alarm Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-medium text-black mb-3">Total Alarms Today</h3>
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full text-red-600">
                    <AlertCircle size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">{data.alarms.length}</div>
                    <div className="text-sm text-gray-500">reported issues</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-medium text-black mb-3">Resolution Time</h3>
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <Clock size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">42 min</div>
                    <div className="text-sm text-gray-500">average time</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-medium text-black mb-3">Resolved Issues</h3>
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">{data.alarms.filter(a => a.resolved).length}</div>
                    <div className="text-sm text-gray-500">completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Alarm Types */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Common Alarm Types</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Door Sensor', count: 12 },
                      { name: 'Overload', count: 8 },
                      { name: 'Comm Error', count: 7 },
                      { name: 'Power Issue', count: 5 },
                      { name: 'Leveling', count: 3 }
                    ]}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#ef4444" name="Incidents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Response Procedures */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-black mb-4">Emergency Response Procedures</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-3">
                  <h3 className="font-medium text-red-700">Passenger Entrapment</h3>
                  <p className="text-sm text-gray-600">1. Maintain communication with trapped passengers. 2. Dispatch emergency response team. 3. Notify building management. 4. Document incident.</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-3">
                  <h3 className="font-medium text-yellow-700">Door Malfunction</h3>
                  <p className="text-sm text-gray-600">1. Ensure no passengers are at risk. 2. Isolate lift if necessary. 3. Reset door system or dispatch technician. 4. Test operation before returning to service.</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3">
                  <h3 className="font-medium text-blue-700">Power Failure</h3>
                  <p className="text-sm text-gray-600">1. Confirm backup generators are functioning. 2. Check if lifts returned to designated floors. 3. Verify emergency lighting is operational. 4. Initialize recovery procedures.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">© 2025 Plant Management Systems</p>
          </div>
          <div className="text-sm">
            <span>System Version: 2.4.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}