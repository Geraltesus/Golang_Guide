import { Link } from "react-router-dom";
import { useLogOut } from "./useLogout";
import { useNavigate } from "react-router-dom";

export function HeaderIned() {
  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <Link to="/">bruh4app</Link>
      </div>

      <div className="buttonsContainer">
        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export function HeaderOuted() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const navigate = useNavigate();
  const { logOut } = useLogOut();

  async function handleLogOut() {
    await logOut(token);
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <Link to="/">bruh4app</Link>
      </div>

      <div className="buttonsContainer">
        <Link to="/profile">Profile</Link>
        <br />
        <Link onClick={handleLogOut}>Log Out</Link>
      </div>
    </div>
  );
}
