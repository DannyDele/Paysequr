import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonBase, useTheme } from '@mui/material';
import { useGetCustomersQuery } from '../../state/api';
import Header from '../../components/Header';
import {DataGrid} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import FlexBetween from '../../components/FlexBetween';
import ModalComponent from '../../components/Modal';
import BillActions from './BillActions';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
// import UserActions from './UserActions';

const Bills = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetCustomersQuery();
    const [isOpen, setIsOpen] = useState(false);
    
     const addBill = () =>{
        setIsOpen(true)
    };

    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("")
    
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
            flex : 0.5,
        },
        {
            field: "name",
            headerName: "Name of Payment",
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
            headerName: "Transaction ID",
            flex : 1,
        },
        {
            field: "phoneNumber",
            headerName: "Amount",
            flex : 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
            }
        },
        {
            field: "country",
            headerName: "Created At",
            flex : 0.4,
        },
        {
            field: "occupation",
            headerName: "Transaction Description",
            flex : 0.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => <BillActions {...{ params }} />,
          },
     ]

  return (

    <Box m="1.5rem 2.5rem">
        <FlexBetween>
        <Header title="Bills Management" subtitle="Details about Bill Payments made"/>
        <Box>
          <Button
            onClick={addBill}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "5px" }} />
            Add Bill Payment
          </Button>
        </Box>
        <ModalComponent open = {isOpen} onClose={() => setIsOpen(false)} />
        </FlexBetween>
        <Box
            mt="40px"
            height="75vh"
        >
            <DataGrid
                loading = {isLoading || !data}
                getRowId={(row) => row._id}
                rows= { data || [] }
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

export default Bills