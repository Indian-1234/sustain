import React, { useState, useMemo } from 'react';
import { FaCheckCircle, FaTimesCircle, FaPause, FaTrashAlt } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';
import { FaEnvelope, FaRegCommentDots } from 'react-icons/fa6';

type Person = {
  id: number;
  name: string;
  priority: string;
  type: string;
  userList: { mailCount: number, messageCount: number };
};

const initialData: Person[] = [
  {
    id: 11158681,
    name: 'Low PF Alert',
    priority: 'high',
    type: 'user',
    userList: { mailCount: 3, messageCount: 5 },
  },
  {
    id: 11158680,
    name: 'High Load Alert',
    priority: 'high',
    type: 'user',
    userList: { mailCount: 8, messageCount: 2 },
  },
  {
    id: 11158679,
    name: 'Network Latency Alert',
    priority: 'medium',
    type: 'system',
    userList: { mailCount: 2, messageCount: 3 },
  },
];

const DataTable = () => {
  const [data, setData] = useState(initialData);

  // Event Handlers for Actions
  const handleEnable = (row: Person) => {
    console.log('Enable:', row);
  };

  const handleDisable = (row: Person) => {
    console.log('Disable:', row);
  };

  const handlePause = (row: Person) => {
    console.log('Pause:', row);
  };

  const handleDelete = (row: Person) => {
    setData(data.filter((item) => item.id !== row.id));
  };

  const columns = useMemo(() => [
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
      accessorKey: 'priority',
      header: 'Priority',
      size: 100,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      size: 100,
    },
    {
      accessorKey: 'userList',
      header: 'User List',
      size: 150,
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaEnvelope style={{ marginRight: '8px', color: '#007BFF' }} />
          <span>{row.original.userList.mailCount}</span>
          <FaRegCommentDots style={{ marginLeft: '16px', marginRight: '8px', color: '#28A745' }} />
          <span>{row.original.userList.messageCount}</span>
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex gap-3 text-white">
          <FaCheckCircle onClick={() => handleEnable(row.original)} className="cursor-pointer text-green-500 hover:text-green-400" />
          <FaTimesCircle onClick={() => handleDisable(row.original)} className="cursor-pointer text-red-500 hover:text-red-400" />
          <FaPause onClick={() => handlePause(row.original)} className="cursor-pointer text-yellow-500 hover:text-yellow-400" />
          <FaTrashAlt onClick={() => handleDelete(row.original)} className="cursor-pointer text-gray-500 hover:text-gray-400" />
        </div>
      ),
      size: 200,
    },
  ], [data]);

  return (
    <div className="flex-1 ml-20 p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Report List</h1>
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

export default DataTable;
