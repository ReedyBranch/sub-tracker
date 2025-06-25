import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser(name, email, password);
      console.log("Registration successful!", res);
      navigate("/dashboard");
    } catch (error: unknown) {
      let message = "Registration failed";
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
        err.response &&
        typeof err.response === "object" &&
        err.response.data &&
        typeof err.response.data === "object" &&
        err.response.data.message
      ) {
        message = err.response.data.message as string;
      }
      alert(message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white"
        style={{ maxWidth: 400, width: "100%" }}
      >
        <h2 className="mb-4 text-center">Register</h2>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>

        <p className="text-center mt-3 small">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
