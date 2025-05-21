import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ProductionTrendChart = () => {
  const data = [
    { date: 'Nov 16', production: 20.0 },
    { date: 'Nov 19', production: 17.0 },
    { date: 'Nov 22', production: 19.0 },
    { date: 'Nov 25', production: 18.0 },
    { date: 'Nov 28', production: 15.0 },
    { date: 'Dec 01', production: 8.0 },
    { date: 'Dec 04', production: 10.0 },
    { date: 'Dec 07', production: 25.0 },
  ];

  return (
    <div className="w-full h-[250px]">
      {' '}
      {/* Adjusted height */}
      <h3 className="text-lg font-semibold mb-4">Production Trend</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <CartesianGrid strokeDasharray="3 3" stroke="#0B1224" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="production" stroke="#FF4D4D" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionTrendChart;
