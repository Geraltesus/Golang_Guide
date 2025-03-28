import { useState } from "react";
import { useSignUp } from "../components/useSignup";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error } = useSignUp();

  async function handleSubmit(e) {
    e.preventDefault();
    await signUp(username, password);
  }

  return (
    <div>
      <div className="logoContainer">
        <Link to="/">bruh4app</Link>
      </div>

      <div className="commentContainer">
        <span>Sign Up the account</span>
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
        <button type="submit">Sign-up</button>
      </form>

      {error && <p>{error}</p>}

      <div className="signUpCommentContainer">
        <div className="comment">Already have an account?</div>

        <div className="signUpLink">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
