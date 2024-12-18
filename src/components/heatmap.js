import React, { useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import 'ag-charts-enterprise';

const getData = () => {
  const data = [];
  const endDate = new Date(); // Current date
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30); // Go back 30 days

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    for (let hour = 0; hour < 24; hour++) {
      data.push({
        date: d.toISOString().split('T')[0],
        displayDate: `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`,
        dayNumber: d.getDate(),
        time: `${hour.toString().padStart(2, '0')}:00`,
        consumption: Math.floor(Math.random() * (1200 - 800 + 1) + 800),
      });
    }
  }
  return data;
};

const filterDatesByGap = (data, gap) => {
  const seenDates = new Set();
  return data.filter((item) => {
    const date = new Date(item.date);
    const dayOffset = date.getDate();
    if (dayOffset % gap === 1 && !seenDates.has(item.date)) {
      seenDates.add(item.date);
      return true;
    }
    return false;
  });
};

const ChartExample = () => {
  const rawData = getData();
  const filteredDates = filterDatesByGap(rawData, 4);

  const [options] = useState({
    title: {
      text: 'Energy Consumption View (Every 4th Day)',
      color: '#ffffff', // Title text color set to white
    },
    background: {
      fill: '#1F2937', // Set background color to dark gray
    },
    data: rawData,
    series: [
      {
        type: 'heatmap',
        xKey: 'time',
        xName: 'Time',
        yKey: 'date',
        yName: 'Date',
        colorKey: 'consumption',
        colorName: 'Energy Consumption (kWh)',
        label: {
          enabled: false,
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Time', color: '#ffffff' }, // X-axis title text color set to white
        label: {
          color: '#ffffff', // X-axis label color set to white
          rotation: 0,
        },
      },
      {
        type: 'category',
        position: 'left',
        title: { text: 'Date', color: '#ffffff' }, // Y-axis title text color set to white
        label: {
          color: '#ffffff', // Y-axis label color set to white
          formatter: ({ value }) => {
            const match = filteredDates.find((d) => d.date === value);
            return match
              ? `${match.dayNumber} ${match.displayDate.split(' ')[1]}`
              : '';
          },
        },
      },
    ],
    color: {
      scheme: 'interpolateCool',
      key: 'consumption',
      range: ['#ffffff', '#ff0066'], // Gradient colors
    },
    height: 600,
  });

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden' }} className='border border-gray-500'>
      <AgCharts options={options} />
    </div>
  );
};

export default ChartExample;
