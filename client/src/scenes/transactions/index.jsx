import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import {DataGrid, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {useGetCustomersQuery, useGetTransactionsQuery} from '../../state/api';
import Header from '../../components/Header';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar'

const Transactions = () => {
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("")

  // const { data, isLoading } = useGetTransactionsQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search 
  // });

  const { data, isLoading } = useGetCustomersQuery()

  console.log("Transaction Data", data);

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

export default Transactions