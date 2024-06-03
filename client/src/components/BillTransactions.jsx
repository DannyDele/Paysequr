import React, { useState } from "react";
import { Box, Button, ButtonBase, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../state/api";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";

const BillTransactions = () => {
  const { rows, setRows } = useState([]);
  const columns = [
    {
      field: "_id",
      headerName: "Transaction ID",
      flex: 0.7,
    },
    {
      field: "product_id",
      headerName: "Product ID",
      flex: 0.5,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 0.5,
    },
    {
      field: "seller_id",
      headerName: "Seller ID",
    },
    {
      field: "buyer_id",
      headerName: "Buyer ID",
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 0.4,
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      flex: 0.5,
    },
    {
      field: "delivery_status",
      headerName: "Delivery Status",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Bill Transactions"
        subtitle="List of All Bills Transactions"
      />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={isLoading || rows.length == 0}
          rows={rows}
          columns={columns}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default BillTransactions;