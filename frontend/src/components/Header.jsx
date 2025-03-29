import { Link } from "react-router-dom";
import { useLogOut } from "./useLogout";
import { useNavigate } from "react-router-dom";
import "../style.css";

export function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = Boolean(user?.token);
  const navigate = useNavigate();
  const { logOut } = useLogOut();

  async function handleLogOut() {
    await logOut(user?.token);
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="flex gap-4">
      <div className="headerContainer flex items-center justify-between w-full">
        {/* Логотип */}
        <div className="logoContainer">
          <Link to="/">bruh4app</Link>
        </div>

        {/* Кнопки (в зависимости от авторизации) */}
        <div className="buttonsContainer flex gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link onClick={handleLogOut}>Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
