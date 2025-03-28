import { useState } from "react";

export function useSignUp() {
  const [error, setError] = useState(null);

  async function signUp(username, password) {
    try {
      const res = await fetch("http://193.32.178.251:8888/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Ошибка регистрации");
      return await res.json();
    } catch (err) {
      setError(err.message);
    }
  }

  return { signUp, error };
}
