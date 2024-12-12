import { MaterialReactTable } from 'material-react-table';
import React, { useState, useMemo } from 'react';
import { FaEnvelope, FaRegCommentDots, FaCheckCircle, FaTimesCircle, FaPause, FaTrashAlt } from 'react-icons/fa';

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
        <div style={{ display: 'flex', gap: '8px' }}>
          <FaCheckCircle onClick={() => handleEnable(row.original)} style={{ cursor: 'pointer', color: '#4CAF50' }} />
          <FaTimesCircle onClick={() => handleDisable(row.original)} style={{ cursor: 'pointer', color: '#F44336' }} />
          <FaPause onClick={() => handlePause(row.original)} style={{ cursor: 'pointer', color: '#FFEB3B' }} />
          <FaTrashAlt onClick={() => handleDelete(row.original)} style={{ cursor: 'pointer', color: '#9E9E9E' }} />
        </div>
      ),
      size: 200,
    },
  ], [data]);

  return (
    <div className="flex-1 ml-20 p-6 overflow-y-auto">      {/* Title Section */}
      <h1 style={{ textAlign: 'center', marginBottom: '20px',fontSize:"30px" }}>Report List</h1>
      
      {/* MaterialReactTable */}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
      />
    </div>
  );
};

export default DataTable;
