import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetPerformanceQuery } from '../../state/api';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/Header';
import UserActions from '../customers/UserActions';
import CustomColumnMenu from '../../components/DataGridCustomColumnMenu';

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetPerformanceQuery(userId);
  console.log(data);

  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex : 1,
    },
    {
        field: "userId",
        headerName: "User ID",
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
        field: "createdAt",
        headerName: "Created At",
        flex : 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex : 0.5,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex : 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 150,
        renderCell: (params) => <UserActions {...{ params }} />,
      },
 ];

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here"/>
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
            rows= { (data && data.sales) || [] }
            columns={columns}
            checkboxSelection
            components={{
              ColumnMenu: CustomColumnMenu
            }}
        />
    </Box>
</Box>
)
}

export default Performance;