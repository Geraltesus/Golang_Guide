import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home - Bruh4app",
      "/login": "Login – Bruh4app",
      "/signup": "Sign Up – Bruh4app",
      "/profile": "Profile – Bruh4app",
    };

    document.title = titles[location.pathname] || "bruh4app";
  }, [location]);
}

export default DynamicTitle;
