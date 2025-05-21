// import React from "react";
// import { FaEllipsisV, FaPlus, FaSort } from "react-icons/fa";

// const Operrationaldash: React.FC = () => {
//   return (
//     <div className="bg-[#081B33] text-white w-64 h-screen p-4">
//       {/* Title Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-lg font-semibold">Dashboard</h1>
//         <FaSort className="text-gray-400 cursor-pointer" />
//       </div>

//       {/* Dashboard List */}
//       <div className="space-y-4">
//         {["Portfolio Summary", "Mumbai Plant", "Banglore Plant", "London Plant", "Asset Insights"].map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center justify-between px-4 py-2 rounded-md ${
//               item === "Mumbai Plant" ? "bg-blue-700" : "bg-blue-900"
//             } cursor-pointer hover:bg-blue-700`}
//           >
//             <span className="text-sm">{item}</span>
//             {item === "Mumbai Plant" && <FaEllipsisV className="text-gray-400" />}
//           </div>
//         ))}
//       </div>

//       {/* Add Dashboard Section */}
//       <div className="mt-6">
//         <button className="flex items-center justify-center gap-2 bg-blue-900 px-4 py-2 rounded-md hover:bg-blue-700 w-full">
//           <FaPlus />
//           <span className="text-sm">Add Dashboard</span>
//         </button>
//         <p className="text-xs text-center text-gray-400 mt-2">1 of 1</p>
//       </div>
//     </div>
//   );
// };

// export default Operrationaldash;
