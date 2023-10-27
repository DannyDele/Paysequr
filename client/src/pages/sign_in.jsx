import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/authSlice";
import { useLoginMutation } from "../features/authApiSlice";
import { toast } from "react-toastify";

function Copyright(props) {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://paysequr.com/">
          Paysequr
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <IconButton onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlined sx={{ fontSize: "25px" }} />
        ) : (
          <LightModeOutlined sx={{ fontSize: "25px" }} />
        )}
      </IconButton>
    </Container>
  );
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errMsg, setErrMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const theme = useTheme();

  const handleFormSubmit = async (data) => {
    try {
      const username = data.Username;
      const password = data.Password;
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData, username }));
      setSuccessMsg("Logged In");
      const user = userData.user;
      localStorage.setItem("user", JSON.stringify(user));
      const authToken = userData.token;
      localStorage.setItem("authToken", authToken);
      toast.success(userData.msg);
      navigate("/overview");
    } catch (error) {
      console.log(error);
      if (!error?.data.msg) {
        setErrMsg("No server response");
        toast.error(errMsg);
      } else if (error?.status === 401) {
        setErrMsg("Incorrect Username or Password");
        toast.error(error.data.msg);
      } else if (error?.status === 400) {
        setErrMsg("Unauthorized");
        toast.error(error.data.msg);
      } else {
        setErrMsg("Login Failed");
        toast.error(error.data.msg);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "orange" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register("Username", { required: true, maxLength: 80 })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("Password", { required: true, maxLength: 50 })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "orange" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color={theme.palette.text.default}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
