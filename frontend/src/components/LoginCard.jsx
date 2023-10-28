import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomButton from "./Button";
import theme from "../theme";
import api from "../config/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function isValidEmail(email) {
  // Email validation logic using a regular expression:
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function LogIn() {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidEmail(email)) {
      fetchAuthToken();
    } else {
      setEmailError(true);
    }
  };

  const fetchAuthToken = async () => {
    try {
      const response = await api.post("/login", {
        email: { email }
      });
      setAuthToken(response.data);

      // Navigate to the home route
      navigate("/");
    } catch (error) {
      console.error("Error getting AuthToken: ", error);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: `${theme.primaryColor}` }}>
            <LockOutlinedIcon style={{ backgroundColor: `${theme.primaryColor}` }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login{" "}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? "Please enter a valid email" : ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              style={{
                "&:focus": {
                  borderColor: "yellow"
                }
              }}
            />
            <CustomButton name="Login" />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LogIn;
