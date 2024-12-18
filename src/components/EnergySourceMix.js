import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function EnergySourceMix({ data1 }) {
  const data = {
    labels: ['DG', 'EB', 'Solar'],
    datasets: [
      {
        label: 'Energy Source Mix',
        data: [33, 47, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height and width
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // Ensure legend text is visible
        },
      },
      // title: {
      //   display: true,
      //   text: 'Energy Source Mix',
      //   color: '#FFFFFF', // Ensure title text is visible
      // },
    },
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6">
      {/* Component Title */}
      <h3 className="text-lg font-semibold mb-4">{data1}</h3>

      {/* Chart with controlled size */}
      <div className="h-40">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default EnergySourceMix;
