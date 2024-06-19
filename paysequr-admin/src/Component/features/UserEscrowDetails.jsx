import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Chip,
  Card,
  CardContent,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserEscrowDetails({ escrow, onClose }) {
  // Parse the JSON strings for buyer, seller, and item
  const buyer = escrow?.buyer ? JSON.parse(escrow.buyer) : {};
  const seller = escrow?.seller ? JSON.parse(escrow.seller) : {};
  const item = escrow?.item ? JSON.parse(escrow.item) : {};

  // Function to handle escrow status state
  const getStatusChip = (status) => {
    switch (status) {
      case 'canceled':
        return <Chip label="Canceled" color="error" />;
      case 'modified by buyer':
        return <Chip label="Modified by Buyer" sx={{ backgroundColor: 'green', color: 'white' }} />;
      case 'modified by merchant':
        return <Chip label="Modified by Merchant" sx={{ backgroundColor: 'green', color: 'white' }} />;
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <div className='flex flex-col'>
      <Paper sx={{ padding: '2rem' }}>
        <div className='flex items-center'>
          <IconButton onClick={onClose}>
            <ArrowBackIcon style={{ marginRight: '.5rem' }} />
          </IconButton>
          <div>
            <Typography variant='h6'>User Escrow Details</Typography>
          </div>
        </div>
      </Paper>

      <Paper sx={{ marginTop: '2rem' }}>
        <TableContainer component={Paper}>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {/* Basic Info Card */}
            <Card sx={{ flex: '1 1 calc(33% - 16px)', margin: 1, backgroundColor: 'lightgrey' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Basic Info
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>{escrow?.escrow_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Buyer Name</TableCell>
                      <TableCell>{buyer.firstname} {buyer.lastname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Seller Name</TableCell>
                      <TableCell>{seller.firstname} {seller.lastname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Buyer ID</TableCell>
                      <TableCell>{buyer.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Seller ID</TableCell>
                      <TableCell>{seller.id}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Transaction Details Card */}
            <Card sx={{ flex: '1 1 calc(33% - 16px)', margin: 1, backgroundColor: 'lightgrey' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Transaction Details
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Amount from Buyer</TableCell>
                      <TableCell>₦{escrow?.amount_from_buyer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount to Seller</TableCell>
                      <TableCell>₦{escrow?.amount_to_seller}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>{getStatusChip(escrow?.escrow_status)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created At</TableCell>
                      <TableCell>{new Date(escrow?.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Details</TableCell>
                      <TableCell>{escrow?.details}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fee</TableCell>
                      <TableCell>₦{escrow?.fee}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card sx={{ flex: '1 1 calc(33% - 16px)', margin: 1, backgroundColor: 'lightgrey' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Additional Info
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Item No</TableCell>
                      <TableCell>{item.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell>{escrow?.location}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quantity</TableCell>
                      <TableCell>{escrow?.escrow_quantity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bus Stop</TableCell>
                      <TableCell>{escrow?.busStop}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell>{escrow?.state}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Station ID</TableCell>
                      <TableCell>{escrow?.escrow_stationid}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Waybill No</TableCell>
                      <TableCell>{escrow?.waybill}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Canceled At</TableCell>
                      <TableCell>{escrow?.canceled_at}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Completed At</TableCell>
                      <TableCell>{escrow?.completed_at}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Box>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default UserEscrowDetails;
