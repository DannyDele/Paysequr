import React from "react";
import { Box, Button } from "@mui/material";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
// import DataGridCustomToolbar from "./DataGridCustomToolbar";
import { rows } from "../../../paysequr-admin/RawData/escrow";

const EscrowTransactions = () => {

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
    },
    {
      field: "date",
      headerName: "Date",
      width: 170,
    },
    {
      field: "escrowID",
      headerName: "Escrow ID",
      width: 170,
    },
    {
      field: "buyerUsername",
      headerName: "Buyer ID",
      width: 150,
    },
    {
      field: "merchantUsername",
      headerName: "Merchant ID",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount (N)",
      width: 100,
    },
    {
      field: "productType",
      headerName: "Product Type",
      width: 150,
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            color:
              params.value === "Delivered"
                ? "green"
                : params.value === "On transit"
                ? "pink"
                : "red",
          }}
        >
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Escrow Pay Transactions"
        subtitle="List of All Escrow Pay Transactions"
      />
      <Button>Investigator</Button>
      <Box style={{ height: "75vh", width: "100%" }}>
        {/* Filter based on status and investigator===> Escrow ID and trx date(The buyer details by the left, and the seller details by the right. Then the general details at the middle.) */}
        <DataGrid
          // loading={true}
          rows={rows}
          columns={columns}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default EscrowTransactions;
