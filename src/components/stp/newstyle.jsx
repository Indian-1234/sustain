import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Tailwind-style border colors
const borderColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#14b8a6', // teal
  '#ec4899', // pink
];

// Chart 1: Total Power Usage
export const datanew = {
  labels: Array.from({ length: 24 }, (_, index) => `${index + 1}`),
  datasets: [
    {
      label: [[80, 100, 90, 110, 105, 95, 115]],
      data: [120, 150, 130, 160, 170, 140, 180],
      backgroundColor: 'rgba(16, 185, 129, 0.2)', // green-500 fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};

export const optionsnew = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'kWh',
        color: 'white',
      },
      ticks: {
        color: 'white',
        font: {
          size: 5,             // 👈 smaller font size here (you can set 8, 10, 12 etc.)
        },
        autoSkip: false,
      },
      grid: {
        drawBorder: false,
        drawOnChartArea: false,
      },
      border: {
        color: '#6B7280',
        width: 1,
      },
    },
    x: {
      title: {
        display: false,
        color: 'white',
      },
      ticks: {
        color: 'white',
        maxRotation: 45,
        minRotation: 45,
        // autoSkip: false,
        font: {
          size: 10,             // 👈 smaller font size here (you can set 8, 10, 12 etc.)
        },
        align: 'center',
      },
      grid: {
        display: false,
        drawBorder: true,
        drawOnChartArea: false,
      },
      border: {
        color: '#6B7280',
        width: 1,
      },
    },
  },
};

// Chart 2: Chilled Water Flow
export const secondChartData = {
  labels: datanew.labels,
  datasets: [
    {
      label: Array.from({ length: 24 }, (_, index) => `${index + 1}`),
      data: [80, 100, 90, 110, 105, 95, 115],
      borderColor: borderColors[0], // blue
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};

export const secondChartOptions = { ...optionsnew };

// Chart 3: CH1
export const ch1Data = {
  labels: datanew.labels,
  datasets: [
    {
      label: 'Chilled Water Flow (L/h)',
      data: [80, 100, 90, 110, 105, 95, 115],
      borderColor: borderColors[1], // green
      backgroundColor: 'rgba(16, 185, 129, 0.2)', // green fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};
export const ch1ChartOptions = { ...optionsnew };

// Chart 4: CH2
export const ch2Data = {
  labels: datanew.labels,
  datasets: [
    {
      label: 'Chilled Water Flow (L/h)',
      data: [80, 100, 90, 110, 105, 95, 115],
      borderColor: borderColors[5], // teal
      backgroundColor: 'rgba(20, 184, 166, 0.2)', // teal fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};
export const ch2ChartOptions = { ...optionsnew };

// Chart 5: CH3
export const ch3Data = {
  labels: datanew.labels,
  datasets: [
    {
      label: 'Chilled Water Flow (L/h)',
      data: [80, 100, 90, 110, 105, 95, 115],
      borderColor: borderColors[3], // red
      backgroundColor: 'rgba(239, 68, 68, 0.2)', // red fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};
export const ch3ChartOptions = { ...optionsnew };

// Chart 6: CH4
export const ch4Data = {
  labels: datanew.labels,
  datasets: [
    {
      label: 'Chilled Water Flow (L/h)',
      data: [80, 100, 90, 110, 105, 95, 115],
      borderColor: borderColors[0], // blue
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};
export const ch4ChartOptions = { ...optionsnew };

// Chart 7: CH5
export const ch5Data = {
  labels: datanew.labels,
  datasets: [
    {
      label: 'Chilled Water Flow (L/h)',
      data: [80, 100, 90, 110, 105, 95, 115],
      borderColor: borderColors[6], // pink
      backgroundColor: 'rgba(236, 72, 153, 0.2)', // pink fill
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
    },
  ],
};
export const ch5ChartOptions = { ...optionsnew };
