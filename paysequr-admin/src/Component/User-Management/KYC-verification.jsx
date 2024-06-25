import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import '../../assets/styles/DialogHeader.css';
import UserKyc from '../features/user/UserKyc'
import Button from '@mui/material/Button';
import { Typography, Container, TextField, CircularProgress, IconButton, Link, Snackbar, SnackbarContent, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useStyles from '../../assets/muiStyles/styles'; // Adjust the path based on your actual file structure
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon, Done, ThumbUp as ThumbUpIcon, DoneAll as DoneAllIcon, VerifiedUser as VerifiedUserIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { fetchUserKyc, approveUserKyc, approveUserKycDocument, approveUserKycAddress } from './../../redux/userKycSlice';





const KYCVerificationPage = () => {
  const dispatch = useDispatch();
  const userKyc = useSelector((state) => state.userKyc.userKyc);
  const error = useSelector((state) => state.userKyc.error);
  console.log('Error from kyc component:', error)
  const classes = useStyles();
  

 const [open, setOpen] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);
  const [selectedUserKyc, setSelectedUserKyc] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isViewKycMode, setIsViewKycMode] = useState(false); // Add state for view user kyc mode


  // Loading state
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchUserKyc()).unwrap();  // Use .unwrap() to properly handle rejected action
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log('An Error Occurred', e);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error || 'An error occurred');
      setSnackbarOpen(true);
    }
  }, [error]);
 

// ******************************************************************************
  // Funtion to view a user kyc info when the view button is clicked for a row
  // *****************************************************************************
  const handleViewKyc = (userid) => {
      setSelectedUserKyc(userid);
  console.log('User Id Selected:', userid);
    setIsViewKycMode(true); // Set edit mode to true when the Edit button is clicked
    
  };

 
  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleApproveKYC = async (userId) => {
    try {
      const response = await dispatch(approveUserKyc(userId));
      console.log(`KYC Verification button clicked for user ID ${userId}`);

      if (response.payload?.Error?.message) {
        const message = 'User already approved';
        setSnackbarSeverity('success');
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        console.error('User already approved:', response);
      } else {
        const message = 'User approved successfully';
        setSnackbarSeverity('success');
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        console.error('User approved successfully:', response);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.Error?.message || 'User already approved';
        setSnackbarSeverity('error');
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
        console.error('User already approved:', error);
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage(error.message || 'An unknown error occurred');
        setSnackbarOpen(true);
        console.error('An error occurred while approving KYC:', error);
      }
    }
  };

  const handleKYCDocument = async () => {
    try {
      console.log('KYC Document button clicked');
      const response = await dispatch(approveUserKycDocument(selectedRowData.userId));
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

  const handleKYCAddress = async () => {
    try {
      console.log('KYC Address button clicked');
      const response = await dispatch(approveUserKycAddress(selectedRowData.userId));
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstname', headerName: 'First Name', flex: 1 },
    { field: 'lastname', headerName: 'Last Name', flex: 1 },
    { field: 'bvn', headerName: 'Bvn', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
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
      flex: 1.2,
      renderCell: (params) => (
    <span className='flex'>
          <Button
            sx={{marginRight:'2px'}}
          variant='contained'
          size='small'
            onClick={() => (
            handleViewKyc(params.row.userid)
          )}
          >View</Button>

          <Button
            size='small'
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
            handleApproveKYC(params.row.userid);
          }}
        >
          Approve KYC
          </Button>
          </span>
      ),
    },
  ];


  return (

    <Container>
    <div style={{ height: 500, width: '100%' }}>
  {isViewKycMode ? (
        <UserKyc userId={selectedUserKyc}
        onClose={() => setIsViewKycMode(false)}
        />
  ) : (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
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
            
            
        <div className='mt-5'>
           <Typography variant="h4" className={classes.globalTypography}  gutterBottom>
        User Kyc Verification
      </Typography>
        </div>

      {loading ? (
        <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
      ) : (
        <DataGrid
          rows={userKyc || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      )}
    </>
  )}
      </div>
      </Container>

    
 
  );
};

export default KYCVerificationPage;
