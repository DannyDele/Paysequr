import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import '../../assets/styles/DialogHeader.css'
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
  CircularProgress,
  IconButton,
  Tab,
  Tabs,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified'; // Import the green check circle icon
import { HourglassEmpty } from '@mui/icons-material'; // Import icons for different verification statuses
import { fetchUsers, fetchUserAccount, deleteUsers  } from './../../redux/userSlice';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { HelpOutline } from '@mui/icons-material'; // Import icons for different verification statuses
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






const UserDatabase = () => {
  const dispatch = useDispatch();
    const classes = useStyles();

  const users = useSelector((state) => state.users.users);
  const userAccount = useSelector((state) => state.users.userAccount);

  const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState(0); // State variable to track the selected tab
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openQuerryDialog, setOpenQuerryDialog] = useState(false);
  const [userName, setUserName] = useState('');
  const [reason, setReason] = useState('');

  
  // Loading state
  const [loading, setLoading] = useState(false); // State to manage loading
  const [selectedUserId, setSelectedUserId] = useState('')
  
// const [userAccount, setUserAccount] = useState(null);





   // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
      const [message, setMessage] = useState('');

  
  

  useEffect(() => {
    console.log('All Users From Database:', users)

    const fetchAllUsers = async () => {
      setLoading(true)
    await dispatch(fetchUsers());
    setLoading(false)
    }

    fetchAllUsers()

    
  }, [dispatch]);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
    // Filter users based on search query
  };


// Function to handle tab change
 const handleTabChange = async (event, newValue) => {
  setTabValue(newValue);
  // Fetch user account details when the "Bank Account" tab is clicked
  if (newValue === 1) {
    const wallet = await dispatch(fetchUserAccount(selectedUser.id));
    console.log('User Account:', wallet)
  }
};
;






