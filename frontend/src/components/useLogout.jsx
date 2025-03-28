import { useState } from "react";

export function useLogOut() {
  const [error, setError] = useState(null);

  async function logOut(token) {
    try {
      const res = await fetch("http://193.32.178.251:8888/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Logout error");

      localStorage.removeItem("user"); // Remove user from localStorage after successful logout
    } catch (err) {
      setError(err.message);
    }
  }

  return { logOut, error };
}
