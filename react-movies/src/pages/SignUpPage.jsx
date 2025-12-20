import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SignUpPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      alert("Password must contain 8 chars, 1 letter, 1 number, 1 symbol.");
      return;
    }

    if (password !== passwordAgain) {
      alert("Passwords do not match.");
      return;
    }

    const result = await context.register(userName, password);

    setRegistered(result.success === true || result.token);
  };

  if (registered) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>
        You must register a username and password to log in. Usernames must be
        unique and passwords must contain a minimum of 8 characters (with at
        least one uppercase letter, one lowercase letter, and one symbol).
      </p>

      <input
        value={userName}
        placeholder="user name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />

      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <input
        value={passwordAgain}
        type="password"
        placeholder="password again"
        onChange={(e) => setPasswordAgain(e.target.value)}
      />
      <br />

      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;
