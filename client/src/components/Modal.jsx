import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, useTheme } from '@mui/material';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import  FlexBetween  from '../components/FlexBetween';
import {MenuItem} from '@mui/material';

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
        // overflow:'scroll',
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

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
      // defaultValues: {}; you can populate the fields by this attribute 
    });
    const { fields, append, remove } = useFieldArray({
      control,
      name: "test"
    });

    // const getContent = () => (
    //     <Box sx={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         marginTop: '20px',
    //         marginBottom: '15px',
    //         '.MuiFormControl-root': {
    //             marginBottom: '20px',
    //     }
    //     }}>
    //         <TextField
    //             placeholder="User ID"
    //             name="userId"
    //             label="User ID"
    //             required
    //             {...register('userId')}
    //             error={errors.userId ? true : false}
    //             helperText={errors.userId?.message}
    //             // value={values.userId}
    //             // onChange={(event) => handleChange({ ...values, userId: event.target.value })}
    //         />
    //         <TextField
    //             placeholder="Email"
    //             name="email"
    //             label="Email"
    //             required
    //             {...register('email')}
    //             error={errors.email ? true : false}
    //             helperText={errors.email?.message}
    //             // value={values.email}
    //             // onChange={(event) => handleChange({ ...values, email: event.target.value })}
    //         />
    //         <TextField
    //             placeholder="Phone number"
    //             name="phoneNumber"
    //             label="Phone number"
    //             required
    //             {...register('phoneNumber')}
    //             error={errors.phoneNumber ? true : false}
    //             helperText={errors.phoneNumber?.message}
    //             // value={values.phoneNumber}
    //             // onChange={(event) => handleChange({ ...values, phoneNumber: event.target.value })}
    //         />
    //     </Box>
    // );

    const handleFormSubmit = (data) => {
        console.log("Form Data is", data);
        // if(!data.Username || !data.Username.length){
        //     setUsernameErr("Username is Required");
        //     return false;
        // }else{
        //     setUsernameErr("");
        // }
        // return true;
      };

      const [newCategory, setNewCategory] = useState(false);
      const [isHidden, setIsHidden] = useState(false);

      const categories = [
        {
          value: 'Airtime',
          label: 'Airtime',
        },
        {
          value: 'Data',
          label: 'Data',
        },
        {
          value: 'Electricity',
          label: 'Electricity',
        },
        {
          value: 'Education',
          label: 'Education',
        },
        {
          value: 'Religion',
          label: 'Religion',
        },
        {
          value: 'Cooperatives',
          label: 'Cooperatives',
        },
        {
          value: 'Cable Subscription',
          label: 'Cable Subscription',
        },
        // {
        //   value: `${category}`,
        //   label: `${category}`,
        // },
      ];
      // const airtime = [
      //   {
      //     value: 'MTN',
      //     label: 'MTN',
      //   },
      //   {
      //     value: 'EUR',
      //     label: 'AIRTEL',
      //   },
      //   {
      //     value: 'BTC',
      //     label: 'GLO',
      //   },
      //   {
      //     value: 'JPY',
      //     label: 'ETISALAT',
      //   },
      // ];

  return (
    <Modal  open = {open} onClose = {onClose}  style={{ overflow: 'scroll' }}>
    <Box sx={style}>
    <Typography variant="h6" component="h2">
      Add New Bill Payment
    </Typography>
    <Typography  sx={{ mt: 2 }}>
      Please enter the necessary details.
    </Typography>
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
    {/* <TextField
            //   error={usernameErr && usernameErr.length ? true : false}
              margin="normal"
              required
              fullWidth
              id="payment"
              label="Name of Payment"
              name="payment"
            //   autoComplete=""
              autoFocus
              sx={{mb:"20px"}}
            //   helperText={usernameErr}
              {...register("Name of Payment", {required: true, maxLength: 80})}
            /> */}
            <FlexBetween>
            <TextField 
            id="standard-select-currency"
            select
            label="Category"
            defaultValue="Airtime"
            helperText="Please select your Category"
            variant="outlined"
            sx={{mb:"20px", mt: "20px"}}
            {...register("Category", {required: true, maxLength: 80})}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button 
        size='small'
        onClick={() => setNewCategory(!newCategory)}
            variant="contained"
            sx={{ mb: 4, backgroundColor: "orange"}}
            >Add New Category
        </Button>
        </FlexBetween>
        { newCategory &&
        <TextField
            //   error={usernameErr && usernameErr.length ? true : false}
            
              // margin="normal"
              required
              fullWidth
              id="payment"
              label="Category"
              name="payment"
            //   autoComplete=""
              autoFocus
              sx={{ mb: 2}}
              // sx={display={isHidden ? "none" : "block"}
            //   helperText={usernameErr}
              {...register("Name of Biller", {required: true, maxLength: 80})}
            />
            }
        <Button 
            onClick={() => setIsHidden(!isHidden)}
            variant="contained"
            fullWidth
            sx={{ mb: 2, backgroundColor: "orange"}}
            >Add Biller
        </Button>
        { isHidden &&
        <TextField
            //   error={usernameErr && usernameErr.length ? true : false}
            
              margin="normal"
              required
              fullWidth
              id="payment"
              label="Name of Biler"
              name="payment"
            //   autoComplete=""
              autoFocus
              // sx={display={isHidden ? "none" : "block"}
            //   helperText={usernameErr}
              {...register("Name of Biller", {required: true, maxLength: 80})}
            />
            }
        <Button 
            // type="button"
            onClick={() => append({ option: "", amount: "" })}
            variant="contained"
            fullWidth
            sx={{backgroundColor: "orange", mb:"20px"}}
            >Add Options
        </Button>


        
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <TextField fullWidth label="Option" sx={{mb:"20px"}} {...register(`test.${index}.option`)} />
            <Controller
              render={({ field }) => <TextField fullWidth label="Amount" {...field} />}
              name={`test.${index}.amount`}
              control={control}
            />
            <Button variant="contained"
            sx={{backgroundColor: "orange", mb:"10px", mt:"10px"}} 
            onClick={() => remove(index)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      {/* <input type="submit" /> */}

        {/* <TextField
            //   error={usernameErr && usernameErr.length ? true : false}
            
              margin="normal"
              required
              fullWidth
              id="payment"
              label= {`OPTION ${1} NAME`}
              name="payment"
            //   autoComplete=""
              autoFocus
              // sx={display={isHidden ? "none" : "block"}
            //   helperText={usernameErr}
              {...register("Name of Biller", {required: true, maxLength: 80})}
            />
            <TextField
            //   error={usernameErr && usernameErr.length ? true : false}
            
              margin="normal"
              required
              fullWidth
              id="payment"
              label="Amount"
              name="payment"
            //   autoComplete=""
              autoFocus
              // sx={display={isHidden ? "none" : "block"}
            //   helperText={usernameErr}
              {...register("Name of Biller", {required: true, maxLength: 80})}
            /> */}
        {/* {value === "Airtime" ? <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="Category"
            defaultValue="Airtime"
            helperText="Please select your bill"
            variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> : "Loading"} */}
            {/* <DialogVerticalScroll/> */}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount"
              type="text"
              id="amount"
            //   autoComplete="current-password"
              {...register("Amount", {required: true, maxLength: 50})}
            /> */}
            <TextField
            //   error={usernameErr && usernameErr.length ? true : false}
              margin="normal"
              required
              fullWidth
              id="desc"
              label="Transaction Description"
              name="desc"
            //   autoComplete="username"
              autoFocus
            //   helperText={usernameErr}
              {...register("Description", {required: true, maxLength: 80})}
            />
        {/* <Input 
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
        placeholder='Transaction Description'/> */}
        <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "orange"}}
            >Submit
        </Button>
    </Box>
  </Box>
  </Modal>
  )
}

export default ModalComponent