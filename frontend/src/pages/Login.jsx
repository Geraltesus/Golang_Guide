import { useState } from "react";
import { useLogin } from "../components/useLogin";
import { useNavigate, Link } from "react-router-dom";
import { useLogOut } from "../components/useLogout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await login(username, password);
    if (user) navigate("/profile");
  }

  return (
    <div>
      <div className="logoContainer">
        <Link to="/">bruh4app</Link>
      </div>

      <div className="commentContainer">
        <span>Log in to your account</span>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="E-mail"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>

      {error && <p>{error}</p>}

      <div className="signUpCommentContainer">
        <div className="comment">Don't have an account yet?</div>

        <div className="signUpLink">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
