import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {setMode} from '../../state';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';

// function Copyright(props) {
//     const dispatch = useDispatch();
//     const theme = useTheme();

//   return (
//     <Container sx={{ display:"flex", justifyContent: "space-between", alignItems: "baseline" }}>
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://paysequr.com/">
//         Paysequr
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//     <IconButton onClick={() => dispatch(setMode())}>
//                 {theme.palette.mode === "dark" ? (
//                   <DarkModeOutlined sx={{fontSize: "25px"}}/>
//                 ) : (
//                   <LightModeOutlined sx={{fontSize: "25px"}}/>
//                 )}
//     </IconButton>
//     </Container>
//   );
// }


export default function Message() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [usernameErr, setUsernameErr] = React.useState("");
    const [passwordErr, setPasswordErr] = React.useState("");
    const theme = useTheme();

    const handleFormSubmit = (data) => {
        console.log("Form Data is", data);
        if(!data.Username || !data.Username.length){
            setUsernameErr("Username is Required");
            return false;
        }else{
            setUsernameErr("");
        }
        return true;
      };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Message
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              error={usernameErr && usernameErr.length ? true : false}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Message Title"
              name="username"
              autoComplete="username"
              autoFocus
              helperText={usernameErr}
              {...register("Username", {required: true, maxLength: 80})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Message"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("Password", {required: true, maxLength: 50})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "orange"}}
            >
              Submit
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2" color={theme.palette.text.default}>
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item>
                <Link href="#" variant="body2" color={theme.palette.text.default}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      
  );
}