import React, { useState } from "react";

const AddUserForm = () => {
  const [widgets, setWidgets] = useState([{ id: 1 }]);

  const addWidget = () => {
    if (widgets.length < 3) {
      setWidgets([...widgets, { id: widgets.length + 1 }]);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Adding User</h1>
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">First Name*</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Last Name*</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Assign Roles*</label>
            <select className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none">
              <option>Select Roles</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email*</label>
            <input
              type="email"
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Phone*</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Enter phone"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Timezone*</label>
            <select className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none">
              <option>Select Timezone</option>
            </select>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium">Is Guest</label>
        </div>

        {/* Dynamic Widgets */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Clone Widget (Optional)</h2>
          {widgets.map((widget, index) => (
            <div key={widget.id} className="flex items-center gap-4 mb-4">
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white focus:outline-none">
                <option>Select User</option>
              </select>
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white focus:outline-none">
                <option>Select Dashboard</option>
              </select>
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white focus:outline-none">
                <option>Select Widget</option>
              </select>
            </div>
          ))}

          {widgets.length < 3 && (
            <button
              onClick={addWidget}
              className="w-10 h-10 flex justify-center items-center text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
            >
              +
            </button>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-4">
  {/* Cancel Button */}
  <button
    onClick={() => window.history.back()} // Navigate back to the previous page
    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
  >
    Cancel
  </button>

  <button
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
  >
    Save
  </button>
</div>

      </div>
    </div>
    
  );
};

export default AddUserForm;
