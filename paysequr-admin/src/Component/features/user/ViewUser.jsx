import React, { useState, useEffect } from 'react';
import {
  Paper,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditUser from './EditUser';
import UserKyc from './UserKyc';
import tableCellStyle from '../../utils/helperFunctions'






function ViewUser({ user, onClose, userAccount, userId }) {
  

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Add state for edit mode
  const [isViewKycMode, setIsViewKycMode] = useState(false); // Add state for view user kyc mode
  const [isImgageExpand, setIsImageExpand] = useState(false)
  const [openImageDialog, setOpenImageDialog] = useState(false)
 
  


  
  const transactionData = [
    {
      id: 'T001',
      date: '2024-05-01',
      type: 'Credit',
      amount: '$100',
      status: 'Completed',
    },
    {
      id: 'T002',
      date: '2024-05-03',
      type: 'Debit',
      amount: '$50',
      status: 'Pending',
    },
    // Add more transaction data as needed
  ];

  const handlePrintReceipt = (transactionId) => {
    // Implement the print receipt functionality here
    console.log(`Printing receipt for transaction ID: ${transactionId}`);
  };


    // Function to delete a user
  const handleDelete = () => {
    // Implement delete functionality here
    console.log(`Deleting user ID: ${user.id}`);
    setOpenDialog(false);
  };

  const handleDeleteOpenDialog = () => {
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
          // handleDeleteUser();
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        }
      });
    setOpenDeleteDialog(true);
  };

  const handleDeleteCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

    
  const handleEdit = () => {
    setIsEditMode(true); // Set edit mode to true when the Edit button is clicked
  };
    
  const handleViewKyc = () => {
    setIsViewKycMode(true); // Set edit mode to true when the Edit button is clicked
  };

