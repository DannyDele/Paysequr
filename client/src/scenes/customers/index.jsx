import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonBase, useTheme } from '@mui/material';
import { useGetCustomersQuery } from '../../state/api';
import Header from '../../components/Header';
import {DataGrid} from '@mui/x-data-grid';
import UserActions from '../../components/UserActions';

const Customers = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetCustomersQuery();
    console.log('Customers data', data);
    
            // FOR THE ACTUAL API
    // const fetchData = async () => {
    //     const response = await fetch("https://paysequr.com/api-admin/all_users");
    //     const data = await response.json();
    //     setUsers(data);
    //   }

    //   useEffect(() => {
    //     fetchData();
    //   }, []);
  
    

    // // //   console.log(data);
    // const [users, setUsers] = useState({})

    // console.log("user's array", users?.users?.result);
    
    
      
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex : 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex : 0.5,
        },
        // {
        //     field: "firstname",
        //     headerName: "First Name",
        //     flex : 0.5,
        // },
        // {
        //     field: "lastname",
        //     headerName: "Last Name",
        //     flex : 0.5,
        // },
        {
            field: "email",
            headerName: "Email",
            flex : 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex : 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex : 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex : 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            flex : 0.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => <UserActions {...{ params }} />,
          },
     ]

  return (

    <Box m="1.5rem 2.5rem">
        <Header title="CUSTOMERS" subtitle="List of Customers"/>
        {/* <Button variant='primary' color='primary'>Test</Button> */}
        <Box
            mt="40px"
            height="75vh"
            // sx={{
            //     "& .MuiDataGrid-root": {
            //       border: "none",
            //     },
            //     "& .MuiDataGrid-cell": {
            //       borderBottom: "none",
            //     },
            //     "& .MuiDataGrid-columnHeaders": {
            //       backgroundColor: theme.palette.background.alt,
            //       color: theme.palette.secondary[100],
            //       borderBottom: "none",
            //     },
            //     "& .MuiDataGrid-virtualScroller": {
            //       backgroundColor: theme.palette.primary.light,
            //     },
            //     "& .MuiDataGrid-footerContainer": {
            //       backgroundColor: theme.palette.background.alt,
            //       color: theme.palette.secondary[100],
            //       borderTop: "none",
            //     },
            //     "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            //       color: `${theme.palette.secondary[200]} !important`,
            //     },
            //     "& .PrivateSwitchBase-input css-1m9pwf3": {
            //       color: "red"
            //     }
            //   }}
        >
            <DataGrid
                loading = {isLoading || !data}
                getRowId={(row) => row._id}
                rows= { data || [] }
                columns={columns}
                checkboxSelection
            />
        </Box>
    </Box>
  )
}

export default Customers