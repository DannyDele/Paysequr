import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'middleName', headerName: 'Middle Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'kycLevel', headerName: 'KYC Level', width: 150 },
  { field: 'reasonForQuery', headerName: 'Reason for Query', width: 200 },
];

const rows = [
  { id: 1, username: 'john_doe', firstName: 'John', middleName: 'James', lastName: 'Doe', kycLevel: 'Level 2', reasonForQuery: 'Incomplete documentation' },
  { id: 2, username: 'jane_smith', firstName: 'Jane', middleName: '', lastName: 'Smith', kycLevel: 'Level 3', reasonForQuery: 'Suspected fraud' },
  // Add more rows as needed
];

const QueriedVerifications = () => {
  return (
    <div style={{  marginLeft:'50px',marginTop:'20px',height: 500, width: '95%' }}>
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

export default QueriedVerifications;
