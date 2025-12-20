import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    const success = await login(userName, password);
    if (!success) {
      alert("Invalid username or password");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view protected pages.</p>

      <input
        id="username"
        placeholder="user name"
        onChange={(e) => setUserName(e.target.value)}
      /><br />

      <input
        id="password"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleLogin}>Log in</button>

      <p>
        Not Registered? <Link to="/signup">Sign Up!</Link>
      </p>
    </>
  );
};

export default LoginPage;
