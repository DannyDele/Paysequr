import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, fetchUserById, fetchUserAccount, deleteUsers } from './../../redux/userSlice';
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
   Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Avatar,
  IconButton
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Visibility as VisibilityIcon,
  EditNote as EditNoteIcon,
  QueryStats as QueryStatsIcon,
  Delete as DeleteIcon,
  HourglassEmpty,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { Edit, Delete, Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
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






const CompletedVerifications = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userAccount = useSelector((state) => state.users.userAccount);
  const userDetails = useSelector((state) => state.users.userDetails);  const classes = useStyles();
  


  
    const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);




  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false); // State for delete confirmation dialog




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
  
  
  
  
  
  

   const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
  
    // ******************************************************************
  // Function to trigger action button menu e.g 'view, delete, edit
  // ******************************************************************
  
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






  // Filter users to display only those with vstatus === 'verified'
  const verifiedUsers = users.filter(user => user.vstatus === 'verified');
  


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
    <div>

      {isViewMode ? (
        <ViewUser
          user={userDetails}
          userAccount={userAccount}
          onClose={() => setIsViewMode(false)}
        />) : (
    <div style={{ marginLeft: '50px', marginTop: '20px', height: 500, width: '95%' }}>
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
      


 {/* action menu for user */}
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
      
          {/* Dialog to confirm user delete */}
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




        </div>
      )}
    </div>
  );
};

export default CompletedVerifications;
