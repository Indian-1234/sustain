import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";

const AnomalyDetectionChart = () => {
  const [grain, setGrain] = useState("1 Day");
  const [threshold, setThreshold] = useState(5);
  const [fs, setFS] = useState("FS_33");
  const [kwh, setKWH] = useState("kWh");
  const [gain, setGain] = useState("1 Day");
  const [data, setData] = useState([]);

  // Function to generate data for the last 30 days
  const generateLast30DaysData = () => {
    const today = new Date();
    const newData = [];

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });

      newData.push({
        date: formattedDate,
        forecast: Math.floor(Math.random() * 200) + 100,
        actual: Math.floor(Math.random() * 200) + 100,
        anomaly: Math.floor(Math.random() * 20),
        negativeAnomaly: Math.floor(Math.random() * 20),
      });
    }
    return newData;
  };

  useEffect(() => {
    const last30DaysData = generateLast30DaysData();
    setData(last30DaysData);
  }, []);

  // Chart configuration
  const chartOptions = {
    theme: {
      palette: {
        fills: ["#FFCA28", "#6F8FAF", "#FF4D4D", "#00FF7F"],
        strokes: ["#FFCA28", "#6F8FAF", "#FF4D4D", "#00FF7F"],
      },
    },
    data,
    title: { text: "Anomaly Detection", color: "white" },
    series: [
      { type: "bar", xKey: "date", yKey: "forecast", yName: "Forecast", stacked: true },
      { type: "bar", xKey: "date", yKey: "actual", yName: "Actual", stacked: true },
      { type: "bar", xKey: "date", yKey: "anomaly", yName: "Anomaly", stacked: true },
      { type: "bar", xKey: "date", yKey: "negativeAnomaly", yName: "-ve Anomaly", stacked: true },
    ],
    axes: [
      { type: "category", position: "bottom", title: { text: "Date", color: "white" } },
      { type: "number", position: "left", title: { text: "kWh", color: "white" } },
    ],
    background: { fill: "#1F2937" },
    legend: { position: "bottom" },
    height: 370,
    tooltip: { enabled: true }, // Enables tooltips on hover
  };

  const totalActual = data.reduce((sum, d) => sum + d.actual, 0).toFixed(2); // Calculate total Actual Value dynamically

  return (
    <div className="w-full h-[500px] bg-[#1F2937] rounded-lg text-white p-4">
      {/* Dropdowns for Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <div className="flex items-center">
          <label className="mr-2">Grain:</label>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={grain}
            onChange={(e) => setGrain(e.target.value)}
          >
            <option value="1 Day">1 Day</option>
            <option value="1 Week">1 Week</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Threshold:</label>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">FS:</label>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fs}
            onChange={(e) => setFS(e.target.value)}
          >
            <option value="FS_33">FS_33</option>
            <option value="FS_34">FS_34</option>
            <option value="FS_35">FS_35</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">kWh:</label>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={kwh}
            onChange={(e) => setKWH(e.target.value)}
          >
            <option value="kWh">kWh</option>
            <option value="MWh">MWh</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Gain:</label>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gain}
            onChange={(e) => setGain(e.target.value)}
          >
            <option value="1 Day">1 Day</option>
            <option value="1 Week">1 Week</option>
            <option value="1 Month">1 Month</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Actual Value:</label>
          <span className="font-bold">{totalActual} kWh</span>
        </div>
      </div>

      {/* Chart */}
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default AnomalyDetectionChart;
