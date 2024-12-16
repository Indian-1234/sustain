// HomePage.js (Dynamic Page)
import React from "react";
import MapComponent from "./MapComponent";
import EnergyLoadCard from "./EnergyLoadCard";
import EnergyConsumptionCostCard from "./EnergyConsumptionCostCard";
import EnergySourceMix from "./EnergySourceMix";
import EnergyContribution from "./EnergyContribution";
import ScopeWiseCOE from "./ScopeWiseCOE";
import MonthlyConsumption from "./MonthlyConsumption";
import UtilityConsumptionChart from "./chartanalysys";
import PlantWiseConsumptionChart from "./PlantWiseConsumptionChart";
import MyComponent from "./dates/reactdateselect";

const HomePage = () => {
  return (
    <div className="flex-1 ml-24 p-6 overflow-y-auto"> {/* Added left margin for the sidebar */}
    <MyComponent/>
    <MapComponent />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <EnergyLoadCard />
        <EnergyConsumptionCostCard />
        <EnergySourceMix data1={"Energy Source Mix"}/>
      </div>

      <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <EnergyContribution data1={"Energy Consumption Contribution"}/>
          <ScopeWiseCOE co2={"Scope Wise CO₂e"} />
        <MonthlyConsumption data={"Portfolio Monthly Consumption"}/>
      </div>
    </div>
    <UtilityConsumptionChart data1={"Utility Consumption (Daily)"}/>
    <PlantWiseConsumptionChart />
  </div>
  );
};

export default HomePage;
