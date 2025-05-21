import React from "react";
import { Link } from "react-router-dom";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { datanew, optionsnew } from "./newstyle";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// Top Summary Cards (fixed as plain map)
const cards = [
  {
    icon: "❄️",
    title: "Total Chilled Water Flow",
    value: "18 m³/hr",
    link: "/cooling-loa",
  },
  {
    icon: "⚡",
    title: "Total Chiller Power Consumption",
    value: "25 kWh",
    link: "/cooling-load",
  },
  {
    icon: "📊",
    title: "Overall COP",
    value: "1.7 IKW/TR",
    link: "/IKW",
  },
  {
    icon: "⚠️",
    title: "Insights",
    value: "25 kWh",
    link: "/insights",
  },
];

// Bottom Trend Cards
const trendCards = [
  {
    icon: "❄️",
    title: "Global Chilled Water Consumption",
    value: "18 m³/hr",
    link: "/Gcwater",
  },
  {
    icon: "⚡",
    title: "Global Power Consumption For Chilled Water",
    link: "/Gcpower",
    value: "250 kW",
  },
    {
    icon: "💧",
    title: "SIMS Chilled Water Consumption",
    value: "500 m³/hr",
    link: "/cwater",
  },
  {
    icon: "⚡",
    title: "SIMS Power Consumption For Chilled Water",
    value: "250 kW",
    link: "/sims",
  },
];

// Bottom Total Cards
const totalcard = [ 
  {
    icon: "❄️",
    title: "Total Chilled Water Flow",
    description: "24m³/hr",
    value: "24m³/hr",
    link: "/cooling-loa",
  },
  {
    icon: "⚡",
    title: "Total Chilled Power Consumption",
    description: "34kwh",
    value: "34kwh",
    link: "/cooling-load",
  },
  {
    icon: "💧",
    title: "SIMS Chilled Water Consumption",
    description: "87m³/hr",
    value: "87kwh",
    link: "/Cwater",
  },
  {
    icon: "⚡",
    title: "SIMS Power Consumption For Chilled Water",
    description: "45m³/hr",
    value: "45kwh",
    link: "/sims",
  },
  {
    icon: "❄️",
    title: "Global Chilled Water Consumption",
    description: "23m³/hr",
    value: "23kwh",
    link: "/Gcwater",
  },
  {
    icon: "⚡",
    title: "Global Power Consumption For Chilled Water",
    description: "34kwh",
    value: "34kwh",
    link: "/Gcpower",
  },
];

const borderColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#14b8a6', // teal
  '#ec4899', // pink
];
const Monitoring = () => {
  return (
    <div className="min-h-screen bg-[#2C2A3C] p-4 font-sans">
      {/* Header */}
      <header className="mb-4 bg-[#242038] border-[1px] border-[#6B7280] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-md font-semibold ml-4 text-white">Chiller Monitoring</h1>
        <button className="bg-[#242038] hover:bg-[#B9D742] hover:text-black border border-[#49583C] text-white px-2 py-2 rounded-lg transition text-sm">
          Download Report
        </button>
      </header>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10">
        
        {/* Left Side: Cards Column */}
        <section className="w-full lg:w-[15%] flex flex-col gap-4 items-start">
          {cards.map((card, idx) => (
            <Link to={card.link} key={idx} className="block no-underline text-inherit w-full">
              <div className="bg-[#242038] border-[1px] border-[#6B7280] text-center rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer flex flex-col items-center justify-center h-[94px]">
                
                {/* Icon and Title */}
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 text-lg mr-1">{card.icon}</span>
                  <span className="text-gray-300 text-xs font-semibold">{card.title}</span>
                </div>

                {/* Value */}
           {/* Value (only show if NOT Insights) */}
{card.title !== "Insights" && (
  <p className="font-semibold text-xs text-black text-center tracking-wide leading-relaxed border border-[#747A87] rounded-md px-3 py-1 animate-blink bg-[#7FC616]">
    {card.value}
  </p>
)}

{/* Insights Tooltip (only for Insights card) */}
{card.title === "Insights" && (
  <div className="relative group flex items-center text-sm font-semibold text-gray-300 border border-[#747A87] rounded-md px-3 py-1 bg-[#DC2626] mt-2">
    COP Value
    <div className="ml-1 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M10.29 3.86l-7.42 12.84A1 1 0 003.42 18h17.16a1 1 0 00.86-1.5L14.71 3.86a1 1 0 00-1.72 0z"
        />
      </svg>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-red-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow-lg">
        <div>Warning: COP below optimal level!</div>
        <div>Current value: 2.5 COP (should be &gt; 3.0)</div>
        <div>Action needed: Check system efficiency.</div>
      </div>
    </div>
  </div>
)}

              </div>
            </Link>
          ))}
        </section>

        {/* Center: Chart Image */}
        <div className="w-full lg:w-[70%] flex items-center justify-center">
          <div className="w-full h-[400px] bg-[#242038] border-[1px] border-[#49583C] rounded-[13px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dd8xsavj2/image/upload/v1747818503/Untitled_Diagram.drawio_4_.drawio_14_.drawio_1_.drawio_5_gbovax.svg"
              alt="Diagram"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side: Trend Cards Column */}
        <section className="w-full lg:w-[15%] flex flex-col gap-4 items-start">
  {trendCards.map((card, idx) => (
    <Link to={card.link} key={idx} className="block no-underline text-inherit w-full">
      <div className="bg-[#242038] border-[1px] border-[#6B7280] rounded-md p-4 hover:shadow-lg hover:scale-105 transition-transform flex flex-col items-center justify-center text-center h-[95px]">
        <div className="flex items-center w-full mb-2">
          <span className="text-blue-600 text-lg mr-2">{card.icon}</span>
          <p className="font-semibold text-xs text-gray-300 text-left tracking-wide leading-relaxed flex-grow">
            {card.title}
          </p>
        </div>

        {/* Value comes below the title and icon */}
        <p className=" font-semibold text-xs text-black text-center tracking-wide leading-relaxed border border-[#747A87] rounded-md px-2 animate-blink bg-[#7FC616]">
          {card.value}
        </p>
      </div>
    </Link>
  ))}
</section>

      </div>

      {/* Bottom: Total Cards */}
      <section className="w-full flex flex-wrap justify-start gap-4">
        {totalcard.map((card, idx) => (
          <Link to={card.link} key={idx} className="flex-1 min-w-[300px] max-w-[400px] h-[250px] block no-underline text-inherit">
            <div className="bg-[#242038] border-[1px] border-[#6B7280] rounded-md p-4 hover:shadow-lg flex flex-col items-center justify-center text-center h-full">
              
              {/* Icon, Title, Value */}
              <div className="flex items-center ">
                <span className="text-blue-600 text-lg mr-2">{card.icon}</span>
                <p className="font-semibold text-xs text-gray-300">{card.title}</p>
              </div>
              {/* Chart */}
              {[
                'Total Chilled Water Flow',
                'Total Chilled Power Consumption',
                'SIMS Chilled Water Consumption',
                'SIMS Power Consumption For Chilled Water',
                'Global Chilled Water Consumption',
                'Global Power Consumption For Chilled Water'
              ].includes(card.title) && (
                <div className="mt-4 w-[500px] h-[150px] flex justify-center items-center">
                  <Line options={optionsnew}   data={{
    ...datanew,
    datasets: [
      {
        ...datanew.datasets[0],
        borderColor: borderColors[idx % borderColors.length],
        backgroundColor: 'rgba(16, 185, 129, 0.2)', // you can also make this dynamic if needed
      },
    ],
  }}
  />
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-gray-100 font-semibold p-2 rounded-[10px] bg-[#2C2A3C] border border-[#84C43E] text-center mt-2">
                📈 {card.description}
              </p>

            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Monitoring;
