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
import { fetchUsers, fetchUserById, fetchUserAccount, deleteUsers } from './../../redux/userSlice';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import ViewUser from '../features/user/ViewUser';
import EditUser from '../features/user/EditUser';

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
  const userDetails = useSelector((state) => state.users.userDetails);

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
  const [selectedUserId, setSelectedUserId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); // State for delete confirmation dialog
  

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      await dispatch(fetchUsers());
      setLoading(false);
    };
    fetchAllUsers();
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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

  const handleMenuAction = async (action) => {
    handleMenuClose();
    if (action === 'View') {
      const userDetails = await dispatch(fetchUserById(selectedUserId));
      const userAccDetails = await dispatch(fetchUserAccount(selectedUserId));
      setIsViewMode(true);
    } else if (action === 'Edit') {
      const userDetails = await dispatch(fetchUserById(selectedUserId));
      setIsEditMode(true);
    } else if (action === 'Query') {
      handleQueryUser(selectedUserId);
    } else if (action === 'Delete') {
      handleDialogOpen(); // Open the confirmation dialog for delete
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
          onClose={() => setIsViewMode(false)}
        />
      ) : isEditMode ? (
        <EditUser
          user={userDetails}
          onClose={() => setIsEditMode(false)}
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
            {loading ? (
              <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
            ) : (
              <DataGrid
                rows={users}
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
                event.stopPropagation();
                handleMenuAction('Delete');
              }}
            >
              <DeleteIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              Delete
            </MenuItem>
          </StyledMenu>

          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteUser} variant="contained" style={{ backgroundColor: 'red', textTransform: 'capitalize' }} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default UserDatabase;
