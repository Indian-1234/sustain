import React, { useState, useMemo, useCallback } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';

const Dashboardassets = () => {
    const navigate = useNavigate();

    const assetItems = [
        "Demo CF Boiler", "Demo S. Boiler", "Demo Gas Boiler", "Demo Oil Boiler", "Demo CT",
        "Demo Steam Boiler", "Demo Water Heater", "Demo Air Compressor", "Demo Generator", "Demo Pump",
        "Demo Fan", "Demo AC", "Demo Chiller", "Demo Heater", "Demo Light",
        "Demo Valve", "Demo Filter", "Demo Tank", "Demo Compressor", "Demo Heat Exchanger"
    ];

    const generateRandomData = () => {
        return assetItems.map((item, index) => {
            const statuses = ['Healthy', 'Warning', 'Critical'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            return {
                id: index,
                name: item,
                location: "Mumbai_Factory",
                status: status,
                critical: Math.floor(Math.random() * 5),
                nonCritical: Math.floor(Math.random() * 10),
                alert: Math.floor(Math.random() * 3)
            };
        });
    };

    const generateLogs = (currentData) => {
        const logTemplates = [
            "{asset} status changed to {status}",
            "{asset} Alert Triggered",
            "{asset} Maintenance Scheduled",
            "{asset} Performance Check Completed",
            "{asset} System Normalized"
        ];

        return currentData.flatMap((asset, index) => {
            const randomLogs = Math.floor(Math.random() * 3) + 1;
            return Array.from({ length: randomLogs }, (_, logIndex) => ({
                id: index * 10 + logIndex,
                event: logTemplates[Math.floor(Math.random() * logTemplates.length)]
                    .replace('{asset}', asset.name)
                    .replace('{status}', asset.status),
                timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString().replace('T', ' ').split('.')[0],
                severity: Math.random() < 0.3 ? 'high' : Math.random() < 0.6 ? 'medium' : 'low'
            }));
        }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
    };

    const [data, setData] = useState(generateRandomData());
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [logs, setLogs] = useState(generateLogs(data));
    const [selectedLogAsset, setSelectedLogAsset] = useState("");

    const handleLogAssetChange = (e) => {
        const selected = e.target.value;
        setSelectedLogAsset(selected);
        // Filter logs based on selected asset
        const filteredLogs = generateLogs(data).filter(log =>
            selected === "" || log.event.includes(selected)
        );
        setLogs(filteredLogs);
    };

    const handleAssetClick = (asset) => {
        const newData = generateRandomData().map(item =>
            item.name === asset.name
                ? { ...item, status: 'Critical', critical: item.critical + 2 }
                : item
        );
        setData(newData);
        setLogs(generateLogs(newData));
        setSelectedAsset(asset);
        setPageIndex(0);
    };

    const handleRefreshData = () => {
        const newData = generateRandomData();
        setData(newData);
        setLogs(generateLogs(newData));
        setSelectedAsset(null);
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Asset Name',
            size: 200,
            Cell: ({ cell }) => (
                <span className={selectedAsset?.name === cell.getValue() ? 'font-bold text-yellow-400' : 'text-white'}>
                    {cell.getValue()}
                </span>
            )
        },
        {
            accessorKey: 'location',
            header: 'Location',
            size: 150,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 100,
            Cell: ({ cell }) => (
                <span className={`font-semibold ${cell.getValue() === 'Healthy' ? 'text-green-500' :
                    cell.getValue() === 'Warning' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {cell.getValue()}
                </span>
            ),
        },
        {
            accessorKey: 'critical',
            header: 'Critical',
            size: 100,
        },
        {
            accessorKey: 'nonCritical',
            header: 'Non-Critical',
            size: 100,
        },
        {
            accessorKey: 'alert',
            header: 'Alert',
            size: 100,
        }
    ], [selectedAsset]);

    const paginatedData = useMemo(() =>
        data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        [data, pageIndex, pageSize]
    );


    return (
        <div className="flex-1 ml-24 p-6 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold text-white">Portfolio Energy Load</h1>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 rounded-lg p-6 flex flex-col items-center justify-center h-full">
                            <h2 className="text-lg font-semibold mb-2">Asset Health</h2>
                            <div className="flex items-center text-4xl font-bold">
                                <span className="text-red-500 mr-2">{data.filter(item => item.status !== 'Healthy').length}</span>
                                <span className="text-white">/ {data.length}</span>
                            </div>
                            <p className="text-gray-400 mt-2">Assets are unhealthy</p>
                        </div>

                        <div className="bg-slate-800 rounded-lg p-6 flex flex-col items-center justify-center h-full">
                            <h2 className="text-lg font-semibold mb-2">Asset Insights</h2>
                            <div className="text-4xl font-bold text-blue-400">
                                {data.reduce((sum, item) => sum + item.critical, 0)}
                            </div>
                            <p className="text-gray-400 mt-2">Critical insights</p>
                            <p className="text-xs text-gray-500 mt-1">Open critical insights</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Asset Details</h2>
                        <select
                            className="w-full p-2 bg-slate-700 text-white rounded-md focus:outline-none mb-4"
                            onChange={(e) => {
                                const selectedAssetName = e.target.value;
                                const asset = data.find(item => item.name === selectedAssetName);
                                if (asset) {
                                    handleAssetClick(asset);
                                }
                            }}
                        >
                            <option>Select Asset</option>
                            {assetItems.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <div className="col-span-3">
                            <MaterialReactTable
                                columns={columns}
                                data={paginatedData}
                                enableRowSelection
                                muiTableBodyCellProps={{
                                    style: {
                                        backgroundColor: '#1a1a2e',
                                        color: '#fff',
                                        padding: '6px 12px',
                                        fontSize: '12px',
                                    },
                                }}
                                muiTableHeadCellProps={{
                                    style: {
                                        backgroundColor: '#162447',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: '6px 12px',
                                        fontSize: '12px',
                                    },
                                }}
                                muiTableBodyRowProps={({ row }) => ({
                                    onClick: () => {
                                        const rowData = row.original || {};
                                        console.log(rowData, "Row Data");
                                        // Use the navigate function to redirect
                                        navigate(`/plant/assets/${rowData.name}`);
                                    },
                                    sx: {
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                        },
                                        backgroundColor: selectedAsset?.name === row.original.name ? 'purple' : '',
                                    },
                                })}
                                
                                pagination
                                paginationDisplayMode="pages"
                                positionToolbarAlertBanner="bottom"
                                muiSearchTextFieldProps={{
                                  size: 'small',
                                  variant: 'outlined',
                                }}
                                muiPaginationProps={{
                                  color: 'secondary',
                                  rowsPerPageOptions: [5,10,20],
                                  shape: 'rounded',
                                  variant: 'outlined',
                                }}
                                initialState= {{
                                    pagination: { pageSize: 5, pageIndex: 0 },
                                    showGlobalFilter: true,
                                  }}
                            />

                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 h-[690px] flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">Asset Event Log</h2>
                    <select
    className="w-full p-2 bg-slate-700 text-white rounded-md focus:outline-none mb-4"
    onChange={(e) => {
        const selectedAssetName = e.target.value;
        const asset = data.find(item => item.name === selectedAssetName);
        if (asset) {
            handleAssetClick(asset);
        }
    }}
>
    <option value="">Select Asset</option>
    {assetItems.map((item, index) => (
        <option key={index} value={item}>{item}</option>
    ))}
</select>

                    <div className="flex-1 overflow-y-auto">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className={`mb-3 p-2 rounded ${log.severity === 'high' ? 'bg-red-800/50' :
                                    log.severity === 'medium' ? 'bg-yellow-800/50' : 'bg-slate-700'}`}
                            >
                                <p className="text-gray-200">{log.event}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                                    {log.severity === 'high' && <FaExclamationTriangle className="text-red-500" />}
                                    {log.severity === 'medium' && <FaExclamationTriangle className="text-yellow-500" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboardassets;
