import React from "react";
import MonthlyConsumption from "../MonthlyConsumption";
import EnergyLoadCard from "../EnergyLoadCard";
import EnergyContribution from "../EnergyContribution";
import fullimage from "../../assets/energy.webp";
import { useLocation, useParams } from "react-router-dom";
import UtilityConsumptionChart from "../chartanalysys";
import EnergyConsumptionHeatmap from "../heatmap";
import { AgCharts } from "ag-charts-react";
import AnomalyDetectionChart from "../anomallychart";
import ScopeWiseCOE from "../ScopeWiseCOE";
import ProductionTrendChart from "./production";

const PlantDashboard = () => {
  const { item } = useParams();
  const location = useLocation(); // Access location object

  const plantName = location.state?.name;

  return (
    <div className="flex-1 ml-24 p-6  bg-grey-700">
      {/* Header */}
      <div className="text-xl font-bold mb-4">{plantName}</div>

      {/* Scrollable Grid Layout */}
      <div className="overflow-x-auto overflow-y-auto h-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-6 h-[calc(100%-50px)]">
          {/* Image Section - Full Height, First Column */}
          <div className="row-span-2 bg-[#1F2937] rounded-lg p-4 flex flex-col shadow-lg">
            <div className="text-lg font-semibold text-white mb-4">Facility Overview</div>
            <div className="flex-grow overflow-hidden rounded-lg">
              <img
                src={fullimage}
                alt="Facility"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              Facility Image - Last Updated: Dec 13, 2024
            </div>
          </div>

          {/* First Row, Second Column */}
          <div className="bg-[#1F2937] rounded-lg shadow-lg p-4">
            <MonthlyConsumption data={"Today's Plant Consumption"} />
            <div className="text-xs text-gray-400 mt-2 text-right">
              Dec 13, 2024 00:00 - Dec 13, 2024 23:59
            </div>
          </div>

          {/* First Row, Third Column */}
          <div className="bg-[#1F2937] rounded-lg shadow-lg p-4">
            <MonthlyConsumption data={"Monthly Plant Consumption"} />
            <div className="text-xs text-gray-400 mt-2 text-right">
              Nov 13, 2024 00:00 - Dec 13, 2024 23:59
            </div>
          </div>

          {/* Second Row, Second Column */}
          <div className="bg-[#1F2937] rounded-lg shadow-lg p-4">
            <EnergyLoadCard />
            <div className="text-xs text-gray-400 mt-2 text-right">
              Nov 13, 2024 00:00 - Dec 13, 2024 23:59
            </div>
          </div>

          {/* Second Row, Third Column */}
          <div className="bg-[#1F2937] rounded-lg shadow-lg p-4">
            <EnergyContribution data1={"Energy Consumption Distribution"} />
            <div className="text-xs text-gray-400 mt-2 text-right">
              Dec 13, 2024 00:00 - Dec 13, 2024 23:59
            </div>
          </div>
        </div>
      </div>

      {/* Utility Consumption Chart */}
      <UtilityConsumptionChart data1={"Utility Consumption Trend"} />
      <div className="mt-4 rounded-lg">
      <EnergyConsumptionHeatmap/>
      </div>
      <div className="mt-4 rounded-lg">
      <AnomalyDetectionChart/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* ScopeWiseCOE component */}
        <div className="w-full h-auto bg-[#1F2937] rounded-lg p-4">
          <ScopeWiseCOE co2={"HT & LT Overview"} />
        </div>

        {/* AnomalyDetectionChart component */}
        <div className="w-full h-auto bg-[#1F2937] rounded-lg p-4">
        <ProductionTrendChart data1={"Energy Consumption Contribution"} />
        </div>

        {/* EnergyContribution component */}
        <div className="w-full h-auto bg-[#1F2937] rounded-lg p-4">
          <EnergyContribution data1={"Scope Wise CO₂e%"} />
        </div>
      </div>

    </div>
  );
};

export default PlantDashboard;
