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
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';



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
  const loading = useSelector((state) => state.escrow.loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [filter, setFilter] = useState('');
  const [escrowId, setEscrowId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEscrow, setSelectedEscrow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      
      const escrowTrasnaction = await dispatch(fetchAllEscrow());
      console.log('Escrow transactions when component mounts:', escrowTrasnaction);
    };
    fetch();
  }, [dispatch]);

  const handleViewEscrow = (escrow) => {
    setSelectedEscrow(escrow);
    setOpenDialog(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


// function to calculate all On Going Escrow transactions
  
  const pendingTransactions = transactions.filter(transaction => transaction.status === 'pending');
  const pendingTransactionsCount = pendingTransactions.length;






 // Function to determine status background color
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'pending':
        return 'rgba(255, 0, 0, 0.3)'; // Red with 30% opacity
      case 'On transit':
        return 'rgba(255, 255, 0, 0.3)'; // Yellow with 30% opacity
      case 'Delivered':
        return 'rgba(0, 128, 0, 0.3)'; // Green with 30% opacity
      default:
        return 'transparent';
    }
  };

  const handleSearch = () => {
    const filteredByEscrowId = transactions.filter((transaction) =>
      transaction.escrowId.toString().includes(escrowId.toLowerCase())
    );
    const filteredByDate = transactions.filter(
      (transaction) => transaction.date === transactionDate
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
    { field: 'id', headerName: 'Escrow ID', flex: 1 },
    { field: 'buyerName', headerName: 'Buyer Username', flex: 1 },
    { field: 'sellerName', headerName: 'Merchant Username', flex: 1 },
    { field: 'fee', headerName: 'Amount', flex: 1 },
    { field: 'productType', headerName: 'Product Type', flex: 1 },
    { field: 'created_at', headerName: 'Date of Transaction', flex: 1 },
    {
              field: 'status',
              headerName: 'Delivery Status',
               flex: 1,
              renderCell: (params) => (
              <span style={{ backgroundColor: getStatusBackgroundColor(params.value), borderRadius: '8px', padding: '4px 8px' }}>{params.value}</span>
               )
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
          >View</Button>
      )
    },
  ];

  return (
    <Container style={{ marginTop: '30px' }}>

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
            <Typography variant="h4" component="div">{pendingTransactionsCount }</Typography>
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
      ) : (
           <div style={{ height: 400, width: '100%', marginTop: '1rem' }}>
        <DataGrid
          rows={transactions}
          columns={escrowColumn}
          pageSize={rowsPerPage}
          pagination
          onPageChange={handleChangePage}
        />
      </div>
     ) }

 <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle className='Dialog-title-header'>Escrow Details</DialogTitle>
  <DialogContent>
    {selectedEscrow ? (
      <Box>
        {Object.keys(selectedEscrow)
          .filter((key) => key !== 'buyer_id' && key !== 'seller_id') // Filter out buyer_id and seller_id
          .map((key) => (
            <TextField
              key={key}
              label={key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              fullWidth
              margin="dense"
              value={selectedEscrow[key]}
              InputProps={{
                readOnly: true,
              }}
            />
          ))}
      </Box>
    ) : (
      <CircularProgress />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </Container>
  );
};

export default TransactionPage;
