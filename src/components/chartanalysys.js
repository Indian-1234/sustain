import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Dec 01', 'Energy - kWh': 8.2, 'Water - kWh': 2.3, 'Steam - kg': 1.6, 'Gas - kWh': 0.8 },
  { date: 'Dec 02', 'Energy - kWh': 7.8, 'Water - kWh': 2.5, 'Steam - kg': 1.9, 'Gas - kWh': 0.9 },
  { date: 'Dec 03', 'Energy - kWh': 0, 'Water - kWh': 0, 'Steam - kg': 0, 'Gas - kWh': 0 },
  { date: 'Dec 04', 'Energy - kWh': 8.5, 'Water - kWh': 2.9, 'Steam - kg': 1.8, 'Gas - kWh': 0.7 },
  { date: 'Dec 05', 'Energy - kWh': 7.6, 'Water - kWh': 3.1, 'Steam - kg': 2.0, 'Gas - kWh': 0.6 },
  { date: 'Dec 06', 'Energy - kWh': 8.0, 'Water - kWh': 2.8, 'Steam - kg': 1.7, 'Gas - kWh': 0.8 },
  { date: 'Dec 07', 'Energy - kWh': 8.4, 'Water - kWh': 3.0, 'Steam - kg': 1.9, 'Gas - kWh': 0.7 },
];

const UtilityConsumptionChart = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
      <h2 className="text-lg font-bold text-white mb-6">Utility Consumption (Daily)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#ffffff" />
          <YAxis type="number" domain={[0, 'dataMax']} stroke="#ffffff" />
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <Tooltip />
          <Legend wrapperStyle={{ color: '#ffffff' }} />
          <Bar dataKey="Energy - kWh" fill="#4CAF50" barSize={20} />
          <Bar dataKey="Water - kWh" fill="#2196F3" barSize={20} />
          <Bar dataKey="Steam - kg" fill="#FFC107" barSize={20} />
          <Bar dataKey="Gas - kWh" fill="#E91E63" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UtilityConsumptionChart;
