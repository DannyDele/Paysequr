import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Header from '../../components/Header';

import { useGetCustomerInfoQuery, useGetKYCApprovalMutation, useGetKYCDisapprovalMutation } from '../../state/api';

const UserInfo = () => {
  const params = useParams();
  const {data, isLoading} = useGetCustomerInfoQuery(params.id);
  const [getKYCApproval, {isLoading: KYCLoading}] = useGetKYCApprovalMutation(params.id);
  const [getKYCDisApproval, {isLoading: KYCDisapprovalLoading}] = useGetKYCDisapprovalMutation(params.id);
  console.log('User Data', data);
  console.log('User Data Image', !data ? [] : data[0]?.id_image);

  console.log("Params", params); // 👉️ {userId: '4200'}
  const columns = [
    {
        field: "id",
        headerName: "ID",
        flex : 0.05,
    },
    {
        field: "userid",
        headerName: "User ID",
        flex : 0.3,
    },
    {
        field: "approved",
        headerName: "isApproved",
        flex : 0.2,
    },
    {
        field: "birth_date",
        headerName: "Date of Birth",
        flex : 0.3,
    },
    {
        field: "city",
        headerName: "City",
        flex : 0.2,
    },
    {
        field: "country",
        headerName: "Country",
        flex : 0.2,
    },
    {
        field: "document_type",
        headerName: "Document Type",
        flex : 0.2,
    },
    {
        field: "gender",
        headerName: "Gender",
        flex : 0.2,
    },
    {
        field: "street",
        headerName: "Address",
        flex : 0.3,
    },
    {
        field: "personal_info_v",
        headerName: "Information Verification",
        flex : 0.2,
    },
    {
        field: "postal_code",
        headerName: "Postal Code",
        flex : 0.2,
    },
 ]

const handleApproval = async (id) => {
    try {
        const result = await getKYCApproval(params.id).unwrap()
        toast.success(result.msg);
    } catch (error) {
        toast.error(error);
    }
};

const handleDisApproval = async (id) => {
    try {
        const result = await getKYCDisApproval(params.id).unwrap()
        toast.success(result.msg);
    } catch (error) {
        toast.error(error);
    }
}

return (

<Box m="1.5rem 2.5rem">
    <Header title="USERS" subtitle="List of Users"/>
    <Typography variant='h5'>{`User ID is 👉${params.id}`}</Typography>
    <Box
        mt="40px"
        height="25vh"
    >
    <Box display="flex" gap="40px" mb="20px">
    <Button sx={{backgroundColor: "green", color: "white", fontWeight: "700", padding: "12px" }} onClick={() => handleApproval(params.id)}>APPROVE</Button>
    <Button sx={{backgroundColor: "red", color: "white", fontWeight: "700" }} onClick={() => handleDisApproval(params.id)}>DISAPPROVE</Button>
    </Box>
        <DataGrid
            loading = {isLoading || !data}
            getRowId={(row) => row.id}
            rows= { data || [] }
            columns={columns}
            checkboxSelection
            sx={{marginBottom: "60px"}}
        />
        <Box display="flex" gap="40px">
            <img src={`${isLoading ? [] : data[0]?.id_image}`} alt="test"  width={400} height={400}/>
            <img src={`${isLoading ? [] : data[0]?.id_image}`} alt="test"  width={400} height={400}/>
        </Box>
    </Box>
</Box>
)
}

export default UserInfo