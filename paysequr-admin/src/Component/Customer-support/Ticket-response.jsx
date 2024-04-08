import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const TicketResponsePage = () => {
  // Sample data for support tickets
  const [tickets, setTickets] = useState([
    { id: 1, user: 'User 1', issue: 'Issue 1', date: '2024-03-08', status: 'Open' },
    { id: 2, user: 'User 2', issue: 'Issue 2', date: '2024-03-07', status: 'Resolved' },
    { id: 3, user: 'User 3', issue: 'Issue 3', date: '2024-03-06', status: 'Open' },
    { id: 4, user: 'User 4', issue: 'Issue 4', date: '2024-03-05', status: 'Resolved' },
    // Add more support tickets as needed
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
  const [resolvedTickets, setResolvedTickets] = useState([]);

  const handleViewResponse = (ticket) => {
    setSelectedTicket(ticket);
    setOpenResponseDialog(true);
  };

  const handleCloseResponseDialog = () => {
    setOpenResponseDialog(false);
  };

  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  };

  const handleRespond = () => {
    // Logic to respond to ticket
    console.log(`Responding to ticket ${selectedTicket.id} with response: ${response}`);
    // Update ticket status or send response to backend
    // You can add your logic here
    handleCloseResponseDialog();
  };

  const handleResolveTicket = () => {
    // Logic to resolve ticket
    const updatedTickets = tickets.map(ticket =>
      ticket.id === selectedTicket.id ? { ...ticket, status: 'Resolved' } : ticket
    );
    setTickets(updatedTickets);
    // Move resolved ticket to resolvedTickets state
    setResolvedTickets([...resolvedTickets, selectedTicket]);
    handleCloseResponseDialog();
  };

  // Define columns for the Data Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'issue', headerName: 'Issue', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleViewResponse(params.row)}
        >
          View Response
        </Button>
      ),
    },
  ];

  return (
    <div>
      
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setOpenResponseDialog(true)} variant="contained" color="primary" style={{marginTop:'30px',marginLeft:'50px'}}>
          View Resolved Tickets
        </Button>
      </div>
      <div style={{marginLeft:'50px',  height: 400, width: '90%' }}>
        <DataGrid
          rows={tickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
      <Dialog open={openResponseDialog} onClose={handleCloseResponseDialog}>
        <DialogTitle>View and Respond to Ticket</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>User:</strong> {selectedTicket?.user}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Issue:</strong> {selectedTicket?.issue}
          </Typography>
          <TextField
            label="Response"
            multiline
            rows={4}
            fullWidth
            value={response}
            onChange={handleResponseChange}
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRespond} variant="contained" color="primary">
            Respond
          </Button>
          <Button onClick={handleResolveTicket} variant="contained" color="primary">
            Resolve Ticket
          </Button>
          <Button onClick={handleCloseResponseDialog} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={resolvedTickets.length > 0} onClose={() => setResolvedTickets([])}>
        <DialogTitle>Resolved Tickets</DialogTitle>
        <DialogContent>
          {resolvedTickets.map(ticket => (
            <div key={ticket.id}>
              <Typography variant="body1">
                <strong>User:</strong> {ticket.user}
              </Typography>
              <Typography variant="body1">
                <strong>Issue:</strong> {ticket.issue}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {ticket.date}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {ticket.status}
              </Typography>
              <hr />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResolvedTickets([])} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketResponsePage;
