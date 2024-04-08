import React, { useState } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, Box } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueTrends = () => {
  // Sample data for revenue trends
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 1000 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 11000 },
    { month: 'May', revenue: 13000 },
    { month: 'Jun', revenue: 14000 },
    // Add more data for different months or periods
  ];

  const quarterlyRevenueData = [
    { quarter: 'Q1', revenue: 37000 },
    { quarter: 'Q2', revenue: 39000 },
    { quarter: 'Q3', revenue: 35000 },
    { quarter: 'Q4', revenue: 30000 },
  ];

  const yearlyRevenueData = [
    { year: '2021', revenue: 125000 },
    { year: '2022', revenue: 155000 },
    { year: '2023', revenue: 145000 },
    { year: '2024', revenue: 175000 },
  ];

  const [period, setPeriod] = useState('monthly'); // Initial period is 'monthly'
  const [chartType, setChartType] = useState('line'); // Initial chart type is 'line'

  // Handle period change
  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  // Handle chart type change
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Revenue Trends
        </Typography>
        <FormControl sx={{ marginRight: 2 }}>
          <Select value={period} onChange={handlePeriodChange} sx={{ minWidth: 120 }}>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select value={chartType} onChange={handleChartTypeChange} sx={{ minWidth: 120 }}>
            <MenuItem value="line">Line Graph</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={5}>
        <ResponsiveContainer width="100%" height={400}>
          {period === 'monthly' && chartType === 'line' && (
            <LineChart
              data={monthlyRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          )}
          {period === 'monthly' && chartType === 'bar' && (
            <BarChart
              data={monthlyRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          )}
          {period === 'quarterly' && chartType === 'line' && (
            <LineChart
              data={quarterlyRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          )}
          {period === 'quarterly' && chartType === 'bar' && (
            <BarChart
              data={quarterlyRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          )}
          {period === 'yearly' && chartType === 'line' && (
            <LineChart
              data={yearlyRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          )}
          {period === 'yearly' && chartType === 'bar' && (
            <BarChart
              data={yearlyRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default RevenueTrends;
