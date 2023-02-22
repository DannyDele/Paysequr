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

const notify = () => toast("Wow so easy !");

async function viewUser(id) {
  try {
    const response = await axios.get(`https://paysequr.com/api-admin/user/${id}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id) {
  try {
    const response = await axios.delete(`https://paysequr.com/api-admin/user/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}

// const response = await toast.promise(
//   fetch("A_URL"),
//   {
//     pending: 'Promise is pending',
//     success: 'Promise resolved 👌',
//     error: 'Promise rejected 🤯'
//   }
// );
// console.log(response)

// const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
// toast.promise(
//     resolveAfter3Sec,
//     {
//       pending: 'Promise is pending',
//       success: 'Promise resolved 👌',
//       error: 'Promise rejected 🤯'
//     }
// )

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
                success: 'User has been deleted. ✅',
                error: 'Could not delete user. ❌',
              },
              setTimeout(() => {
                window.location.reload()
              }, 5000)
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