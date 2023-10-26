import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
// import DataGridCustomToolbar from "../components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";

const DisputeHistory = () => {
  const columns = [
    {
      field: "date",
      headerName: "Transaction Date",
      maxWidth: 400,
    },
    {
      field: "length",
      headerName: "Escrow ID",
      maxWidth: 100,
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
      headerName: "Complainant",
      maxWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dispute History" subtitle="" />
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

export default DisputeHistory;
