import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useValue } from '../../../context/ContextProvider';
//import { deleteRoom } from '../../../actions/room';

const UserActions = ({ params }) => {
//   const {
//     dispatch,
//     state: { currentUser },
//   } = useValue();


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
      <Tooltip title="View user details">
        <IconButton
           onClick={() => {
            viewUser(params.row.id);
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this user">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this user">
        <IconButton
           onClick={() => {
            toast.promise(
              deleteUser(params.row.id),
              {
                pending: 'Deleting user. ⏳',
                success: {
                    return: 'User has been deleted. ✅',
                    },
                error: 'Could not delete user. ❌',
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

export default UserActions;