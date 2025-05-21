import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
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
} from 'chart.js';
import { ch1Data, ch1ChartOptions } from './newstyle';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Gcwater = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('daily'); // Track selected time period
  const [chartData, setChartData] = useState(ch1Data); // Data for the chart
  const [selectedDate, setSelectedDate] = useState('');

  const rows = [
    { id: "", name: '', age: "", job: '', location: '', department: '', status: '' },
  
  ];

  const cards = [
    { id: 1, title: 'Total', content: 'This is the content of card 1.', },
    { id: 2, title: 'Global AHU', content: 'This is the content of card 2.' },
    { id: 3, title: 'Global FCU', content: 'This is the content of card 3.' },
    { id: 4, title: 'Global OT', content: 'This is the content of card 4.' },
  ];

  // Update chart data based on selected time period and date
  const handleTimePeriodChange = (event) => {
    const selectedPeriod = event.target.value;
    setSelectedTimePeriod(selectedPeriod);

    // Reset selected date if not daily
    if (selectedPeriod !== 'daily') {
      setSelectedDate('');
    }

    if (selectedPeriod === 'daily' && selectedDate) {
      const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
      setChartData({
        ...ch1Data,
        labels: Array.from({ length: 24 }, (_, index) => `${index + 1}:00`),
        datasets: [
          {
            ...ch1Data.datasets[0],
            label: `Data on ${formattedDate}`,
            data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)), // Replace with real data
          },
        ],
      });
    } else if (selectedPeriod === 'weekly') {
      setChartData({
        ...ch1Data,
        labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'],
        datasets: [
          {
            ...ch1Data.datasets[0],
            label: 'Weekly Data',
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)), // Replace with real data
          },
        ],
      });
    } else if (selectedPeriod === 'monthly') {
      setChartData({
        ...ch1Data,
        labels: Array.from({ length: 30 }, (_, index) => (index + 1).toString()),
        datasets: [
          {
            ...ch1Data.datasets[0],
            label: 'Monthly Data',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), // Replace with real data
          },
        ],
      });
    }
  };

  // Update chart data when date changes (only for daily)
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    if (newDate) {
      const formattedDate = new Date(newDate).toLocaleDateString('en-GB');
      setChartData({
        ...ch1Data,
        labels: Array.from({ length: 24 }, (_, index) => `${index + 1}:00`),
        datasets: [
          {
            ...ch1Data.datasets[0],
            label: `Data on ${formattedDate}`,
            data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)), // Replace with real data
          },
        ],
      });
    }
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(searchText.toLowerCase()))
  );

