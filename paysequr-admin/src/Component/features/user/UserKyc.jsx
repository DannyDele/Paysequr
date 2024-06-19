import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchUserKyc, approveUserKycDocument, approveUserKycAddress } from './../../../redux/userKycSlice';
import {
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Button,
  Chip,
  Link,
  Snackbar,
  SnackbarContent,
  CircularProgress,
  Slide,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility as VisibilityIcon, CheckCircle as CheckCircleIcon, ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import tableCellStyle from '../../utils/helperFunctions';
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
  card: {
    backgroundColor: 'lightgrey',
  },
  flexContainer: {
    display: 'flex',
    gap: '10px',
  },
}));

function UserKyc({ onClose, userId }) {
  const dispatch = useDispatch();
  const userKyc = useSelector((state) => state.userKyc.userKyc);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [filteredUserKyc, setFilteredUserKyc] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchAllKycUsers = async () => {
      setLoading(true);
      await dispatch(fetchUserKyc());
      setLoading(false);
    };
    fetchAllKycUsers();
  }, [dispatch]);

  useEffect(() => {
    if (userKyc && userKyc.length > 0) {
      const filteredKyc = userKyc.filter((kyc) => kyc.userid === userId);
      console.log('Filtered user KYC info:', filteredKyc)
      setFilteredUserKyc(filteredKyc);
    }
  }, [userKyc, userId]);

  const handleKYCDocument = async () => {
    try {
      console.log('KYC Document button clicked');
      const response = await dispatch(approveUserKycDocument(userId));
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
      const response = await dispatch(approveUserKycAddress(userId));
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

  return (
    <div>
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

      <Card sx={{marginBottom: '1rem',}}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon sx={{ marginRight: '1rem' }} onClick={onClose} />
            <Typography variant="h6">User KYC Details</Typography>
          </div>
        </CardContent>
      </Card>

      {filteredUserKyc.length === 0 ? (
        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginTop: '50vh' }}>No KYC Document for this user</Typography>
      ) : (
        filteredUserKyc.map((kyc) => (
          <div key={kyc.id} className={classes.flexContainer}>
            <Card className={classes.card} style={{ flexBasis: '40%' }}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }} variant='h6'>User Profile Info</Typography>
                      <TableRow>
                        <TableCell style={tableCellStyle(true)}>Title</TableCell>
                        <TableCell style={tableCellStyle(true)}>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>{kyc?.firstname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Middle Name</TableCell>
                        <TableCell>{kyc?.middlename}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell>{kyc?.lastname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gender</TableCell>
                        <TableCell>{kyc?.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Birth Date</TableCell>
                        <TableCell>{kyc?.birth_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>{kyc?.country}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>{kyc?.city}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Street</TableCell>
                        <TableCell>{kyc?.street}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phone</TableCell>
                        <TableCell>{kyc?.phone}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card className={classes.card} style={{ flexBasis: '60%' }}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }} variant='h6'>User Document Info</Typography>
                      <TableRow>
                        <TableCell style={tableCellStyle(true)}>Title</TableCell>
                        <TableCell style={tableCellStyle(true)}>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>BVN</TableCell>
                        <TableCell>{kyc?.bvn}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>{kyc?.userid}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>
                          <Chip label={kyc?.status} style={{ color: 'white', backgroundColor: 'green' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Postal Code</TableCell>
                        <TableCell>{kyc?.postal_code}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Address Status</TableCell>
                        <TableCell>
                          {kyc?.address_status ? (
                            <Chip label={kyc.address_status} style={{ color: 'white', backgroundColor: 'green' }} />
                          ) : (
                            <Typography>null</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Document Status</TableCell>
                        <TableCell>{kyc?.document_status}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Document Type</TableCell>
                        <TableCell>{kyc?.document_type ?? 'null'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Address Image</TableCell>
                        <TableCell>
                          <Link variant="body2" color="primary" component='button'>View</Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Document Image</TableCell>
                        <TableCell>
                          <Link startIcon={<VisibilityIcon />} variant="body2" color="primary" component='button'>View</Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Document Image Back</TableCell>
                        <TableCell>
                          <Link variant="body2" color="primary" component='button'>View</Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Button size='small' startIcon={<ThumbUpIcon />} variant="contained" color="primary" onClick={handleKYCDocument}>
                            Approve KYC Document
                          </Button>
                          <Button size='small' startIcon={<ThumbUpIcon />} variant="contained" color="primary" sx={{ marginLeft: '1rem' }} onClick={handleKYCAddress}>
                            Approve KYC Address
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}

export default UserKyc;
