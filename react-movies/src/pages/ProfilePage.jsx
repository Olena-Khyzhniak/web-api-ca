import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { isAuthenticated, username } = useContext(AuthContext);
  const navigate = useNavigate();

  return isAuthenticated ? (
    <p>
      User profile: <strong>{username}</strong>
    </p>
  ) : (
    <p>
      You must log in to see your profile!{" "}
      <button onClick={() => navigate("/login")}>Login</button>
    </p>
  );
};

export default ProfilePage;
