import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'username', headerName: 'Username', flex: 1 },
  { field: 'firstName', headerName: 'First Name', flex: 1 },
  { field: 'middleName', headerName: 'Middle Name', flex: 1 },
  { field: 'lastName', headerName: 'Last Name', flex: 1 },
  { field: 'kycLevel', headerName: 'KYC Level', flex: 1 },
  { field: 'reasonForQuery', headerName: 'Reason for Query', flex: 1 },
];

const rows = [
  { id: 1, username: 'john_doe', firstName: 'John', middleName: 'James', lastName: 'Doe', kycLevel: 'Level 2', reasonForQuery: 'Incomplete documentation' },
  { id: 2, username: 'jane_smith', firstName: 'Jane', middleName: '', lastName: 'Smith', kycLevel: 'Level 3', reasonForQuery: 'Suspected fraud' },
  // Add more rows as needed
];

const QueriedVerifications = () => {
  return (
    <div style={{  height: 500, width: '95%' }}>
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
