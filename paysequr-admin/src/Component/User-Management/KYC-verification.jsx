import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography, Grid } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'birthdate', headerName: 'Birthdate', width: 200 },
  { field: 'country', headerName: 'Country', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          params.row.handleKYCVerification(params.row.id);
        }}
      >
        KYC Verification
      </Button>
    ),
    
  },
];

const rows = [
  { id: 1, username: 'John Doe', birthdate: '1990-01-01', country: 'USA', city: 'New York', firstName: 'John', middleName: '', lastName: 'Doe', postalCode: '10001', street: '123 Main St', gender: 'Male', phone: '123-456-7890', addressImage: 'address.jpg', status:'completed', image: 'status.jpg', bvn: '1234567890', documentType: 'Passport', documentStatus: 'Approved', addressStatus: 'Verified', documentImage: 'document.jpg' },
  { id: 2, username: 'Jane Smith', birthdate: '1985-05-15', country: 'Canada', city: 'Toronto', firstName: 'Jane', middleName: 'Ann', lastName: 'Smith', postalCode: 'M5V 2L9', street: '456 Maple Ave', gender: 'Female', phone: '987-654-3210', addressImage: 'address.jpg', status:'pending', image: 'status.jpg', bvn: '0987654321', documentType: 'ID Card', documentStatus: 'Pending', addressStatus: 'Not Verified', documentImage: 'document.jpg' },
  // Add more rows as needed
];

const KYCVerificationPage = () => {
  const [open, setOpen] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (params) => {
    if (params.field !== 'actions') {
      setSelectedRowData(params.row);
      setOpen(true);
    }
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleKYCAddress = () => {
    console.log('KYC Address button clicked');
    // Implement KYC address logic here
  };

  const handleKYCDocument = () => {
    console.log('KYC Document button clicked');
    // Implement KYC document logic here
  };

  const handleView = (userId) => {
    console.log(`View button clicked for user ID ${userId}`);
    // Implement logic to handle viewing
  };

  const handleKYCVerification = (userId) => {
    console.log(`KYC Verification button clicked for user ID ${userId}`);
    // Implement logic to handle KYC verification
    setKycSuccess(true);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
      rows={rows.map(row => ({ ...row, handleView, handleKYCVerification }))}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5, 10, 20]}
      checkboxSelection
      onRowClick={handleRowClick}
    />
      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>KYC Verification Form</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                User ID: {selectedRowData?.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Birthdate: {selectedRowData?.birthdate}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Country: {selectedRowData?.country}
              </Typography>
              <Typography variant="body1" gutterBottom>
                City: {selectedRowData?.city}
              </Typography>
              <Typography variant="body1" gutterBottom>
                First Name: {selectedRowData?.firstName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Middle Name: {selectedRowData?.middleName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Last Name: {selectedRowData?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                Postal Code: {selectedRowData?.postalCode}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Street: {selectedRowData?.street}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Gender: {selectedRowData?.gender}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: {selectedRowData?.phone}
              </Typography>
              <Typography variant="body1" gutterBottom>
                BVN: {selectedRowData?.bvn}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Document Type: {selectedRowData?.documentType}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Document Status: {selectedRowData?.documentStatus}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Address Status: {selectedRowData?.addressStatus}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Document Image: {selectedRowData?.documentImage}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address Image: {selectedRowData?.addressImage}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: {selectedRowData?.status}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Image: {selectedRowData?.image}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleKYCAddress} color="primary">
            KYC Address
          </Button>
          <Button onClick={handleKYCDocument} color="primary">
            KYC Document
          </Button>
          <Button onClick={handleCloseForm} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={kycSuccess} onClose={() => setKycSuccess(false)}>
      <DialogTitle>KYC Verification Successful</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          The KYC verification process has been successfully completed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setKycSuccess(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default KYCVerificationPage;