// Function to open Query dialog for user
 const handleQueryUser =  (userId) => {
  console.log('Query Button Clicked Here!!');
  console.log('Users Array:', users); // Log the users array for debugging
  const user = users.find((user) => user.id === userId);
  console.log('Found User:', user); // Log the found user for debugging
  if (user) {
    console.log('Query Button ALSO Clicked Here!!');
    setUserName(`${user.firstname} ${user.lastname}`);
    setOpenQuerryDialog(true);
  }
};7


  // Function to Query User

  const handleQuery = () => {
  // Assuming you want to display an alert when the "Query" button is clicked
  alert('Querying user...');
};


  
  
  
// Function to view a user
 const handleViewUser = (user) => {
  setSelectedUser(user);
  setSelectedUserId(user.id); // Store the id of the selected user
  setOpenDialog(true);
};


  
  
  
  // Function to Delete a User
  const handleDeleteUser = async (userId) => {
  try {
    setLoading(true);
    const deletedUser = await dispatch(deleteUsers(userId));
    setLoading(false);
    console.log('Selected users ID:', selectedUserId)
    console.log('User Deleted Successully:', deletedUser)
       setSnackbarSeverity('success');
    setSnackbarMessage('User deleted successfuly!');
    setSnackbarOpen(true);
      setOpenDialog(false);

  } catch (error) {
    setLoading(false);
          setOpenDialog(false);

    console.error('Error deleting user:', error);
  }
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
  



  // Columns definition for the DataGrid
  const columns = [
     { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'firstname', headerName: 'First Name', width: 150 },
  { field: 'lastname', headerName: 'Last Name', width: 150 },
  { field: 'tier', headerName: 'KYC Level', width: 150 },
    {
      field: 'vstatus',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.value}
          {params.value === 'verified' ? <VerifiedIcon style={{ color: 'green', marginRight: 5 }} /> :
            <HourglassEmpty style={{ color: '#227BD4', marginRight: 5 }} />}
          </span>
      )
    },


    {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <Button
        startIcon={<HelpOutline style={{ transition: 'transform 0.3s' }} />}
  variant="contained"
  color="error" // Change color to red
  size="small" // Reduce the size
  style={{
    transition: 'background-color 0.3s',
    color: 'white', // Change text color to white
    backgroundColor: '#f44336', // Set background color to red
    minWidth: 'unset', // Reset minimum width
    width: 'auto', // Make width auto to fit content
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
  }}
  onClick={(e) => {
    e.stopPropagation();
        console.log('Clicked User ID:', params.row.id)

     handleQueryUser(params.row.id); // Call handleApproveKYC from component's scope
  }}
>
  Query
</Button>

    ),
    
  },
    // Rest of the columns...
  ];






  return (
    <Container>


 {/* Snackbar component */}

<Snackbar
  anchorOrigin={{
    vertical: 'top', // Change to 'top'
    horizontal: 'right', // Change to 'right'
  }}
  open={snackbarOpen}
  autoHideDuration={6000}
        onClose={handleSnackbarClose}
                TransitionComponent={Slide} // Use Slide transition

>
  <SnackbarContent
    className={snackbarSeverity === 'success' ? classes.success : classes.error}
    message={
      <span className={classes.message}>
        <CheckCircleIcon className={classes.icon} />
        {snackbarMessage}
      </span>
    }
    action={[
      <IconButton key="close" color="inherit" onClick={handleSnackbarClose}>
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
  />
</Snackbar>






      <Box mt={4}>
        <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            User Database
          </Typography>
          <TextField
            label="Search users"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
          />
        </Paper>
      </Box>
          <div style={{ height: 500, width: '100%' }}>

            { loading ? (<CircularProgress sx={{marginLeft:'40vw', marginTop: '30vh'}}/>) : (
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              checkboxSelection
              disableSelectionOnClick
            onRowClick={(params) => {
              console.log('User id Clicked:', params.row.id)
              handleViewUser(params.row)
              }
            }
              />
              )
            }
      </div>
      


      
      {/* Dynamically Populate the users information */}
<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
  <DialogTitle className='Dialog-title-header'>User Profile</DialogTitle>
  <DialogContent dividers>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="user profile and bank account tabs">
        <Tab label="Profile" />
        <Tab label="Bank Account" />
      </Tabs>
    </Box>
    {tabValue === 0 && (
      <div>
        {/* Display user profile */}
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
      </div>
    )}
    {tabValue === 1 && (
      <div>
        {/* Display bank account details form */}
        {/* Populate with user's bank information */}
        {selectedUser && (
          <div>
            <TextField
              label="Account Number"
              value={userAccount?.wallet.acct_number}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true, // Make the text field read-only
              }}
            />
            <TextField
              label="Account Name"
              value={userAccount?.wallet.acct_name}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true, // Make the text field read-only
              }}
            />
            <TextField
              label="BVN"
              value={userAccount?.wallet.bvn}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true, // Make the text field read-only
              }}
            />
            <TextField
              label="Accessable Balance"
              value={userAccount?.wallet.accessable_balance}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true, // Make the text field read-only
              }}
            />
          </div>
        )}
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
      {loading ? (<CircularProgress style={{ width: '20px', color: 'inherit' }} />) : 'Delete'}
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


      

      {/* Open Querry Dialog */}
  <Dialog open={openQuerryDialog} onClose={handleCloseQuerryDialog} maxWidth="sm" fullWidth>
    <DialogTitle  className='Dialog-title-header'>Querry User</DialogTitle>
<DialogContent style={{ paddingTop: '1rem' }}>
      <TextField
        label="User Name"
        value={userName}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
        <TextField
  label="Reason for query"
  multiline
  rows={5}
  placeholder="Reason for query"
  value={reason}
  onChange={(e) => setReason(e.target.value)}
  variant="outlined"
  fullWidth
  style={{
    resize: 'none', // Disable resizing
    marginBottom: '1rem', // Match marginBottom of TextField
  }}
/>

    </DialogContent>
    <DialogActions>
      <Button
        startIcon={<HelpOutline style={{ transition: 'transform 0.3s' }} />}
        variant="contained"
        color="error"
              onClick={() => { 
              handleQuery();

        }}
        style={{ transition: 'background-color 0.3s' }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
        }}
      >
        Query
      </Button>
      <Button
        startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }} />}
        variant="contained"
        onClick={handleCloseQuerryDialog}
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

    </Container>
  );
};

export default UserDatabase;





