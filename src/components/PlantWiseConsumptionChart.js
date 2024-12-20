import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    date: 'Dec 01',
    'Mumbai - kWh': 14.5,
    'Banglore - kWh': 7.3,
    'London - kg': 2.6,
  },
  {
    date: 'Dec 02',
    'Mumbai - kWh': 15.8,
    'Banglore - kWh': 7.9,
    'London - kg': 2.3,
  },
  {
    date: 'Dec 03',
    'Mumbai - kWh': 16.4,
    'Banglore - kWh': 8.2,
    'London - kg': 2.7,
  },
  {
    date: 'Dec 04',
    'Mumbai - kWh': 15.2,
    'Banglore - kWh': 8.0,
    'London - kg': 2.0,
  },
  {
    date: 'Dec 05',
    'Mumbai - kWh': 16.9,
    'Banglore - kWh': 8.7,
    'London - kg': 1.8,
  },
  {
    date: 'Dec 06',
    'Mumbai - kWh': 14.9,
    'Banglore - kWh': 7.8,
    'London - kg': 2.2,
  },
  {
    date: 'Dec 07',
    'Mumbai - kWh': 16.1,
    'Banglore - kWh': 8.5,
    'London - kg': 1.9,
  },
];


const PlantWiseConsumptionChart = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-4 border border-gray-500">
      <h2 className="text-lg font-bold text-white mb-6">
        Site Wise Consumption Trend
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#ffffff" />
          <YAxis type="number" domain={[0, 'dataMax']} stroke="#ffffff" />
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <Tooltip />
          <Legend wrapperStyle={{ color: '#ffffff' }} />
          <Bar dataKey="Mumbai - kWh" fill="#4CAF50" barSize={20} />
          <Bar dataKey="Banglore - kWh" fill="#2196F3" barSize={20} />
          <Bar dataKey="London - kg" fill="#FFC107" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantWiseConsumptionChart;
