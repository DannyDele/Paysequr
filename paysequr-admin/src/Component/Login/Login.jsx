import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../redux/loginSlice';
import {
  Paper,
  TextField,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import paysequr from '../Dashboard/images/Paysequricon.png'


const Login = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    setError('');
    const loginRes = await dispatch(adminLogin(form));
    setLoading(false);
    console.log('Login response', loginRes);

    if (loginRes.meta.requestStatus === 'fulfilled') {
      const { token } = loginRes.payload;
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
    } else {
      setError('Username or password is incorrect!');
    }
  };

  return (
    <Container>
      <div className='flex flex-col justify-center items-center mt-[15vh]'>
        <Paper  elevation={5} sx={{ padding: '5rem', width:'40%' }}>
          <div className='flex flex-col items-center mb-4'>
            <img src={paysequr}  style={{ width: 40, height: 40}}  alt="payseqr image" />
          </div>

          <div className='flex flex-col justify-center items-center'>
            <div className='mt-5 w-[100%]'>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="standard"
                onChange={handleFormChange}
                error={!!error}
                helperText={error && "Incorrect username or password"}
                fullWidth
                sx={{width:'100%'}}
                InputProps={{
                  startAdornment: (
                    <PersonIcon />
                  ),
                }}
              />
            </div>

            <div className='mt-5 w-[100%]'>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="standard"
                onChange={handleFormChange}
                error={!!error}
                helperText={error && "Incorrect username or password"}
                fullWidth
                sx={{width:'100%'}}
                InputProps={{
                  startAdornment: (
                    <LockIcon />
                  ),
                }}
              />
            </div>

            <div className='mt-5 w-[100%]'>
              <Button
                style={{ width: '100%' }}
                onClick={handleFormSubmit}
                variant="contained"
              >
                {loading ? (<CircularProgress size={20} sx={{ color: 'white' }} />) : (
                  'Login'
                )}
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default Login;
