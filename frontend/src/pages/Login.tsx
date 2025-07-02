import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import NavBar from "../components/NavBar";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = (await loginUser(email, password)) as {
        data?: { token?: string };
      };
      const token = response?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        alert("Login failed: No token returned.");
      }
    } catch (error: unknown) {
      let message = "Login failed";
      type APIError = {
        response?: {
          data?: {
            message?: string;
          };
        };
      };
      const err = error as APIError;
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in err &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "message" in err.response.data
      ) {
        message = err.response.data.message as string;
      }
      alert(message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center vh-100 login-container fade-in">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded glass-card"
          style={{ maxWidth: 400, width: "100%" }}
        >
          <h2 className="mb-4 text-center text-glow">Login</h2>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control dark-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control dark-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>

          <p className="text-center mt-3 small text-light">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
