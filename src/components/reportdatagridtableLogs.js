import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt, FaDownload } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';

const initialData = [
  {
    id: '02052403464',
    name: 'Weekly Energy Utilization Report',
    format: 'XLSX',
    deliverySlot: '09 to 10 am',
    frequency: 'Daily',
  },
  {
    id: '02052403463',
    name: 'Monthly Energy Consumption Report',
    format: 'XLSX',
    deliverySlot: '06 to 07 am',
    frequency: 'Daily',
  },
  {
    id: '29112303267',
    name: 'Daily Consumption Report',
    format: 'XLSX',
    deliverySlot: '07 to 08 am',
    frequency: 'Daily',
  },
];

const DataTableLogs = () => {
  const [data, setData] = useState(initialData);

  const handleEdit = (row) => {
    console.log('Edit:', row);
  };

  const handleDelete = (row) => {
    setData(data.filter((item) => item.id !== row.id));
  };

  const handleDownload = (row) => {
    console.log('Download:', row);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'format',
        header: 'Format',
        size: 100,
      },
      {
        accessorKey: 'deliverySlot',
        header: 'Delivery Slot',
        size: 150,
      },
      {
        accessorKey: 'frequency',
        header: 'Frequency',
        size: 100,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex gap-3 text-white">
            <FaEdit
              onClick={() => handleEdit(row.original)}
              className="cursor-pointer text-green-500 hover:text-green-400"
            />
            <FaTrashAlt
              onClick={() => handleDelete(row.original)}
              className="cursor-pointer text-red-500 hover:text-red-400"
            />
            <FaDownload
              onClick={() => handleDownload(row.original)}
              className="cursor-pointer text-blue-500 hover:text-blue-400"
            />
          </div>
        ),
        size: 150,
      },
    ],
    [data]
  );

  return (
    <div className="flex-1 ml-20 p-6 overflow-y-auto">
      {' '}
      {/* Title Section */}
      {/* Title Section */}
      <h1 className="text-2xl font-bold mb-4 text-center">Report Logs</h1>
      <input
        type="text"
        placeholder="Search by Name"
        className="w-full mb-6 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          const searchValue = e.target.value.toLowerCase();
          setData(
            initialData.filter((item) =>
              item.name.toLowerCase().includes(searchValue)
            )
          );
        }}
      />
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        muiTableBodyCellProps={{
          style: {
            backgroundColor: '#1a1a2e',
            color: '#fff',
          },
        }}
        muiTableHeadCellProps={{
          style: {
            backgroundColor: '#162447',
            color: '#fff',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
};

export default DataTableLogs;
