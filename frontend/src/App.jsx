import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./PrivateRoute";
import "./style.css";
import DynamicTitle from "./components/DynamicTitle";
import Error from "./pages/Error";

export default function App() {
  return (
    <BrowserRouter>
      <DynamicTitle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
