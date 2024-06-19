import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import '../../assets/styles/DialogHeader.css';
import {
  Container,
  TextField,
  CircularProgress,
  Box,
  Button,
  Snackbar,
  SnackbarContent,
  Slide,
  IconButton,
  Paper,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Visibility as VisibilityIcon,
  EditNote as EditNoteIcon,
  QueryStats as QueryStatsIcon,
  Delete as DeleteIcon,
  HourglassEmpty,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { fetchUsers, fetchUserById, fetchUserAccount, deleteUsers} from './../../redux/userSlice';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import ViewUser from '../features/user/ViewUser';
import EditUser from '../features/user/EditUser';
import Swal from 'sweetalert2';





// StyledMenu is a styled component that customizes the appearance of the Menu component from Material-UI.
// It sets specific styles for the paper, list, and menu item elements within the Menu component.
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));



// useStyles is a function provided by Material-UI's makeStyles hook to define custom styles.
// It creates CSS classes based on the provided theme.
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
  const error = useSelector((state) => state.users.error);
  const userAccount = useSelector((state) => state.users.userAccount);
  const userDetails = useSelector((state) => state.users.userDetails);
  const userKyc = useSelector((state) => state.userKyc.userKyc);


  // set error state when fetching a user details
  const [userError, setUserError] = useState('')
  const [userAccountError, setUserAccountError] = useState('')

  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openQuerryDialog, setOpenQuerryDialog] = useState(false);
  const [userName, setUserName] = useState('');
  const [reason, setReason] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for delete confirmation dialog
  const [selectedUserId, setSelectedUserId] = useState('');


// snackbar alert state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

// state to manage datgrid table search filters
  const [allUsers, setAllUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);




  
  
  // *************************************************
  // function to fecth all users when the page loads
  // *************************************************

useEffect(() => {
  const fetchAllUsers = async () => {
    setLoading(true);
    const result = await dispatch(fetchUsers());
    setLoading(false);
    setAllUsers(result.payload);
    setFilteredUsers(result.payload);
  };
  fetchAllUsers();
}, [dispatch]);



  // *******************************************************************************
  // Funtion to display error message if an error occurs while fetching users
  // *******************************************************************************
    useEffect(() => {
    if (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error || 'An error occurred');
      setSnackbarOpen(true);
    }
  }, [error]);
 

  // function to search for a user
 const handleSearch = (e) => {
  const value = e.target.value;
  setSearchQuery(value);

  const filtered = users.filter((user) =>
    user.username.toLowerCase().includes(value.toLowerCase()) ||
    user.firstname.toLowerCase().includes(value.toLowerCase()) ||
    user.lastname.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredUsers(filtered);
  };
  


  const handleTabChange = async (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      const wallet = await dispatch(fetchUserAccount(selectedUser.id));
      console.log('User Account:', wallet);
    }
  };

  const handleQueryUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setUserName(`${user.firstname} ${user.lastname}`);
      setOpenQuerryDialog(true);
    }
  };

  const handleQuery = () => {
    alert('Querying user...');
  };


  
  // **************************************
  // function to delete a user
  // **************************************

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const deletedUser = await dispatch(deleteUsers(selectedUserId));
      setLoading(false);
      setSnackbarSeverity('success');
      setSnackbarMessage('User deleted successfully!');
      setSnackbarOpen(true);
      setDialogOpen(false); // Close the dialog after deletion
    } catch (error) {
      setLoading(false);
      setDialogOpen(false); // Close the dialog in case of error
      console.error('Error deleting user:', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCloseQuerryDialog = () => {
    setOpenQuerryDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedUserId(row.id);
    setSelectedUser(row);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };



  
  
  // *************************************************************
  // function to open action menu for delete, view or edit a user
  // *************************************************************
const handleMenuAction = async (action) => {
    handleMenuClose();
    if (action === 'View') {
      const userDetails = await dispatch(fetchUserById(selectedUserId));
      console.log('User Details coming from dispatch:', userDetails)
      setUserError(userDetails.payload.msg);
      const userAccDetails = await dispatch(fetchUserAccount(selectedUserId));
      setIsViewMode(true);
    } else if (action === 'Edit') {
      const userDetails = await dispatch(fetchUserById(selectedUserId));
      setIsEditMode(true);
    } else if (action === 'Query') {
      handleQueryUser(selectedUserId);
    } else if (action === 'Delete') {
      // Use SweetAlert for delete confirmation
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete user',
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteUser();
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        }
      });
    }
  };

  const handleRowSelection = (newSelection) => {
    if (newSelection.length > 0) {
      const selectedRow = users.find((user) => user.id === newSelection[0]);
      setSelectedUserId(selectedRow.id);
      setSelectedUser(selectedRow);
    } else {
      setSelectedUserId('');
      setSelectedUser(null);
    }
  };

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
          {params.value === 'verified' ? (
            <VerifiedIcon style={{ color: 'green', marginRight: 5 }} />
          ) : (
            <HourglassEmpty style={{ color: '#227BD4', marginRight: 5 }} />
          )}
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            aria-controls={menuAnchorEl ? 'customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuAnchorEl ? 'true' : undefined}
            variant="contained"
            size="small"
            endIcon={<ArrowDropDownIcon />}
            onClick={(event) => handleMenuOpen(event, params.row)}
          >
            Action
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      {isViewMode ? (
        <ViewUser
          user={userDetails}
          userAccount={userAccount}
          userId={selectedUserId}
          userError={userError}
          onClose={() => setIsViewMode(false)}
        />
      ) : isEditMode ? (
        <EditUser
          user={userDetails}
          onClose={() => setIsEditMode(false)}
        />
      ) : (
            <>
              {/* snackbar component */}
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

          <Box mt={4}>
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
              </Box>
              
          <div style={{ height: 500, width: '100%', marginTop:'1rem' }}>
            {loading ? (
              <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
            ) : (
            <DataGrid
  rows={filteredUsers}
  columns={columns}
  pageSize={10}
  rowsPerPageOptions={[10, 20, 50]}
  checkboxSelection
  disableSelectionOnClick
  selectionModel={selectedUser ? [selectedUser.id] : []}
  onSelectionModelChange={(newSelection) => handleRowSelection(newSelection)}
/>

            )}
          </div>

              {/* component for action menu */}
          <StyledMenu
            id="customized-menu"
            MenuListProps={{
              'aria-labelledby': 'customized-button',
            }}
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleMenuAction('View');
              }}
            >
              <VisibilityIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              View
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleMenuAction('Edit');
              }}
            >
              <EditNoteIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              Edit
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleMenuAction('Query');
              }}
            >
              <QueryStatsIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              Query
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();0
                handleMenuAction('Delete');
              }}
            >
              <DeleteIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              Delete
            </MenuItem>
          </StyledMenu>

        
        </>
      )}
    </Container>
  );
};

export default UserDatabase;
