import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'middleName', headerName: 'Middle Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'kycLevel', headerName: 'KYC Level', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const rows = [
  { id: 1, username: 'john_doe', firstName: 'John', middleName: 'James', lastName: 'Doe', kycLevel: 'Level 2', status: 'Approved' },
  { id: 2, username: 'jane_smith', firstName: 'Jane', middleName: '', lastName: 'Smith', kycLevel: 'Level 3', status: 'Rejected' },
  // Add more rows as needed
];

const CompletedVerifications = () => {
  return (
    <div style={{ marginLeft:'50px',marginTop:'20px',height: 400, width: '95%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default CompletedVerifications;
