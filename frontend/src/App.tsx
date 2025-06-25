import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SubDashboard from "./pages/SubDashboard";
import PrivateRoute from "./routes/PrivateRoute"; // adjust path if needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <SubDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
