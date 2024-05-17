import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers } from './../../redux/userSlice'; // Import the fetchUsers async thunk from userSlice
import VerifiedIcon from '@mui/icons-material/Verified'; // Import the green check circle icon
import { CircularProgress } from '@mui/material';
import {
  Container,
  TextField,
  TextareaAutosize,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';





const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));




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
  const classes = useStyles();
  


  
    const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


 // Loading state
    const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
  
        const fetchAllUsers = async () => {
      setLoading(true)
    await dispatch(fetchUsers());
    setLoading(false)
    }

    fetchAllUsers()

  }, [dispatch]);
  















// Function to view a user
 const handleViewUser = (user) => {
  setSelectedUser(user);
  setSelectedUserId(user.id); // Store the id of the selected user
  setOpenDialog(true);
};

  
  
  
  

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseQuerryDialog = () => {
     setOpenQuerryDialog(false)
  }


 // Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};
  



  // Filter users to display only those with vstatus === 'verified'
  const verifiedUsers = users.filter(user => user.vstatus === 'verified');
  

  return (
    <div style={{ marginLeft: '50px', marginTop: '20px', height: 400, width: '95%' }}>
                        { loading ? (<CircularProgress sx={{marginLeft:'40vw', marginTop: '30vh'}}/>) : (

      <DataGrid
        rows={verifiedUsers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          onRowClick={(params) => handleViewUser(params.row)}

        />
        )
      }
      




  {/* Dynamically Populate the users information */}
<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle  className='Dialog-title-header'>User Profile</DialogTitle>
      <DialogContent dividers>
    {selectedUser && (
  <div>
    {Object.entries(selectedUser)
      .filter(([key]) => key !== 'password') // Filter out 'password' field
      .reduce((pairs, [key, value], index, array) => {
        if (index % 2 === 0) {
          pairs.push(array.slice(index, index + 2));
        }
        return pairs;
      }, [])
      .map((pair, index) => (
        <div key={index} style={{ display: 'flex', gap: '16px' }}>
          {pair.map(([key, value]) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the label
              value={value}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true, // Make the text field read-only
              }}
            />
          ))}
        </div>
      ))}
  </div>
)}

      </DialogContent>
      <DialogActions>
      <Button
  startIcon={<Delete style={{ transition: 'transform 0.3s' }} />}
  variant="contained"
  color="error" 
  onClick={(e) => {
    e.stopPropagation();
    handleDeleteUser(selectedUserId); // Pass the selectedUserId to the function
  }}
  style={{ transition: 'background-color 0.3s' }}
  onMouseEnter={(e) => {
    e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
  }}
>
  {loading ? (<CircularProgress style={{width:'20px', color:'inherit'}} />) : 'Delete'}
</Button>

          <Button
            startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }} />}
                    variant="contained"
 onClick={handleCloseDialog}
                        style={{ transition: 'background-color 0.3s' }}

            onMouseEnter={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
    }}
          
          >
          Close
        </Button>
      </DialogActions>
    </Dialog>









    </div>
  );
};

export default CompletedVerifications;
