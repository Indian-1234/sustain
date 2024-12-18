import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function EnergyContribution({ data1 }) {
  const data = {
    labels: ['Bangalore', 'London', 'Mumbai'],
    datasets: [
      {
        data: [37, 53, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // Ensures text is visible
        },
      },
      //   title: {
      //     display: true,
      //     text: "Energy Consumption Contribution",
      //     color: "#FFFFFF",
      //   },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 h-64 border border-gray-500">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4">{data1}</h3>

      {/* Chart Container */}
      <div className="h-40">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default EnergyContribution;
