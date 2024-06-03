import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import '../../assets/styles/DialogHeader.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography, TextField, CircularProgress, IconButton, Link, Snackbar, SnackbarContent, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon, Done, ThumbUp as ThumbUpIcon, DoneAll as DoneAllIcon, VerifiedUser as VerifiedUserIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { fetchUserKyc, approveUserKyc, approveUserKycDocument, approveUserKycAddress } from './../../redux/userKycSlice';

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
  const error = useSelector((state) => state.userKyc.error);
  console.log('Error from kyc component:', error)
  const classes = useStyles();
  

 const [open, setOpen] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [message, setMessage] = useState('');


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
  // Funtion to open a user dialog when the view button is clicked for a row
  // *****************************************************************************
  const handleRowClick = (params) => {
      setSelectedRowData(params);
      setOpen(true);
    
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
      width: 300,
      renderCell: (params) => (
    <span className='flex'>
          <Button
            sx={{marginRight:'2px'}}
          variant='contained'
          size='small'
            onClick={() => (
            handleRowClick(params.row)
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

  const customNamesMap = {
    id: 'ID',
    userid: 'User ID',
    firstname: 'First Name',
    lastname: 'Last Name',
    middlename: 'Middlename',
    bvn: 'BVN',
    status: 'Status',
    country: 'Country',
    birth_date: 'Date of Birth',
    city: 'City',
    postal_code: 'Postal Code',
    street: 'Street',
    gender: 'Gender',
    phone: 'Phone',
    document_type: 'Document Type',
    address_status: 'Address Status',
    document_status: 'Document Status',
    document_image: 'Document Image',
    document_image_back: 'Document Image Back',
    address_image: 'Address Image',
    image: 'Image'
  };

  const renderValue = (key, value) => {
    const imageKeys = ['image', 'document_image', 'document_image_back', 'address_image'];
    if (imageKeys.includes(key)) {
      return (
        <Link href={value} target="_blank" rel="noopener noreferrer">
          Open Image
        </Link>
      );
    }
    return value;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
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

      {loading ?
          <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
        : (
        <DataGrid
          rows={userKyc || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      )}
     <Dialog open={open} onClose={handleCloseForm} maxWidth="lg" fullWidth>
  <DialogTitle className='Dialog-title-header'>KYC Verification Form</DialogTitle>
  <DialogContent dividers>
    {selectedRowData && (
      <div>
        {Object.entries(selectedRowData)
          .filter(([key]) => key !== 'password')
          .reduce((pairs, [key, value], index, array) => {
            if (index % 2 === 0) {
              pairs.push(array.slice(index, index + 2));
            }
            return pairs;
          }, [])
          .map((pair, index) => (
            <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              {pair.map(([key, value]) => (
                key === 'image' || key === 'document_image' || key === 'document_image_back' || key === 'address_image' ? null : (
                  <TextField
                    key={key}
                    fullWidth
                    label={customNamesMap[key] || key}
                    value={value}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )
              ))}
            </div>
          ))}
        <Typography variant="h6" className='Dialog-title-header' style={{ marginTop: '16px' }}>Document Images</Typography>
        <div style={{ display: 'flex', justifyContent:'center', gap: '8px', marginTop: '8px' }}>
          {Object.entries(selectedRowData)
            .filter(([key]) => ['image', 'document_image', 'document_image_back', 'address_image'].includes(key))
            .map(([key, value]) => (
              <Button
                size='small'
                startIcon= {<VisibilityIcon/>}
                key={key}
                variant="outlined"
                color="primary"
                onClick={() => window.open(value, '_blank')}
                style={{ textTransform: 'none', width: 'fit-content' }}
              >
                View {customNamesMap[key] || key}
              </Button>
            ))}
        </div>
      </div>
    )}
  </DialogContent>
  <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
                            size='small'
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
            size='small'

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
            size='small'

      startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }} />}
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
