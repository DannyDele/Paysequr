import React, { useState } from 'react';
import { Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { DataGrid } from '@mui/x-data-grid';

const CustomReports = () => {
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [displayMode, setDisplayMode] = useState('chart'); // Default display mode is chart
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    // Logic to generate custom report based on selected criteria
    console.log('Generating report with the following criteria:');
    console.log('Selected Module:', selectedModule);
    console.log('Selected Time Range:', selectedTimeRange);
    console.log('Selected Data:', selectedData);
    setReportGenerated(true);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'uv', headerName: 'UV', width: 150 },
    { field: 'pv', headerName: 'PV', width: 150 },
    { field: 'amt', headerName: 'AMT', width: 150 },
  ];

  const rows = [
    { id: 1, name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { id: 2, name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { id: 3, name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { id: 4, name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { id: 5, name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { id: 6, name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { id: 7, name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Generate Custom Reports
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Select Module</InputLabel>
          <Select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <MenuItem value="module1">Module 1</MenuItem>
            <MenuItem value="module2">Module 2</MenuItem>
            <MenuItem value="module3">Module 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Select Time Range</InputLabel>
          <Select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="thisWeek">This Week</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Select Data</InputLabel>
          <Select
            value={selectedData}
            onChange={(e) => setSelectedData(e.target.value)}
          >
            <MenuItem value="data1">Data 1</MenuItem>
            <MenuItem value="data2">Data 2</MenuItem>
            <MenuItem value="data3">Data 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Select Display Mode</InputLabel>
          <Select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value)}
          >
            <MenuItem value="table">Table</MenuItem>
            <MenuItem value="chart">Chart</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleGenerateReport}>
          Generate Report
        </Button>

        {/* Chart or Table section */}
        {reportGenerated && selectedModule && selectedTimeRange && selectedData && (
          <Box mt={5}>
            <Typography variant="h5" gutterBottom>
              {displayMode === 'chart' ? 'Transaction Trends' : 'Transaction Data Table'}
            </Typography>
            {displayMode === 'chart' ? (
              <LineChart
                width={1000}
                height={300}
                data={rows}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            ) : (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} />
              </div>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CustomReports;
