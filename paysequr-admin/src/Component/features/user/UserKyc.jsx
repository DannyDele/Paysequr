import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchUserKyc } from './../../../redux/userKycSlice';
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
  TableFooter,
  Button,
  Chip,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

import tableCellStyle from '../../utils/helperFunctions'

function UserKyc({ onClose, userId }) {
  const dispatch = useDispatch();
  const userKyc = useSelector((state) => state.userKyc.userKyc);
  const [loading, setLoading] = useState(false);
  const [filteredUserKyc, setFilteredUserKyc] = useState([]);

  useEffect(() => {
    const fetchAllKycUsers = async () => {
      setLoading(true);
      await dispatch(fetchUserKyc());
      setLoading(false);
    };
    fetchAllKycUsers();
  }, [dispatch]);

  // Filter user KYC data based on the current user ID
  useEffect(() => {
    if (userKyc && userKyc.length > 0) {
      const filteredKyc = userKyc.filter((kyc) => kyc.userid === userId);
      console.log('Filtered user KYC info:', filteredKyc)
      setFilteredUserKyc(filteredKyc);
    }

  }, [userKyc, userId]);



  return (
<div>
  <Paper style={{ padding: '20px', marginBottom: '2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ArrowBackIcon sx={{ marginRight: '1rem' }} onClick={onClose} />
      <Typography variant="h5">User KYC Details</Typography>
    </div>
  </Paper>

  {filteredUserKyc.length === 0 ? (
    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginTop: '50vh' }}>No KYC Document for this user</Typography>
  ) : (
          filteredUserKyc.map((kyc) => (
            <div style={{ display: 'flex', color:'red' }}>
 
      <div key={kyc.id} style={{width:'50%', marginRight:'10px' }}>
        <Paper style={{ padding: '20px', flexBasis: '55%', flexGrow: 1 }}>
          <TableContainer>
            <Table>
                      <TableHead>
                    <Typography sx={{textAlign:'center', display:'flex', alignItems:'center'}} variant='h5'>User Profile Info</Typography>

                <TableRow>
                  <TableCell style={tableCellStyle(true)}>Title</TableCell>
                  <TableCell style={tableCellStyle(true)}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>First Name</TableCell>
                  <TableCell>{kyc?.firstname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Middle Name</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.middlename}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Last Name</TableCell>
                  <TableCell>{kyc?.lastname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Gender</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Birth Date</TableCell>
                  <TableCell>{kyc?.birth_date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Country</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>City</TableCell>
                  <TableCell>{kyc?.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Street</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.street}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Phone</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.phone}</TableCell>
                </TableRow>
              
                {/* Add more KYC details here */}
              </TableBody>


            </Table>
          </TableContainer>
                </Paper>
                      </div>



{/* User Kyc Document Details */}
        <Paper style={{ padding: '20px', flexBasis: '55%', flexGrow: 1 }}>
          <div className='flex flex-col'>
            <TableContainer>
            <Table>
                      <TableHead>
     <Typography sx={{textAlign:'center', display:'flex', alignItems:'center'}} variant='h5'>User Document Info</Typography>

                <TableRow>
                  <TableCell style={tableCellStyle(true)}>Title</TableCell>
                  <TableCell style={tableCellStyle(true)}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              <TableRow>
                  <TableCell style={tableCellStyle(false)}>BVN</TableCell>
                  <TableCell>{kyc?.bvn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>User ID</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.userid}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Status</TableCell>
                  <TableCell>
                    <Chip label={kyc?.status} style={{ color: 'white', backgroundColor: 'green' }} />
                  </TableCell>
                        </TableRow>
                         <TableRow>
                  <TableCell style={tableCellStyle(false)}>Postal Code</TableCell>
                  <TableCell>{kyc?.postal_code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Address Status</TableCell>
                     <TableCell style={tableCellStyle(false)}>
                    <Chip label={kyc?.address_status} style={{ color: 'white', backgroundColor: 'green' }} />
                     </TableCell>

                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Document Status</TableCell>
                  <TableCell>{kyc?.document_status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableCellStyle(false)}>Document Type</TableCell>
                  <TableCell style={tableCellStyle(false)}>{kyc?.document_type}</TableCell>
                        </TableRow>

                      </TableBody>
                      
                      <TableFooter>
      <TableRow>
        <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                    <Button
                      startIcon={<VisibilityIcon/>}
            variant="contained"
            color="primary"
            // disabled={!kyc?.address_image}
          >
            View Address Image
          </Button>
                    <Button
              startIcon={<VisibilityIcon/>}

            variant="contained"
            color="primary"
            // disabled={!kyc?.document_image}
            style={{ marginLeft: '10px' }}
          >
            View Document Image
          </Button>
                    <Button
            startIcon={<VisibilityIcon/>}

            variant="contained"
            color="primary"
            // disabled={!kyc?.document_image_back}
            style={{ marginTop: '10px' }}
          >
            View Document Back Image
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>

                  
            </Table>
          </TableContainer>
            
          </div>
        </Paper>





      </div>
    ))
  )}
</div>


  );
}

export default UserKyc;
