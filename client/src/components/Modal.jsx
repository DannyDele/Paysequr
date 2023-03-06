import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input, TextField, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const ModalComponent = ({open, onClose}) => {
    const theme = useTheme();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: theme.palette.background.default,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        
      };

    //   const modalStyles = {
    //     inputFields: {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         marginTop: '20px',
    //         marginBottom: '15px',
    //         '.MuiFormControl-root': {
    //             marginBottom: '20px',
    //         },
    //     },
    // };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const getContent = () => (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
        }
        }}>
            <TextField
                placeholder="User ID"
                name="userId"
                label="User ID"
                required
                {...register('userId')}
                error={errors.userId ? true : false}
                helperText={errors.userId?.message}
                // value={values.userId}
                // onChange={(event) => handleChange({ ...values, userId: event.target.value })}
            />
            <TextField
                placeholder="Email"
                name="email"
                label="Email"
                required
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                // value={values.email}
                // onChange={(event) => handleChange({ ...values, email: event.target.value })}
            />
            <TextField
                placeholder="Phone number"
                name="phoneNumber"
                label="Phone number"
                required
                {...register('phoneNumber')}
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber?.message}
                // value={values.phoneNumber}
                // onChange={(event) => handleChange({ ...values, phoneNumber: event.target.value })}
            />
        </Box>
    );

  return (
    <Modal  open = {open} onClose = {onClose} >
    <Box sx={style}>
    <Typography variant="h6" component="h2">
      Add New Bill Payment
    </Typography>
    <Typography  sx={{ mt: 2 }}>
      Please enter the necessary details.
    </Typography>
    <Box>
        <Input 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        }} 
        placeholder='Name of Payment'/>
        <Input 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                marginBottom: '15px',
                '.MuiFormControl-root': {
                    marginBottom: '20px',
                },
            }}
        placeholder='Amount'/>
        <Input 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                marginBottom: '15px',
                '.MuiFormControl-root': {
                    marginBottom: '20px',
                },
            }}
        placeholder='Transaction Description'/>
    </Box>
    <Box>
        <Button variant='contained' >Submit</Button>
    </Box>
  </Box>
  </Modal>
  )
}

export default ModalComponent