// *******************************************************8**
  // funtion to expan user image
  // ********************************************************

    const handleImageClick = () => {
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };
    
    return (
      
        <>        
            
        
            {isEditMode ? (
                <EditUser user={user} onClose={() => setIsEditMode(false)} />
            
        ) : isViewKycMode ? (<UserKyc
             userId={userId}
            onClose={() => setIsViewKycMode(false)} />) 

            : (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* User View Paper */}
                        <Paper style={{ padding: '20px', marginBottom: '2rem' }}>
            <div className='flex items-center'>
                <ArrowBackIcon sx={{ marginRight: '1rem' }} onClick={onClose} />                     
            <Typography variant='h5'>User View</Typography>
            </div>
      </Paper>

      {/* User Details Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', color:'red' }}>
        {/* Personal Information */}
        <Paper style={{ padding: '20px', marginRight: '20px', flexBasis: '40%', flexGrow: 0 }}>
          <div className='flex flex-col'>
            <div className='flex justify-center text-center'>
              <Paper sx={{ width: '100%', display: 'flex', padding: '.5rem', justifyContent: 'center', textAlign: 'center' }}>
                <Avatar onClick={handleImageClick} alt={user?.username} src={user?.profilePicture} sx={{ width: 100, height: 100 }} />
              </Paper>
            </div>
            <div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={tableCellStyle(true)}>Title</TableCell>
                      <TableCell style={tableCellStyle(true)}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 2)}>First Name</TableCell>
                      <TableCell style={tableCellStyle(false, 2)}>{user?.firstname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 3)}>Last Name</TableCell>
                      <TableCell style={tableCellStyle(false, 3)}>{user?.lastname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 0)}>Username</TableCell>
                      <TableCell style={tableCellStyle(false, 0)}>{user?.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 1)}>Email</TableCell>
                      <TableCell style={tableCellStyle(false, 1)}>{user?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 4)}>Date of Birth</TableCell>
                      <TableCell style={tableCellStyle(false, 4)}>{user?.dob}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 1)}>Tier</TableCell>
                      <TableCell style={tableCellStyle(false, 1)}>{user?.tier}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 6)}>Verified Status</TableCell>
                                <TableCell style={tableCellStyle(false, 6)}>
                    <Chip label={user?.vstatus} style={{ color: 'white', backgroundColor: 'green' }} />
                                </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 1)}>Account Number</TableCell>
                      <TableCell style={tableCellStyle(false, 1)}>{userAccount?.wallet.acct_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={tableCellStyle(false, 6)}>Balance</TableCell>
                      <TableCell style={tableCellStyle(false, 6)}>₦{userAccount?.wallet.accessable_balance}</TableCell>
                    </TableRow>
                    {/* Add more user personal info here */}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="primary" style={{ textTransform: 'capitalize' }}>
                Edit
              </Button>
              <Button variant="contained" style={{ backgroundColor: 'red', textTransform: 'capitalize' }} onClick={handleDeleteOpenDialog}>
                Delete
              </Button>
            </div>
          </div>
        </Paper>

        {/* Account Details */}
        <Paper style={{ padding: '20px', flexBasis: '55%', flexGrow: 1 }}>
          <div className='flex flex-col'>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '50%', marginBottom: '70px' }}>
                    <Avatar variant="square" src={user?.profilePicture} sx={{ backgroundColor: '#1565C0', borderRadius: '5px', marginRight: '10px', width: 100, height: 100 }}>
                    <AccountBalanceWalletIcon/>
                </Avatar>
                <div>
                  <Typography sx={{fontSize:'0.875rem'}} variant="h6">Total Balance</Typography>
                  <Typography variant="h6">₦{userAccount?.wallet.accessable_balance}</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '50%', marginBottom: '70px' }}>
                    <Avatar variant="square" src={user?.profilePicture} sx={{ backgroundColor: '#1565C0', borderRadius: '5px', marginRight: '10px', width: 100, height: 100 }}>
                    <AccountBalanceWalletIcon/>
                </Avatar>
                <div>
                  <Typography sx={{fontSize:'0.875rem'}}  variant="h6">Total Escrow</Typography>
                  <Typography variant="h6">₦0</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                        <Avatar variant="square" sx={{ backgroundColor: '#1565C0', borderRadius: '5px', marginRight: '10px', width: 100, height: 100 }}>
                                                
                <AccountBalanceWalletIcon/>
                </Avatar>
                <div>
                  <Typography sx={{fontSize:'0.875rem'}} variant="h6">Current Escrow Sent</Typography>
                  <Typography variant="h6">₦0</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                     <Avatar variant="square" sx={{ backgroundColor: '#1565C0', borderRadius: '5px', marginRight: '10px', width: 100, height: 100 }}>
                    <AccountBalanceWalletIcon/>        

                </Avatar>
                <div>
                  <Typography sx={{fontSize:'0.875rem'}} variant="h6">Current Escrow Pending</Typography>
                  <Typography variant="h6">₦0</Typography>
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <Button sx={{ textTransform: 'capitalize', backgroundColor: '#0DA8EE' }} onClick={handleViewKyc} variant="contained">
                View Kyc Document
              </Button>
            </div>
          </div>
        </Paper>
      </div>

      {/* Transaction Details Section */}
      <Paper style={{ padding: '20px', marginTop: '2rem' }}>
        <Typography variant="h6">Transaction Details</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={tableCellStyle(true)}>Transaction ID</TableCell>
                <TableCell style={tableCellStyle(true)}>Date</TableCell>
                <TableCell style={tableCellStyle(true)}>Type</TableCell>
                <TableCell style={tableCellStyle(true)}>Amount</TableCell>
                <TableCell style={tableCellStyle(true)}>Status</TableCell>
                <TableCell style={tableCellStyle(true)}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData.map((transaction, index) => (
                <TableRow key={transaction.id}>
                  <TableCell style={tableCellStyle(false, index)}>{transaction.id}</TableCell>
                  <TableCell style={tableCellStyle(false, index)}>{transaction.date}</TableCell>
                  <TableCell style={tableCellStyle(false, index)}>{transaction.type}</TableCell>
                  <TableCell style={tableCellStyle(false, index)}>{transaction.amount}</TableCell>
                  <TableCell style={tableCellStyle(false, index)}>{transaction.status}</TableCell>
                  <TableCell style={tableCellStyle(false, index)}>
                    <Button style={{ textTransform: 'capitalize' }} size='small' variant="contained" onClick={() => handlePrintReceipt(transaction.id)}>
                      Print Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>


                

                {/* Expanded image Dialog */}
          <Dialog styl open={openImageDialog} onClose={handleCloseImageDialog}>
            <DialogContent>
              <img src={user.profilePicture} alt={user.username} style={{ width: '100%', height: 'auto' }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImageDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
                </div>
                  
              )}
              </>
  );
}

export default ViewUser;
