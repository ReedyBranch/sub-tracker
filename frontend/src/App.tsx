import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SubDashboard from "./pages/SubDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />

      {/* Private route for the dashboard */}
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
