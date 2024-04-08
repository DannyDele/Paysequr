import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueOverview = () => {
  const dailyRevenueData = [
    { day: 'Mon', revenue: 5000 },
    { day: 'Tue', revenue: 6000 },
    { day: 'Wed', revenue: 5500 },
    { day: 'Thu', revenue: 7000 },
    { day: 'Fri', revenue: 6500 },
    { day: 'Sat', revenue: 7500 },
    { day: 'Sun', revenue: 7000 },
  ];

  const weeklyRevenueData = [
    { week: 'Week 1', revenue: 40000 },
    { week: 'Week 2', revenue: 42000 },
    { week: 'Week 3', revenue: 38000 },
    { week: 'Week 4', revenue: 45000 },
  ];

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 10000 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 11000 },
    { month: 'May', revenue: 13000 },
    { month: 'Jun', revenue: 14000 },
  ];

  const yearlyRevenueData = [
    { year: '2021', revenue: 145000 },
    { year: '2022', revenue: 155000 },
    { year: '2023', revenue: 165000 },
    { year: '2024', revenue: 175000 },
  ];

  const [period, setPeriod] = useState('daily');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(calculateChange(dailyRevenueData));
  }, []);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    switch (event.target.value) {
      case 'daily':
        setChartData(calculateChange(dailyRevenueData));
        break;
      case 'weekly':
        setChartData(calculateChange(weeklyRevenueData));
        break;
      case 'monthly':
        setChartData(calculateChange(monthlyRevenueData));
        break;
      case 'yearly':
        setChartData(calculateChange(yearlyRevenueData));
        break;
      default:
        break;
    }
  };

  const calculateChange = (data) => {
    const changeData = [];
    for (let i = 1; i < data.length; i++) {
      const currentRevenue = data[i].revenue;
      const previousRevenue = data[i - 1].revenue;
      const change = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
      changeData.push({ period: data[i].month || data[i].week || data[i].day, change });
    }
    return changeData;
  };

  const renderChart = () => (
    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="period" />
      <YAxis />
      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
      <Legend />
      <Bar dataKey="change" fill="#8884d8" name="Revenue Change (%)" />
    </BarChart>
  );

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
          Revenue Overview
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total Revenue: ${monthlyRevenueData.reduce((total, item) => total + item.revenue, 0).toLocaleString()}
        </Typography>
        <FormControl>
          <Select value={period} onChange={handlePeriodChange} sx={{ minWidth: 120 }}>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={5}>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default RevenueOverview;
