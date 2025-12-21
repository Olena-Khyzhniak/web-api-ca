import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SignUpPage = () => {
  const { register } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegEx.test(password)) {
      alert("Password must contain 8 chars, 1 letter, 1 number, 1 symbol.");
      return;
    }

    if (password !== passwordAgain) {
      alert("Passwords do not match.");
      return;
    }

    const result = await register(userName, password);
    setRegistered(result.success === true || !!result.token);
  };

  if (registered) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            You must register a username and password to log in. Passwords must
            contain at least 8 characters, one letter, one number, and one
            symbol.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              fullWidth
            >
              Register
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
