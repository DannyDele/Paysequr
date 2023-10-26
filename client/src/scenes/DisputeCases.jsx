import React from "react";
import Header from "../components/Header";
import { Box, Button, Stack } from "@mui/material";
// import DataGridCustomToolbar from "../components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";

const DisputeCases = () => {
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
      field: "action",
      headerName: "Action",
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              htmlFor="my-modal-3"
              className="book-buttons  py-1 px-4"
            >
              View Dispute
              {/* Got to a chat box */}
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dispute Resolution" subtitle="Dispute cases" />
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

export default DisputeCases;
