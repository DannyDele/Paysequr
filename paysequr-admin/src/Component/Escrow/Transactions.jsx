import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEscrow } from '../../redux/escrowSlice';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  SnackbarContent,
  Slide,
  IconButton,
  Chip, 
} from '@mui/material';
import {
  ShoppingCartOutlined,
  ScheduleOutlined,
  DoneAllOutlined,
  Search,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@mui/icons-material';
import UserEscrowDetails from '../features/UserEscrowDetails'




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







const TransactionPage = () => {
  const transactions = useSelector((state) => state.escrow.escrow);
  const error = useSelector((state) => state.escrow.error);
  const loading = useSelector((state) => state.escrow.loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [filter, setFilter] = useState('');
  const [escrowId, setEscrowId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEscrow, setSelectedEscrow] = useState(null);
  const [openEscrowDialog, setOpenEscrowDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const escrowTransaction = await dispatch(fetchAllEscrow());
      console.log('Escrow transactions when component mounts:', escrowTransaction);

      if (error) {
        console.error('Error fetching escrow transactions:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage(error);
        setSnackbarOpen(true);
      }
    };
    fetch();
  }, [dispatch]);


  // function to view user escrow details
  const handleViewEscrow = (escrow) => {
    setSelectedEscrow(escrow);
    console.log('Clicked Escrow User:', escrow)
    setOpenEscrowDialog(true);
  };

  // fucntion to close user escrow details

  const handleCloseEscrowDetails = () => {
    setOpenEscrowDialog(false)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to calculate all On Going Escrow transactions
  const pendingTransactions = transactions.filter(transaction => transaction.status === 'pending');
  const pendingTransactionsCount = pendingTransactions.length;

  // Function to determine status background color
  const getStatusBackgroundColor = (status) => {
   switch (status) {
      case 'canceled':
        return <Chip label="Canceled" color="error" />;
      case 'modified by buyer':
        return <Chip label="Modified by Buyer" sx={{backgroundColor:'green', color: 'white'}} />;
      case 'modified by merchant':
        return <Chip label="Modified by Merchant" sx={{backgroundColor:'green', color: 'white'}} />;
      default:
        return <Chip label={status} />;
    }
  };


  // function to search for a user escrow
  const handleSearch = () => {
    const filteredByEscrowId = transactions.filter((transaction) =>
      transaction.escrow_id.toString().includes(escrowId.toLowerCase())
    );
    const filteredByDate = transactions.filter(
      (transaction) => transaction.created_at === transactionDate
    );
    const finalFilteredTransactions = filteredByEscrowId.filter((transaction) =>
      filteredByDate.includes(transaction)
    );
    return finalFilteredTransactions;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const iconSpringProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  const cartSpringProps = useSpring({
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(10px)' },
    loop: { reverse: true },
  });

  const tickSpringProps = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    loop: { reverse: true },
  });

  const checkSpringProps = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.2)' },
    loop: { reverse: true },
  });

  const escrowColumn = [ 
     { field: 'escrow_id', headerName: 'Escrow ID', flex: 1 },
    {
      field: 'buyerName',
      headerName: 'Buyer Username',
      flex: 1,
      valueGetter: (params) => JSON.parse(params.row.buyer).username,
    },
    {
      field: 'sellerName',
      headerName: 'Merchant Username',
      flex: 1,
      valueGetter: (params) => JSON.parse(params.row.seller).username,
    },
    { field: 'fee', headerName: 'Amount', flex: 1 },
    {
      field: 'created_at',
      headerName: 'Date of Transaction',
      flex: 1,
      valueGetter: (params) => new Date(params.row.created_at).toLocaleDateString(),
    },
    {
      field: 'escrow_status',
      headerName: 'Delivery Status',
      flex: 1,
      renderCell: (params) => getStatusBackgroundColor(params.value),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            console.log('Escrow id Clicked:', params.row.id);
            handleViewEscrow(params.row);
          }}
        >
          View
        </Button>
      )
    },
  ];

  return (
    <Container style={{ marginTop: '30px' }}>
      
      {openEscrowDialog ? (<UserEscrowDetails
        escrow ={selectedEscrow}
        onClose={() => handleCloseEscrowDetails()} />) : (
        <div>
           {/* Snack bar component */}
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
              {snackbarSeverity === 'success' ? (
                <CheckCircleIcon className={classes.icon} />
              ) : (
                <ErrorIcon className={classes.icon} />
              )}
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

      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={6} sm={3}>
          <Paper elevation={3} sx={{ textAlign: 'center', padding: '1rem', height: '180px', width: '230px' }}>
            <animated.div style={{ ...iconSpringProps, ...cartSpringProps }}>
              <ShoppingCartOutlined sx={{ fontSize: 50, color: '#F36C00' }} />
            </animated.div>
            <Typography variant="h6" gutterBottom>Total Ongoing</Typography>
            <Typography variant="h4" component="div">5</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={3} sx={{ textAlign: 'center', padding: '1rem', height: '180px', width: '230px' }}>
            <animated.div style={{ ...iconSpringProps, ...tickSpringProps }}>
              <ScheduleOutlined sx={{ fontSize: 50, color: '#F36C00' }} />
            </animated.div>
            <Typography variant="h6" gutterBottom>Total Pending</Typography>
            <Typography variant="h4" component="div">{pendingTransactionsCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={3} sx={{ textAlign: 'center', padding: '1rem', height: '180px', width: '230px' }}>
            <animated.div style={{ ...iconSpringProps, ...checkSpringProps }}>
              <DoneAllOutlined sx={{ fontSize: 50, color: '#F36C00' }} />
            </animated.div>
            <Typography variant="h6" gutterBottom>Total Completed</Typography>
            <Typography variant="h4" component="div">10</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper sx={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '180px', backgroundColor: 'inherit', boxShadow: 'none' }}>
            <TextField
              select
              label="Filter by Status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
              style={{ marginBottom: '0.5rem' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Not Shipped</MenuItem>
              <MenuItem value="On transit">On transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </TextField>
            <TextField
              label="Trans. Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              size="small"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              style={{ marginBottom: '0.5rem' }}
            />
            <TextField
              label="Escrow ID"
              fullWidth
              size="small"
              value={escrowId}
              onChange={(e) => setEscrowId(e.target.value)}
            />
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginTop: '20px', color: '#222' }}>
        Escrow Transactions
      </Typography>

      {loading ? (
        <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
      ) : error ? (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: '20px' }}>
          Failed to load escrow transactions. Please try again later.
        </Typography>
      ) : (
        <div style={{ height: 400, width: '100%', marginTop: '1rem' }}>
          <DataGrid
            rows={transactions}
            columns={escrowColumn}
            pageSize={rowsPerPage}
            pagination
            onPageChange={handleChangePage}
            getRowId={(row) => row.escrow_id} // Use a field that you know is unique

          />
        </div>
      )}

        </div>
      ) }

    </Container>
  );
};

export default TransactionPage;
