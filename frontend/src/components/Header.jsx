import { Link } from "react-router-dom";

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
  async function handleLogOut() {
    await logOut(token);
    navigate("/");
  }
  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <Link to="/">bruh4app</Link>
      </div>

      <div className="buttonsContainer">
        <Link to="/profile">Profile</Link>
        <a onClick={handleLogOut}>Log Out</a>
      </div>
    </div>
  );
}
