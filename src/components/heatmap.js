import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";  // Correct import
import "ag-charts-enterprise"; // Required for heatmap and other enterprise chart features
import getData from "./data"; // Ensure you have your data in a file called 'data.js'

const EnergyConsumptionHeatmap = () => {
  // Chart options
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: "UK Monthly Mean Temperature (°C)",
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Month" },
      },
      {
        type: "category",
        position: "left",
        title: { text: "Year" },
      },
    ],
    series: [
      {
        type: "heatmap",
        xKey: "month",
        xName: "Month",
        yKey: "year",
        yName: "Year",
        colorKey: "temperature",
        colorName: "Temperature",
        label: {
          enabled: true,
          formatter: ({ datum, colorKey = "" }) => {
            const value = datum[colorKey];
            return `${value.toFixed(0)}°C`;
          },
        },
        colorScale: {
          stops: [
            { value: 4, color: "#313695" },
            { value: 10, color: "#74add1" },
            { value: 15, color: "#fee090" },
            { value: 20, color: "#f46d43" },
          ],
        },
      },
    ],
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-4" style={{ height: '100%', width: '100%' }}>
      <div style={{ height: '100%', width: '100%' }}>
        <AgCharts options={options} /> {/* Correct usage of AgCharts */}
      </div>
    </div>
  );
};

export default EnergyConsumptionHeatmap;
