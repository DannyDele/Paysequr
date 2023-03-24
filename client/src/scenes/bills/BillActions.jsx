import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import BillUpdateModal from './BillUpdateModal';
//import { useValue } from '../../../context/ContextProvider';
//import { deleteRoom } from '../../../actions/room';

const BillActions = ({ params }) => {
//   const {
//     dispatch,
//     state: { currentUser },
//   } = useValue();

const [isOpen, setIsOpen] = useState(false);

async function viewUser(id) {
  try {
    const response = await axios.get(`https://paysequr.com/api-admin/user/${id}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id) {
    const response = await axios.delete(`https://paysequr.com/api-admin/user/${id}`);
    console.log(response);
    return response;
}


  return (
    <Box>
        <BillUpdateModal open = {isOpen} onClose={() => setIsOpen(false)} />
      <Tooltip title="View">
        <IconButton
           onClick={() => {
            viewUser(params.row.id);
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton onClick={() => { setIsOpen(true) }}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
           onClick={() => {
            // toast("Are you sure you want to delete Bill?", {
            //   autoClose: false
            // });
            toast.promise(
              deleteUser(params.row.id),
              {
                pending: 'Deleting Bill. ⏳',
                success: {
                    return: 'Bill has been deleted. ✅',
                    },
                error: 'Could not delete Bill. ❌',
              },
              //REMEMBER TO FIX
              // setTimeout(() => {
              //   window.location.reload()
              // }, 5000)
          );
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BillActions;