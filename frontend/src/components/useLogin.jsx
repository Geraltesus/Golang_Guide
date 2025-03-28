import { useState } from "react";

export function useLogin() {
  const [error, setError] = useState(null);

  async function login(username, password) {
    try {
      const res = await fetch("http://193.32.178.251:8888/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Auth error");
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      setError(err.message);
    }
  }

  return { login, error };
}
