import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const RevenueBreakdown = () => {
  // Sample data
  const moduleRevenue = [
    { module: 'Escrow', revenue: 5000 },
    { module: 'Bill Payment', revenue: 8000 },
    { module: 'Ecommerce', revenue: 12000 },
  ];

  // Sample data for transaction type analysis
  const transactionTypes = [
    { type: 'Ecommerce Sales', revenue: 10000 },
    { type: 'Escrow Releases', revenue: 6000 },
    { type: 'Bill Payments', revenue: 8000 },
  ];

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Module-wise Revenue Breakdown
        </Typography>
        <Box display="flex" justifyContent="center">
          <Paper elevation={3} style={{ padding: '20px', marginRight: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Revenue by Module
            </Typography>
            {moduleRevenue.map((item, index) => (
              <Typography key={index} gutterBottom>
                {item.module}: ${item.revenue.toLocaleString()}
              </Typography>
            ))}
          </Paper>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Transaction Type Analysis
            </Typography>
            {transactionTypes.map((item, index) => (
              <Typography key={index} gutterBottom>
                {item.type}: ${item.revenue.toLocaleString()}
              </Typography>
            ))}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default RevenueBreakdown;