const columns = [
  { field: 'Date', headerName: 'Date', headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'Time', headerName: 'Time', headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'Total', headerName: 'Total', headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'CH1', headerName: 'Global AHU', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'CH2', headerName: 'Global FCU', headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'CH3', headerName: 'Global OT', headerAlign: 'center', align: 'center', flex: 1 },
];


  return (
    <div className="min-h-screen bg-[#2C2A3C] p-1 font-sans">
      <header className="mb-4 p-5 h-[20px] bg-[#242038] border-[1px] border-[#6B7280] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-sm font-semibold ml-5 text-white">  ❄️ Global Chilled Water Consumption</h1>

        {/* Dropdown for daily, weekly, and monthly */}
        <div className="flex justify-end items-center space-x-2">
          <select
            value={selectedTimePeriod}
            onChange={handleTimePeriodChange}
            className="bg-[#242038] hover:bg-[#2C2A3C] hover:text-white border border-[#49583C] text-white px-2 py-2 rounded-lg transition text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {/* Date picker shown only if daily is selected */}
          {selectedTimePeriod === 'daily' && (
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-[#242038] hover:bg-[#2C2A3C] hover:text-white border border-[#49583C] text-white px-2 py-2 rounded-lg transition text-sm"
            />
          )}
        </div>
      </header>

      <Box className="p-4 m-5 rounded-sm shadow-lg">
        {/* DataGrid Container */}
        <Box sx={{ maxHeight: 450, border: '1px solid', mb: 2 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableSelectionOnClick
            checkboxSelection
            disableColumnReorder
            disableColumnResize
            rowHeight={40}
            autoHeight
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sortingOrder={['asc', 'desc']}
           sx={{
  backgroundColor: '#242038',
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    fontSize: '17px',
    fontWeight: 'bold',
    backgroundColor: '#1D1A2F',
    color: 'white',
    minHeight: '40px',
    borderBottom: '2px solid #363252',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#1D1A2F',
    color: 'white',
    borderBottom: '2px solid #363252',
  },
  '& .MuiDataGrid-cell': {
    borderRight: '1px solid #363252',
    color: 'white',
  },
  
  // Footer container styling
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#1D1A2F',
    color: 'white',
    fontSize: '14px',
    borderTop: '1px solid #363252',
    '& .MuiTablePagination-root': {
      color: 'white',             // general pagination text color
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      color: 'white',             // "Rows per page" label and "1–1 of 1"
    },
    '& .MuiInputBase-root': {
      color: 'white',             // dropdown text color
      '& svg': {
        color: 'white',           // dropdown arrow icon
      },
      '& .MuiSelect-icon': {
        color: 'white',
      },
    },
  },
    '& .MuiDataGrid-virtualScroller': {
    overflowX: 'hidden', // prevent internal scroller from horizontal scroll
  },

  // Toolbar quick filter
  '& .MuiDataGrid-toolbarQuickFilter': {
    backgroundColor: '#1E1E2F',
    borderRadius: '6px',
    padding: '2px 8px',
    color: 'white',
    border: '1px solid #69707D',
    '& input': {
      color: 'white',
      backgroundColor: '#1E1E2F',
      padding: '6px 10px',
      '&::placeholder': {
        color: '#888888',
      },
    },
    '& .MuiSvgIcon-root': {
      color: 'grey',
    },
  },

  // Toolbar icon buttons (filter, density, export)
  '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root': {
    color: 'white !important',  // toolbar button icons white
  },
  '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root:hover': {
    color: 'white !important',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root svg': {
    color: 'white',
  },
  '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root.Mui-checked svg': {
    color: 'white',
  },
  '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root.MuiCheckbox-indeterminate svg': {
    color: 'white',
  },
  '& .MuiCheckbox-root': {
    color: 'white !important',
  },

  '& .MuiDataGrid-row': {
    backgroundColor: '#242038',
  },
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#242038',
  },
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: '#353155',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#363252 !important',
    color: '#ffffff',
    cursor: 'pointer',
    '& .MuiDataGrid-cell': {
      color: 'white',
    },
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: '#2D2A45',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2D2A45',
    },
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiTooltip-tooltip': {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
    '& .MuiTablePagination-actions button': {
    color: 'white !important',  // buttons for arrows
  },
  '& .MuiTablePagination-actions button svg': {
    color: 'white !important',  // the SVG icons inside those buttons
  },
    '& .MuiDataGrid-menuIcon': {
    color: 'white !important',
  },
    '& .MuiMenu-paper': {
    backgroundColor: '#1D1A2F !important',  // dark background
    color: 'white !important',              // white text
  },

  '& .MuiMenu-list': {
    backgroundColor: '#1D1A2F !important',  // keep list background consistent
    color: 'white !important',              // white text in list items
  },

    '& .MuiDataGrid-menuIcon, & .MuiDataGrid-menuIcon svg': {
    color: 'white !important',
  },

  // Also target the button that contains the icon
  '& .MuiDataGrid-iconButtonContainer .MuiSvgIcon-root': {
    color: 'white !important',
  },
  // Also add these for any icon buttons in headers
    '& .MuiMenuItem-root': {
    color: 'white !important',              // white text for each menu item
    '&:hover': {
      backgroundColor: '#363252 !important', // highlight color on hover
    },
  },
}}

          />
        </Box>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
  {cards.map((card, index) => {
    const lineColors = ['#FF7F50', '#1E90FF', '#32CD32', '#FFD700', '#FF69B4', '#8A2BE2'];
    const lineColor = lineColors[index % lineColors.length]; // Loop colors if more cards

    // Create a copy of chartData with different borderColor
    const dynamicChartData = {
      ...chartData,
      datasets: chartData.datasets.map(dataset => ({
        ...dataset,
        borderColor: lineColor,
        backgroundColor: lineColor,
      })),
    };

    return (
      <Link
        key={card.id}
        to={card.link}
        className="bg-[#242038] border border-[#69707D] shadow-lg rounded-xl p-6 block hover:shadow-xl transition-all"
      >
        <h2 className="text-sm text-center text-gray-300 font-semibold mb-2">{card.title}</h2>
        {/* Use dynamicChartData here so the chart updates */}
        <Line data={dynamicChartData} options={ch1ChartOptions} />
      </Link>
    );
  })}
</div>


      </Box>
    </div>
  );
};

export default Gcwater;
