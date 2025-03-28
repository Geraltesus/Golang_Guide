import { useState } from "react";

export function useInfo() {
  const [error, setError] = useState(null);

  async function info(token) {
    try {
      const res = await fetch("http://193.32.178.251:8888/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Auth error");
      const data = await res.json();
      localStorage.setItem("full_name", JSON.stringify(data));
      return data;
    } catch (err) {
      setError(err.message);
    }
  }

  return { info, error };
}
