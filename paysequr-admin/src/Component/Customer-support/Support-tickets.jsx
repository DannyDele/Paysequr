import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, MenuItem } from '@mui/material';

const SupportTicketPage = () => {
  // Sample data for support tickets
  const supportTickets = [
    { id: 1, user: 'User 1', issue: 'Issue 1', date: '2024-03-08', status: 'Open' },
    { id: 2, user: 'User 2', issue: 'Issue 2', date: '2024-03-07', status: 'Resolved' },
    { id: 3, user: 'User 3', issue: 'Issue 3', date: '2024-03-06', status: 'Open' },
    { id: 4, user: 'User 4', issue: 'Issue 4', date: '2024-03-05', status: 'Resolved' },
    // Add more support tickets as needed
  ];

  const [selectedStatus, setSelectedStatus] = useState('All'); // Initial selected status
  const [sortField, setSortField] = useState('date'); // Initial sort field

  // Define columns for the Data Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'issue', headerName: 'Issue', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  // Function to filter support tickets based on selected status
  const filteredTickets = supportTickets.filter(ticket =>
    selectedStatus === 'All' || ticket.status === selectedStatus
  );

  // Function to handle status change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div>
      <div>
        <TextField
          select
          label="Filter by Status"
          variant="outlined"
          fullWidth
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{marginTop:'40px',marginLeft:'30px', width:'90%',marginBottom:'30px'}}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
        </TextField>
      </div>
      <div style={{ marginLeft:'30px',height: 400, width: '90%' }}>
        <DataGrid
          rows={filteredTickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sortModel={[{ field: sortField, sort: 'asc' }]}
          onSortModelChange={(model) => setSortField(model[0]?.field || 'date')}
        />
      </div>
    </div>
  );
};

export default SupportTicketPage;
