import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { startOfMonth, endOfMonth, setHours, setMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const MyComponent = () => {
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());

  const [state, setState] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    },
  ]);

  const [selectedRange, setSelectedRange] = useState(
    `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
  );
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleSelect = (ranges) => {
    const selectedStartDate = ranges.selection.startDate;
    const selectedEndDate = ranges.selection.endDate;

    const startTimeParts = startTime.split(':');
    const endTimeParts = endTime.split(':');

    const updatedStartDate = setMinutes(
      setHours(selectedStartDate, parseInt(startTimeParts[0])),
      parseInt(startTimeParts[1])
    );
    const updatedEndDate = setMinutes(
      setHours(selectedEndDate, parseInt(endTimeParts[0])),
      parseInt(endTimeParts[1])
    );

    setState([
      {
        startDate: updatedStartDate,
        endDate: updatedEndDate,
        key: 'selection',
      },
    ]);
    setSelectedRange(
      `${updatedStartDate.toLocaleString()} - ${updatedEndDate.toLocaleString()}`
    );
  };

  const handleTimeChange = (e, type) => {
    const updatedTime = e.target.value;

    if (type === 'start') {
      setStartTime(updatedTime);
    } else {
      setEndTime(updatedTime);
    }

    // Update the selected range with new time if already selecting a date range
    if (state[0].startDate && state[0].endDate) {
      const startTimeParts = updatedTime.split(':');
      const endTimeParts = updatedTime.split(':');

      const updatedStartDate = setMinutes(
        setHours(state[0].startDate, parseInt(startTimeParts[0])),
        parseInt(startTimeParts[1])
      );
      const updatedEndDate = setMinutes(
        setHours(state[0].endDate, parseInt(endTimeParts[0])),
        parseInt(endTimeParts[1])
      );

      setState([
        {
          startDate: updatedStartDate,
          endDate: updatedEndDate,
          key: 'selection',
        },
      ]);
      setSelectedRange(
        `${updatedStartDate.toLocaleString()} - ${updatedEndDate.toLocaleString()}`
      );
    }
  };

  const handleApply = () => {
    setIsCalendarVisible(false); // Hide calendar after applying the selection

    const startTimeParts = startTime.split(':');
    const endTimeParts = endTime.split(':');

    const updatedStartDate = setMinutes(
      setHours(state[0].startDate, parseInt(startTimeParts[0])),
      parseInt(startTimeParts[1])
    );
    const updatedEndDate = setMinutes(
      setHours(state[0].endDate, parseInt(endTimeParts[0])),
      parseInt(endTimeParts[1])
    );

    setState([
      {
        startDate: updatedStartDate,
        endDate: updatedEndDate,
        key: 'selection',
      },
    ]);
  };

  const handleCancel = () => {
    setIsCalendarVisible(false); // Hide calendar without saving changes
    setState([
      {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      },
    ]);
    setStartTime('00:00');
    setEndTime('23:59');
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <div className="text-black ml-auto mr-4 p-2">
          <p
            onClick={() => setIsCalendarVisible(true)}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            {selectedRange}
          </p>
        </div>
      </div>

      {isCalendarVisible && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
          <div className="relative bg-white shadow-lg rounded-lg p-6 w-70 max-w-8xl">
            <button
              onClick={handleCancel}
              className="absolute top-[-15px] right-[-15px] text-white text-2xl w-8 h-8 flex items-center justify-center bg-red-500 rounded-full"
            >
              &times;
            </button>
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              locale={enUS}
              editableDateInputs={true}
              dateFormat="yyyy/MM/dd"
            />
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleTimeChange(e, 'start')}
                  className="ml-2 p-1 border rounded text-black"
                />
              </div>
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => handleTimeChange(e, 'end')}
                  className="ml-2 p-1 border rounded text-black"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Apply
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
