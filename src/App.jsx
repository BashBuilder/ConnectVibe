import "./app.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/authContext";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Error from "./pages/Error";

function App() {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser?.token ? <Home /> : <Auth />} />
        <Route
          path="/profile/:userid"
          element={authUser?.token ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
