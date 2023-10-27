import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from 'react-hook-form';


export default function Message() {

    const { register, handleSubmit, formState: { errors } } = useForm();

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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Message Title"
              name="username"
              autoComplete="username"
              autoFocus
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
              multiline
              rows={5}
            
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
            </Grid>
          </Box>
        </Box>
      </Container>
      
  );
}