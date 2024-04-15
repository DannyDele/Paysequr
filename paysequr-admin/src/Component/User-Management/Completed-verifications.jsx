import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers } from './../../redux/userSlice'; // Import the fetchUsers async thunk from userSlice
import VerifiedIcon from '@mui/icons-material/Verified'; // Import the green check circle icon


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'firstname', headerName: 'First Name', width: 150 },
  { field: 'middlename', headerName: 'Middle Name', width: 150 },
  { field: 'lastname', headerName: 'Last Name', width: 150 },
  { field: 'tier', headerName: 'KYC Level', width: 150 },
  {
    field:
      'vstatus',
    headerName: 'Status',
    width: 150,
      renderCell: (params) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
                  {params.value}

        {params.value === 'verified' && <VerifiedIcon style={{ color: 'green', marginRight: 5 }} />}
      </span>
            )
  },
];

const CompletedVerifications = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users to display only those with vstatus === 'verified'
  const verifiedUsers = users.filter(user => user.vstatus === 'verified');
  

  return (
    <div style={{ marginLeft: '50px', marginTop: '20px', height: 400, width: '95%' }}>
      <DataGrid
        rows={verifiedUsers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default CompletedVerifications;
