import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, deleteUsers  } from './../../redux/userSlice';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Backdrop,
    Card,
    CardContent,
    Stack,
    Paper,
    Link,
    CircularProgress
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { styled } from '@mui/material/styles';
import { color } from 'framer-motion';
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




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbm55IiwidXNlcklkIjozLCJpYXQiOjE3MTY5MzY4MDEsImV4cCI6MTcxNzU0MTYwMX0.HpnXrpCS1mxAEgm6SBXEqUlnVjlBnjaaeiBRNjjM2tw'



function UserProfileChangeRequest() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const users = useSelector((state) => state.users.users);
    
   

  // State to track the selected user for dialog
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState('')
    const [storedUser, setStoredUser] = useState(null)

  // State for loading backdrop
  const [loading, setLoading] = useState(false);
  // State for full dialog open
    const [openFullDialog, setOpenFullDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


    
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

    


 
  const handleClose = () => {
    setOpenFullDialog(false)
  };


  // Function to handle row click and open dialog
  const handleRowClick = (user) => {
      setSelectedUser(user);
        setSelectedUserId(user.id); // Store the id of the selected user

  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle compare button click
  const handleCompare = async () => {
    setOpenDialog(false);
    setLoading(true);
    
    try {
      
        const response = await fetch(`https://secure.paysequr.com/api-admin/user/${selectedUserId}`, {
            method: 'GET', // Change method to GET
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json(); // Parse response JSON
        console.log('User Data stored in the database:', data);
        setStoredUser(data)

    } catch (error) {
        console.log('Error making request to the server', error);
    }

    // Simulate comparison process, set timeout for demo
    setTimeout(() => {
        setLoading(false);
        setOpenFullDialog(true); // Open the full dialog after comparison
    }, 2000); // Change the time as needed for actual comparison process
    
    // Set the selected user for full dialog
    setSelectedUser(users.find(user => user.id === selectedUserId));
};




    // Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};
  


  // Columns configuration for DataGrid
  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone_no', headerName: 'Phone Number', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
  ];

  return (
      <div style={{ height: 400, width: '100%' }}>
          




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








      {/* <h1>User Profile Change Request</h1> */}
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
              onRowClick={(params) => {
                  handleRowClick(params.row)
                  setOpenDialog(true)
        }}
      />

      {/* Dialog to display user information */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
              
        <DialogTitle className='flex justify-center'>User Information</DialogTitle>
        <DialogContent style={{ padding: '2rem' }}>
          {selectedUser ? (
                      <div>
                            <Stack spacing={2}>

                              <h6><strong>First Name:</strong> {selectedUser.firstname}</h6>
                              <Divider/>
                              <h6><strong>Last Name:</strong> {selectedUser.lastname}</h6>
                                                            <Divider/>

                              <h6><strong>Username:</strong> {selectedUser.username}</h6>
                                                            <Divider/>

                              <h6><strong>Middle Name:</strong> {selectedUser.middleName}</h6>
                                                            <Divider/>

                              <h6><strong>Email:</strong> {selectedUser.email}</h6>
                                                            <Divider/>

                              <h6><strong>Phone Number:</strong> {selectedUser.phone_no}</h6>
                                                            <Divider/>

                              <h6><strong>Address:</strong> {selectedUser.address}</h6>
                                                            <Divider/>

                              <h6><strong>Date of Birth:</strong> {selectedUser.dob}</h6>
                                                            <Divider/>

                              <h6><strong>Gender:</strong> {selectedUser.gender}</h6>
                                                            <Divider/>

                              </Stack>
            <div className='mt-6'>
  {selectedUser.documentImageUrl ? (
                                  
<Link href={selectedUser.documentImageUrl} target="_blank" rel="noopener noreferrer" underline="always">
  View Document
</Link>
  ) : (
    <Typography>No document available</Typography>
  )}
</div>

            </div>
          ) : (
            <Typography>No user selected</Typography>
          )}

          <DialogActions>
            <Button
              startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }} />}
              variant="contained"
              color="primary"
              onClick={handleCloseDialog}>Close</Button>
            <Button
              startIcon={<CompareArrowsOutlinedIcon style={{ transition: 'transform 0.3s' }} />}
              variant="contained"
              color="secondary"
              style={{ marginLeft: '10px' }}
              onClick={handleCompare}>Compare</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Backdrop for loading state */}
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress />
      </Backdrop>

      {/* Full dialog for comparison results */}
          <Dialog open={openFullDialog} onClose={() => setOpenFullDialog(false)}
           TransitionComponent={Transition}
              fullScreen>
              

<AppBar sx={{ position: 'relative', backgroundColor:'#1F2937' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Compare users information with users database information 
            </Typography>
          </Toolbar>
        </AppBar>




        <DialogTitle>Comparison Results</DialogTitle>
        {/* Add content for comparison results here */}
      <DialogContent>
  <div style={{ display: 'flex', height: '100%' }}>
    {/* Section for information sent for change */}
    <Card variant="outlined" style={{ flex: 1, marginRight: '1rem', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', height:'500px' }}>
                          <CardContent>
                              <Box  className='flex justify-center justify-items-center' >
        <Typography variant="h5" gutterBottom>
          Information Sent for Change
                                  </Typography>
                                  </Box>
                              <Box sx={{ width: '100%' }}>
  <Stack spacing={2}>
  <Typography><strong>First Name:</strong> {selectedUser?.firstname}</Typography>
                                      <Divider />
                                      <Typography><strong>Middle Name:</strong> {selectedUser?.middleName}</Typography>
  <Divider/>
  <Typography><strong>Last Name:</strong> {selectedUser?.lastname}</Typography>
  <Divider/>
  <Typography><strong>Username:</strong> {selectedUser?.username}</Typography>
<Divider />
  <Typography><strong>Email:</strong> {selectedUser?.email}</Typography>
  <Divider/>
  <Typography><strong>Phone Number:</strong> {selectedUser?.phone_no}</Typography>
  <Divider/>
  <Typography><strong>Address:</strong> {selectedUser?.address}</Typography>
  <Divider/>
  <Typography><strong>Date of Birth:</strong> {selectedUser?.dob}</Typography>
  <Divider/>
  <Typography><strong>Gender:</strong> {selectedUser?.gender}</Typography>
  {/* Add more fields as needed */}
</Stack>

                                      </Box>
      </CardContent>
            </Card>
            
            <CompareArrowsOutlinedIcon style={{alignSelf: 'center', justifySelf:'center', marginRight:'.5rem'}}/>

    {/* Section for user information in the database */}
    <Card variant="outlined" style={{ flex: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', height:'500px' }}>
  <CardContent>
             <Box display="flex" alignItems="center" justifyContent="center">
  <Typography variant="h5" gutterBottom>
    User Information in Database
  </Typography>
</Box>

    {/* Display user information in the database here */}
                              {/* Example: */}
    <Box sx={{ width: '100%' }}>
   <Stack spacing={2}>
    <Typography variant="body1"><strong>First Name:</strong> { storedUser?.user.result[0].firstname}</Typography>
                                      <Divider />
                                      <Typography variant="body1"><strong>Middle Name:</strong> { storedUser?.user.result[0].middlename}</Typography>
  <Divider/>
  <Typography variant="body1"><strong>Last Name:</strong> { storedUser?.user.result[0].lastname}</Typography>
  <Divider/>
  <Typography variant="body1"><strong>Username:</strong> { storedUser?.user.result[0].username}</Typography>
  <Divider />
  <Typography variant="body1"><strong>Email:</strong> { storedUser?.user.result[0].email}</Typography>
  <Divider/>
  <Typography variant="body1"><strong>Phone Number:</strong> { storedUser?.user.result[0].phone_no}</Typography>
  <Divider/>
  <Typography variant="body1"><strong>Address:</strong> { storedUser?.user.result[0].address}</Typography>
  <Divider/>
  <Typography variant="body1"><strong>Date of Birth:</strong> { storedUser?.user.result[0].dob}</Typography>
  <Divider/>
  <Typography variant="body1"><strong>Gender:</strong> Male</Typography>
  {/* Add more fields as needed */}
</Stack>

                                      </Box>

  </CardContent>
</Card>

  </div>
</DialogContent>



        <DialogActions>
          <Button onClick={() => setOpenFullDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserProfileChangeRequest;
