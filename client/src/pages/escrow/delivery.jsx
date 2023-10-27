import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
// import DataGridCustomToolbar from "../components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";

const Delivery = () => {
  const columns = [
    {
      field: "length",
      headerName: "Escrow ID",
      maxWidth: 100,
    },
    {
      field: "date",
      headerName: "Transaction Date",
      maxWidth: 400,
    },
    {
      field: "seller",
      headerName: "Merchant ID",
      maxWidth: 100,
    },
    {
      field: "buyer-id",
      headerName: "Buyer ID",
      maxWidth: 100,
    },
    {
      field: "complain",
      headerName: "Tracking Number",
      maxWidth: 100,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Track Delivery" subtitle="Data from GIG" />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={true}
          rows={[]}
          columns={columns}
          // components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Delivery;
