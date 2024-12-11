import React from "react";
import MapComponent from "./components/MapComponent";
import EnergySourceMix from "./components/EnergySourceMix";
import EnergyContribution from "./components/EnergyContribution";
import ScopeWiseCOE from "./components/ScopeWiseCOE";
import MonthlyConsumption from "./components/MonthlyConsumption";
import EnergyConsumptionCostCard from "./components/EnergyConsumptionCostCard";
import EnergyLoadCard from "./components/EnergyLoadCard";
import UtilityConsumptionChart from "./components/chartanalysys";
import PlantWiseConsumptionChart from "./components/PlantWiseConsumptionChart";
import Sidebar from "./components/CustomSidebar";
import Example from "./components/DataGridTable.tsx";

function Apps() {
  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white">
      <div
        className="bg-gray-800 h-screen w-16 fixed top-0 left-0 z-50" // Use fixed positioning and z-50
      >
        <Sidebar />
      </div>

      <div className="flex-1 ml-20 p-6 overflow-y-auto"> {/* Added left margin for the sidebar */}
        <MapComponent />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <EnergyLoadCard />
            <EnergyConsumptionCostCard />
            <EnergySourceMix />
          </div>

          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <EnergyContribution />
            <ScopeWiseCOE />
            <MonthlyConsumption />
          </div>
        </div>
        <UtilityConsumptionChart />
        <PlantWiseConsumptionChart />
      </div>
    </div>
  );
}

export default Apps;
