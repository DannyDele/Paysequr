import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonBase, useTheme } from '@mui/material';
import { useGetCustomersQuery } from '../../state/api';
import Header from '../../components/Header';
import {DataGrid} from '@mui/x-data-grid';
import UserActions from './UserActions';
import { useNavigate } from 'react-router-dom';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';

const Customers = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetCustomersQuery();
    const navigate = useNavigate();
    console.log('Customers data', data);

    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    
            // FOR THE ACTUAL API
    // const fetchData = async () => {
    //     const response = await fetch("https://paysequr.com/api-admin/all_users");
    //     const data = await response.json();
    //     setUsers(data);
    //   }

    //   useEffect(() => {
    //     fetchData();
    //   }, []);
  
    

    // //   console.log(data);
    // const [users, setUsers] = useState({})

    // console.log("user's array", users?.users?.result);
    
    const handleVerification = (id) => {
        navigate(`/users/${id}`)
    }

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex : 1,
        },
        // {
        //     field: "name",
        //     headerName: "Name",
        //     flex : 0.5,
        // },
        {
            field: "firstname",
            headerName: "First Name",
            flex : 0.5,
        },
        {
            field: "lastname",
            headerName: "Last Name",
            flex : 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex : 1,
        },
        // {
        //     field: "phoneNumber",
        //     headerName: "Phone Number",
        //     flex : 0.5,
        //     renderCell: (params) => {
        //         return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
        //     }
        // },
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
            field: 'verification',
            headerName: 'Verification',
            type: 'actions',
            width: 120,
            renderCell: (params) => <Button {...{ params }} sx={{backgroundColor: "green", color: "white"}} onClick = {() => handleVerification(params.id)} >Verify</Button>,
          },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 90,
            renderCell: (params) => <UserActions {...{ params }} />,
          },
     ]

  return (

    <Box m="1.5rem 2.5rem">
        <Header title="USERS" subtitle="List of Users"/>
        <Box
            mt="40px"
            height="75vh"
        >
            <DataGrid
                loading = {isLoading || !data}
                getRowId={(row) => row.id}
                rows= { data?.users?.result || [] }
                columns={columns}
                checkboxSelection
                components={{Toolbar: DataGridCustomToolbar}}
                componentsProps={{
                  toolbar: { searchInput, setSearchInput, setSearch },
                }}
            />
        </Box>
    </Box>
  )
}

export default Customers