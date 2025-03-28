import { useLogOut } from "../components/useLogout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useInfo } from "../components/useInfo";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Profile() {
  const navigate = useNavigate();
  const { info, error } = useInfo();
  const { logOut } = useLogOut();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const data = await info(token);
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  async function handleLogOut() {
    await logOut(token);
    navigate("/");
  }

  if (loading) return <Loading />;

  if (!user || !token) return <h2>Access Denied</h2>;

  return (
    <div>
      <Link to="/">bruh4app</Link>
      <h2>Hey, {userInfo ? userInfo.full_name : "Bruh Bruh Bruh"}!</h2>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
