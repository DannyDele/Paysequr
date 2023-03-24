import React from 'react';
import FlexBetween from '../../components/FlexBetween';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import BreakdownChart from '../../components/BreakdownChart';
import { DataGrid } from '@mui/x-data-grid';
import OverviewChart from '../../components/OverviewChart';
import { useGetCustomersQuery, useGetDashboardQuery } from '../../state/api';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import UserActions from '../customers/UserActions';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
  const { data, isLoading } = useGetDashboardQuery();
  const { customerData, customerIsLoading } = useGetCustomersQuery();
  console.log(customerData)

  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex : 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex : 1,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex : 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex : 0.4,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex : 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
 ];

 const customerColumns = [
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
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Users"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Pending Sales"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
  
        <StatBox
          title="Pending Transactions"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Computed Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={customerIsLoading || !customerData}
            getRowId={(row) => row._id}
            rows={customerData || []}
            columns={customerColumns}
          />
        </Box>
        {/* <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
}

export default Dashboard