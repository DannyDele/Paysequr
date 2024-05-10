import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import '../../assets/styles/DialogHeader.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography, TextField, Grid, CircularProgress, IconButton } from '@mui/material';
import { fetchUserKyc, approveUserKyc, approveUserKycDocument, approveUserKycAddress } from './../../redux/userKycSlice';
import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon, Done } from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';





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







const KYCVerificationPage = () => {

  const dispatch = useDispatch();
  const userKyc = useSelector((state) => state.userKyc.userKyc);
    const classes = useStyles();

  

  // Loading state
    const [loading, setLoading] = useState(false); // State to manage loading


 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchUser = await dispatch(fetchUserKyc()); // Wait for the fetchUserKyc action to complete
      console.log('All Users Gotten:', fetchUser)
      setLoading(false); // Set loading to false after successful data fetch
    } catch (e) {
      setLoading(false);
      console.log('An Error Occurred', e);
    }
  };

  fetchData(); // Call the fetchData function

}, [dispatch]);



  const [open, setOpen] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);


  
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
      const [message, setMessage] = useState('');


  const handleRowClick = (params) => {
    if (params.field !== 'actions') {
      setSelectedRowData(params.row);
      setOpen(true);
    }
  };

  const handleCloseForm = () => {
    setOpen(false);
  };


  const handleView = (userId) => {
    console.log(`View button clicked for user ID ${userId}`);
    // Implement logic to handle viewing
  };


 // Function to handle User Kyc verification
const handleApproveKYC = async (userId) => {
  try {
    const response = await dispatch(approveUserKyc(userId)); // Dispatch the action and await the response
    console.log(`KYC Verification button clicked for user ID ${userId}`);

    if (response.payload?.Error?.message) {
      const message = 'User already approved';
      setSnackbarSeverity('success');
      setSnackbarMessage(message); // Set the message
      setSnackbarOpen(true);
      console.error('User already approved:', response);
    } else {
      const message = 'User approved successfully';
      setSnackbarSeverity('success');
      setSnackbarMessage(message); // Set the message
      setSnackbarOpen(true);
      console.error('User approved successfully:', response);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data?.Error?.message || 'User already approved';
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMessage); // Set the error message from the server response
      setSnackbarOpen(true);
      console.error('User already approved:', error);
    } else {
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message || 'An unknown error occurred'); // Fallback to a generic error message
      setSnackbarOpen(true);
      console.error('An error occurred while approving KYC:', error);
    }
  }
};




      // Function to handle User Kyc document verification
   const handleKYCDocument = async () => {
    try {
      console.log('KYC Document button clicked');
      const response = await dispatch(approveUserKycDocument(selectedRowData.userId)); // Dispatch the action to approve KYC document
      const errorMessage = response.payload.msg || 'KYC Document already approved';
      setSnackbarSeverity('success');
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      console.log('KYC Document approved:', response);
    } catch (error) {
      const errorMessage = error.response?.data || 'An unknown error occurred';
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      console.error('An error occurred while approving KYC Document:', error);
    }
  };


        // Function to handle User Kyc address verification
   const handleKYCAddress = async () => {
     try {
      console.log('KYC Address button clicked');
      const response = await dispatch(approveUserKycAddress(selectedRowData.userId)); // Dispatch the action to approve KYC address
      const errorMessage = response.payload.msg || 'KYC Address already approved';
      setSnackbarSeverity('success');
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      console.log('KYC Address approved:', response);
    } catch (error) {
      const errorMessage = error.response?.data || 'An unknown error occurred';
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      console.error('An error occurred while approving KYC Address:', error);
    }
  };




  // Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};
  




const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstname', headerName: 'First Name', width: 200 },
  { field: 'lastname', headerName: 'Last Name', width: 200 },
  { field: 'bvn', headerName: 'Bvn', width: 200 },
{ 
  field: 'status', 
  headerName: 'Status', 
  width: 200,
  renderCell: (params) => (
     <span>
          {params.value}
          {params.value === 'Approved' ? <VerifiedUserIcon style={{ color: 'green', marginRight: 5 }} /> :
            <DoneAllIcon style={{ color: '#227BD4', marginRight: 5 }} />}
          </span>
  )
},


  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <Button
    startIcon={<ThumbUpIcon style={{ transition: 'transform 0.3s' }} />}
        variant="contained"
        color="primary"
                 style={{ transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
    }}
        onClick={(e) => {
          e.stopPropagation();
         handleApproveKYC(params.row.userid); // Call handleApproveKYC from component's scope
        }}
      >
        Approve KYC
      </Button>
    ),
    
  },
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







      {loading ? <CircularProgress style={{ margin: '50vh 0 0 50vw'}}/> : (
     <DataGrid
  rows={userKyc || []} // Ensure userKyc is an array or use an empty array as fallback
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5, 10, 20]}
  checkboxSelection
  onRowClick={handleRowClick}
/>

        )
        }
<Dialog open={open} onClose={handleCloseForm} maxWidth="lg" fullWidth>
  <DialogTitle  className='Dialog-title-header' >KYC Verification Form</DialogTitle>
  <DialogContent dividers>
    {selectedRowData && (
      <div>
        {Object.entries(selectedRowData)
          .filter(([key]) => key !== 'password') // Filter out 'password' field
          .reduce((pairs, [key, value], index, array) => {
            if (index % 2 === 0) {
              pairs.push(array.slice(index, index + 2));
            }
            return pairs;
          }, [])
          .map((pair, index) => (
            <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              {pair.map(([key, value]) => (
                <TextField
                  key={key}
                  fullWidth
                  label={key}
                  value={value}
                  variant="outlined"
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
 <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
  <Button
    startIcon={<ThumbUpIcon style={{ transition: 'transform 0.3s' }} />}
    onClick={handleKYCAddress}
    color="primary"
    variant="contained"
    style={{ transition: 'background-color 0.3s' }}
    onMouseEnter={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
    }}
  >
    Approve KYC Address
  </Button>
  <Button
    startIcon={<ThumbUpIcon style={{ transition: 'transform 0.3s' }} />}
    onClick={handleKYCDocument}
    color="primary"
    variant="contained"
    style={{ transition: 'background-color 0.3s' }}
    onMouseEnter={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
    }}
  >
    Approve KYC Document
  </Button>
  <Button
    startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }}  />}
    onClick={handleCloseForm}
    color="primary"
    variant="contained"
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

export default KYCVerificationPage;
