import React from "react";
import { Box, Button } from "@mui/material";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";

const EscrowTransactions = () => {
    const columns = [
      {
        field: "createdAt",
        headerName: "Date",
        maxWidth: 100,
      },
    {
      field: "length",
      headerName: "Escrow ID",
      maxWidth: 100,
    },
    {
      field: "product_id",
      headerName: "Buyer ID",
      maxWidth: 100,
    },
    {
      field: "product_name",
      headerName: "Merchant ID",
      maxWidth: 100,
    },
    {
      field: "seller_id",
      headerName: "Amount",
    },
    {
      field: "buyer_id",
      headerName: "Product Type",
      maxWidth: 100,
    },
    {
      field: "delivery_status",
      headerName: "Delivery Status",
      maxWidth: 100,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Escrow Pay Transactions"
        subtitle="List of All Escrow Pay Transactions"
          />
          <Button>Investigator</Button>
      <Box mt="40px" height="75vh">
        {/* Filter based on status and investigator===> Escrow ID and trx date(The buyer details by the left, and the seller details by the right. Then the general details at the middle.) */}
        <DataGrid
          loading={true}
          rows={[]}
          columns={columns}
          //   checkboxSelection
          components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
    </Box>
  );
};

export default EscrowTransactions;
